import SectionTitle from '@/components/SectionTitle';
import { Suspense } from 'react';

const FavoritesPage = () => {
  return (
    <div className='flex flex-col items-center'>
      <Suspense fallback={<SectionTitle title='Loading favorites...' />}>
        <SectionTitle title='Your Favorites' />
        <div className='text-2xl'>This page is in progress...</div>
      </Suspense>
    </div>
  );
};
export default FavoritesPage;
