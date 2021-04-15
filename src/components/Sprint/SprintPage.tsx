import React, {useCallback, useContext, useEffect, useReducer, useState} from "react";
import {ISavannahAction, ISavannahState, IWordWithSuccess, IWord} from "Entities/IWordsService";
import cl from "classnames"

import { useParams } from "react-router-dom";
import './sprint.scss'
import WordServices from "./WordServices";
import {getRandomInt, playAudio} from "./helpers";

import audio from "./images/audio.svg";

// @ts-ignore
import correctAudio from './audio/correct.mp3'
// @ts-ignore
import errorAudio from "./audio/error.mp3";
import {Context} from "../../reducer";
import {userWords} from "../../services/userWords";



function sprintReducer(state: ISavannahState, action: ISavannahAction): ISavannahState {
    switch (action.type) {
        case 'INPROGRESS': {
            return {
                ...state,
                inProgress: true
            };
        }
        case 'NOTEINPROGRESS': {
            return {
                ...state,
                inProgress: false
            }
        }
        case 'ADDWORD': {
            return {
                ...state,
                gameWordArray: action.payload.gameWordArray
            }
        }
        case 'NEWROUND': {
            return {
                ...state,
                roundWordArray: action.payload.roundWordArray
            }
        }
        case 'SETATTEMPT': {
            return {
                ...state,
                attempt: action.payload.attempt
            }
        }
        case 'RESULT': {
            return {
                ...state,
                result: action.payload.result
            }
        }
        case 'SETDEFAULT': {
            return {
                ...action.payload
            }
        }

        default: return state;
    }
}

const initialState = {
    inProgress: false,
    attempt: 5,
    gameWordArray: [] as IWordWithSuccess[],
    roundWordArray: [] as IWordWithSuccess[],
    result: false
}

const variantArray = ["<- Неверно", "Верно ->"];


