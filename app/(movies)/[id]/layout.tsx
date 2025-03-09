import Breadcrumbs from '@/components/Breadcrumbs';
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Breadcrumbs />
      {children}
      <div className='flex mx-20 md:mx-0 md:justify-center mt-20 mb-40'>
      </div>
    </>
  );
};
export default layout;
