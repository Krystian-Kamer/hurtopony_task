'use client';
import SectionTitle from '@/components/SectionTitle';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MovieType, SerieType } from '@/types';
import { fetchList } from '@/utils/actions';
import MediaCard from '@/components/container/MediaCard';
import { Skeleton } from '@/components/ui/skeleton';

const WatchlistPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [series, setSeries] = useState<SerieType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedMovies = await fetchList('watchlist', 'movies');
      const fetchedSeries = await fetchList('watchlist', 'tv');
      setMovies(fetchedMovies.media as MovieType[]);
      setSeries(fetchedSeries.media as SerieType[]);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='flex flex-col items-center min-h-[800px] md:min-h-[1200px]'>
        <SectionTitle title='Your Watchlist' />
        <div className='grid pt-10 pb-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10'>
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className='h-[330px] w-[220px] rounded-md' />
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0 && series.length === 0) {
    return (
      <div className='flex flex-col items-center min-h-[800px] md:min-h-[1200px]'>
        <h4 className='mt-20 text-3xl font-bold tracking-wider'>
          Your list is empty.
        </h4>
      </div>
    );
  }

  return (
      <Suspense fallback={<SectionTitle title='Loading watchlist...' />}>
    <div className='flex flex-col items-center min-h-[800px] md:min-h-[1400px]'>
        <SectionTitle title='Your Watchlist' />
        <h4 className='text-3xl font-bold'>Movies</h4>
        <div className='self-center flex flex-col relative items-center'>
          <div className='grid pt-10 pb-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10'>
            {movies.map((movie, index) => {
              const { id, title, overview, poster_path: img } = movie;
              const delay = index * 0.15;

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay }}
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
        </div>
        <h4 className='text-3xl font-bold'>Series</h4>
        <div className='self-center flex flex-col relative items-center'>
          <div className='grid pt-10 pb-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10'>
            {series.map((serie, index) => {
              const { id, name: title, overview, poster_path: img } = serie;
              const delay = index * 0.15;

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay }}
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
        </div>
    </div>
      </Suspense>
  );
};
export default WatchlistPage;
