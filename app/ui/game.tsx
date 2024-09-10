"use client"
import { useState, useEffect } from "react";
import { GridItem } from "./utils";
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
    const types = ["platform", "super_jump", "danger", "elevator"]
    const cols = 11
    const rows = 10


    const wordsAndPunctuation = text.split(/(\b\w+\b)/g).filter(Boolean);
    const [words, setWords] = useState(wordsAndPunctuation.map((item) => {
        if (/^\w+$/.test(item)) return { word: item, isSelect: false }
        else return { word: item, isSelect: true }
    }))
    const [grid, setGrid] = useState<(GridItem | null)[]>(Array(cols*rows).fill(null)); 
    const [selectWord, setSelectWord] = useState<number | null>(null)
    const [selectBox, setSelectBox] = useState<number | null>(null)

    function handleSet(func:string){
        if(selectBox && selectWord){
            let tmp=grid
            let tmpWords=words
            let word=words[selectWord].word
            tmp[selectBox]={func:func,content:{word:word,index:selectWord}}
            tmpWords[selectWord].isSelect=true
    
            setSelectBox(null)
            setSelectWord(null)
            setGrid([...tmp])
            setWords([...words])
        }else{
            if(!selectBox){
                window.alert("Select box!")
            }

            if(!selectWord){
                window.alert("select word!")
            }
        }
    }


    function remove(word:number,index:number){
        let tmp=grid
        tmp[index]=null
        let wordTmp=words
        wordTmp[word].isSelect=false
        setWords([...wordTmp])
        setGrid([...tmp])        
    }

    return (
        <div className="flex items-start">
            <div className="w-4/12 flex-initial">
                {words.map((item, index) => {
                    if (!item.isSelect) {
                        return (
                            <button
                                key={index}
                                className={`${index === selectWord ? "select" : ""} focus:border focus:border-dashed focus:border-blue-400 px-1`}
                                onClick={() => { setSelectWord(index) }}
                            >
                                {item.word}
                            </button>
                        );
                    } else {
                        return <span key={index} className="text-gray-500">{item.word}</span>;
                    }
                })}
            </div>
            <div>
                <div
                    className="grid text-xs"
                    style={{
                        gridTemplateColumns: `repeat(${cols}, 7em)`,
                        gridTemplateRows: `repeat(${rows},3em)`,
                    }}
                >
                    {grid.map((item: any, index: number) => (
                        <div
                            key={"grid-" + index}
                            className={`grid-box ${index===selectBox?"select":""} ${item?.func}`}
                            onClick={() => setSelectBox(index)}
                            onDoubleClick={()=>remove(item.content.index,index)}
                        >
                            {item?.content.word}
                        </div>
                    ))}
                </div>
                <div className='mt-1'>
                    {
                        types.map((item: string, index: number) => {
                            return <button className={`px-1 py-1 rounded-md border border-black mr-2`} key={index} onClick={()=>handleSet(item)}>{item.replace('_', ' ')}</button>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Game;