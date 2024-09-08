import Button from "./button";

function TextArea({text,handleWord}:{text:string, handleWord:any}){
    const wordsAndPunctuation = text.split(/(\b\w+\b)/g).filter(Boolean);
    function handleSelect(word:string){
        handleWord(word)
    }
    return (
        <div className="w-4/12">
            {wordsAndPunctuation.map((item, index) => {
                if (/^\w+$/.test(item)) {
                    return (
                        <Button
                            key={index}
                            word={item}
                            isSelect={false}
                            handleSelect={handleSelect}
                        />
                    );
                } else {
                    return <span key={index}>{item}</span>;
                }
            })}
        </div>
    );
};

export default TextArea