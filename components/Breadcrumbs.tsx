import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const Breadcrumbs = ({ type }: { type: 'movie' | 'serie' | 'person' }) => {
  return (
    <div className='mx-auto mt-10 px-10 lg:px-0 max-w-4xl'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href='/'>Home</Link>
          </BreadcrumbItem>

          {type === 'serie' && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href='/series'>Series</Link>
              </BreadcrumbItem>
            </>
          )}
          {type === 'person' && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href='/persons'>Persons</Link>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>{type}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
export default Breadcrumbs;
