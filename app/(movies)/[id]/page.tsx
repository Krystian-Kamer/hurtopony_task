import SectionTitle from '@/components/SectionTitle';
import Image from 'next/image';
import { Genre } from '@/types';

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

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const movieId = id;
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const movie = await response.json();
  console.log(movie);
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
        {img ? (
          <Image
            width='342'
            height='513'
            src={`https://www.themoviedb.org/t/p/w342${img}`}
            alt={title}
            className='place-self-center rounded-lg'
            priority
          />
        ) : (
          <div className='w-[342px] h-[513px] bg-black/10 flex flex-col justify-center items-center'>
            <p className='italic px-2 text-black/60 text-2xl'>{title}</p>
          </div>
        )}

        <div className='mx-20 grid gap-y-4 text-lg'>
          {homepage ? (
            <>
              <p className='font-bold'>Link</p>
              <a
                href={homepage}
                className='text-blue-500 w-fit hover:text-blue-700'
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
    </div>
  );
};
export default MoviePage;
