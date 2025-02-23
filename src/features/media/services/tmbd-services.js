import { notFound } from "next/navigation";

import {
  BASE_API_URL,
  VALID_MEDIA_TYPES,
  FETCH_API_OPTIONS,
} from "@/utils/constants";

import {
  baseMediaExtractor,
  movieDetailsExtractor,
  tvSeasonDetailsExtractor,
  tvShowDetailsExtractor,
} from "@/utils/helpers";

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

    const [trendingMedia, genresMovies, genresTVShows] =
      await Promise.all(jsonPromises);

    // faster look up than iterating over them to find genreIds of each media
    const genreMap = new Map();
    [...genresMovies.genres, ...genresTVShows.genres].forEach((genre) => {
      genreMap.set(genre.id, genre.name);
    });

    const trendingMediaPayload = trendingMedia.results.map((media) => {
      const obj = baseMediaExtractor(media);

      const genre = media.genre_ids
        .map((genreId) => genreMap.get(genreId))
        .filter((genre) => genre) // remove undefined values
        .join(", ");

      obj.genre = genre;

      return obj;
    });

    return trendingMediaPayload;
  } catch (err) {
    throw Error(err.message);
  }
}

export async function getMedia(mediaType, category, page = 1, options = {}) {
  // check for media type and category
  if (!VALID_MEDIA_TYPES[mediaType]) {
    throw new Error(
      `invalid media type: ${mediaType}. Must be 'movie' or 'tv'`,
    );
  }

  if (!VALID_MEDIA_TYPES[mediaType]?.[category]) {
    throw new Error(`invalid category: ${category} for ${mediaType}.`);
  }

  if (isNaN(Number(page)))
    throw new Error("page number can only accept numbers");

  const { tmdbEndpoint } = VALID_MEDIA_TYPES[mediaType][category];

  const url = `${BASE_API_URL}/${mediaType}/${tmdbEndpoint}?page=${page}`;

  // merge default options with any custom options
  // caching only first page since most users will see the first page, fewer will go to the second pages
  const fetchOptions = {
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

    const { results, total_pages } = await res.json();

    const extractedData = results.map((data) => baseMediaExtractor(data));

    // adjust totalPages to max allowed page number if the total_pages exceeds the max limit
    return {
      data: extractedData,
      totalPages: Math.min(total_pages, MAX_ALLOWED_PAGE),
    };
  } catch (err) {
    const errorMessage = `Error fetching ${category} ${mediaType}s: ${err.message}`;
    throw new Error(errorMessage);
  }
}

export async function getSearchResults(query, abortController) {
  try {
    const res = await fetch(`${BASE_API_URL}/search/multi?query=${query}`, {
      ...FETCH_API_OPTIONS,
      signal: abortController?.signal,
    });
    if (!res.ok)
      throw new Error("Something went wrong with fetching Search results");

    const { results } = await res.json();

    // since tmbd api does not have an endpoint for searching only for movies and tv shows i have to use multi endpoint which include movies and tv shows and people
    // filter results to only include movies and tv shows

    const filteredResults = results.filter(
      (result) => result.media_type !== "person",
    );

    const extractedData = filteredResults.map((data) =>
      baseMediaExtractor(data),
    );

    return extractedData;
  } catch (err) {
    throw err;
  }
}

export async function getMovieDetails(movieId) {
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

    const movie = await res.json();

    const extractedData = movieDetailsExtractor(movie);

    return extractedData;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getTVShowDetails(tvShowId) {
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

    const tvShow = await res.json();

    const extractedData = tvShowDetailsExtractor(tvShow);

    return extractedData;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getSimilarMedia(mediaType, mediaId) {
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

    const { results } = await res.json();

    const extractedData = results.map((data) => baseMediaExtractor(data));

    return extractedData;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getTVShowSeasonDetails(tvShowId, seasonNumber) {
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

    const season = await res.json();

    const extractedData = tvSeasonDetailsExtractor(season);

    return extractedData;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function isTmdbIdExists(tmdbId, mediaType) {
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
