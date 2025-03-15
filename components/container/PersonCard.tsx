import Image from 'next/image';
import Link from 'next/link';
import { KnownForType } from '@/types';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Skeleton } from '../ui/skeleton';

interface PersonProps {
  id: number;
  name: string;
  profession: string;
  img: string;
  loading: boolean;
  knownFor: KnownForType[];
}

const PersonCard = ({
  id,
  name,
  profession,
  img,
  knownFor,
  loading,
}: PersonProps) => {
  const filteredKnownFor = knownFor.map((media) => {
    return {
      title: media?.title || media?.name,
      date:
        media?.release_date?.split('-')[0] ||
        media?.first_air_date?.split('-')[0],
    };
  });

  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger>
          {loading ? (
            <Skeleton className='h-[330px] w-[220px] rounded-md' />
          ) : (
            <Link
              href={`/persons/${id}`}
              className='flex relative rounded-md overflow-hidden w-[220px] flex-col bg-white border border-black/10 hover:shadow-2xl hover:scale-105 duration-700 h-[400px]'
            >
              {img ? (
                <Image
                  width='220'
                  height='330'
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${img}`}
                  alt={name}
                  priority
                />
              ) : (
                <div className='w-[220px] h-[330px] bg-black/10 flex flex-col justify-center items-center'>
                  <p className='italic px-2 text-black/60 text-2xl'>{name}</p>
                </div>
              )}
              <div className='flex items-center justify-center h-[70px]'>
                <h2
                  className={`${
                    [...name].length > 40
                      ? 'text-sm'
                      : [...name].length > 28
                      ? 'text-base'
                      : 'text-xl'
                  } font-semibold px-1 tracking-wide`}
                >
                  {name}
                </h2>
              </div>
            </Link>
          )}
        </TooltipTrigger>
        {profession !== '' ? (
          <TooltipContent>
            <p className='text-sm w-60'>{profession}</p>
            {filteredKnownFor.length && (
              <>
                <p className='pt-4'>Known for:</p>
                {filteredKnownFor.map((media) => (
                  <p key={media.title}>
                    <span className='font-bold'>{media.title}</span>{' '}
                    {media.date && `(${media.date})`}
                  </p>
                ))}
              </>
            )}
          </TooltipContent>
        ) : null}
      </Tooltip>
    </TooltipProvider>
  );
};
export default PersonCard;
