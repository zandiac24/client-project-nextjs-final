//creates an information card with data for each club
export const dynamic = 'force-dynamic';
import {fetchClubs} from '@/app/lib/data';
import Link from 'next/link'


type ClubListProps = {
  cat: string;
};

export default async function ClubList({ cat }: ClubListProps) {
  const clubList = await fetchClubs(cat);
  if(clubList.length != 0) {
    return (
      <div>
          {<div className='flex w-[100%] md:w-[68vw] lg:w-[100%] grid lg:grid-cols-3 md:grid-cols-2 md:gap-5 lg:gap-[40px] sm:grid-cols-1 sm:gap-10'>
            {/*Map the club data to cards that display the info*/}
            {clubList.map((club, i) => {
              return (
                <div
                  key={club.club_name}
                  className='text-[16px] text-black bg-gradient-to-b from-white via-yellow-300
                to-yellow-500 border-4 border-yellow-500 px-7 pt-7 pb-10 rounded-xl overflow-hidden break-words'
                >
                  <p className="text-[21px] font-semibold mb-[25px] text-center">
                      {club.club_name}
                  </p>

                  <p className='mb-[20px]'>
                    {club.description}
                  </p>

                  {/*Meeting Info*/}
                  {club.meeting_days_time && club.meeting_days_time !== 'TBD' && (
                  <p className="mb-[10px] flex">
                    <span className="inline-block text-left max-w-[290px]">
                      <b className="font-semibold mr-1">Meetings:</b>
                      {club.meeting_days_time}
                    </span>
                  </p>
                )}
                {club.meeting_location && (
                  <p className="mb-[10px] flex">
                    <span className="inline-block text-left max-w-[290px]">
                      <b className="font-semibold mr-1">Location:</b>
                      {club.meeting_location}
                    </span>
                  </p>
                )}
                
                  {/*Sponsor Info*/}
                  {club.contactName && <p className='mb-[10px] flex'><b className='font-semibold mr-[5px]'>Sponsor: </b><Link href={`mailto:${club.contactEmail}`} className="underline decoration-yellow-200">{club.contactName}</Link></p>}
                  {club.studentName && club.studentEmail && (
                  <p className="mb-[10px] flex">
                    <span className="inline-block text-left max-w-[290px]">
                      <b className="font-semibold mr-1">Student Leader(s): </b>
                      <Link href={`mailto:${club.studentEmail}`} className="underline decoration-yellow-200">{club.studentName}</Link>
                    </span>
                  </p>
                  )}
                  {club.additional_info && (
                  <p className="mb-[10px] flex">
                    <span className="inline-block mt-4 text-yellow-700 text-[14px] text-left break-words max-w-full overflow-hidden whitespace-normal w-full">
                      {club.additional_info}
                    </span>
                  </p>
                )}
                  
                </div>
              );
            })}
          </div>}
      </div>
    );
  }
  return(
    <div>
      <p>There are currently no clubs in this category. Check back later for more options!</p>
    </div>
  );
};
