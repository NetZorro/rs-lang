import React, {useEffect, useReducer, useState} from "react";
import cl from "classnames"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import './speakit.scss'

// @ts-ignore
import correctAudio from './audio/correct.mp3'
// @ts-ignore
import errorAudio from "./audio/error.mp3";
import audio from "./images/audio.svg";
import blank from "./images/blank.jpg"

import {ISpeakitAction, ISpeakitState, IWordWithSuccess} from "./interfacesSpeakit";
import WordServices from "./WordServices";
import {playAudio} from "./helpers";
import templatesURL from "./templatesURL";

function speakitReducer(state: ISpeakitState, action: ISpeakitAction): ISpeakitState {
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
        case 'NEWROUND': {
            return {
                ...state,
                roundWordArray: action.payload.roundWordArray
            }
        }
        case 'RESULT': {
            return {
                ...state,
                result: action.payload.result
            }
        }
        case 'ADDWORD': {
            return {
                ...state,
                roundWordArray: action.payload.roundWordArray
            }
        }
        case 'MICROPHONE': {
            return {
                ...state,
                microphoneOn: action.payload.microphoneOn
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
    roundWordArray: [] as IWordWithSuccess[],
    result: false,
    microphoneOn: false
}

const SpeakitPage: React.FC = () => {
    const [gameState, changeGameState] = useReducer<React.Reducer<ISpeakitState, ISpeakitAction>>(speakitReducer, initialState);
    const [selectWord, setSelectWord] = useState<IWordWithSuccess>({} as IWordWithSuccess);
    const { interimTranscript, finalTranscript, resetTranscript} = useSpeechRecognition();
    const [message, setMessage] = useState<string>('');
    const [restart, setRestart] = useState<boolean>(false);

    const getWordDataNewRound = async () => {
        const wordsList = await WordServices.getWordList(0, 20); // - получаем IWord из вне, а дальше делаем все что надо

        const wordsListWithSuccess = WordServices.setFalseToSuccessField(wordsList);

        const xRoundWordArray = WordServices.getRoundWordsArray(wordsListWithSuccess, 10);

        changeGameState({type: 'NEWROUND', payload: {...gameState, roundWordArray:  xRoundWordArray }})
    };

    useEffect(() => {
        if (finalTranscript !== '') {
            setMessage(finalTranscript);
            resetTranscript();
        }
    }, [interimTranscript, finalTranscript]);

    useEffect(() => {
        const word = WordServices.getWordByWord(gameState.roundWordArray, message);
        let arr = gameState.roundWordArray;

        if (word !== undefined) {
            setSelectWord(word);

            const idx = gameState.roundWordArray.indexOf(word);
            arr[idx].success = true;

            changeGameState({type: 'ADDWORD', payload: {...gameState, roundWordArray: arr}})

            playAudio('audio', correctAudio);

            const n = WordServices.getCountSuccess(arr);

            if (n === arr.length) {
                changeGameState({type: 'RESULT', payload: {...gameState, result:  true }});
            }

        }
    }, [message]);


    useEffect(() => {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            alert("Ups, your browser is not supported SpeechRecognition!");
        }
    }, []);

    useEffect(() => {
        setSelectWord({} as IWordWithSuccess);

        if (gameState.microphoneOn) {
            SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
        } else {
            SpeechRecognition.stopListening();
        }

    }, [gameState.microphoneOn])

    useEffect(() => {
        console.log('gameState.inProgress useEffect >>', gameState.inProgress);

        const getWordData = async () => {
            await getWordDataNewRound();
        };

        getWordData();

    },[gameState.inProgress]);

    useEffect(() => {
        if (restart) {

            const getWordData = async () => {
                await getWordDataNewRound();
            };

            getWordData();


            changeGameState({type: 'RESULT', payload: {...gameState, result:  false }});
            changeGameState({type: 'MICROPHONE', payload: {...gameState, microphoneOn:  false }})
            setRestart(false);
        }

    }, [restart])

    function registerCardsClickEvent(word: IWordWithSuccess) {
        if (!gameState.microphoneOn) {
            setSelectWord(word);
            playAudio('audio', templatesURL.getAudioURL(word.audio));
        }
    }

    function Card(word: IWordWithSuccess, idx: number) {
        // let isSelected = selectWordId === word.id;

        return (
            <div className={cl('cards__item', {
                'activeCard': (selectWord.id === word.id) || ((gameState.roundWordArray[gameState.roundWordArray.indexOf(word)].success) && gameState.microphoneOn),
            })}
                 data-wordid={word.id}
                 onClick={(event) => {registerCardsClickEvent(word)}}
            >
                <span className="cards__item--audio-icon" data-wordid={word.id}>
                    <img data-wordid={word.id} src={audio} alt="audio icon" /> </span>
                <p className="cards__item--word" data-wordid={word.id}>{word.word}</p>
                <p className="cards__item--transcription" data-wordid={word.id}>{word.transcription}</p>
            </div>
        )
    }

    function Star() {
        return (
            <div className="info__score--star"/>
        )
    }

    function ResultWord(word: IWordWithSuccess) {
        return (
            <div className="resultpage__item" data-wordid={word.id} onClick={(event) => {registerResultWordClickEvent(word.audio)}}>
                <span className="resultpage__item--audio-icon">
                    <img data-wordid={word.id} src={audio} alt="audio icon" />
                </span>
                <p className="resultpage__item--word" data-wordid={word.id}>{word.word}</p>
                <p className="resultpage__item--transcription" data-wordid={word.id}>{word.wordTranslate}</p>
                <p className="resultpage__item--translation" data-wordid={word.id}>{word.transcription}</p>
            </div>
        )
    }

    function registerResultWordClickEvent(wordAudio: string) {
        playAudio('audio', `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${wordAudio}`);
    }

    return (
        <div className="main-speakit mt-0">

            { !gameState.inProgress &&

                <div className="startpage d-flex align-items-center">
                  <div className="container px-5 text-center">
                    <h1 className="startpage--title">SpeakIt</h1>
                    <p className="startpage--intro-text">
                      The SpeakIt game helps you improve your english pronunciation. The more words you say correctly, the
                      more experience points you'll get.
                      Click on a word in order to hear word pronunciation before start the game. Turn on microphone and say
                      words.
                    </p>
                    <a href="#" className="startpage--intro-btn btn btn-info btn-lg mt-2"
                       onClick={() => changeGameState({type: 'INPROGRESS', payload: {...gameState, inProgress: true}})}>Start</a>
                  </div>
                </div>
            }


            { (gameState.inProgress && !gameState.result) &&
                <div className="speakit-container flex-column justify-content-center align-items-center py-4">
                  <div
                    className="speakit-wrapper d-flex flex-column justify-content-center align-items-center container">
                    <div
                      className="speakit-info d-flex flex-column flex-md-row align-items-center justify-content-md-between">
                      <div className="speakit-info__pages">
                        <span className="speakit-info__pages--page activePage" data-groupno="0"/>
                        <span className="speakit-info__pages--page" data-groupno="1"/>
                        <span className="speakit-info__pages--page" data-groupno="2"/>
                        <span className="speakit-info__pages--page" data-groupno="3"/>
                        <span className="speakit-info__pages--page" data-groupno="4"/>
                        <span className="speakit-info__pages--page" data-groupno="5"/>
                      </div>
                      <div className="speakit-info__score pt-3 pt-md-0">
                          {
                              gameState.roundWordArray.map((item: IWordWithSuccess, idx: number) => {
                                  if (item.success) {
                                      return Star();
                                  }
                              })
                          }
                      </div>
                    </div>
                    <div className="current d-flex flex-column align-items-center">
                        { selectWord.image ?
                            (<img className="current__image" src={templatesURL.getImageURL(selectWord.image)}
                                 alt="image of current word"/> ) :
                            (<img className="current__image" src={blank}
                                  alt="image of current word"/>)
                        }
                      <p className="current__translation text-center">{selectWord.wordTranslate }</p>
                      <input type="text" value={ message } className={cl('current__input', {
                          'none': !gameState.microphoneOn
                      })} readOnly />
                    </div>
                    <div className="cards">
                        {
                            gameState.roundWordArray.map((item: IWordWithSuccess, idx: number) => {
                                return Card(item, idx);
                            })

                        }
                    </div>
                    <div className="btns d-flex flex-column flex-md-row mt-4">
                      <a href="#" className="btn btn-lg btn-info btns__restart mb-2 mb-md-0 mx-0 mx-md-2" onClick={() => {setRestart(true)}}>Restart</a>
                      <a href="#" className="btn btn-lg btn-info btns__speak mb-2 mb-md-0 mx-0 mx-md-2"
                         onClick={() => changeGameState({type: 'MICROPHONE', payload: {...gameState, microphoneOn: !gameState.microphoneOn}})}>Press and speak</a>
                      <a href="#" className="btn btn-lg btn-info btns__result mb-2 mb-md-0 mx-0 mx-md-2"
                         onClick={() => changeGameState({type: 'RESULT', payload: {...gameState, result:  true }})}>
                        Results
                      </a>
                    </div>
                  </div>
                </div>
            }

            { gameState.result &&
                <div className="resultpage align-items-center justify-content-center">
                    <div className="resultpage__container">
                        <p className="results__container--errors">Errors
                            <span className="resultpage__errors-num">{WordServices.getCountError(gameState.roundWordArray)}</span>
                        </p>
                        <div className="resultpage__errors-item mb-4">
                            {
                                gameState.roundWordArray.map((item: IWordWithSuccess) => {
                                    if (!item.success) {
                                        return ResultWord(item);
                                    }
                                })
                            }
                        </div>
                        <p className="results__container--success">Success
                            <span className="resultpage__success-num">{WordServices.getCountSuccess(gameState.roundWordArray)}</span>
                        </p>
                        <div className="resultpage__success-item">
                            {
                                gameState.roundWordArray.map((item: IWordWithSuccess) => {
                                    if (item.success) {
                                        return ResultWord(item);
                                    }
                                })
                            }
                        </div>
                        <div
                            className="resultpage__btns-res d-flex flex-column flex-sm-row justify-content-center text-center mt-4">
                            <a href="#" className="btn btn-info btn-md resultpage__return mb-2 m-sm-0 mx-0 mx-sm-3"
                               onClick={() => changeGameState({type: 'RESULT', payload: {...gameState, result:  false }})}>Return</a>
                            <a href="#" className="btn btn-info btn-md resultpage__new-game mb-2 m-sm-0 mx-0 mx-sm-3"
                                onClick={() => setRestart(true)}
                            >New game</a>
                            {/*<a href="#"*/}
                            {/*   className="btn btn-info btn-md resultpage__statistics mb-2 m-sm-0 mx-0 mx-sm-3">Statistics</a>*/}
                        </div>
                    </div>
                </div>
            }

            <audio className="audio"/>
        </div>
    );
};

export default SpeakitPage;
