"use client"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TextArea from "./textarea";
import { Grid } from "./gridArea";
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

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex justify-around">
                <TextArea text={text} />
                <Grid rows={10} columns={10}></Grid>
            </div>
        </DndProvider>
    );
};

export default Game;