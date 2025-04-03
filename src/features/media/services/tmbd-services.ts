import { notFound } from "next/navigation";
import { z } from "zod";

import {
  BASE_API_URL,
  VALID_MEDIA_TYPES,
  FETCH_API_OPTIONS,
  MediaCategoryKeyType,
} from "@/utils/constants";

import {
  baseMediaExtractor,
  movieDetailsExtractor,
  tvSeasonDetailsExtractor,
  tvShowDetailsExtractor,
  getErrorMessage,
} from "@/utils/helpers";

import {
  type Genre,
  genreSchema,
  MediaType,
  Movie,
  MovieSchema,
  TV,
  TVSchema,
} from "./types/index.types";

import {
  BaseMediaType,
  ExtractedMovieDetails,
  ExtractedTvShowDetails,
} from "@/types/global.types";
import { AllMediaSchema, getTrendingResultsSchema } from "./types/trending";
import { MovieDetailsWithCreditsSchema } from "./types/movies.types";
import { TvShowDetailsWithCreditsSchema } from "./types/tv-shows.types";
import { SeasonDetailsSchema } from "./types/tv-seasons.types";

const genresSchema = z.object({
  genres: z.array(genreSchema),
});

export type TrendingMediaPayloadType = BaseMediaType & {
  genre?: string;
};

// TMDB API pagination limits requests with pages number beyond 500 will return an error
const MAX_ALLOWED_PAGE = 500;

export async function getTrendingMedia() {
  const genresFetchOptions = {
    ...FETCH_API_OPTIONS,
    next: { revalidate: 86400 },
  };
  // caching trending media this week and revalidate every 1 hour
  // caching trending media this week and revalidate every day since they are rare to change
  const requests = [
    fetch(`${BASE_API_URL}/trending/all/week?append_to_response=images`, {
      ...FETCH_API_OPTIONS,
      next: { revalidate: 3600 },
    }),
    fetch(`${BASE_API_URL}/genre/movie/list`, genresFetchOptions),
    fetch(`${BASE_API_URL}/genre/tv/list`, genresFetchOptions),
  ];

  try {
    const responses = await Promise.all(requests);

    const jsonPromises = responses.map((res) => {
      if (!res.ok)
        throw new Error("Something went wrong with fetching trending media");

      return res.json();
    });

    const [unSafeTrendingMedia, unSafeGenresMovies, unSafeGenresTVShows] =
      await Promise.all(jsonPromises);

    const trendingMediaSchema = getTrendingResultsSchema("all");

    const { success: successParseTM, data: trendingMedia } =
      trendingMediaSchema.safeParse(unSafeTrendingMedia);
    const { success: successParseGM, data: genresMovies } =
      genresSchema.safeParse(unSafeGenresMovies);
    const { success: successParseGT, data: genresTVShows } =
      genresSchema.safeParse(unSafeGenresTVShows);

    if (!successParseGM || !successParseGT || !successParseTM)
      throw new Error("genres is in unsafe format");

    // faster look up than iterating over them to find genreIds of each media
    const genreMap = new Map<Genre["id"], Genre["name"]>();
    [...genresMovies.genres, ...genresTVShows.genres].forEach((genre) => {
      genreMap.set(genre.id, genre.name);
    });

    const trendingMediaPayload: TrendingMediaPayloadType[] =
      trendingMedia?.results.map((media) => {
        const obj = baseMediaExtractor(media);

        const genre = media.genre_ids
          ?.map((genreId: number) => genreMap.get(genreId))
          .filter((genre) => genre) // remove undefined values
          .join(", ");

        return { ...obj, genre };
      });

    return trendingMediaPayload;
  } catch (err) {
    throw Error(getErrorMessage(err));
  }
}