const SprintPage: React.FC = () => {
    const { state, dispatch } = useContext(Context);
    const { user, login } = state;
    const { userId } = user;

    const [gameState, changeGameState] = useReducer<React.Reducer<ISavannahState, ISavannahAction>>(sprintReducer, initialState);

    const [selectWordId, setSelectWordId] = useState<string>('');
    const [refreshRound, setRefreshRound] = useState<boolean>(false);
    const [errorWords, setErrorWords] = useState<number>(0);
    const [successWords, setSuccessWords] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [myIntervalId, setMyIntervalId] = useState<any>(0);
    const [category, setCategory] = useState<string>('0');
    const { group, page, source } = useParams<{ group: string, page: string, source: string }>();
    const [delta, setDelta] = useState<number>(10);
    const [deltaCount, setDeltaCount] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [isFullScreen, setIsFullScree] = useState(false);



    const isGuessed = selectWordId === 'true';

    function toggleFullScreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullScree(false);
        } else {
            document.getElementById('fsArea')!.requestFullscreen().catch((e) => {
                console.log('Full Screen error >>', e);
            })
            setIsFullScree(true);
        }
    }

    const handleUserKeyPress = useCallback(event => {
        const { key } = event;

        let varTrueOrFalse = '';

        if (key === 'ArrowLeft') {
            varTrueOrFalse = gameState.gameWordArray[gameState.gameWordArray.length - 1]?.id !== gameState.roundWordArray[gameState.roundWordArray.length - 1]?.id ? 'true' : 'false';
        }

        if (key === 'ArrowRight') {
            varTrueOrFalse = gameState.gameWordArray[gameState.gameWordArray.length - 1]?.id === gameState.roundWordArray[gameState.roundWordArray.length - 1]?.id ? 'true' : 'false';
        }

        let arr = gameState.gameWordArray;

        console.log('arr >>', arr, varTrueOrFalse, gameState);

        if (selectWordId === '') {
            setSelectWordId(varTrueOrFalse);

            if (varTrueOrFalse === 'true') {
                playAudio('audio', correctAudio);
                arr[arr.length - 1].success = true;
                changeGameState({type: 'ADDWORD', payload: {...gameState, gameWordArray: arr}})
            } else {
                playAudio('audio', errorAudio);
            }
        }
    }, [gameState.roundWordArray]);

    useEffect(() => {
        document.addEventListener('keyup', handleUserKeyPress);

        return () => {
            document.removeEventListener('keyup', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);


    const getWordDataNewRound = async () => {
        setSelectWordId('');

        const wordSelection = getRandomInt(2); // 0 - неверное, 1 - верное

        // const wordsList = await WordServices.getWordList(0, 20); // - получаем IWord из вне, а дальше делаем все что надо
        let wordsList = [] as IWord[]; // с учебника

        if (login) {
            if ((source === 'textbook') && (group === undefined) && (page === undefined)) {
                // Главная
                while (wordsList.length === 0) {
                    const p = getRandomInt(30);
                    wordsList = await WordServices.getWordListAPI(userId, category, String(p), 'textbook')
                }
            } else if ((source === 'textbook') && (group !== undefined) && (page !== undefined)) {

                wordsList = await WordServices.getWordListAPI(userId, group, page, 'textbook')
            } else if ((source === 'difficult') && (group !== undefined) && (page !== undefined)) {

                wordsList = await WordServices.getWordListAPI(userId, group, page, 'difficult')
            }

        } else {
            if ((source === 'textbook') && (group === undefined) && (page === undefined)) {
                // Главная
                while (wordsList.length === 0) {
                    const p = getRandomInt(30);
                    wordsList = await WordServices.getWordList(Number(category), p);
                }
            }
        }

        const wordsListWithSuccess = WordServices.setFalseToSuccessField(wordsList);

        console.log('wordsListWithSuccess >>', wordsListWithSuccess);

        let idx = 0;

        let xRoundWordArray = [] as IWordWithSuccess[];

        /* Делаем проверку что бы слова не повторялись */
        if (gameState.gameWordArray.length === wordsListWithSuccess.length) {
            changeGameState({type: 'SETATTEMPT', payload: {...gameState, attempt: 0}})
        } else {
            let b = false;
            let count = 0;
            while (!b) {
                idx = getRandomInt(wordsList.length);

                const index = gameState.gameWordArray.findIndex((item) => item.id === wordsListWithSuccess[idx].id);

                if (index === -1) {

                    if (wordSelection === 0) {
                        xRoundWordArray = WordServices.getRoundWordsArray(wordsListWithSuccess, wordsListWithSuccess[idx], idx, 1, false);

                    } else {
                        xRoundWordArray.push(wordsListWithSuccess[idx]);
                    }

                    b = true

                    console.log('xRoundWordArray >>', xRoundWordArray);


                    changeGameState({type: 'ADDWORD',
                        payload: {
                            ...gameState,
                            gameWordArray: [...gameState.gameWordArray as IWordWithSuccess[], wordsListWithSuccess[idx]]
                        }
                    })
                    changeGameState({type: 'NEWROUND', payload: {...gameState, roundWordArray: xRoundWordArray}})

                }

                count = count + 1;

                if (count === 1000) {
                    changeGameState({type: 'SETATTEMPT', payload: {...gameState, attempt: 0}});
                    console.log('Привышение кол-ва интераций!');
                    return;
                }
            }
        }
    };


    useEffect(() => {
        console.log('refreshRound useEffect >>', refreshRound);

        if (refreshRound) {
            const getWordData = async () => {
                await getWordDataNewRound();
            };

            getWordData();
        }

        setRefreshRound(false);
    }, [refreshRound])

    useEffect(() => {
        console.log('selectWordId useEffect >>', selectWordId);

        if (selectWordId !== '') {

            if (selectWordId === 'true') {
                setDeltaCount(prevState => prevState + 1);
                setScore(prevState => prevState + delta);
            }

            setTimeout(() => {
                if (gameState.attempt > 0) {
                    setRefreshRound(true);
                }
            }, 2000);
        }
    }, [selectWordId])

    useEffect(() => {
        if ((deltaCount === 3) && (delta === 10)) {
            setDelta(20);
            setDeltaCount(0);
        } else if ((deltaCount === 3) && (delta === 20)) {
            setDelta(40)
            setDeltaCount(0);
        } else if ((deltaCount === 3) && (delta === 40)) {
            setDelta(80)
            setDeltaCount(0);
        }
    }, [delta, deltaCount])


    useEffect(() => {
        console.log('gameState.inProgress useEffect >>', gameState.inProgress);

        if (gameState.inProgress) {
            setRefreshRound(true);
        }

        setTimeLeft(60);

        const timerID = setInterval(() => {
            setTimeLeft((prevValue) => {
                if (prevValue === 0) {
                    clearInterval(timerID);
                    clearInterval(myIntervalId);
                    setSelectWordId('');
                    setRefreshRound(false);
                    playAudio('audio', errorAudio);
                    changeGameState({type: 'RESULT', payload: {...gameState, result:  true }})
                    return 0;
                }

                return prevValue - 1;
            });
        }, 1000);

        setMyIntervalId(timerID);

        const cleanup = () => {
            console.log('CLEAR TIMER')

            clearInterval(timerID);
        };

        return cleanup;

    },[gameState.inProgress]);

    useEffect(() => {
        if (gameState.result) {
            setErrorWords(WordServices.getCountError(gameState.gameWordArray));
            setSuccessWords(WordServices.getCountSuccess(gameState.gameWordArray));

            /* На этом этапе мы должны отправить инфу на сервак */
            gameState.gameWordArray.forEach((item: IWordWithSuccess) => {
                if (item.success) {
                    userWords.addUserWords(userId, item.id, 'games',{won: (item.userWord?.optional?.won || 0) + 1 , lost: (item.userWord?.optional?.won || 0)}).then(r => console.log('ok'));
                } else {
                    userWords.addUserWords(userId, item.id, 'games',{won: (item.userWord?.optional?.won || 0), lost: (item.userWord?.optional?.won || 0) + 1}).then(r => console.log('ok'));
                }
            })

        }
    }, [gameState.result])


    function variantCard(variant: string, varTrueOrFalse: string) {
        let isSelected = selectWordId === varTrueOrFalse;

        return (
            <div className={cl('cards__item', {
                'activeCard': (isSelected && isGuessed),
                'activeCardError': (isSelected && !isGuessed)
            })}
                 data-value={varTrueOrFalse}
                 onClick={(event) => {registerCardsClickEvent(event, varTrueOrFalse)}}
            >
                <p className="cards__item-word" data-value={varTrueOrFalse}>{variant}</p>
            </div>
        )
    }

    function ResultWord(word: IWordWithSuccess) {
        return (
            <div className="result-page__item" data-wordid={word.id} onClick={(event) => {registerResultWordClickEvent(event, word.audio)}}>
                <span className="result-page__item-number">
                    <img data-wordid={word.id} src={audio} alt="audio icon" />
                </span>
                <p className="result-page__item-word" data-wordid={word.id}>{word.word}</p>
                <p className="result-page__item-transcription" data-wordid={word.id}>{word.wordTranslate}</p>
            </div>
        )
    }

    function registerResultWordClickEvent(event: React.MouseEvent<HTMLDivElement>, wordAudio: string) {
        playAudio('audio', `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${wordAudio}`);
    }


    function registerCardsClickEvent(event: React.MouseEvent<HTMLDivElement>, varTrueOrFalse: string) {

        if (selectWordId === '') {
            let arr = gameState.gameWordArray

            setSelectWordId(varTrueOrFalse);
            // clearInterval(myIntervalId);

            if (varTrueOrFalse === 'true') {
                playAudio('audio', correctAudio);
                arr[arr.length - 1].success = true;
                changeGameState({type: 'ADDWORD', payload: {...gameState, gameWordArray: arr}})
            } else {
                playAudio('audio', errorAudio);
                // changeGameState({type: 'SETATTEMPT', payload: {...gameState, attempt: gameState.attempt - 1}})
            }
        }
    }

    return (
        <div className="main-savannah mt-0" id="fsArea">
            { !gameState.inProgress &&

                <div className="start-page d-flex align-items-center">
                    <div className="container px-5 text-center">
                        <h1 className="start-page__title">SPRINT</h1>
                        <p className="start-page__intro-text">
                          Описание игры спринт
                        </p>
                        {
                            (group === undefined) &&
                            <div>
                              <h2>Choose category</h2>
                              <select onChange={(e) => {
                                  setCategory(e.target.value)
                              }}>
                                <option value="" >Select Category</option>
                                <option value="0">Category 1</option>
                                <option value="1">Category 2</option>
                                <option value="2">Category 3</option>
                                <option value="3">Category 4</option>
                                <option value="4">Category 5</option>
                                <option value="5">Category 6</option>
                              </select>
                            </div>                        }

                        <a href="#" onClick={() => changeGameState({type: 'INPROGRESS', payload: {...gameState, inProgress: true}})}
                           className="btn btn-lg btn-primary mt-2 start-page__intro-btn">Start</a>
                    </div>
                </div>
            }


            { (gameState.inProgress && !gameState.result) &&

                <div className="savanna-container flex-column justify-content-center align-items-center">
                    <div className="savanna-wrapper d-flex flex-column align-items-center container">
                        <div className="savanna-info d-flex flex-row align-items-center justify-content-between">
                          <span className="timer">Time Left: {timeLeft}</span>
                          <div className="savanna-info__attempt"> Score: {score} Delta: +{delta} </div>
                        </div>

                        <div className="current">
                          <p className={cl('current__word',  'text-primary')}>
                              {gameState.gameWordArray[gameState.gameWordArray.length - 1]?.word}
                          </p>
                          <p className={cl('current__word',  'text-primary')}>
                              {gameState.roundWordArray[gameState.roundWordArray.length - 1]?.wordTranslate}
                          </p>
                        </div>

                      <div className="cards">
                          {
                              variantArray.map((item: string, idx: number) => {
                                  let varTrueOrFalse: string = '';
                                  if (idx === 0) {
                                      varTrueOrFalse = gameState.gameWordArray[gameState.gameWordArray.length - 1]?.id !== gameState.roundWordArray[gameState.roundWordArray.length - 1]?.id ? 'true' : 'false';
                                  } else {
                                      varTrueOrFalse = gameState.gameWordArray[gameState.gameWordArray.length - 1]?.id === gameState.roundWordArray[gameState.roundWordArray.length - 1]?.id ? 'true' : 'false';
                                  }

                                  return variantCard(item, varTrueOrFalse);
                              })

                          }
                      </div>
                    </div>
                </div>
            }

            { gameState.result &&
                <div className="result-page align-items-center justify-content-center">
                    <div className="result-page__container">
                        <p className="results__container--errors">Errors
                            <span className="result-page__errors-num">{errorWords}</span>
                        </p>
                        <div className="result-page__errors-item">
                            {
                                gameState.gameWordArray.map((item: IWordWithSuccess) => {
                                    if (!item.success) {
                                        return ResultWord(item);
                                    }
                                })
                            }
                        </div>
                        <p className="results__container--success mt-3">Success
                            <span className="result-page__success-num">{successWords}</span>
                        </p>
                        <div className="result-page__success-item">
                            {
                                gameState.gameWordArray.map((item: IWordWithSuccess) => {
                                    if (item.success) {
                                        return ResultWord(item);
                                    }
                                })
                            }

                        </div>

                        <div className="result-page__btns-res text-center mt-5">
                            <a href="#" className="btn btn-primary btn-md result-page__new-game"
                               onClick={() => {
                                   changeGameState({type: 'INPROGRESS', payload: {...gameState, inProgress: false}})
                                   changeGameState({type: 'SETDEFAULT', payload: {...initialState }})
                               }}>
                              New game
                            </a>
                        </div>
                    </div>
                </div>
            }

            <div className="statistics hidden">
            <div className="statistics__container">
            </div>

            <div className="statistics__btns">
            <a href="#" className="statistics__return">Close</a>
            </div>
            </div>

            <div className="fullScreen" onClick={() => toggleFullScreen()}>
                {isFullScreen ? 'Выйти из полноэкранного режима' : 'Развернуть на весь экран'}
            </div>

            <audio className="audio"/>

        </div>
    );
};

export default SprintPage;
