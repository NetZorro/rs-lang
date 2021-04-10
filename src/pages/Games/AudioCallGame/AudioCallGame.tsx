import React, {useEffect, useState} from "react";
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
  const [category, setCategory] = useState<string>('');
  const [page, setPage] = useState<string>('0');
  const [finish, setFinish] = useState<boolean>(false);
  const [stats, setStats] = useState<IStats>({...defaultStats});
  const [fiveRandom, setFiveRandom] = useState<Array<IWord>>([]);
  const [hiddenWord, setHiddenWord] = useState<IWord | undefined>();
  const [selected, setSelected] = useState<IWord|undefined>();
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const [screenMood, setScreenMood] = useState<string>('full screen')

  useEffect(() => {
    if (!category) return;

    if (parseInt(page) === 10) {
      return setFinish(true);
    }

    wordsService
      .getWords(category, page)
      .then((words) => {

          if (!words) return setFinish(true);
          const randomWords: Array<IWord> = [];
          for (const word of words) {
            const random = Math.floor(Math.random() * words.length);
            if (!randomWords.includes(words[random])) {
              randomWords.push (words[random]);
            }
            if (randomWords.length === 5) break
          }

          const hiddenWord = randomWords[Math.floor(Math.random() * randomWords.length)];
          playAudio(hiddenWord.audio);
          setFiveRandom(randomWords);
          setHiddenWord(hiddenWord);
          setSelected(undefined)
        }
      );
  }, [page, category]);

  if (finish) {
    return <FinishPage stats={stats}/>;
  }

  if (!category) {
    return <ChooseLevel setCategory={setCategory}/>;
  }

  if (fiveRandom.length === 0 || !hiddenWord) {
    return (
      <div className='preloader-container'>
        <div className="mk-spinner-wrap">
          <div className="mk-spinner-ring"></div>
        </div>
      </div>
    );
  }

  const nextWord = () => {
    setPage((parseInt(page) + 1).toString());
  }

  const toggleScreen = () => {
    setFullScreen(!fullScreen)
    setScreenMood('exit')
  }

  return (
    <div className={'audioCallGame-container fullScreen' + fullScreen}>
      <AudioCallGameWords
        hiddenWord={hiddenWord}
        fiveRandom={fiveRandom}
        stats={stats}
        selected={selected}
        setSelected={setSelected}
      />
      <button className='button-next' onClick={nextWord}>next</button>
      <button type="button" onClick={toggleScreen}>{screenMood}</button>
    </div>
  );
}
