"use client";
import TextArea from "../ui/TextArea";
import MapArea from "../ui/MapArea";
import { useState, use } from "react";
import { SelectItem } from "../lib/utils";
import { FunctionItem } from "../lib/utils";
import { getRoomStatus, publishMap } from "../lib/data";
import { useRouter } from "next/navigation";
import Map from "../ui/map";

export default function Page(
  props: {
    searchParams: Promise<{
      name: string;
      room: string;
    }>;
  }
) {
  const searchParams = use(props.searchParams);
  const name = searchParams.name;
  const room = searchParams.room;
  const router = useRouter();

  const [selectBox, setSelectBox] = useState<number>();
  const [selectWord, setSelectWord] = useState<string>();
  const [selected, setSelected] = useState<SelectItem[]>([]);
  const [character, setCharacter] = useState<string>();
  const characters: string[] = ["Frankenstein", "Monster"];
  const [fresh, setFresh] = useState<number>(0)
  const [show, setShow] = useState<boolean>(false);
  const functions: FunctionItem[] = [
    {
      value: "Walk",
      color: "black",
    },
    {
      value: "Jump",
      color: "#5a96b8",
    },
    {
      value: "Elevator",
      color: "#7e7ebf",
    },
    {
      value: "Danger",
      color: "#ac4848",
    },
  ];

  function handleCreateBox(platform: string) {
    if (
      selectBox &&
      selectWord &&
      !selected.find((ele) => ele.word === selectWord) &&
      !selected.find((ele) => ele.box === selectBox)
    ) {
      const newItem: SelectItem = {
        word: selectWord,
        box: selectBox,
        platform,
      };
      setSelected((preSelected) => [...preSelected, newItem]);
    } else {
      window.alert(`No ${selectBox ? "text" : "box"} selected!`);
    }
  }

  function handleCancelSelect(id: number) {
    const item = selected.find((ele) => ele.box === id);
    if (item) {
      const tmp = selected.filter((ele) => ele.box !== id);
      setSelected(tmp);
    }
  }

  function handleSelectBox(id: number) {
    setSelectBox(id);
  }

  function handleSelectWord(word: string) {
    setSelectWord(word);
  }

  function handleTestMap() {
    setShow(true);
    setFresh(pre=>pre+1)
  }

  function handleAction(action: string) {
    const fetchRoomStatus = async () => {
      const status = await getRoomStatus(name);
      if (status === action) {
        if (action === "publish") {
          if (character) {
            const result = await publishMap(name, character, selected);
            if (result === "ok") {
              window.alert("Your map is published!");
            }
          } else {
            window.alert("Select a character!");
          }
        } else {
          router.push(`/play?name=${name}&room=${room}`);
        }
      } else {
        window.alert("Waiting for the host!");
      }
    };
    fetchRoomStatus();
  }

  return (
    <main className="px-2 py-2">
      <div className="px-8">
        <TextArea
          handleSelect={handleSelectWord}
          selected={selected.map((item) => item.word)}
        />
        <div className="flex-auto">
          <div className="py-3">
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

          <MapArea
            handleCancel={handleCancelSelect}
            handleSelect={handleSelectBox}
            selected={selected}
          />

          <div id="platform-funcs" className="mt-2">
            {functions.map((item, index) => {
              return (
                <button
                  key={index}
                  className="px-2 py-1 mr-1 rounded-sm border-none text-white"
                  style={{ backgroundColor: item.color }}
                  onClick={() => handleCreateBox(item.value.toLowerCase())}
                >
                  {item.value}
                </button>
              );
            })}

            <button
              className="test-btn"
              id="test"
              onClick={() => handleTestMap()}
            >
              Test your map!
            </button>
          </div>
        </div>
      </div>
      {show && <Map key={fresh} selected={selected} />}
      {show && (
        <div className="w-4/5 m-[auto] flex justify-around">
          <button
            className="border border-orange-500 text-orange-600 px-2 py-1 rounded-md"
            onClick={() => handleAction("publish")}
          >
            Publish your map!
          </button>
          <button
            className="border border-green-800 text-green-800 px-2 py-1 rounded-md"
            onClick={() => handleAction("play")}
          >
            Start play!
          </button>
        </div>
      )}
    </main>
  );
}
