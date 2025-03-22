import PersonsContainer from '@/components/container/PersonsContainer';
import SearchForm from '@/components/form/SearchForm';
import SectionTitle from '@/components/SectionTitle';
import { Suspense } from 'react';

const PersonsPage = async () => {
  return (
    <div className='flex flex-col items-center'>
      <Suspense fallback={<SectionTitle title='Loading persons...' />}>
        <SectionTitle title='Search persons' />
        <div className='w-96 bg-white h-52 border-2 rounded-sm flex justify-center items-center'>
          <SearchForm />
        </div>
        <PersonsContainer />
      </Suspense>
    </div>
  );
};
export default PersonsPage;
