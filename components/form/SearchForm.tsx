'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQueryState } from 'nuqs';
const SearchForm = () => {
  const [query, setQuery] = useQueryState('query', { defaultValue: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('query') as string;
    window.history.replaceState(null, '', window.location.pathname);
    setQuery(searchQuery);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='flex w-full max-w-sm items-center space-x-2 bg-white'
    >
      <Input
        type='text'
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
