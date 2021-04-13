import React from "react";
import trueIcon from "assets/icon/true.png";
import falseIcon from "assets/icon/false.png";
import volume from "assets/icon/volume-up.svg";
import {playAudio} from "components/CategoryWords/playAudio";
import {baseURL} from "constants/baseURL";
import {IWord} from "Entities";
import {IAudioCallGameWords} from "./IAudioCallGame";

export const AudioCallGameWords = ({hiddenWord, fiveRandom, stats, selected, setSelected}: IAudioCallGameWords) => {

  const checkWord = (e: React.MouseEvent, word: IWord) => {
    setSelected(word);
    word.word === hiddenWord.word ? stats.success++ : stats.fail++;
  }


  const wordsJsx = fiveRandom.map((word: IWord) => {
    let icon;

    if (selected && selected.word === word.word) {
      const pathToIcon = selected.word === hiddenWord.word ? trueIcon : falseIcon;
      icon = <img className='result-icon' src={pathToIcon} alt='result icon'/>;
    }

    return (
      <div className='word-container'>
        {icon}
        <span
          key={word.id}
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
          <img className='hiddenWord-img' src={`${baseURL}${hiddenWord.image}`} alt='hidden word image'/>
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
