'use client';
import {
  MovieType,
  SerieType,
  PersonType,
  FetchMoviesResponse,
  FetchSeriesResponse,
  FetchPersonsResponse,
  FetchListResponse,
} from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const SESSION_ID = process.env.NEXT_PUBLIC_SESSION_ID;

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

export const fetchSeries = async (
  stringParams: string
): Promise<FetchSeriesResponse> => {
  let url;
  if (stringParams.includes('query')) {
    url = `https://api.themoviedb.org/3/search/tv?${stringParams}&api_key=${API_KEY}`;
  } else {
    url = `https://api.themoviedb.org/3/discover/tv?${stringParams}&api_key=${API_KEY}`;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    const { results, total_pages } = data;
    const series: SerieType[] = results;
    const totalPages: number = total_pages;
    return {
      series,
      totalPages,
    };
  } catch (error) {
    console.log(error);
    return {
      series: [] as SerieType[],
      totalPages: 0,
    };
  }
};

export const fetchPersons = async (
  stringParams: string
): Promise<FetchPersonsResponse> => {
  let url;
  if (stringParams.includes('query')) {
    url = `https://api.themoviedb.org/3/search/person?${stringParams}&api_key=${API_KEY}`;
  } else {
    url = `https://api.themoviedb.org/3/person/popular?${stringParams}&api_key=${API_KEY}`;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    const { results, total_pages } = data;
    const persons: PersonType[] = results;
    const totalPages: number = total_pages;

    return {
      persons,
      totalPages,
    };
  } catch (error) {
    console.log(error);
    return {
      persons: [] as PersonType[],
      totalPages: 0,
    };
  }
};

export const addToList = async (
  id: string,
  mediaType: string,
  listType: string
) => {
  const url = `https://api.themoviedb.org/3/account/21856675/${listType}?api_key=${API_KEY}&session_id=${SESSION_ID}`;

  const body = {
    media_id: id,
    media_type: mediaType,
    [listType]: true,
  };
  console.log(body);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log('Error adding to favorites:', errorData);
      throw new Error('Failed to add to favorite list');
    }
  } catch (error) {
    console.log('Failed to add to favorite list:', error);
  }
};

export const fetchList = async (
  listType: string,
  mediaType: string
): Promise<FetchListResponse> => {
  const url = `https://api.themoviedb.org/3/account/21856675/${listType}/${mediaType}?api_key=${API_KEY}&session_id=${SESSION_ID}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const { results, total_pages } = data;
    const media: MovieType[] | SerieType[] = results;
    const totalPages: number = total_pages;
    return {
      media,
      totalPages,
    };
  } catch (error) {
    console.log(error);
    return {
      media: [] as MovieType[] | SerieType[],
      totalPages: 0,
    };
  }
};
