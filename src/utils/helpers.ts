import { Movie, TV } from "@/features/media/services/types/index.types";

import { Cast, Crew } from "@/features/media/services/types/credits.types";

import { BaseMediaType, ExtractedTvShowDetails, ExtractedTvShowEpisode } from "@/types/global.types";
import { MovieDetailsWithCreditsType } from "@/features/media/services/types/movies.types";
import { SeasonDetails } from "@/features/media/services/types/tv-seasons.types";
import { TvShowDetailsWithCreditsType } from "@/features/media/services/types/tv-shows.types";


export function baseMediaExtractor(media: Movie | TV): BaseMediaType {
  // to extract media data first we should know if it's movie or TVshow since they have different props names and one way that works across all api endpoints is to check if prop title exists in media obj
  const isMovie = media.hasOwnProperty("title");

  const obj: BaseMediaType = {
    id: media.id,
    title: isMovie ? (media as Movie).title : (media as TV).name,
    backdropPath: media.backdrop_path || "",
    overview: media.overview || "",
    posterPath: media.poster_path || "",
    releaseDate: (isMovie ? (media as Movie).release_date : (media as TV).first_air_date) || "",
    rating: media.vote_average,
    mediaType: isMovie ? "movie" : "tv",
  };

  return obj;
}

function getTopCast(cast: Cast[], numOfTopCast = 5) {
  if (cast.length === 0) return "";

  return cast
    .slice(0, numOfTopCast + 1)
    .map((actor) => actor.name)
    .join(", ");
}

function getDirectors(crew: Crew[]) {
  if (crew.length === 0) return "";

  return crew
    .filter((crew) => crew.known_for_department === "Directing")
    .map((director) => director.name)
    .join(", ");
}

export function movieDetailsExtractor(movie: MovieDetailsWithCreditsType) {
  return {
    ...baseMediaExtractor(movie as unknown as Movie),
    genre: movie.genres?.map((genre) => genre.name).join(", "),
    runtime: movie.runtime,
    topCast: getTopCast(movie.credits.cast),
    directors: getDirectors(movie.credits.crew),
  };
}

export function tvShowDetailsExtractor(tvShow: TvShowDetailsWithCreditsType): ExtractedTvShowDetails {
  // handle case where some tv shows return season 0 which is not needed in the app
  const filteredSeasons = tvShow.seasons?.filter(
    (season) => season.season_number !== 0,
  );

  const seasons = filteredSeasons?.map((season) => ({
    id: season.id,
    title: season.name,
    releaseDate: season.air_date,
    rating: season.vote_average,
    episodeCount: season.episode_count,
    posterPath: season.poster_path,
    seasonNumber: season.season_number,
  }));

  return {
    ...baseMediaExtractor(tvShow as unknown as TV),
    genre: tvShow.genres?.map((genre) => genre.name).join(", ") || "",
    seasons: seasons || [],
    totalEpisodes: tvShow.number_of_episodes,
    topCast: getTopCast(tvShow.credits.cast),
    directors: getDirectors(tvShow.credits.crew),
  };
}

export function tvSeasonDetailsExtractor(season: SeasonDetails) {
  const episodes: ExtractedTvShowEpisode[] = season.episodes?.map(episode => ({
    id: episode.id,
    episodeNumber: episode.episode_number,
    title: episode.name,
    overview: episode.overview,
    runtime: episode.runtime,
    backdropPath: episode.still_path,
    rating: episode.vote_average,
    releaseDate: episode.air_date,
  }));

  return {
    id: season._id,
    title: season.name,
    releaseDate: season.air_date,
    overview: season.overview,
    posterPath: season.poster_path,
    rating: season.vote_average,
    episodes,
  }
}

export function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message
	return String(error)
}
