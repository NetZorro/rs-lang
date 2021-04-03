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
    const { transcript, interimTranscript, finalTranscript, resetTranscript} = useSpeechRecognition();
    const [message, setMessage] = useState<string>('');

    const getWordDataNewRound = async () => {
        // setSelectWordId('');

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

        if (word !== undefined) {
            setSelectWord(word);
            playAudio('audio', correctAudio);
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
                'activeCard': (selectWord.id === word.id),
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
            <div className="info__score--star"></div>
        )
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
                      <div className="speakit-info__score pt-3 pt-md-0"/>
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
                      <a href="#" className="btn btn-lg btn-info btns__restart mb-2 mb-md-0 mx-0 mx-md-2">Restart</a>
                      <a href="#" className="btn btn-lg btn-info btns__speak mb-2 mb-md-0 mx-0 mx-md-2"
                         onClick={() => changeGameState({type: 'MICROPHONE', payload: {...gameState, microphoneOn: !gameState.microphoneOn}})}>Press and speak</a>
                      <a href="#" className="btn btn-lg btn-info btns__result mb-2 mb-md-0 mx-0 mx-md-2">Results</a>
                    </div>
                  </div>
                </div>
            }

            {/*{ gameState.result &&*/}
            {/*    <div className="result-page align-items-center justify-content-center">*/}
            {/*        <div className="result-page__container">*/}
            {/*            <p className="results__container--errors">Errors*/}
            {/*                <span className="result-page__errors-num">{errorWords}</span>*/}
            {/*            </p>*/}
            {/*            <div className="result-page__errors-item">*/}
            {/*                {*/}
            {/*                    gameState.gameWordArray.map((item: IWordWithSuccess) => {*/}
            {/*                        if (!item.success) {*/}
            {/*                            return ResultWord(item);*/}
            {/*                        }*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            </div>*/}
            {/*            <p className="results__container--success mt-3">Success*/}
            {/*                <span className="result-page__success-num">{successWords}</span>*/}
            {/*            </p>*/}
            {/*            <div className="result-page__success-item">*/}
            {/*                {*/}
            {/*                    gameState.gameWordArray.map((item: IWordWithSuccess) => {*/}
            {/*                        if (item.success) {*/}
            {/*                            return ResultWord(item);*/}
            {/*                        }*/}
            {/*                    })*/}
            {/*                }*/}

            {/*            </div>*/}

            {/*            <div className="result-page__btns-res text-center mt-5">*/}
            {/*                <a href="#" className="btn btn-primary btn-md result-page__new-game"*/}
            {/*                   onClick={() => {*/}
            {/*                       changeGameState({type: 'INPROGRESS', payload: {...gameState, inProgress: false}})*/}
            {/*                       changeGameState({type: 'SETDEFAULT', payload: {...initialState }})*/}
            {/*                   }}>*/}
            {/*                  New game*/}
            {/*                </a>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*}*/}


            <audio className="audio"/>

        </div>
    );
};

export default SpeakitPage;
