//fetches data on pending clubs from the table (for approval/rejection)
import postgres from 'postgres';
import {
  Club,
} from './definitions';

//database information
const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'require',
  prepare: false,
});

export async function fetchPending() {
  try {
    //gets data for all clubs labeled pending
    const data = await sql<Club[]>`
      SELECT club_name, description, category,
      studentName AS "studentName",
      studentEmail AS "studentEmail", 
      contactName AS "contactName",
      contactEmail AS "contactEmail",
      meeting_days_time, meeting_location, additional_info, status
      FROM club_list
      WHERE status = ${'pending'}
      ORDER BY club_name ASC`;
    //console.log(data); for debugging
    const clubList = data.map((club) => ({
      ...club,
    }));
    return clubList;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the club list.');
  }
}
