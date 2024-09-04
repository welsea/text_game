"use client"
import { useRef } from "react";
import { DragItem, ItemTypes } from "./utils";
import {  DragSourceMonitor, useDrag } from "react-dnd";

const DraggableButton: React.FC<{ word: string; index: number }> = ({
    word,
    index,
}) => {
    const ref = useRef<HTMLButtonElement>(null);

    const [{ isDragging }, drag] = useDrag<
        DragItem,
        void,
        { isDragging: boolean }
    >(() => ({
        type: ItemTypes.BUTTON,
        item: { word, index },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    drag(ref);
    return (
        <button
            ref={ref}
            style={{
                marginRight: "4px",
                opacity: isDragging ? 0.5 : 1,
                cursor: "move",
            }}
        >
            {word}
        </button>
    );
};

export default DraggableButton;