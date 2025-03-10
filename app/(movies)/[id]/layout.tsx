import Breadcrumbs from '@/components/Breadcrumbs';
const MovieLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Breadcrumbs type={'movie'}/>
      {children}
    </>
  );
};
export default MovieLayout;
