"use client";

import { useEffect, useState } from "react";
import { Player, SelectItem } from "../lib/utils";
import { getMaps, getPlayer, updatePlayed, updateScore } from "../lib/data";
import Map from "../ui/map";
import Playerinfo from "../ui/playerinfo";
export default function Page({
  searchParams,
}: {
  searchParams: {
    name: string;
    room: string;
  };
}) {
  const name = searchParams.name;
  const room = searchParams.room;
  const characters: string[] = ["Traveler", "King"];

  const [character, setCharacter] = useState<string>();
  const [map, setMap] = useState<any>();
  const [maps, setMaps] = useState<any>([]);
  const [mapIndex, setMapIndex] = useState<number>(0);
  const [chance, setChance] = useState(5);
  const [player, setPlayer] = useState<Player>();
  const [result, setResult] = useState<string>();
  const [finishAll, setFinishAll] = useState<boolean>(false);
  const [showSelect, setShowSelect] = useState(false);
  const [message, setMessage] = useState<string>()

  useEffect(() => {
    const fetchPlayer = async () => {
      const p = await getPlayer(name, room);
      setPlayer(p as Player);
      const ms = await getMaps(room);
      setMaps(ms);
      if (ms) setMap(ms[0]);
      if (p?.played && ms?.length === p?.played.length) setFinishAll(true);
    };
    fetchPlayer();
  }, [name, room]);

  useEffect(() => {
    setChance(3);
    setResult("");
    const fetchPlayer = async () => {
      const p = await getPlayer(name, room);
      console.log(p);
      setPlayer(p as Player);
    };
    fetchPlayer();
  }, [map]);

  function updateMap() {
    console.log("update map");
    if (mapIndex + 1 < maps.length) setMap(maps[mapIndex + 1]);
    else setFinishAll(true);
    setMapIndex((pre) => pre + 1);
    setChance(3);
  }

  useEffect(() => {
    const finish = async () => {
      if (result === "skip" && player) {
        const newData = await updatePlayed(name, map.name);
        let p = player;
        p.played = newData.played;
        setPlayer(p);
        updateMap();
      } else if (result === "win") {
        setShowSelect(true);
      }
    };
    finish();
  }, [result]);

  useEffect(() => {
    const finish = async () => {
      if (result === "win" && player) {
        if (character) {
          if (character === map.map.character) {
            const newData = await updateScore(name, map.name);
            if (newData) {
              let p = player;
              p.score = newData.score;
              p.played = newData.played;
              setMessage('You Won! Now wait for the next map.')
              setTimeout(()=>{
                setPlayer(p);
                updateMap();
                setMessage(undefined)
              },5000)
            }
          } else {
            const newData = await updatePlayed(name, map.name);
            let p = player;
            p.played = newData.played;

            setMessage('Wrong character! Now wait for the next map.')
            setTimeout(()=>{
              setPlayer(p);
              updateMap();
              setMessage(undefined)
            },5000)
          }
        }
      }
    };
    finish();
  }, [character]);

  return (
    <div>
      {player && (
        <div className="flex justify-between w-3/5 m-[auto] pt-5 ">
          <div>Player: {player.name}</div>
          <div>Score: {player.score ? player.score : 0}</div>
          <div>
            Played: {player.played?.length ? player.played.length : 0} /{" "}
            {maps.length}
          </div>
        </div>
      )}
      {finishAll && (
        <div className="text-center text-lg mt-2">
          Your played all the maps, continue play the score won't change.
        </div>
      )}
      {map && (
        <div className="">
          <div className="text-center mt-2">
            <span className="mr-2">Chance left: {chance}</span>
            <button
              className={`border border-gray-700 px-1 py-1 mr-2 rounded-md ${
                chance < 1 ? "text-gray-600 border-gray-500" : ""
              }`}
              disabled={chance == 0}
              onClick={() => {
                setChance((pre) => pre - 1);
              }}
            >
              Try again
            </button>
            <button
              className="border border-gray-700 px-1 py-1 mr-2 rounded-md"
              onClick={() => setResult("skip")}
            >
              Skip this map
            </button>
          </div>

          <div className=" border border-dashed border-gray-500 mt-5">
            {showSelect && (
              <div className="py-3 text-center">
                <span>Select a character: </span>
                {characters.map((item: string, index) => {
                  return (
                    <label
                      key={index}
                      className={`px-2 py-1 mr-1 border border-black rounded-sm ${
                        character === item ? "bg-black text-white" : ""
                      }`}
                    >
                      <input
                        name="character"
                        type="radio"
                        className="hidden"
                        value={item}
                        onChange={() => setCharacter(item)}
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {message && <div className="text-center">{message}</div>}

            {map && (
              <Map selected={map.map.map} result={setResult} key={chance} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
