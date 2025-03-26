import { Button } from './ui/button';
import { IoLogoFacebook, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import { MdKeyboard } from 'react-icons/md';

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/krystian-kamer',
    icon: <IoLogoLinkedin className='size-6' />,
  },
  {
    href: 'https://github.com/Krystian-Kamer',
    icon: <IoLogoGithub className='size-6' />,
  },
  {
    href: 'https://www.czolemwklawiature.com',
    icon: <MdKeyboard className='size-6' />,
  },
  {
    href: 'https://www.facebook.com/krystian.kamer',
    icon: <IoLogoFacebook className='size-6' />,
  },
];

const Footer = () => {
  return (
    <div className='border-t-2 flex justify-between bg-gray-100 items-center flex-col gap-y-4 py-5 sm:flex-row'>
      <div className='flex items-center  px-4 sm:px-10 pt-2 sm:order-1 gap-x-3 sm:gap-x-5'>
        {socialLinks.map(({ href, icon }, index) => (
          <a key={index} href={href} target='_blank' rel='noopener noreferrer'>
            <Button size='icon' variant='ghost'>
              {icon}
            </Button>
          </a>
        ))}
      </div>
      <div className='sm:mx-10 font-semibold text-sm sm:text-base '>
        © {new Date().getFullYear()} K.Kamer. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
