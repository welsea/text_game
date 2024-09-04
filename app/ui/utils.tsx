export interface GridBoxProps {
    index: number;
    content: string | null;
    onDrop: (index: number, item: DragItem) => void;
}

export interface DragItem {
    word: string;
    index: number;
}

export interface DraggableButtonProps {
    word: string;
    index: number;
    isDropped: boolean;
}

export const ItemTypes = {
    BUTTON: "button",
};

export interface GridProps {
    rows: number;
    columns: number;
}