import PersonsContainer from '@/components/container/PersonsContainer';
import SearchForm from '@/components/form/SearchForm';
import SectionTitle from '@/components/SectionTitle';
import { Suspense } from 'react';

const PersonsPage = async () => {
  return (
    <Suspense fallback={<SectionTitle title='Loading persons...' />}>
      <SearchForm />
      <div className='flex flex-col items-center min-h-[800px] md:min-h-[1400px]'>
        <SectionTitle title='Persons' />
        <PersonsContainer />
      </div>
    </Suspense>
  );
};
export default PersonsPage;
