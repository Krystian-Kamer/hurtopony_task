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

  if (!series.length && !loading) {
    return (
      <h2 className='text-2xl tracking-wider my-40 font-semibold '>
        There are no TV series that meet the criteria.
      </h2>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className='grid py-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'
      >
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
    </>
  );
};

export default SeriesContainer;
