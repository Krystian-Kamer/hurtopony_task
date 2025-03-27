'use client';

import { Input } from '@/components/ui/input';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

const SearchForm = () => {
  const [query, setQuery] = useQueryState('query', { defaultValue: '' });
  const [tempQuery, setTempQuery] = useState(query);
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  useEffect(() => {
    const handler = setTimeout(() => {
      if (tempQuery === '') {
        setQuery('');
      } else {
        setQuery(tempQuery);
      }
      setPage(1);
    }, 700);

    return () => clearTimeout(handler);
  }, [tempQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempQuery(e.target.value);
  };

  return (
    <div className='w-full'>
      <Input
        type='text'
        name='query'
        className='bg-white rounded-none py-6 md:py-8 text-lg md:text-2xl px-8 md:px-0 tracking-wider md:text-center text-black/70'
        placeholder='Search by name...'
        value={
          tempQuery.length
            ? tempQuery[0].toUpperCase() + tempQuery.slice(1)
            : ''
        }
        onChange={handleChange}
        autoComplete='off'
      />
    </div>
  );
};

export default SearchForm;
