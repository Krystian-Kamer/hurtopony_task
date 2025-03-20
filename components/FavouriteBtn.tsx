'use client';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { Button } from './ui/button';
import { addToList } from '@/utils/actions';

interface FavouriteBtnProps {
  inFav?: boolean;
  type: 'movie' | 'serie';
  id: string;
}

const FavouriteBtn = ({ inFav, type, id }: FavouriteBtnProps) => {
  return (
    <Button
      className='w-[165px]'
      onClick={() => addToList(id, type, 'favorite')}
    >
      {inFav ? (
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
