'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { moviesGenres, seriesGenres } from '@/genres';
import { usePathname } from 'next/navigation';

const GenreCheckboxes = () => {
  const pathname = usePathname();
  const usedGenres = pathname.includes('series') ? seriesGenres : moviesGenres;

  return (
    <div>
      <p className='font-bold mb-6'>Genres</p>
      <div className='grid grid-cols-2 md:grid-cols-1 gap-x-4 sm:gap-x-20 gap-y-5'>
        {usedGenres.map((genre) => (
          <div key={genre.id} className='flex items-center space-x-2'>
            <Checkbox
              name={genre.id.toString()}
              id={genre.name}
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
