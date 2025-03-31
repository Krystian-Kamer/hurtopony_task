'use client';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { Button } from './ui/button';
import { updateList, fetchList } from '@/utils/actions';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

interface FavouriteBtnProps {
  type: 'movie' | 'tv';
  id: string;
  title: string;
}

const FavouriteBtn = ({ type, id, title }: FavouriteBtnProps) => {
  const [isMediaInFav, setIsMediaInFav] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (type === 'movie') {
          const { media } = await fetchList('favorite', 'movies');
          setIsMediaInFav(media.some((item) => item.id === Number(id)));
        }
        if (type === 'tv') {
          const { media } = await fetchList('favorite', 'tv');
          setIsMediaInFav(media.some((item) => item.id === Number(id)));
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData();
  }, [id, type]);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await updateList(id, type, 'favorite', !isMediaInFav);
      toast.success(title, {
        description: isMediaInFav
          ? 'Has been removed from favorites'
          : 'Has been added to favorites',
      });
      setIsMediaInFav(!isMediaInFav); 
    } catch (error) {
      console.error('Failed to update favorites:', error);
      toast.error('Failed to update favorites');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button className='w-[165px]' disabled={isLoading} onClick={handleClick}>
      {isLoading ? (
        <p>Loading...</p>
      ) : isMediaInFav ? (
        <>
          <span className='tracking-tighter'>Remove from favorites</span>
          <IoIosHeart />
        </>
      ) : (
        <>
          Add to favorites
          <IoIosHeartEmpty className='size-5.5' />
        </>
      )}
    </Button>
  );
};
export default FavouriteBtn;
