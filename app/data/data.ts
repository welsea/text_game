// import { v4 as uuidv4 } from 'uuid';
// import { sql } from '@vercel/postgres';

export async function publishMap() {}

export async function getPlayer() {}

export async function generateRoom(name:string) {
  console.log('generate room: ',name)
  // try {

  //   const data = await sql<Category>`
  //           SELECT category_name,category_id FROM categories`;
  //   let result = data.rows;
  //   return result;
  // } catch (error) {
  //   console.error("Database Error:", error);
  //   throw new Error("Failed to fetch categories.");
  // }
}

export async function deletePlayer() {}

export async function scoreAdd() {}
