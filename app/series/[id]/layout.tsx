import Breadcrumbs from '@/components/Breadcrumbs';
const SerieLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Breadcrumbs type={'serie'} />
      {children}
    </>
  );
};
export default SerieLayout;
