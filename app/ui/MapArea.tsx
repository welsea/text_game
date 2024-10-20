"use client";

import { useState, useEffect } from "react";
import { SelectItem } from "../data/utils";
export default function MapArea({
  handleSelect,
  handleCancel,
  selected,
}: {
  handleSelect: any;
  handleCancel: any;
  selected: SelectItem[];
}) {
  const [clickBox, setClickBox] = useState<number>();

  useEffect(() => {
    if (clickBox && selected.find(ele=>ele.box===clickBox)) {
      setClickBox(undefined);
    }
  }, [selected, clickBox]);

  function handleClick(id: number) {
    setClickBox(id);
    handleSelect(id);
  }
  return (
    <div id="map_area" className="map-area">
      {[...Array(144)].map((_, index: number) => {
        const item = selected.find((ele) => ele.box === index);
        return index === 132 ? (
          <div
            key={index}
            className="grid-item"
            style={{ color: "#a3caa3", borderBottom: "3px dashed #a3caa3" }}
          >
            START
          </div>
        ) : index === 11 ? (
          <div
            key={index}
            className="grid-item"
            style={{ color: "#a3caa3", borderRight: "3px dashed #a3caa3" }}
          >
            FINISH
          </div>
        ) : (
          <div
            key={index}
            className={`grid-item ${item ? item.platform.toLowerCase() : ""} ${
              clickBox === index + 1 ? "box-select" : ""
            }`}
            onClick={() => handleClick(index)}
            onDoubleClick={() => handleCancel(index)}
          >
            {item ? item.word.split("-")[1] : " "}
          </div>
        );
      })}
    </div>
  );
}
