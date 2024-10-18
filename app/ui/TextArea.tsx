import { useState, useEffect } from "react";

export default function TextArea({
  handleSelect,
  selected,
}: {
  handleSelect: any;
  selected: any;
}) {
  const [clickWord, setClickWord] = useState<string>();

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

  const wordsAndPunctuation = text.split(/(\b\w+\b)/g).filter(Boolean);

  function handleClick(word: string) {
    handleSelect(word);
    setClickWord(word);
  }
  useEffect(() => {
    if (clickWord && selected.includes(clickWord)) {
      setClickWord(undefined);
    }
  }, [selected, clickWord]);
  return (
    <div
      id="text_area"
      className="bg-white w-fit h-fit p-2 overflow-scroll text-wrap whitespace-pre-line flex-auto"
    >
      {wordsAndPunctuation.map((word: string, index: number) => {
        return /^\w+$/.test(word) ? (
          <button
            key={index}
            disabled={selected.includes(`${index}-${word}`)}
            className={`${
              clickWord === `${index}-${word}` ? "text-select" : ""
            } border-none bg-white p-0 m-0 ${
              selected.includes(`${index}-${word}`) ? "text-gray-400" : ""
            }`}
            onClick={() => handleClick(`${index}-${word}`)}
          >
            {word}
          </button>
        ) : (
          <span key={index}>{word}</span>
        );
      })}
    </div>
  );
}
