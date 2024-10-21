// import bcrypt from 'bcrypt';
import { db } from "@vercel/postgres";

const client = await db.connect();

async function seedPlayers() {
    await client.sql`DROP TABLE IF EXISTS game_users`

  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS game_users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      room VARCHAR(255) NOT NULL,
      score BIGINT,
      played VARCHAR(255)[],
      map JSON
    );
  `;
}


async function seedRooms() {
    await client.sql`DROP TABLE IF EXISTS rooms`

  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS rooms (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      status VARCHAR(255) NOT NULL
    );
  `;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    // await seedPlayers();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
