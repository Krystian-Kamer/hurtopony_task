import SeriesContainer from '@/components/container/SeriesContainer';
import DiscoverForm from '@/components/form/DiscoverForm';
import SearchForm from '@/components/form/SearchForm';
import SectionTitle from '@/components/SectionTitle';
import { Suspense } from 'react';

const SeriesPage = () => {
  return (
    <div className='flex flex-col items-center'>
      <Suspense
        fallback={<div className='py-20 text-center'>Loading movies...</div>}
      >
        <SectionTitle title='Search TV series' />
        <SearchForm />
        <div className='italic my-10 text-black/50'>or search by params</div>
        <DiscoverForm />
        <SeriesContainer />
      </Suspense>
    </div>
  );
};
export default SeriesPage;
