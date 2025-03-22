import SeriesContainer from '@/components/container/SeriesContainer';
import DiscoverForm from '@/components/form/DiscoverForm';
import MobileDialog from '@/components/form/MobileDialog';
import SearchForm from '@/components/form/SearchForm';
import SectionTitle from '@/components/SectionTitle';
import { Suspense } from 'react';

const SeriesPage = () => {
  return (
    <div className='flex max-w-[1600px] mx-auto flex-col md:flex-row  items-center'>
      <Suspense
        fallback={
          <div className='self-center'>
            <SectionTitle title='Loading series...' />
          </div>
        }
      >
        <div className='border-2 mt-10 w-4/5 md:ml-5 md:mt-12 px-2 md:w-[250px] lg:px-3 top-20 md:mb-20 bg-white md:self-start pb-10 rounded-sm'>
          <p className='text-3xl md:text-3xl lg:text-4xl text-center py-12 font-bold tracking-widest'>
            Filter
          </p>
          <SearchForm />
          <div className='flex flex-col w-4/5 justify-self-center mb-12'>
            <p className='text-center mt-8 mb-4 md:mb-0 text-black/60 italic'>
              or search by
            </p>
            <MobileDialog />
          </div>
          <div className='hidden md:block'>
            <DiscoverForm />
          </div>
        </div>
        <div className='flex mt-10 w-full flex-col self-start'>
          <SectionTitle title='Series' />
          <SeriesContainer />
        </div>
      </Suspense>
    </div>
  );
};
export default SeriesPage;
