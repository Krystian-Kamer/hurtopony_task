import SectionTitle from '@/components/SectionTitle';
import { Suspense } from 'react';

const WatchlistPage = () => {
  return (
    <div className='flex flex-col items-center'>
      <Suspense fallback={<SectionTitle title='Loading watchlist...' />}>
        <SectionTitle title='Your Watchlist' />
        <div className='text-2xl'>This page is in progress...</div>
      </Suspense>
    </div>
  );
};

export default WatchlistPage;