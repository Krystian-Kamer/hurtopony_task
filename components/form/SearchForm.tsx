'use client';

import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQueryState } from 'nuqs';
import { useRef } from 'react';
const SearchForm = () => {
  const [query, setQuery] = useQueryState('query', { defaultValue: '' });
  const queryRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('query') as string;
    if (!searchParams.has('query')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setQuery(searchQuery);
    if (queryRef.current) {
      queryRef.current.value = '';
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='flex w-4/5 sm:w-full max-w-sm items-center space-x-2 bg-white'
    >
      <Input
        type='text'
        ref={queryRef}
        name='query'
        placeholder='Type here title...'
        defaultValue={query}
      />
      <Button className='cursor-pointer' type='submit'>
        Search
      </Button>
    </form>
  );
};
export default SearchForm;
