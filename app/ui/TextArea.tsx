import { useState, useEffect } from "react";

export default function TextArea({
  handleSelect,
  selected,
}: {
  handleSelect: any;
  selected: any;
}) {
  const [clickWord, setClickWord] = useState<string>();

  const text = ` As I said this I suddenly beheld the figure of a man, at some distance, advancing towards me with superhuman speed. He bounded over the crevices in the ice, among which I had walked with caution; his stature, also, as he approached, seemed to exceed that of man. I was troubled; a mist came over my eyes, and I felt a faintness seize me, but I was quickly restored by the cold gale of the mountains. I perceived, as the shape came nearer (sight tremendous and abhorred!) that it was the wretch whom I had created. I trembled with rage and horror, resolving to wait his approach and then close with him in mortal combat. He approached; his countenance bespoke bitter anguish, combined with disdain and malignity, while its unearthly ugliness rendered it almost too horrible for human eyes. But I scarcely observed this; rage and hatred had at first deprived me of utterance, and I recovered only to overwhelm him with words expressive of furious detestation and contempt.

“Devil,” I exclaimed, “do you dare approach me? And do not you fear the fierce vengeance of my arm wreaked on your miserable head? Begone, vile insect! Or rather, stay, that I may trample you to dust! And, oh! That I could, with the extinction of your miserable existence, restore those victims whom you have so diabolically murdered!”

“I expected this reception,” said the dæmon. “All men hate the wretched; how, then, must I be hated, who am miserable beyond all living things! Yet you, my creator, detest and spurn me, thy creature, to whom thou art bound by ties only dissoluble by the annihilation of one of us. You purpose to kill me. How dare you sport thus with life? Do your duty towards me, and I will do mine towards you and the rest of mankind. If you will comply with my conditions, I will leave them and you at peace; but if you refuse, I will glut the maw of death, until it be satiated with the blood of your remaining friends.”

“Abhorred monster! Fiend that thou art! The tortures of hell are too mild a vengeance for thy crimes. Wretched devil! You reproach me with your creation, come on, then, that I may extinguish the spark which I so negligently bestowed.”

My rage was without bounds; I sprang on him, impelled by all the feelings which can arm one being against the existence of another.

He easily eluded me and said,

“Be calm! I entreat you to hear me before you give vent to your hatred on my devoted head. Have I not suffered enough, that you seek to increase my misery? Life, although it may only be an accumulation of anguish, is dear to me, and I will defend it. Remember, thou hast made me more powerful than thyself; my height is superior to thine, my joints more supple. But I will not be tempted to set myself in opposition to thee. I am thy creature, and I will be even mild and docile to my natural lord and king if thou wilt also perform thy part, the which thou owest me. Oh, Frankenstein, be not equitable to every other and trample upon me alone, to whom thy justice, and even thy clemency and affection, is most due. Remember that I am thy creature; I ought to be thy Adam, but I am rather the fallen angel, whom thou drivest from joy for no misdeed. Everywhere I see bliss, from which I alone am irrevocably excluded. I was benevolent and good; misery made me a fiend. Make me happy, and I shall again be virtuous.”

“Begone! I will not hear you. There can be no community between you and me; we are enemies. Begone, or let us try our strength in a fight, in which one must fall.”

“How can I move thee? Will no entreaties cause thee to turn a favourable eye upon thy creature, who implores thy goodness and compassion? Believe me, Frankenstein, I was benevolent; my soul glowed with love and humanity; but am I not alone, miserably alone? You, my creator, abhor me; what hope can I gather from your fellow creatures, who owe me nothing? They spurn and hate me. The desert mountains and dreary glaciers are my refuge. I have wandered here many days; the caves of ice, which I only do not fear, are a dwelling to me, and the only one which man does not grudge. These bleak skies I hail, for they are kinder to me than your fellow beings. If the multitude of mankind knew of my existence, they would do as you do, and arm themselves for my destruction. Shall I not then hate them who abhor me? I will keep no terms with my enemies. I am miserable, and they shall share my wretchedness. Yet it is in your power to recompense me, and deliver them from an evil which it only remains for you to make so great, that not only you and your family, but thousands of others, shall be swallowed up in the whirlwinds of its rage. Let your compassion be moved, and do not disdain me. Listen to my tale; when you have heard that, abandon or commiserate me, as you shall judge that I deserve. But hear me. The guilty are allowed, by human laws, bloody as they are, to speak in their own defence before they are condemned. Listen to me, Frankenstein. You accuse me of murder, and yet you would, with a satisfied conscience, destroy your own creature. Oh, praise the eternal justice of man! Yet I ask you not to spare me; listen to me, and then, if you can, and if you will, destroy the work of your hands.”

“Why do you call to my remembrance,” I rejoined, “circumstances of which I shudder to reflect, that I have been the miserable origin and author? Cursed be the day, abhorred devil, in which you first saw light! Cursed (although I curse myself) be the hands that formed you! You have made me wretched beyond expression. You have left me no power to consider whether I am just to you or not. Begone! Relieve me from the sight of your detested form.”

“Thus I relieve thee, my creator,” he said, and placed his hated hands before my eyes, which I flung from me with violence; “thus I take from thee a sight which you abhor. Still thou canst listen to me and grant me thy compassion. By the virtues that I once possessed, I demand this from you. Hear my tale; it is long and strange, and the temperature of this place is not fitting to your fine sensations; come to the hut upon the mountain. The sun is yet high in the heavens; before it descends to hide itself behind your snowy precipices and illuminate another world, you will have heard my story and can decide. On you it rests, whether I quit for ever the neighbourhood of man and lead a harmless life, or become the scourge of your fellow creatures and the author of your own speedy ruin.”

As he said this he led the way across the ice; I followed. My heart was full, and I did not answer him, but as I proceeded, I weighed the various arguments that he had used and determined at least to listen to his tale. I was partly urged by curiosity, and compassion confirmed my resolution. I had hitherto supposed him to be the murderer of my brother, and I eagerly sought a confirmation or denial of this opinion. For the first time, also, I felt what the duties of a creator towards his creature were, and that I ought to render him happy before I complained of his wickedness. These motives urged me to comply with his demand. We crossed the ice, therefore, and ascended the opposite rock. The air was cold, and the rain again began to descend; we entered the hut, the fiend with an air of exultation, I with a heavy heart and depressed spirits. But I consented to listen, and seating myself by the fire which my odious companion had lighted, he thus began his tale. `;
  // const text='I bite my thumb sir'

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
      className="bg-white w-full h-[47vh] p-2 overflow-y-scroll text-wrap whitespace-pre-line flex-auto border border-gray-200 rounded-sm"
    >
      {wordsAndPunctuation.map((word: string, index: number) => {
        return /^\w+$/.test(word) ? (
          <button
            key={index}
            disabled={selected.includes(`${index}-${word}`)}
            className={`${
              clickWord === `${index}-${word}` ? "text-select" : ""
            } border-none bg-white p-0 m-0 ${
              selected.includes(`${index}-${word}`) ? "text-white" : ""
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
