"use client";
import { useRef } from "react";
import { DndProvider, DragSourceMonitor, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define item types
const ItemTypes = {
    BUTTON: "button",
};

// Define the type for the draggable item
interface DragItem {
    word: string;
    index: number;
}

// Draggable Button Component
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

// Drop Area Component
const DropArea: React.FC<{
    onDrop: (item: DragItem) => void;
    children: React.ReactNode;
}> = ({ onDrop, children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop<DragItem>(() => ({
        accept: ItemTypes.BUTTON,
        drop: (item) => onDrop(item),
    }));
    drop(ref);
    return (
        <div ref={ref} style={{ padding: "16px", border: "1px dashed gray" }}>
            {children}
        </div>
    );
};

// Main TextButtons Component
const TextButtons: React.FC<{ text: string }> = ({ text }) => {
    // Split the text into words and punctuation
    const wordsAndPunctuation = text.split(/(\b\w+\b)/g).filter(Boolean);

    // Handler for drop action
    const handleDrop = (item: DragItem) => {
        console.log(`Dropped word: ${item.word}`);
        // Handle the drop logic here, e.g., reordering or removing the item
    };

    return (
        <div>
            {wordsAndPunctuation.map((item, index) => {
                if (/^\w+$/.test(item)) {
                    return (
                        <DraggableButton
                            key={index}
                            word={item}
                            index={index}
                        />
                    );
                } else {
                    return <span key={index}>{item}</span>;
                }
            })}
            <DropArea onDrop={handleDrop}>Drop the buttons here</DropArea>
        </div>
    );
};

// Example usage in the App Component
const TextArea: React.FC = () => {
    const text = `I met a traveller from an antique land,
    Who said—“Two vast and trunkless legs of stone
    Stand in the desert. . . . Near them, on the sand,
    Half sunk a shattered visage lies, whose frown,
    And wrinkled lip, and sneer of cold command,
    Tell that its sculptor well those passions read
    Which yet survive, stamped on these lifeless things,
    The hand that mocked them, and the heart that fed;
    And on the pedestal, these words appear:
    My name is Ozymandias, King of Kings;
    Look on my Works, ye Mighty, and despair!
    Nothing beside remains. Round the decay
    Of that colossal Wreck, boundless and bare
    The lone and level sands stretch far away.”`;

    return (
        <DndProvider backend={HTML5Backend}>
            <TextButtons text={text} />
        </DndProvider>
    );
};

export default TextArea;
