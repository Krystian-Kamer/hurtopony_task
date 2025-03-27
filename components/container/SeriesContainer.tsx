'use client';
import { useSearchParams } from 'next/navigation';
import { fetchSeries } from '@/utils/actions';
import MediaCard from './MediaCard';
import PageHandler from '@/components/form/PageHandler';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SerieType } from '@/types';

const SeriesContainer = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [series, setSeries] = useState<SerieType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const searchParams = useSearchParams();
  const containerRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const queryString = searchParams.toString();
      const fetchedSeries = await fetchSeries(queryString);
      setSeries(fetchedSeries.series);
      setTotalPages(fetchedSeries.totalPages);
      await new Promise((resolve) => setTimeout(resolve, 200));
      setLoading(false);
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!series.length && !loading) {
    return (
      <h2 className='text-2xl tracking-wider my-40 text-center font-semibold '>
        There are no TV series that meet the criteria.
      </h2>
    );
  }

  return (
    <div className='self-center flex flex-col items-center'>
      <div
        ref={containerRef}
        className='grid pt-10 pb-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:min-h-[1000px] gap-10'
      >
        {series.map((serie, index) => {
          const { id, name: title, overview, poster_path: img } = serie;
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
                type='series'
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

export default SeriesContainer;
