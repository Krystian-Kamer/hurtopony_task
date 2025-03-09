import Logo from './Logo';
import NavLinks from './NavLinks';

const Navbar = () => {
  return (
    <div className='bg-black'>
      <div className='mx-auto max-w-6xl flex items-center justify-between py-10 px-4 sm:px-10'>
        <Logo />
        <NavLinks/>
      </div>
    </div>
  );
};
export default Navbar;