export async function getMedia(
  mediaType: MediaType,
  category: MediaCategoryKeyType,
  page = 1,
  options: RequestInit = {},
) {
  // check for media type and category
  if (!VALID_MEDIA_TYPES[mediaType]) {
    throw new Error(
      `invalid media type: ${mediaType}. Must be 'movie' or 'tv'`,
    );
  }

  if (!VALID_MEDIA_TYPES[mediaType][category]) {
    throw new Error(`invalid category: ${category} for ${mediaType}.`);
  }

  if (isNaN(Number(page)))
    throw new Error("page number can only accept numbers");

  const { tmdbEndpoint } = VALID_MEDIA_TYPES[mediaType][category];

  const url = `${BASE_API_URL}/${mediaType}/${tmdbEndpoint}?page=${page}`;

  // merge default options with any custom options
  // caching only first page since most users will see the first page, fewer will go to the second pages
  const fetchOptions: RequestInit = {
    ...FETCH_API_OPTIONS,
    next: { revalidate: page === 1 ? 3600 : 0 },
    ...options,
  };

  try {
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${category} ${mediaType}s: ${res.status} ${res.statusText}`,
      );
    }

    const { results: unSafeResults, total_pages } = await res.json();

    const mediaSchema =
      mediaType === "movie" ? z.array(MovieSchema) : z.array(TVSchema);

    const { success, data: results } = mediaSchema.safeParse(unSafeResults);

    if (!success) throw new Error("media is in unsafe format");

    // casting to unknown is not recommend in general but here i know 100% that results data has some of props in baseMediaExtractor parameter
    const extractedData = results?.map((data) =>
      baseMediaExtractor(data as unknown as Movie | TV),
    );

    // adjust totalPages to max allowed page number if the total_pages exceeds the max limit
    return {
      data: extractedData,
      totalPages: Math.min(total_pages, MAX_ALLOWED_PAGE),
    };
  } catch (err) {
    const errorMessage = `Error fetching ${category} ${mediaType}s: ${getErrorMessage(err)}`;
    throw new Error(errorMessage);
  }
}

export async function getSearchResults(
  query: string,
  abortController: AbortController,
) {
  try {
    const res = await fetch(`${BASE_API_URL}/search/multi?query=${query}`, {
      ...FETCH_API_OPTIONS,
      signal: abortController?.signal,
    });
    if (!res.ok)
      throw new Error("Something went wrong with fetching Search results");

    const { results: unSafeResults } = await res.json();

    // since tmbd api does not have an endpoint for searching only for movies and tv shows i have to use multi endpoint which include movies and tv shows and people
    // filter results to only include movies and tv shows

    const unSafeFilteredResults = unSafeResults?.filter(
      (result: any) => result?.media_type === "movie" || result?.media_type === "tv",
    );

    const AllMediaSchemaArray = z.array(AllMediaSchema);
    const { success, data: filteredResults, error } =
      AllMediaSchemaArray.safeParse(unSafeFilteredResults);

    console.log(success, unSafeResults, error)
      
    if (!success) throw new Error("genres is in unsafe format");

    const extractedData = filteredResults?.map((data) =>
      baseMediaExtractor(data),
    );

    return extractedData;
  } catch (err) {
    throw err;
  }
}

export async function getMovieDetails(
  movieId: number,
): Promise<ExtractedMovieDetails> {
  try {
    const res = await fetch(
      `${BASE_API_URL}/movie/${movieId}?append_to_response=credits`,
      {
        ...FETCH_API_OPTIONS,
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) {
      if (res.status === 404) notFound();

      throw new Error(
        `Something went wrong with fetching movie details, ${res.status} : ${res.statusText}`,
      );
    }

    const unSafeMovie = await res.json();

    const { success, data: movie } =
      MovieDetailsWithCreditsSchema.safeParse(unSafeMovie);

    if (!success) throw new Error("movie is in unsafe format");

    const extractedData = movieDetailsExtractor(movie);

    return extractedData;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getTVShowDetails(
  tvShowId: number,
): Promise<ExtractedTvShowDetails> {
  try {
    const res = await fetch(
      `${BASE_API_URL}/tv/${tvShowId}?append_to_response=credits`,
      {
        ...FETCH_API_OPTIONS,
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      if (res.status === 404) notFound();

      throw new Error(
        `Something went wrong with fetching tv show details, ${res.status} : ${res.statusText}`,
      );
    }

    const unSafeTvShow = await res.json();

    const {
      success,
      data: tvShow,
    } = TvShowDetailsWithCreditsSchema.safeParse(unSafeTvShow);

    if (!success) throw new Error("tv show is in unsafe format");

    const extractedData = tvShowDetailsExtractor(tvShow);

    return extractedData;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getSimilarMedia(mediaType: MediaType, mediaId: number) {
  if (mediaType !== "movie" && mediaType !== "tv") {
    throw new Error("unsupported media type");
  }

  try {
    const res = await fetch(
      `${BASE_API_URL}/${mediaType}/${mediaId}/recommendations`,
      {
        ...FETCH_API_OPTIONS,
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok)
      throw new Error(
        "Something went wrong with fetching media recommendations",
      );

    const { results: unSafeResults } = await res.json();

    console.log(unSafeResults);

    const AllMediaSchemaArray = z.array(AllMediaSchema).nullable().optional();
    const { success, data: results } =
      AllMediaSchemaArray.safeParse(unSafeResults);

    if (!success) throw new Error("Similar Media is in unsafe format");

    const extractedData = results?.map((data) => baseMediaExtractor(data));

    return extractedData;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getTVShowSeasonDetails(
  tvShowId: number,
  seasonNumber: number,
) {
  try {
    const res = await fetch(
      `${BASE_API_URL}/tv/${tvShowId}/season/${seasonNumber}`,
      {
        ...FETCH_API_OPTIONS,
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      if (res.status === 404) notFound();

      throw new Error(
        `Something went wrong with fetching tv show season details, ${res.status} : ${res.statusText}`,
      );
    }

    const unSafeSeason = await res.json();

    const { success, data: season } =
      SeasonDetailsSchema.safeParse(unSafeSeason);
    if (!success) throw new Error("recommendations is in unsafe format");

    const extractedData = tvSeasonDetailsExtractor(season);

    return extractedData;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function isTmdbIdExists(tmdbId: number, mediaType: MediaType) {
  // even we don't need credits here but it must be added to use cache
  try {
    const res = await fetch(
      `${BASE_API_URL}/${mediaType}/${tmdbId}?append_to_response=credits`,
      FETCH_API_OPTIONS,
    );

    if (!res.ok) {
      if (res.status === 404) return false;

      throw new Error("Unexpected error occurred");
    }

    return true;
  } catch (error) {
    return false;
  }
}
