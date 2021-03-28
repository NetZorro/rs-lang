import audio from './images/audio.svg';

const templatesHTML = {
  getStartPageHTML() {
    return `<div class="start-page d-flex align-items-center">
              <div class="container px-5 text-center">
                <h1 class="start-page__title">SAVANNAH</h1>
                <p class="start-page__intro-text">
                The Savannah training helps you build your vocabulary.<br> The more words you know, the more experience points you'll get.
                </p>
                <a href="#" class="btn btn-lg btn-primary mt-2 start-page__intro-btn">Start</a>
              </div>
            </div>

            <div class="savanna-container flex-column justify-content-center align-items-center hidden">
              <div class="savanna-wrapper d-flex flex-column align-items-center container">
                <div class="savanna-info d-flex flex-row align-items-center justify-content-between">
                  <span class="timer"></span>
                  <div class="savanna-info__attempt"></div>
                </div>

                <div class="current">
                  <p class="current__word text-primary"></p>
                </div>

                <div class="cards"></div>
              </div>
            </div>

            <div class="result-page align-items-center justify-content-center hidden">
              <div class="result-page__container">
                  <p class="results__container--errors">Errors
                      <span class="result-page__errors-num">10</span>
                  </p>
                  <div class="result-page__errors-item"></div>
                  <p class="results__container--success mt-3">Success
                      <span class="result-page__success-num">0</span>
                  </p>
                  <div class="result-page__success-item"></div>

                  <div class="result-page__btns-res text-center mt-5">
                      <a href="#" class="btn btn-primary btn-md result-page__new-game">New game</a>
                  </div>
              </div>
            </div>

            <div class="statistics hidden">
              <div class="statistics__container">
              </div>

              <div class="statistics__btns">
                  <a href="#" class="statistics__return">Close</a>
              </div>
            </div>

            <audio class="audio"></audio>`;
  },

  getCardItemHTML(idx, wordObj) {
    return `<div class="cards__item" data-wordid="${wordObj.id}">
              <span class="cards__item-number" data-wordid="${wordObj.id}">${idx}</span>
              <p class="cards__item-word" data-wordid="${wordObj.id}">${wordObj.wordTranslate}</p>
              <p class="cards__item-transcription" data-wordid="${wordObj.id}">${wordObj.transcription}</p>
            </div>`;
  },

  getResultItemHTML(wordObj) {
    return `<div class="result-page__item" data-wordid="${wordObj.id}">
              <span class="result-page__item-number"><img data-wordid="${wordObj.id}" src="${audio}" alt="audio icon"></span>
              <p class="result-page__item-word"  data-wordid="${wordObj.id}">${wordObj.word}</p>
              <p class="result-page__item-transcription" data-wordid="${wordObj.id}">${wordObj.wordTranslate}</p>
              // <p class="result-page__item--translation" data-wordid="${wordObj.id}">${wordObj.transcription}</p>
            </div>`;
  },

  getStatisticsHeaderHTML(id, date, group, errors, success) {
    return `<div class="statistics__header" data-id="${id}">
              <p class="statistics__header--date"  data-id="${id}">Date: ${date}</p>
              <p class="statistics__header--group"  data-id="${id}">Group: ${group}</p>
              <p class="statistics__header--errors" data-id="${id}">Errors: <span class="statistics__errors-num">${errors}</span></p>
              <p class="statistics__header--success" data-id="${id}">Success: <span class="statistics__success-num">${success}</span></p>
            </div>
    `;
  },

  getStatisticsContainerHTML(id) {
    return `
              <div class="statistics-items headerid-${id} none">
                <p class="statistics__container--errors">Errors</p>
                <dic class="statistics__errors-item"></dic>

                <p class="statistics__container--success">Success</p>
                <dic class="statistics__success-item"></dic>
              </div>
            `;
  },

  // getStarHTML() {
  //   return '<div class="savanna-info__score--star"></div>';
  // },
};

export default templatesHTML;
