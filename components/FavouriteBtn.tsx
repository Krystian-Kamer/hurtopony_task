'use client';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { Button } from './ui/button';
import { addToList, fetchList } from '@/utils/actions';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

interface FavouriteBtnProps {
  type: 'movie' | 'tv';
  id: string;
  title: string;
}

const FavouriteBtn = ({ type, id, title }: FavouriteBtnProps) => {
  const [isMediaInFav, setIsMediaInFav] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (type === 'movie') {
        const { media } = await fetchList('favorite', 'movies');
        setIsMediaInFav(media.some((item) => item.id === Number(id)));
      }
      if (type === 'tv') {
        const { media } = await fetchList('favorite', 'tv');
        setIsMediaInFav(media.some((item) => item.id === Number(id)));
      }
    };
    fetchData();
    setIsLoading(false);
  }, [id, type]);

  const handleClick = async () => {
    await addToList(id, type, 'favorite');
    toast.success(title, {
      description: 'Has been added to favorites',
    });
    setIsMediaInFav(true);
  };

  return (
    <Button className='w-[165px]' disabled={isLoading} onClick={handleClick}>
      {isMediaInFav ? (
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
