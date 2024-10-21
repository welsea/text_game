"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { generateRoom } from "@/app/lib/data";
export default function Create() {
  const [name, setName] = useState<string>();
  const [id, setId] = useState<string>();
  const [message, setMessage] = useState<string>();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  function handleCreate() {
    if (name) {
      const generate = async () => {
        generateRoom(name).then((result) => {
          const params = new URLSearchParams(searchParams);
          let id: string;
          if (result.message) {
            setMessage(result.message);
            setId(result.id);
            id = result.id;
          } else {
            setId(result);
            id = result;
          }
          params.set("id", id);
          params.set("name", name);
          replace(`/dashboard?${params.toString()}`);
        });
      };
      generate();
    }
  }


  return (
    <div>
      {!id && (
        <div>
          <input
            type="text"
            className="border border-gray-200 rounded-md py-1 px-2 mr-3"
            placeholder="enter a name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button
            onClick={() => handleCreate()}
            className="border border-black rounded-md px-2 py-1"
          >
            Generate room
          </button>
        </div>
      )}
    </div>
  );
}
