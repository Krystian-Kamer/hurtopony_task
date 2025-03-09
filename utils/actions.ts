'use client';
import { MovieType, FetchMoviesResponse } from '@/types';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchMovies = async (
  stringParams: string
): Promise<FetchMoviesResponse> => {
  let url;
  if (stringParams.includes('query')) {
    url = `https://api.themoviedb.org/3/search/movie?${stringParams}&api_key=${API_KEY}`;
  } else {
    url = `https://api.themoviedb.org/3/discover/movie?${stringParams}&api_key=${API_KEY}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    const { results, total_pages } = data;
    const movies: MovieType[] = results;
    const totalPages: number = total_pages;

    return {
      movies,
      totalPages,
    };
  } catch (error) {
    console.log(error);
    return {
      movies: [] as MovieType[],
      totalPages: 0,
    };
  }
};
