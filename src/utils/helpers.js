export function baseMediaExtractor(media) {
  // to extract media data first we should know if it's movie or TVshow since they have different props names and one way that works across all api endpoints is to check if prop title exists in media obj
  const isMovie = media.hasOwnProperty("title");

  const obj = {
    id: media.id,
    title: isMovie ? media.title : media.name,
    backdropPath: media.backdrop_path,
    overview: media.overview,
    posterPath: media.poster_path,
    releaseDate: isMovie ? media.release_date : media.first_air_date,
    rating: media.vote_average,
    mediaType: isMovie ? "movie" : "tv",
  };

  return obj;
}

function getTopCast(cast, numOfTopCast = 5) {
  if (cast.length === 0) return "";

  return cast
    .slice(0, numOfTopCast + 1)
    .map((actor) => actor.name)
    .join(", ");
}

function getDirectors(crew) {
  if (crew.length === 0) return "";

  return crew
    .filter((crew) => crew.known_for_department === "Directing")
    .map((director) => director.name)
    .join(", ");
}

export function movieDetailsExtractor(movie) {
  return {
    ...baseMediaExtractor(movie),
    genre: movie.genres?.map((genre) => genre.name).join(", "),
    runtime: movie.runtime,
    topCast: getTopCast(movie.credits.cast),
    directors: getDirectors(movie.credits.crew),
  };
}

export function tvShowDetailsExtractor(tvShow) {
  // handle case where some tv shows return season 0 which is not needed in the app
  const filteredSeasons = tvShow.seasons.filter(
    (season) => season.season_number !== 0,
  );

  const seasons = filteredSeasons.map((season) => ({
    id: season.id,
    title: season.name,
    releaseDate: season.air_date,
    rating: season.vote_average,
    episodeCount: season.episode_count,
    posterPath: season.poster_path,
    seasonNumber: season.season_number,
  }));

  return {
    ...baseMediaExtractor(tvShow),
    genre: tvShow.genres?.map((genre) => genre.name).join(", "),
    seasons,
    totalEpisodes: tvShow.number_of_episodes,
    topCast: getTopCast(tvShow.credits.cast),
    directors: getDirectors(tvShow.credits.crew),
  };
}

export function tvSeasonDetailsExtractor(season) {
  const episodes = season.episodes?.map(episode => ({
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
