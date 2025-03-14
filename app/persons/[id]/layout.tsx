import Breadcrumbs from '@/components/Breadcrumbs';
const PersonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Breadcrumbs type={'person'} />
      {children}
    </>
  );
};
export default PersonLayout;
