import SectionTitle from '@/components/SectionTitle';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const API_KEY = process.env.API_KEY;

type SinglePersonProps = {
  name: string;
  gender: number;
  biography: string;
  birthday: string;
  deathday: string;
  homepage: string;
  place_of_birth: string;
  known_for_department: string;
  popularity: number;
  profile_path: string;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

const PersonPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const personId = id;
  console.log(personId);
  const url = `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const person = await response.json();

  const {
    name,
    gender,
    biography,
    birthday,
    deathday,
    homepage,
    place_of_birth: placeOfBirth,
    known_for_department: profession,
    popularity,
    profile_path: img,
  } = person as SinglePersonProps;

  return (
    <div className='max-w-6xl mb-40 mx-auto'>
      <SectionTitle title={name} />
      <div className='grid grid-cols-1 gap-y-10 md:grid-cols-2'>
        {img ? (
          <Image
            width='342'
            height='513'
            src={`https://www.themoviedb.org/t/p/w342${img}`}
            alt={name}
            className='mx-auto rounded-lg'
            priority
          />
        ) : (
          <div className='w-[342px] h-[513px] bg-black/10 flex flex-col justify-center items-center'>
            <p className='italic px-2 text-black/60 text-2xl'>{name}</p>
          </div>
        )}

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

          {profession ? (
            <p>
              <span className='font-bold'>Known for</span> : {profession}
            </p>
          ) : null}
          {gender ? (
            <p>
              <span className='font-bold'>Gender</span> :{' '}
              {gender === 0
                ? 'Not set / not specified'
                : gender === 1
                ? 'Female'
                : gender === 2
                ? 'Male'
                : 'Non-binary'}
            </p>
          ) : null}
          {birthday ? (
            <p>
              <span className='font-bold'>Birthday</span> : {birthday}
            </p>
          ) : null}
          {placeOfBirth ? (
            <p>
              <span className='font-bold'>Place of birth</span> : {placeOfBirth}
            </p>
          ) : null}
          {deathday ? (
            <p>
              <span className='font-bold'>Deathday</span> : {deathday}
            </p>
          ) : null}
          {biography ? (
            <>
              <p className='font-bold'>Biography</p>
              <p>{biography}</p>
            </>
          ) : null}
          <p>
            <span className='font-bold'>Popularity</span> : {popularity}
          </p>
        </div>
      </div>
      <div className='mx-auto flex justify-center max-w-5xl my-32'>
        <Button variant='destructive' asChild>
          <Link href='/persons'>back to persons page</Link>
        </Button>
      </div>
    </div>
  );
};
export default PersonPage;
