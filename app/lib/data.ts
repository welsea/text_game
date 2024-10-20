"use server";
// import { v4 as uuidv4 } from 'uuid';
import { sql } from "@vercel/postgres";
// import bcrypt from 'bcrypt';
// import { db } from "@vercel/postgres";
import { Player } from "./utils";

export async function getPlayers(name: string) {
  const data = await sql`SELECT id,name,map,score,played FROM game_users WHERE room = ${name};`;
  const result: Player[] = data.rows.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      map: item.map,
      score: item.score,
      played:item.played
    };
  });
  return result;
}

export async function generateRoom(name: string) {
  try {
    const existingRoom = await sql`
        SELECT EXISTS(SELECT id FROM rooms WHERE name=${name})
    `;
    if (existingRoom.rows[0].exists) {
      const result =
        await sql`SELECT id FROM rooms WHERE name = ${name} LIMIT 1;`;
      return {
        message: "Room with this name already exists.",
        id: result.rows[0].id,
      };
    } else {
      const result = await sql`
      INSERT INTO rooms (name,status)
      VALUES (${name},'waiting')
      RETURNING id;
    `;
      return result.rows[0].id;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function joinRoom(name: string, room: string) {
  try {
    console.log(" called");
    const existingRoom = await sql`
      SELECT EXISTS(SELECT id FROM rooms WHERE name=${room})
    `;
    if (!existingRoom.rows[0].exists) {
      return {
        message: "Room doesn't exist",
      };
    }

    const existingUser = await sql`
        SELECT EXISTS(SELECT id FROM game_users WHERE name=${name} AND room=${room})
    `;
    if (existingUser.rows[0].exists) {
      return {
        message: "Name already exist",
      };
    } else {
      const result = await sql`
      INSERT INTO game_users (name, room)
      VALUES (${name}, ${room})
      RETURNING id;
    `;
      return result.rows[0].id;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateRoom(status: string, room: string) {
  try {
    const existingRoom = await sql`
      SELECT EXISTS(SELECT id FROM rooms WHERE name=${room})
    `;
    if (!existingRoom.rows[0].exists) {
      return {
        message: "Room doesn't exist",
      };
    }

    await sql`
      UPDATE rooms
      SET status=${status}
      WHERE name = ${room};
    `;
  } catch (error) {
    console.log(error);
  }
}

export async function getRoomStatus(name: string) {
  const userData = await sql`SELECT room FROM game_users WHERE name=${name}`;
  const room = userData.rows[0].room;
  const roomData = await sql`SELECT status FROM rooms WHERE name=${room}`;
  return roomData.rows[0].status;
}

export async function deletePlayer(name: string) {
  try {
    const result = await sql`
      DELETE FROM game_users WHERE name = ${name};
    `;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteRoom(room: string) {
  try {
    await sql`DELETE FROM game_users WHERE room = ${room};`;
    await sql`DELETE FROM rooms WHERE name = ${room};`;
  } catch (error) {
    console.log(error);
  }
}

export async function publishMap(name: string, value: any) {
  try {
    const map = JSON.stringify(value);
    await sql`
    UPDATE game_users
    SET map=${map}
    WHERE name = ${name};
`;

    return "ok";
  } catch (error) {
    console.log(error);
  }
}

export async function scoreAdd() {}
