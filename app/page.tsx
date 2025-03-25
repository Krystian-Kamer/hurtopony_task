import MoviesContainer from '@/components/container/MoviesContainer';
import DiscoverForm from '@/components/form/DiscoverForm';
import MobileDialog from '@/components/form/MobileDialog';
import SearchForm from '@/components/form/SearchForm';
import SectionTitle from '@/components/SectionTitle';
import { Suspense } from 'react';

const HomePage = async () => {
  return (
    <div className='flex max-w-[1600px] mx-auto flex-col md:flex-row  items-center relative'>
      <Suspense
        fallback={
          <div className='self-center'>
            <SectionTitle title='Loading movies...' />
          </div>
        }
      >
        <MobileDialog />
        <div className='hidden md:block border-2 mt-10 md:ml-5 md:mt-12 px-2 md:w-[290px] lg:px-4 md:mb-20 bg-white md:self-start pb-10 rounded-sm'>
          <p className='text-3xl md:text-3xl lg:text-4xl text-center mt-12 font-bold tracking-widest'>
            Filters
          </p>
          <div className='hidden md:block'>
            <SearchForm />
            <p>or</p>
            <DiscoverForm />
          </div>
        </div>

        <div className='flex mt-20 md:mt-10 w-full flex-col self-start'>
          <SectionTitle title='Movies' />
          <MoviesContainer />
        </div>
      </Suspense>
    </div>
  );
};
export default HomePage;
