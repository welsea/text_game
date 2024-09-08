"use client"
import TextArea from "./textarea";
import { Grid } from "./gridArea";
import { useState,useEffect } from "react";
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

    const [grid, setGrid] = useState<(string)[]>(Array(100).fill(null)); // 5*5 grid
    const [droppedItems, setDroppedItems] = useState<Set<number>>(new Set());
    const [word, setWord] = useState("")
    const [index, setIndex] = useState(NaN)

    function handlePutInGrid(i:number){
        let tmp=[...grid]
        tmp[i]=word
        console.log("index: ",i)
        console.log("word: ",word)
        setGrid(tmp)
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex justify-around">
                <TextArea text={text} handleWord={setWord}/>
                <Grid rows={5} columns={10} gridData={grid} handlePutInGrid={handlePutInGrid}></Grid>
            </div>
        </DndProvider>
    );
};

export default Game;