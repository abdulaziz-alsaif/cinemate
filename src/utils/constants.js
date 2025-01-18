export const BASE_IMG_URL = "https://image.tmdb.org/t/p";
export const BASE_API_URL = "https://api.themoviedb.org/3";

export const FETCH_API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
  },
};

// valid media types and their categories for type safety and easy maintenance
export const VALID_MEDIA_TYPES = {
  movie: {
    popular: {
      label: 'Popular Movies',
      tmdbType: 'movie',
      tmdbEndpoint: 'popular'
    },
    'top-rated': {  
      label: 'Top Rated Movies',
      tmdbType: 'movie',
      tmdbEndpoint: 'top_rated'
    }
  },
  tv: {
    popular: {
      label: 'Popular TV Shows',
      tmdbType: 'tv',
      tmdbEndpoint: 'popular'
    },
    'top-rated': {
      label: 'Top Rated TV Shows',
      tmdbType: 'tv',
      tmdbEndpoint: 'top_rated'
    }
  }
};
