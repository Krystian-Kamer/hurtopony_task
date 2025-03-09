import MoviesContainer from '@/components/container/MoviesContainer';
import DiscoverForm from '@/components/form/DiscoverForm';
import SearchForm from '@/components/form/SearchForm';
import SectionTitle from '@/components/SectionTitle';
import { Suspense } from 'react';

const HomePage = async () => {
  return (
    <div className='flex flex-col items-center'>
      <Suspense
        fallback={<div className='py-20 text-center'>Loading movies...</div>}
      >
        <SectionTitle title='Search movies' />
        <SearchForm />
        <div className='italic my-10 text-black/50'>or search by params</div>
        <DiscoverForm />
        <MoviesContainer />
      </Suspense>
    </div>
  );
};
export default HomePage;
