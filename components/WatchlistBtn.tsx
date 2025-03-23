'use client';
import { Button } from './ui/button';
import { MdOutlineBookmarkAdd, MdOutlineBookmark } from 'react-icons/md';
import { addToList, fetchList } from '@/utils/actions';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

interface WatchlistBtnProps {
  type: 'movie' | 'tv';
  id: string;
  title: string;
}

const WatchlistBtn = ({ type, id, title }: WatchlistBtnProps) => {
  const [isMediaInWatch, setIsMediaInWatch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (type === 'movie') {
        const { media } = await fetchList('watchlist', 'movies');
        setIsMediaInWatch(media.some((item) => item.id === Number(id)));
      }
      if (type === 'tv') {
        const { media } = await fetchList('watchlist', 'tv');
        setIsMediaInWatch(media.some((item) => item.id === Number(id)));
      }
    };
    fetchData();
    setIsLoading(false);
  }, [id, type]);

  const handleClick = async () => {
    await addToList(id, type, 'favorite');
    toast.success(title, {
      description: 'Has been added to watchlist',
    });
    setIsMediaInWatch(true);
  };

  return (
    <Button className='w-[165px]' disabled={isLoading} onClick={handleClick}>
      {isMediaInWatch ? (
        <>
          <span className='tracking-tighter'>Remove from watchlist</span>
          <MdOutlineBookmark className='size-5.5' />
        </>
      ) : (
        <>
          Add to watchlist
          <MdOutlineBookmarkAdd className='size-5.5' />
        </>
      )}
    </Button>
  );
};
export default WatchlistBtn;
