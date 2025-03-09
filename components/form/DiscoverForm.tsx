'use client';
import { useQueryState } from 'nuqs';
import GenreCheckboxes from './GenreCheckboxes';
import SortBy from './SortBy';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';

const DiscoverForm = () => {
  const currentYear = new Date().getFullYear();
  const [includeAdult, setIncludeAdult] = useQueryState('include_adult', {
    defaultValue: '',
  });
  const [genres, setGenres] = useQueryState('with_genres', {
    defaultValue: '',
  });
  const [sortBy, setSortBy] = useQueryState('sort_by', { defaultValue: '' });
  const [year, setYear] = useQueryState('year', { defaultValue: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const sortOption = formData.get('sort_by') as string | null;
    const includeAdult =
      formData.get('include_adult') === 'on' ? 'true' : 'false';
    const year = formData.get('year') as string | null;
    const genres = Object.keys(data)
      .filter((genre) => !isNaN(Number(genre)))
      .join(',');

    window.history.replaceState(null, '', window.location.pathname);
    setSortBy(sortOption ?? '');
    setGenres(genres ?? '');
    setYear(year ?? '');
    setIncludeAdult(includeAdult);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='flex flex-col w-4/5 sm:w-4/5 md:w-2/3 max-w-4xl gap-y-5 py-10 px-4 sm:px-16 bg-white border border-black/20 rounded-md'
    >
      <div className='flex justify-center gap-y-5 gap-x-4 flex-col sm:flex-row'>
        <SortBy defaultValue={sortBy} />
        <Input
          type='number'
          name='year'
          min={1800}
          defaultValue={year}
          max={currentYear + 5}
          placeholder='Year'
          className='w-full sm:max-w-24 md:max-w-28 text-base'
        />
        <div className='flex items-center space-x-2'>
          <Checkbox
            defaultValue={includeAdult}
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

      <GenreCheckboxes genres={genres}/>
      <Button
        variant='destructive'
        type='submit'
        className='self-center sm:mt-3 md:self-auto w-4/5 max-w-52 cursor-pointer'
      >
        Submit
      </Button>
    </form>
  );
};
export default DiscoverForm;
