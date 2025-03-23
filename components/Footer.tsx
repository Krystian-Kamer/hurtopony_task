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
    <div className='border-t-2'>
      <div className='mx-auto flex items-center justify-end py-10 px-4 sm:px-10 gap-x-5'>
        {socialLinks.map(({ href, icon }, index) => (
          <a key={index} href={href} target='_blank' rel='noopener noreferrer'>
            <Button size='icon' variant='ghost'>
              {icon}
            </Button>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer;
