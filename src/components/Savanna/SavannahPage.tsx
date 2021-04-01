import React, {useEffect, useReducer, useState} from "react";
import {ISavannahAction, ISavannahState, IWordWithSuccess} from "./interfacesSavannah";
import cl from "classnames"

import './savanna.scss'
import WordServices from "./WordServices";
import {getRandomInt, playAudio} from "./helpers";

import audio from "./images/audio.svg";

// @ts-ignore
import correctAudio from './audio/correct.mp3'
// @ts-ignore
import errorAudio from "./audio/error.mp3";



function savannahReducer(state: ISavannahState, action: ISavannahAction): ISavannahState {
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
        default: throw new Error('Unexpected action');
    }
}

const initialState = {
    inProgress: false,
    attempt: 5,
    gameWordArray: [] as IWordWithSuccess[],
    roundWordArray: [] as IWordWithSuccess[],
    result: false
}

const SavannahPage: React.FC = () => {

    const [gameState, changeGameState] = useReducer<React.Reducer<ISavannahState, ISavannahAction>>(savannahReducer, initialState);
    const [selectWordId, setSelectWordId] = useState<string>('');
    const [refreshRound, setRefreshRound] = useState<boolean>(false);
    const [errorWords, setErrorWords] = useState<number>(0);
    const [successWords, setSuccessWords] = useState<number>(0);

    // const [isGuessed, setIsGuessed] = useState<boolean>(false);

    const isGuessed = selectWordId === gameState.gameWordArray[gameState.gameWordArray.length - 1]?.id;

    const getWordDataNewRound = async () => {
        setSelectWordId('');

        const wordsList = await WordServices.getWordList(0, 20); // - получаем IWord из вне, а дальше делаем все что надо

        const wordsListWithSuccess = WordServices.setFalseToSuccessField(wordsList);
        const idx = getRandomInt(wordsList.length - 1);

        const xRoundWordArray = WordServices.getRoundWordsArray(wordsListWithSuccess, wordsListWithSuccess[idx], idx, 3);

        changeGameState({type: 'ADDWORD', payload: {...gameState, gameWordArray:  [...gameState.gameWordArray as IWordWithSuccess[], wordsListWithSuccess[idx]] }})
        changeGameState({type: 'NEWROUND', payload: {...gameState, roundWordArray:  xRoundWordArray }})
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
            setRefreshRound(true);
        }
    }, [selectWordId])

    useEffect(() => {
        console.log('gameState.inProgress useEffect >>', gameState.inProgress);

        const getWordData = async () => {
            await getWordDataNewRound();
        };

        if (gameState.inProgress) {
            getWordData();
        }

    },[gameState.inProgress]);


    useEffect(() => {
        console.log('gameState useEffect >>', gameState.attempt);

        if (gameState.attempt === 0) {
            changeGameState({type: 'RESULT', payload: {...gameState, result:  true }})
            setRefreshRound(false);
        }
    }, [gameState.attempt]);

    useEffect(() => {
        if (gameState.result) {
            setErrorWords(WordServices.getCountError(gameState.gameWordArray));
            setSuccessWords(WordServices.getCountSuccess(gameState.gameWordArray));
        }
    }, [gameState.result])


    function Card(word: IWordWithSuccess, idx: number) {
        let isSelected = selectWordId === word.id;

        return (
            <div className={cl('cards__item', {
                'activeCard': (isSelected && isGuessed) || (selectWordId !== '' && !isGuessed && word.id === gameState.gameWordArray[gameState.gameWordArray.length - 1].id),
                'activeCardError': isSelected && !isGuessed
            })}
                 data-wordid={word.id}
                 onClick={(event) => {registerCardsClickEvent(event, word.id)}}
            >
                <span className="cards__item-number" data-wordid={word.id}>{idx + 1}</span>
                <p className="cards__item-word" data-wordid={word.id}>{word.wordTranslate}</p>
                <p className="cards__item-transcription" data-wordid={word.id}>{word.transcription}</p>
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


    function registerCardsClickEvent(event: React.MouseEvent<HTMLDivElement>, wordId: string) {
        console.log('event >> ', wordId);
        let arr = gameState.gameWordArray

        setSelectWordId(wordId);

        if (wordId === gameState.gameWordArray[gameState.gameWordArray.length - 1].id) {
            playAudio('audio', correctAudio);
            arr[arr.length - 1].success = true;
            changeGameState({type: 'ADDWORD', payload: {...gameState, gameWordArray:  arr}})
        } else {
            playAudio('audio', errorAudio);
            changeGameState({type: 'SETATTEMPT', payload: {...gameState, attempt: gameState.attempt - 1}})
        }


        // const currentWord = document.querySelector('.current__word');
        //
        // this.stopTimer();
        // currentWord.classList.add('fadeout');
        //
        //     if (clickedCard === this.gameWordArray[this.gameWordArray.length - 1].id) {
        //         this.setActiveCard(this.gameWordArray[this.gameWordArray.length - 1].id, 'activeCard');
        //         this.gameWordArray[this.gameWordArray.length - 1].success = true;
        //         playAudio('audio', correctAudio);
        //         this.restartTimer();
        //     } else {
        //         this.attempt -= 1;
        //         this.setActiveCard(clickedCard, 'activeCardError');
        //         this.setActiveCard(this.gameWordArray[this.gameWordArray.length - 1].id, 'activeCard');
        //         playAudio('audio', errorAudio);
        //         this.restartTimer();
        //     }
    }

    return (
        <div className="main-savannah mt-0">

            { !gameState.inProgress &&

                <div className="start-page d-flex align-items-center">
                    <div className="container px-5 text-center">
                        <h1 className="start-page__title">SAVANNAH</h1>
                        <p className="start-page__intro-text">
                            The Savannah training helps you build your vocabulary.<br/> The more words you know, the
                            more
                            experience points you'll get.
                        </p>
                        <a href="#" onClick={() => changeGameState({type: 'INPROGRESS', payload: {...gameState, inProgress: true}})}
                           className="btn btn-lg btn-primary mt-2 start-page__intro-btn">Start</a>
                    </div>
                </div>
            }


            { (gameState.inProgress && !gameState.result) &&

                <div className="savanna-container flex-column justify-content-center align-items-center">
                    <div className="savanna-wrapper d-flex flex-column align-items-center container">
                        <div className="savanna-info d-flex flex-row align-items-center justify-content-between">
                            <span className="timer"/>
                          <div className="savanna-info__attempt"> Attempt: {gameState.attempt} </div>
                        </div>

                        <div className="current">
                          <p className="current__word text-primary">
                              {gameState.gameWordArray[gameState.gameWordArray.length - 1]?.word}
                          </p>
                        </div>

                      <div className="cards">
                          {
                              gameState.roundWordArray.map((item: IWordWithSuccess, idx: number) => {
                                return Card(item, idx);
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
                            <a href="#" className="btn btn-primary btn-md result-page__new-game">New game</a>
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

            <audio className="audio"/>

        </div>
    );
};

export default SavannahPage;
