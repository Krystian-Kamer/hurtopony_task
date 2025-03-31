import SectionTitle from './SectionTitle';
import { Skeleton } from './ui/skeleton';

const Loading = ({ title }: { title: string }) => {
  return (
    <div className='flex flex-col items-center min-h-[800px] md:min-h-[1200px]'>
      <SectionTitle title={title} />
      <div className='grid pt-10 pb-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10'>
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton key={index} className='h-[330px] w-[220px] rounded-md' />
        ))}
      </div>
    </div>
  );
};
export default Loading;
