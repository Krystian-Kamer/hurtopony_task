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
    <Pagination className='mb-40 w-full '>
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

        <PaginationItem>
          <Button
            variant='outline'
            onClick={() => {
              setPage(1);
              scrollToTop();
            }}
            className={`${
              page === 1
                ? 'bg-slate-200 drop-shadow-md hover:bg-slate-300'
                : 'bg-slate-50 drop-shadow-md hover:bg-slate-100'
            } border-none sm:mx-2 px-2`}
          >
            1
          </Button>
        </PaginationItem>

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {Array.from({ length: 3 }, (_, i) => page - 1 + i).map((pageNumber) => {
          if (pageNumber > 1 && pageNumber < maxPages) {
            return (
              <PaginationItem key={pageNumber}>
                <Button
                  variant='outline'
                  onClick={() => {
                    setPage(pageNumber);
                    scrollToTop();
                  }}
                  className={`${
                    pageNumber === page
                      ? 'bg-slate-200 drop-shadow-md hover:bg-slate-300'
                      : 'bg-slate-50 drop-shadow-md hover:bg-slate-100'
                  } border-none sm:mx-2 px-2`}
                >
                  {pageNumber}
                </Button>
              </PaginationItem>
            );
          }
          return null;
        })}

        {page < maxPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {maxPages > 1 && (
          <PaginationItem>
            <Button
              variant='outline'
              onClick={() => {
                setPage(maxPages);
                scrollToTop();
              }}
              className={`${
                page === maxPages
                  ? 'bg-slate-200 drop-shadow-md hover:bg-slate-300'
                  : 'bg-slate-50 drop-shadow-md hover:bg-slate-100'
              } border-none sm:mx-2 px-2`}
            >
              {maxPages}
            </Button>
          </PaginationItem>
        )}

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
