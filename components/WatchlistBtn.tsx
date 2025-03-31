'use client';
import { Button } from './ui/button';
import { MdOutlineBookmarkAdd, MdOutlineBookmark } from 'react-icons/md';
import { updateList, fetchList } from '@/utils/actions';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

interface WatchlistBtnProps {
  type: 'movie' | 'tv';
  id: string;
  title: string;
}

const WatchlistBtn = ({ type, id, title }: WatchlistBtnProps) => {
  const [isMediaInWatch, setIsMediaInWatch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (type === 'movie') {
          const { media } = await fetchList('watchlist', 'movies');
          setIsMediaInWatch(media.some((item) => item.id === Number(id)));
        }
        if (type === 'tv') {
          const { media } = await fetchList('watchlist', 'tv');
          setIsMediaInWatch(media.some((item) => item.id === Number(id)));
        }
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, type]);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await updateList(id, type, 'watchlist', !isMediaInWatch);
      toast.success(title, {
        description: isMediaInWatch
          ? 'Has been removed from watchlist'
          : 'Has been added to watchlist',
      });
      setIsMediaInWatch(!isMediaInWatch);
    } catch (error) {
      console.error('Failed to update watchlist:', error);
      toast.error('Failed to update watchlist');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button className='w-[165px]' disabled={isLoading} onClick={handleClick}>
      {isLoading ? (
        <p>Loading...</p>
      ) : isMediaInWatch ? (
        <>
          <span className='tracking-tighter'>Remove from watchlist</span>
          <MdOutlineBookmark />
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
