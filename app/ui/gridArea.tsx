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

export const Grid: React.FC<GridProps> = ({ rows, columns }) => {
    const [grid, setGrid] = useState<(string | null)[]>(Array(rows * columns).fill(null));

    const handleDrop = (index: number, item: DragItem) => {
        const newGrid = [...grid];
        newGrid[index] = item.word;
        setGrid(newGrid);
    };

    return (
        <div
            className={`grid`}
            style={{
                gridTemplateColumns: `repeat(${columns}, 3rem)`,
                gridTemplateRows: `repeat(${rows}, 3rem)`,
            }}
        >
            {grid.map((content, index) => (
                <GridBox key={index} index={index} content={content} onDrop={handleDrop} />
            ))}
        </div>
    );
};
