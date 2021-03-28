import React, {useEffect} from "react";

import './savanna.scss'
import StartPage from "./components/StartPage/StartPage";
import Savanna from "./Savanna";


const SavannahPage: React.FC = () => {

    useEffect(() => {
        const mySavana = new Savanna();
        mySavana.init('main');
    },[])

    return (
        <div className="main-savannah mt-0">
            <div className="start-page d-flex align-items-center">
                <div className="container px-5 text-center">
                    <h1 className="start-page__title">SAVANNAH</h1>
                    <p className="start-page__intro-text">
                        The Savannah training helps you build your vocabulary.<br /> The more words you know, the more
                        experience points you'll get.
                    </p>
                    <a href="#" className="btn btn-lg btn-primary mt-2 start-page__intro-btn">Start</a>
                </div>
            </div>

            <div className="savanna-container flex-column justify-content-center align-items-center hidden">
                <div className="savanna-wrapper d-flex flex-column align-items-center container">
                    <div className="savanna-info d-flex flex-row align-items-center justify-content-between">
                        <span className="timer"/>
                        <div className="savanna-info__attempt"/>
                    </div>

                    <div className="current">
                        <p className="current__word text-primary"/>
                    </div>

                    <div className="cards"/>
                </div>
            </div>

            <div className="result-page align-items-center justify-content-center hidden">
                <div className="result-page__container">
                    <p className="results__container--errors">Errors
                        <span className="result-page__errors-num">10</span>
                    </p>
                    <div className="result-page__errors-item"/>
                    <p className="results__container--success mt-3">Success
                        <span className="result-page__success-num">0</span>
                    </p>
                    <div className="result-page__success-item"/>

                    <div className="result-page__btns-res text-center mt-5">
                        <a href="#" className="btn btn-primary btn-md result-page__new-game">New game</a>
                    </div>
                </div>
            </div>

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
