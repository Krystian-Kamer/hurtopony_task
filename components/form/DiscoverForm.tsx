'use client';
import { useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import GenreCheckboxes from './GenreCheckboxes';
import SortBy from './SortBy';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { useRef, useState } from 'react';

interface DiscoverFormProps {
  closeAccordion?: () => void;
}

const DiscoverForm = ({ closeAccordion }: DiscoverFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [, setIncludeAdult] = useQueryState('include_adult', {
    defaultValue: '',
  });
  const [, setGenres] = useQueryState('with_genres', {
    defaultValue: '',
  });
  const [, setSortBy] = useQueryState('sort_by', { defaultValue: '' });
  const [sortOption, setSortOption] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const sortOption = formData.get('sort_by') as string | null;
    const includeAdult =
      formData.get('include_adult') === 'on' ? 'true' : 'false';

    const genres = Object.keys(data)
      .filter((genre) => !isNaN(Number(genre)))
      .join(',');
    if (!searchParams.has('include_adult')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setSortBy(sortOption ?? '');
    setSortOption(sortOption ?? '');
    setGenres(genres ?? '');
    setIncludeAdult(includeAdult);
    console.log(closeAccordion);
    if (closeAccordion) {
      closeAccordion();
    }
  };

  const resetFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    formRef.current?.reset();
    setSortOption('');
  };

  return (
    <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
      <div className='justify-center gap-y-5 gap-x-4 flex-col'>
        <SortBy option={sortOption} setSortOption={setSortOption} />
        <div className='flex items-center space-x-2 mb-4'>
          <Checkbox name='include_adult' id='adult' />
          <label
            htmlFor='adult'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Include adult
          </label>
        </div>
      </div>
      <GenreCheckboxes />
      <Button
        variant='destructive'
        type='submit'
        className='w-full mt-3 md:mt-10 sm:mt-3 cursor-pointer'
      >
        Submit
      </Button>
      <Button
        variant='outline'
        className='w-full mt-2 md:mt-4 cursor-pointer'
        onClick={(e) => resetFilters(e)}
      >
        Reset Filters
      </Button>
    </form>
  );
};
export default DiscoverForm;
