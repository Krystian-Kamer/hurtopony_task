import SectionTitle from '@/components/SectionTitle';
import Image from 'next/image';
import { Genre } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FavouriteBtn from '@/components/FavouriteBtn';
import WatchlistBtn from '@/components/WatchlistBtn';

const API_KEY = process.env.API_KEY;

type SingleSerieProps = {
  name: string;
  genres: Genre[];
  overview: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  poster_path: string;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

const SeriePage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const serieId = id;
  console.log(serieId);
  const url = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const serie = await response.json();

  const inFav = false;
  const inWatch = false;

  const {
    name: title,
    genres,
    overview,
    vote_average: voteAverage,
    vote_count: voteCount,
    first_air_date: firstAirDate,
    poster_path: img,
  } = serie as SingleSerieProps;

  const genreNames = genres.map((genre) => genre.name);

  return (
    <div className='max-w-6xl mb-40 mx-auto'>
      <SectionTitle title={title} />
      <div className='grid grid-cols-1 gap-y-10 md:grid-cols-2'>
        <div>
          {img ? (
            <Image
              width='342'
              height='513'
              src={`https://www.themoviedb.org/t/p/w342${img}`}
              alt={title}
              className='mx-auto rounded-lg'
              priority
            />
          ) : (
            <div className='w-[342px] h-[513px] bg-black/10 flex flex-col justify-center items-center'>
              <p className='italic px-2 text-black/60 text-2xl'>{title}</p>
            </div>
          )}
          <div className='w-[342px] justify-self-center flex mt-2 justify-between items-center gap-x-2'>
            <FavouriteBtn inFav={inFav} type='serie' id={id} />
            <WatchlistBtn inWatch={inWatch} type='serie' id={id} />
          </div>
        </div>
        <div className='mx-10 grid gap-y-4 text-lg'>
          {genres.length ? (
            <>
              <p className='font-bold'>Genres:</p>
              <div className=''>{genreNames.join(', ')}</div>
            </>
          ) : null}
          {overview ? (
            <>
              <p className='font-bold'>Description</p>
              <p>{overview}</p>
            </>
          ) : null}
          <p>
            <span className='font-bold'>Vote average</span> :{' '}
            {voteAverage.toFixed(2)}
          </p>
          <p>
            <span className='font-bold'>Vote count</span> : {voteCount}
          </p>
          {firstAirDate ? (
            <p>
              <span className='font-bold'>Release date</span> : {firstAirDate}
            </p>
          ) : null}
        </div>
      </div>
      <div className='mx-auto flex justify-center max-w-5xl my-32'>
        <Button variant='destructive' asChild>
          <Link href='/series'>Back to series page</Link>
        </Button>
      </div>
    </div>
  );
};
export default SeriePage;
