import { Button } from './ui/button';
import { MdOutlineBookmarkAdd, MdOutlineBookmark } from 'react-icons/md';

interface WatchlistBtnProps {
  inWatch?: boolean;
  type: 'movie' | 'serie';
  id: string;
}

const WatchlistBtn = ({ inWatch, type, id }: WatchlistBtnProps) => {
  return (
    <Button className='w-[165px]'>
      {inWatch ? (
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
