"use client";
import { getPlayers, deletePlayer, updateRoom, deleteRoom } from "../lib/data";
import Create from "../ui/dashboard/create";
import { Player } from "../lib/utils";
import { useState } from "react";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    id: string;
    name: string;
  };
}) {
  const id = searchParams?.id;
  const name = searchParams?.name;
  const [players, setPlayers] = useState<Player[]>();
  const [roomStatus, setRoomStatus] = useState<string>();

  function refreshPlay() {
    const refresh = async () => {
      if (id && name) {
        const fetchedPlayers = await getPlayers(name);
        setPlayers(fetchedPlayers); // Update state with fetched players
      }
    };
    refresh();
  }

  function handleDelete(name: string) {
    const action = async () => {
      await deletePlayer(name);
    };
    action();
  }
  function handleDeleteGame() {
    if (name) {
      const action = async () => {
        await deleteRoom(name);
      };
      action();
    }
  }

  function handleChangeStatus(status: string) {
    if (name) {
      const update = async () => {
        await updateRoom(status, name);
        setRoomStatus(status)
      };
      update();
    }
  }

  return (
    <main className="w-full h-screen px-10 p-5 text-center">
      {!id && <Create />}
      <div>
        {id && (
          <div>
            <div>Now you can share the room: {name}{roomStatus?`, status: allow ${roomStatus}`:''}</div>
            <button
              className="border border-gray-300 rounded-md px-2 py-1 mr-2"
              onClick={() => refreshPlay()}
            >
              Refresh player
            </button>
            <button
              className="border border-gray-300 rounded-md px-2 py-1 mr-2"
              onClick={() => handleChangeStatus("publish")}
            >
              Start publish map
            </button>
            <button
              className="border border-gray-300 rounded-md px-2 py-1 mr-2"
              onClick={() => handleChangeStatus("play")}
            >
              Start play map
            </button>

            <button
              className="px-2 py-1 bg-red-900 text-white rounded-md ml-10"
              onClick={() => handleDeleteGame()}
            >
              Delete room
            </button>
          </div>
        )}
        <div className="w-3/5 m-[auto] pt-4">
          {players && (
            <table className="players">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Played</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {players.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.map ? 'published' : "-"}</td>
                      <td>{item.score ? item.score : 0}</td>
                      <td>{item.played ? item.played.join(",") : "none"}</td>
                      <td>
                        <button
                          className="border-non px-2 text-red-800 ml-2"
                          onClick={() => handleDelete(item.name)}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
