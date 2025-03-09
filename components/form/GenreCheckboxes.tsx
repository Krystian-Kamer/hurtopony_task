import { Checkbox } from '@/components/ui/checkbox';
import { moviesGenres } from '@/genres';

const GenreCheckboxes = ({ genres }: { genres: string }) => {
  return (
    <div>
      <p className='font-bold mb-6'>Genres</p>
      <div className='grid grid-cols-2 gap-x-4 sm:gap-x-20 gap-y-5 lg:grid-cols-3 xl:grid-cols-4'>
        {moviesGenres.map((genre) => (
          <div key={genre.id} className='flex items-center space-x-2'>
            <Checkbox
              name={genre.id.toString()}
              id={genre.name}
              defaultChecked={genres.split(',').includes(genre.id.toString())}
            />
            <label
              htmlFor={genre.name}
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              {genre.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreCheckboxes;
