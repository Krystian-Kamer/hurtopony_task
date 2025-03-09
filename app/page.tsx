import MoviesContainer from '@/components/container/MoviesContainer';
import DiscoverForm from '@/components/form/DiscoverForm';
import SearchForm from '@/components/form/SearchForm';
import SectionTitle from '@/components/SectionTitle';

const HomePage = async () => {
  return (
    <div className='flex flex-col items-center'>
      <SectionTitle title='Search movies' />
      <SearchForm />
      <div className='italic my-10 text-black/50'>or search by params</div>
      <DiscoverForm />
      <MoviesContainer />
    </div>
  );
};
export default HomePage;
