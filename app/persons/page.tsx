import PersonsContainer from '@/components/container/PersonsContainer';
import SearchForm from '@/components/form/SearchForm';
import SectionTitle from '@/components/SectionTitle';
import { Suspense } from 'react';

const PersonsPage = async () => {
  return (
    <div className='flex flex-col items-center'>
      <Suspense fallback={<SectionTitle title='Loading persons...' />}>
        <SectionTitle title='Search persons' />
        <SearchForm />
        <PersonsContainer />
      </Suspense>
    </div>
  );
};
export default PersonsPage;
