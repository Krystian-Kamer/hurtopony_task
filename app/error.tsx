'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const error = () => {
  return (
    <div className='mx-auto mt-60 flex items-center justify-center max-w-5xl flex-col '>
      <h2 className='text-4xl'>Wystąpił błąd.</h2>
      <div className='mx-auto flex justify-center max-w-5xl my-32'>
        <Button variant='destructive' asChild>
          <Link href='/'>back to home page</Link>
        </Button>
      </div>
    </div>
  );
};
export default error;
