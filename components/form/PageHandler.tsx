'use client';
import { parseAsInteger, useQueryState } from 'nuqs';
import { RefObject } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';
import { Button } from '../ui/button';

interface PageHandlerProps {
  totalPages: number;
  containerRef: RefObject<HTMLDivElement | null>;
}

const PageHandler = ({ totalPages, containerRef }: PageHandlerProps) => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const maxPages = Math.min(totalPages, 500);

  const scrollToTop = () => {
    containerRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'start',
    });
  };


  return (
    <Pagination className='mb-40'>
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={() => {
              setPage(page - 1);
              scrollToTop();
            }}
            className={
              page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
            }
          >
            Prev
          </Button>
        </PaginationItem>

        {[...Array(maxPages)].map((_, i) => {
          const pageNumber = i + 1;

          if (
            maxPages > 5 &&
            ((pageNumber > 2 && pageNumber < page - 1) ||
              (pageNumber > page + 1 && pageNumber < maxPages - 1))
          ) {
            if (pageNumber === 3 && page > 4) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            } else if (pageNumber === maxPages - 2 && page < maxPages - 3) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          }

          return (
            <PaginationItem key={pageNumber}>
              <Button
                variant='outline'
                onClick={() => {
                  setPage(pageNumber);
                  scrollToTop();
                }}
                className={`${
                  pageNumber === page ? 'bg-green-300 hover:bg-green-400' : 'bg-green-100 hover:bg-green-200'
                } border-none sm:mx-2 px-1 sm:px-2 `}
              >
                {pageNumber}
              </Button>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <Button
            onClick={() => {
              setPage(page + 1);
              scrollToTop();
            }}
            className={
              page >= maxPages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PageHandler;
