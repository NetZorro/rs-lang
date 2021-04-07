import React, {useContext, useEffect, useState} from "react";
import {wordsService} from "../../../services";
import {IWord} from "../../../interfaces";
import {playAudio} from "../../../components/CategoryWords/playAudio";
import './AudioCallGame.css';
import {AudioCallGameWords} from "./AudioCallGameWords";
import {ChooseLevel} from "./ChooseLevel";
import {FinishPage} from "./FinishPage";

export interface IStats {
  success: number
  fail: number
}

const defaultStats: IStats = {
  success: 0,
  fail: 0
};

export const AudioCallGame: React.FC = () => {
  const [words, setWords] = useState<Array<IWord>>([]);
  const [category, setCategory] = useState<string>('');
  const [page, setPage] = useState<string>('0');
  const [finish, setFinish] = useState<boolean>(false);
  const [stats, setStats] = useState<IStats>(defaultStats);

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
    return <FinishPage stats={stats}/>;
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
      <AudioCallGameWords
        hiddenWord={hiddenWord}
        fiveRandom={fiveRandom}
        stats={stats}
      />
      <button className='button-next' onClick={nextWord}>next</button>
    </div>
  );
}
