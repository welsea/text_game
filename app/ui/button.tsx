"use client"
import { useRef, useState } from "react";

function Button({ word, isSelect,handleSelect}: { word: string, isSelect: boolean,handleSelect:any }) {
    return (
        <button
            className= "focus:border focus:border-dashed focus:border-blue-400 px-1"
            disabled={isSelect}
            onClick={() => handleSelect(word)}
        >
            {word}
        </button>
    );
};

export default Button;