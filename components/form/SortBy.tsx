import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SortBy = () => {
  return (
    <Select name='sort_by'>
      <SelectTrigger className='w-full sm:max-w-80 text-base'>
        <SelectValue placeholder='Sort movies by...' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value='popularity.desc'>Popularity Descending</SelectItem>
          <SelectItem value='popularity.asc'>Popularity Ascending</SelectItem>
          <SelectItem value='vote_average.desc'>Rating Descending</SelectItem>
          <SelectItem value='vote_average.asc'>Rating Ascending</SelectItem>
          <SelectItem value='primary_release_date.desc'>
            Release Date Descending
          </SelectItem>
          <SelectItem value='primary_release_date.asc'>
            Release Date Ascending
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SortBy;
