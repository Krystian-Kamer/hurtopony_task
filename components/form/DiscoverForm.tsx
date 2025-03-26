'use client';
import { useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import GenreCheckboxes from './GenreCheckboxes';
import SortBy from './SortBy';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { useRef } from 'react';

const DiscoverForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [includeAdult, setIncludeAdult] = useQueryState('include_adult', {
    defaultValue: '',
  });
  const [genres, setGenres] = useQueryState('with_genres', {
    defaultValue: '',
  });
  const [sortBy, setSortBy] = useQueryState('sort_by', { defaultValue: '' });
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
    setGenres(genres ?? '');
    setIncludeAdult(includeAdult);
  };

  const resetFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    formRef.current?.reset();
    const selectElement = formRef.current?.querySelector(
      "select[name='sort_by']"
    );
    if (selectElement) {
      (selectElement as HTMLSelectElement).value = '';
      const event = new Event('change', { bubbles: true });
      selectElement.dispatchEvent(event);
    }
      const genreCheckboxes = formRef.current?.querySelectorAll(
        "input[name='genres']"
      );
      genreCheckboxes?.forEach((checkbox) => {
        (checkbox as HTMLInputElement).checked = false;
        const event = new Event('change', { bubbles: true });
        checkbox.dispatchEvent(event);
      });
  };

  return (
    <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
      <div className='justify-center gap-y-5 gap-x-4 flex-col'>
        <SortBy defaultValue={sortBy} />
        <div className='flex items-center space-x-2 mb-4'>
          <Checkbox
            defaultChecked={includeAdult === 'true' ? true : false}
            name='include_adult'
            id='adult'
          />
          <label
            htmlFor='adult'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Include adult
          </label>
        </div>
      </div>
      <GenreCheckboxes genres={genres} />
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
