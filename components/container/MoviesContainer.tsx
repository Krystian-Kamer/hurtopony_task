'use client';
import { useSearchParams } from 'next/navigation';
import { fetchMovies } from '@/utils/actions';
import MediaCard from './MediaCard';
import PageHandler from '@/components/form/PageHandler';
import { useEffect, useState, useRef } from 'react';
import { MovieType } from '@/types';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const MoviesContainer = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    const query = params.get('query');
    const page = params.get('page');
    const queryOnlyParams = query ? new URLSearchParams({ query }) : params;
    if (query && page) {
      queryOnlyParams.set('page', page);
    }
    if (query) {
      router.replace(`?${queryOnlyParams.toString()}`, { scroll: false });
    }
    const fetchedMovies = await fetchMovies(queryOnlyParams.toString());
    setMovies(fetchedMovies.movies);
    setTotalPages(fetchedMovies.totalPages);
    setLoading(false);
  };
  fetchData();
}, [searchParams]);

  useEffect(() => {
      setIsSmallScreen(window.innerWidth < 768);
  }, []);

  
  if (!movies.length && !loading) {
    return (
      <h2 className='text-2xl tracking-wider my-40 text-center font-semibold '>
        There are no Movies that meet the criteria.
      </h2>
    );
  }

  return (
    <div className='self-center flex flex-col relative items-center'>
      <div
        ref={containerRef}
        className='grid px-4 pt-10 pb-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 md:min-h-[1000px]'
      >
        {movies.map((movie, index) => {
          const { id, title, overview, poster_path: img } = movie;
          const delay = index * 0.15;

          return (
            <motion.div
              key={id}
              initial={
                isSmallScreen
                  ? { opacity: 0, y: 150 }
                  : { opacity: 0, scale: 0 }
              }
              whileInView={isSmallScreen ? { opacity: 1, y: 0 } : undefined}
              animate={!isSmallScreen ? { opacity: 1, scale: 1 } : undefined}
              transition={
                isSmallScreen ? { duration: 0.4 } : { duration: 0.4, delay }
              }
              viewport={{ once: true }}
            >
              <MediaCard
                type='movies'
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
    </div>
  );
};

export default MoviesContainer;
