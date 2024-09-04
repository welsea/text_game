import DraggableButton from "./button";

const TextArea: React.FC<{ text: string }> = ({ text }) => {
    const wordsAndPunctuation = text.split(/(\b\w+\b)/g).filter(Boolean);

    return (
        <div className="w-5/12">
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
        </div>
    );
};

export default TextArea