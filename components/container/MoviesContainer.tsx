'use client';
import { useSearchParams } from 'next/navigation';
import { fetchMovies } from '@/utils/actions';
import Movie from './MovieCard';
import PageHandler from '@/components/form/PageHandler';
import { useEffect, useState, useRef } from 'react';
import { MovieType } from '@/types';
import { motion } from 'framer-motion';

const MoviesContainer = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const searchParams = useSearchParams();
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const queryString = searchParams.toString();
      const fetchedMovies = await fetchMovies(queryString);
      setMovies(fetchedMovies.movies);
      setTotalPages(fetchedMovies.totalPages);
      await new Promise((resolve) => setTimeout(resolve, 200));
      setLoading(false);
    };
    fetchData();
  }, [searchParams]);

  if (!movies.length && !loading) {
    return (
      <h2 className='text-2xl tracking-wider my-40 font-semibold '>
        There are no Movies that meet the criteria.
      </h2>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className='grid py-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'
      >
        {movies.map((movie) => {
          const { id, title, overview, poster_path: img } = movie;
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Movie
                id={id}
                title={title}
                overview={overview}
                img={img}
                loading={loading}
              />
            </motion.div>
          );
        })}
      </div>
      {!loading ? (
        <PageHandler containerRef={containerRef} totalPages={totalPages} />
      ) : null}
    </>
  );
};

export default MoviesContainer;
