import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Breadcrumbs />
      {children}
      <div className='flex mx-20 md:mx-0 md:justify-center mt-20 mb-40'>
        <Button variant='destructive' asChild>
          <Link href='/'>back to home page</Link>
        </Button>
      </div>
    </>
  );
};
export default layout;
