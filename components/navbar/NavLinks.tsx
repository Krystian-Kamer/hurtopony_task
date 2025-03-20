import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NavLinks = () => {
  return (
    <div>
      <div className='md:flex hidden md:gap-x-5 lg:gap-x-20'>
        <Button size='lg' variant='outline' asChild>
          <Link href='/series'>Series</Link>
        </Button>
        <Button size='lg' variant='outline' asChild>
          <Link href='/persons'>Persons</Link>
        </Button>
        <Button size='lg' variant='outline' asChild>
          <Link href='/favorites'>Favorites</Link>
        </Button>
        <Button size='lg' variant='outline' asChild>
          <Link href='/watchlist'>Watchlist</Link>
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='md:hidden'>
            Menu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end'>
          <DropdownMenuItem className='py-2 cursor-pointer' asChild>
            <Link href='/'>Movies</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='py-2 cursor-pointer' asChild>
            <Link href='/series'>Series</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='py-2 cursor-pointer' asChild>
            <Link href='/persons'>Persons</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='py-2 cursor-pointer' asChild>
            <Link href='/favorites'>Favorites</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='py-2 cursor-pointer' asChild>
            <Link href='/watchlist'>Watchlist</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default NavLinks;
