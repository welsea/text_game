"use client"
import { DragItem, ItemTypes, GridBoxProps, GridProps } from "./utils";
import { ReactNode, useRef,useState } from "react";
import { useDrop } from "react-dnd";

const GridBox: React.FC<GridBoxProps> = ({ index, content, onDrop }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop<DragItem>(() => ({
        accept: ItemTypes.BUTTON,
        drop: (item) => onDrop(index, item),
    }));
    drop(ref)

    return (
        <div
            ref={ref}
            className="flex items-center justify-center bg-gray-100"
        >
            {content}
        </div>
    );
};

export const Grid: React.FC<GridProps> = ({ rows, columns,gridContent,onDrop }) => {
    return (
        <div
            className={`grid`}
            style={{
                gridTemplateColumns: `repeat(${columns}, 5rem)`,
                gridTemplateRows: `repeat(${rows}, 5rem)`,
            }}
        >
            {gridContent.map((content, index) => (
                <GridBox key={index} index={index} content={content} onDrop={onDrop} />
            ))}
        </div>
    );
};
