import React from "react";

const StartPage: React.FC = () => {

    return (
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
    );
};

export default StartPage;
