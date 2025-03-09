import { RiMovie2AiFill } from 'react-icons/ri';
import { Button } from '../ui/button';
import Link from 'next/link';
const Logo = () => {
  return (
    <Button className='rounded-md' variant='outline' asChild>
      <Link href='/' className='uppercase md:py-5'>
        <RiMovie2AiFill className='size-8' />
        Movie researcher
      </Link>
    </Button>
  );
};
export default Logo;
