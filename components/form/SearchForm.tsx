'use client';

import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQueryState } from 'nuqs';
import { useRef } from 'react';
import { Label } from '@radix-ui/react-label';
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
      className='flex gap-y-2 justify-self-center items-center flex-col bg-white w-full'
    >
      <div className='w-full'>
        <Label htmlFor='query' className='font-semibold'>
          Title
        </Label>
        <Input
          type='text'
          id='query'
          ref={queryRef}
          name='query'
          placeholder='Type here title...'
          defaultValue={query}
        />
      </div>
      <Button className='cursor-pointer w-full' type='submit'>
        Search
      </Button>
    </form>
  );
};
export default SearchForm;
