'use client';
import SectionTitle from '@/components/SectionTitle';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MovieType, SerieType } from '@/types';
import { fetchList } from '@/utils/actions';
import MediaCard from '@/components/container/MediaCard';

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
      await new Promise((resolve) => setTimeout(resolve, 200));
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <Suspense fallback={<SectionTitle title='Loading watchlist...' />}>
        <SectionTitle title='Your Watchlist' />
        <h4 className='text-3xl font-bold'>Movies</h4>
        <div className='self-center flex flex-col relative items-center'>
          <div className='grid pt-10 pb-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10'>
            {movies.map((movie) => {
              const { id, title, overview, poster_path: img } = movie;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
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
        </div>
        <h4 className='text-3xl font-bold'>Series</h4>
        <div className='self-center flex flex-col relative items-center'>
          <div className='grid pt-10 pb-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10'>
            {series.map((serie) => {
              const { id, name: title, overview, poster_path: img } = serie;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
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
        </div>
      </Suspense>
    </div>
  );
};
export default WatchlistPage;
