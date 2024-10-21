"use client";

import { useState } from "react";
import { joinRoom } from "./lib/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const [room, setRoom] = useState<string>();
  const [name, setName] = useState<string>();
  const [message, setMessage] = useState<string>()
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  function handleJoin() {
    const params = new URLSearchParams(searchParams);

    if(room && name){
      const join=async()=>{
        joinRoom(name,room).then((result)=>{
          if(result.message){
            setMessage(result.message)
          }else{
            params.set('id',result)
            params.set('name',name)
            params.set('room',room)
            replace(`/create?${params.toString()}`);
          }
        })
      }
      join()
    }
  }
  return (
    <main className="w-full h-screen pt-[10%] ">
      <div className="w-fit h-fit m-[auto] bg-white px-10 py-3 flex flex-col rounded-sm">
        <div className="text-red-900 text-center">{message}</div>
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-3 mt-2"
          placeholder="Enter a room code"
          onChange={(e) => setRoom(e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-3 mt-2"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="border border-green-600 text-green-800 block mt-2 px-2 py-1 rounded-md"
          onClick={() => handleJoin()}
        >
          Confirm
        </button>
      </div>
    </main>
  );
}
