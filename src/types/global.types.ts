import { MediaType } from "@/features/media/services/types/index.types";

export type BaseMediaType = {
  id: number;
  title: string;
  backdropPath: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  rating: number | null | undefined;
  mediaType: MediaType;
};

export type ExtractedMovieDetails = {
  genre: string;
  runtime: number | null | undefined;
  topCast: string;
  directors: string;
} & BaseMediaType;

export type ExtractedTvShowSeason = {
  id: number;
  title: string;
  releaseDate: string | null | undefined;
  rating: number;
  episodeCount: number;
  posterPath: string | null | undefined;
  seasonNumber: number;
};

export type ExtractedTvShowDetails = {
  genre: string;
  seasons: ExtractedTvShowSeason[];
  totalEpisodes: number;
  topCast: string;
  directors: string;
} & BaseMediaType;

export type ExtractedTvShowEpisode = {
  id: number;
  episodeNumber: number;
  title: string;
  overview: string | null | undefined;
  runtime: number | null | undefined;
  backdropPath: string | null | undefined;
  rating: number;
  releaseDate: string | null | undefined;
};

export type WatchedListRecommendationType = {
  title: string;
  tmdbRating: number | null | undefined;
  userRating: number | null;
  genres: string | null;
};

export type ListType = "watchlist" | "watched";

export type FilterValueType = "all" | MediaType;
export type SortByValueType =
  | "list-order"
  | "highest-rating"
  | "user-highest-rating"
  | "release-date";

export type Status = "ready" | "loading" | "done" | "error";
