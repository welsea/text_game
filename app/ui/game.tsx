"use client"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TextArea from "./textarea";
import { Grid } from "./gridArea";
import { useState } from "react";
const Game: React.FC = () => {
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
    const [grid, setGrid] = useState<(string | null)[]>(Array(100).fill(null)); // 10x10 grid
    const [droppedItems, setDroppedItems] = useState<Set<number>>(new Set());
  
    const handleDrop = (index: number, item: { word: string; index: number }) => {
      const newGrid = [...grid];
      newGrid[index] = item.word;
      setGrid(newGrid);
      setDroppedItems((prev) => new Set(prev).add(item.index));

      console.log(`drag numbers: ${droppedItems.size}`)

    };
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex justify-around">
                <TextArea text={text} droppedItems={droppedItems}/>
                <Grid rows={10} columns={10} gridContent={grid} onDrop={handleDrop}></Grid>
            </div>
        </DndProvider>
    );
};

export default Game;