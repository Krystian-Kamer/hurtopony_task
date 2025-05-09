import SectionTitle from '@/components/SectionTitle';
import Image from 'next/image';
import { Genre } from '@/types';
import FavouriteBtn from '@/components/FavouriteBtn';
import WatchlistBtn from '@/components/WatchlistBtn';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const API_KEY = process.env.API_KEY;

type SingleMovieProps = {
  title: string;
  genres: Genre[];
  homepage: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  poster_path: string;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

const MoviePage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const movieId = id;
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const movie = await response.json();

  const {
    title,
    genres,
    homepage,
    overview,
    vote_average: voteAverage,
    vote_count: voteCount,
    release_date: releaseDate,
    poster_path: img,
  } = movie as SingleMovieProps;

  const genreNames = genres.map((genre) => genre.name);

  return (
    <div className='max-w-6xl mb-40 mx-auto'>
      <SectionTitle title={title} />
      <div className='grid grid-cols-1 gap-y-10 md:grid-cols-2'>
        <div className='w-[342px] justify-self-center'>
          {img ? (
            <Image
              width='342'
              height='513'
              src={`https://www.themoviedb.org/t/p/w342${img}`}
              alt={title}
              className='rounded-lg'
              priority
            />
          ) : (
            <div className='w-[342px] h-[513px] bg-black/10 flex flex-col justify-center items-center'>
              <p className='italic px-2 text-black/60 text-2xl'>{title}</p>
            </div>
          )}
          <div className='mt-2 text-center space-x-2'>
            <FavouriteBtn type='movie' id={id} title={title} />
            <WatchlistBtn type='movie' id={id} title={title} />
          </div>
        </div>
        <div className='mx-10 grid gap-y-4 text-lg'>
          {homepage ? (
            <>
              <p className='font-bold'>Link</p>
              <a
                href={homepage}
                className='text-blue-500 w-fit hover:text-blue-700 break-all'
                target='_blank'
              >
                {homepage}
              </a>
            </>
          ) : null}

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
          {releaseDate ? (
            <p>
              <span className='font-bold'>Release date</span> : {releaseDate}
            </p>
          ) : null}
        </div>
      </div>
      <div className='mx-auto flex justify-center max-w-5xl my-32'>
        <Button variant='destructive' asChild>
          <Link href='/'>Back to movies page</Link>
        </Button>
      </div>
    </div>
  );
};
export default MoviePage;
