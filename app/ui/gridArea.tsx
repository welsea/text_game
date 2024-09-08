"use client"

function GridBox({ index, handleSelectBox,word }:{index:number,handleSelectBox:any,word:string}){
    return (
        <div
            className="grid-box"
            onClick={() => handleSelectBox(index)}
        >
            {word}
        </div>
    );
};

export function Grid({ rows, columns, handlePutInGrid, gridData }: { rows: number, columns: number, handlePutInGrid: any, gridData: Array<string> }) {
    function handleSelectBox(index: number) {
        handlePutInGrid(index)
    }

    return (
        <div
            className={`grid`}
            style={{
                gridTemplateColumns: `repeat(${columns}, 5rem)`,
                gridTemplateRows: `repeat(${rows}, 5rem)`,
            }}
        >
            {gridData.map((word: string, index: number) => (
                <GridBox key={index} index={index} word={word} handleSelectBox={handleSelectBox} />
            ))}
        </div>
    );
};
