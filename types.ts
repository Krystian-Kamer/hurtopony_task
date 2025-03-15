export interface Genre {
  id: number;
  name: string;
}

export interface MovieType {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface SerieType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface KnownForType {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
  first_air_date: string;
}

export interface PersonType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: KnownForType[];
}

export interface FetchMoviesResponse {
  movies: MovieType[];
  totalPages: number;
}

export interface FetchSeriesResponse {
  series: SerieType[];
  totalPages: number;
}

export interface FetchPersonsResponse {
  persons: PersonType[];
  totalPages: number;
}
