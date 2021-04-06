import {IWord} from "../../../interfaces";
import trueIcon from "../../../assets/icon/true.png";
import falseIcon from "../../../assets/icon/false.png";
import volume from "../../../assets/icon/volume-up.svg";
import {playAudio} from "../../../components/CategoryWords/playAudio";
import React, {useEffect, useState} from "react";
import {baseURL} from "../../../constants/baseURL";

interface IAudioCallGameWords {
  hiddenWord: IWord,
  fiveRandom: Array<IWord>
}

export const AudioCallGameWords = ({hiddenWord, fiveRandom}: IAudioCallGameWords) => {

  const [selected, setSelected] = useState<IWord|undefined>();

  const checkWord = (e: any, word: IWord) => {
    setSelected(word);
  }

  const wordsJsx = fiveRandom.map((word: IWord) => {
    let icon;

    if (selected && selected.word === word.word) {
      const pathToIcon = selected.word === hiddenWord.word ? trueIcon : falseIcon;
      icon = <img className='result-icon' src={pathToIcon}/>;
    }

    return (
      <div className='word-container'>
        {icon}
        <span
          className='option-word'
          data-word={word.word}
          onClick={(e) => selected ? '' : checkWord(e, word)}
        >
          {word.wordTranslate}
        </span>
      </div>
    );
  });


  return (
    <>
      <div className='hiddenWord-container'>
        <div>
        {selected &&
          <img className='hiddenWord-img' src={`${baseURL}${hiddenWord.image}`}/>
        }
        </div>
        <img className='volume-icon' src={volume} alt='volume'
             onClick={() => playAudio(hiddenWord.audio)}
        />
        {selected &&
          <span>
            {hiddenWord.word}
          </span>
        }
      </div>
      <div className='words-container'>
        {wordsJsx}
      </div>
    </>
  )
}
