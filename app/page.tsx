"use client";
import TextArea from "./ui/TextArea";
import MapArea from "./ui/MapArea";
import { useState } from "react";
import { SelectItem } from "./data/utils";
import "@/app/ui/global.css";

interface FunctionItem {
  value: string;
  color: string;
}
export default function Home() {
  const [selectBox, setSelectBox] = useState<number>();
  const [selectWord, setSelectWord] = useState<string>();
  const [selected, setSelected] = useState<SelectItem[]>([]);
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

  return (
    <main>
      <div className="flex justify-start items-start px-8">
        <TextArea
          handleSelect={handleSelectWord}
          selected={selected.map((item) => item.word)}
        />
        <div className="flex-auto">
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

            <button className="test-btn" id="test">
              Test your map!
            </button>
          </div>
        </div>
      </div>
      <div id="game" className="game"></div>
    </main>
  );
}
