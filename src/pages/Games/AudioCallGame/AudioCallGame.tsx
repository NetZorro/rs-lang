import React, {useContext, useEffect, useState} from "react";
import {wordsService} from "../../../services";
import {IWord} from "../../../interfaces";
import {playAudio} from "../../../components/CategoryWords/playAudio";
import './AudioCallGame.css';
import {AudioCallGameWords} from "./AudioCallGameWords";
import {ChooseLevel} from "./ChooseLevel";

export const AudioCallGame: React.FC = () => {
  const [words, setWords] = useState<Array<IWord>>([]);
  const [category, setCategory] = useState<string>('');
  const [page, setPage] = useState<string>('0');
  const [finish, setFinish] = useState<boolean>(false);

  useEffect(() => {
    if (!category) return;

    if(parseInt(page) === 10) {
      setFinish(true);
    }

    wordsService
      .getWords(category, page)
      .then((words) => {
          if (words) return setWords(words);
          setFinish(true);
        }
      );
  }, [page, category]);

  if (finish) {
    return <div>Finish page should be displayed here!</div>;
  }

  if (!category) {
    return <ChooseLevel setCategory={setCategory}/>;
  }

  if (words.length === 0) {
    return <div>Loading...</div>;
  }

  const fiveRandom: Array<IWord> = [];

  for (const word of words) {
    const random = Math.floor(Math.random() * words.length);
    if (!fiveRandom.includes(words[random])) {
      fiveRandom.push(words[random]);
    }
    if (fiveRandom.length === 5) break
  }

  const hiddenWord = fiveRandom[Math.floor(Math.random() * fiveRandom.length)];
  playAudio(hiddenWord.audio);

  const nextWord = () => {
    setWords([]);
    setPage((parseInt(page) + 1).toString());
  }

  return (
    <div className='audioCallGame-container'>
      <AudioCallGameWords hiddenWord={hiddenWord} fiveRandom={fiveRandom}/>
      <button className='button-next' onClick={nextWord}>next</button>
    </div>
  );
}
