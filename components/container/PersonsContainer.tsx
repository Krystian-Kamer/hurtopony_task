'use client';
import { useSearchParams } from 'next/navigation';
import { fetchPersons } from '@/utils/actions';
import PersonCard from './PersonCard';
import PageHandler from '@/components/form/PageHandler';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PersonType } from '@/types';

const PersonsContainer = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [persons, setPersons] = useState<PersonType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const searchParams = useSearchParams();
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const queryString = searchParams.toString();
      const fetchedPersons = await fetchPersons(queryString);
      setPersons(fetchedPersons.persons);
      setTotalPages(fetchedPersons.totalPages);
      await new Promise((resolve) => setTimeout(resolve, 200));
      setLoading(false);
    };
    fetchData();
  }, [searchParams]);
  if (!persons.length && !loading) {
    return (
      <h2 className='text-2xl tracking-wider my-40 font-semibold '>
        There is no Person that meet the criteria.
      </h2>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className='grid py-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'
      >
        {persons.map((person) => {
          const {
            id,
            known_for_department: profession,
            name,
            profile_path: img,
            known_for: knownFor,
          } = person;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <PersonCard
                id={id}
                name={name}
                profession={profession}
                img={img}
                knownFor={knownFor}
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

export default PersonsContainer;
