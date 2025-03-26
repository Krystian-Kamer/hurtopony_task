import PersonsContainer from '@/components/container/PersonsContainer';
import SearchForm from '@/components/form/SearchForm';
import SectionTitle from '@/components/SectionTitle';
import { Suspense } from 'react';

const PersonsPage = async () => {
  return (
    <>
      <SearchForm />
      <div className='flex flex-col items-center min-h-[800px] md:min-h-[1400px]'>
        <Suspense fallback={<SectionTitle title='Loading persons...' />}>
          <SectionTitle title='Persons' />
          <PersonsContainer />
        </Suspense>
      </div>
    </>
  );
};
export default PersonsPage;
