import Words from './Words';
import { getRandomInt, shuffleArray, playAudio } from './helpers';
import templatesHTML from './templatesHTML';
import Result from './Result';
import correctAudio from './audio/correct.mp3';
import errorAudio from './audio/error.mp3';

class Game extends Words {
  constructor(group) {
    super(group);

    this.attempt = 5;
    this.gameWordArray = [];
    this.gameOtherThreeWordArray = [];
    this.timerId = 0;
    this.timerIntervalId = 0;
    this.attemptDiv = '';
  }

  getOtherThreeWord(idx) {
    this.gameOtherThreeWordArray = [];

    while (this.gameOtherThreeWordArray.length < 3) {
      const i = getRandomInt(20);

      if (i !== idx) {
        this.gameOtherThreeWordArray.push(this.currentWordArray[i]);
      }
    }

    this.gameOtherThreeWordArray.push(this.gameWordArray[this.gameWordArray.length - 1]);
    shuffleArray(this.gameOtherThreeWordArray);
  }

  setActiveCard(id, className) {
    const cards = document.querySelectorAll('.cards__item');

    cards.forEach((item) => {
      if (item.dataset.wordid === id) {
        item.classList.add(className);
      }
    });
  }

  createCards() {
    const cards = document.querySelector('.cards');

    cards.innerText = '';

    for (let i = 0; i < this.gameOtherThreeWordArray.length; i += 1) {
      const idx = i + 1;
      cards.insertAdjacentHTML('beforeEnd', templatesHTML.getCardItemHTML(idx, this.gameOtherThreeWordArray[i]));
    }
    // Если делать регистрацию здесь, то почему-то не правильно отрабатывают click
    // cards.addEventListener('click', this.registerCardsEvent.bind(this));
    // this.attemptDiv.addEventListener('click', this.registerCardsEvent.bind(this));
  }

  stopTimer() {
    clearInterval(this.timerIntervalId);
    clearTimeout(this.timerId);
  }

  restartTimer() {
    setTimeout(() => {
      this.startTimer(false);
    }, 2000);
  }

  registerCardsClickEvent(event) {
    const clickedCard = event.target.dataset.wordid;
    const currentWord = document.querySelector('.current__word');

    this.stopTimer();
    currentWord.classList.add('fadeout');

    if (clickedCard) {
      if (clickedCard === this.gameWordArray[this.gameWordArray.length - 1].id) {
        this.setActiveCard(this.gameWordArray[this.gameWordArray.length - 1].id, 'activeCard');
        this.gameWordArray[this.gameWordArray.length - 1].success = true;
        playAudio('audio', correctAudio);
        this.restartTimer();
      } else {
        this.attempt -= 1;
        this.setActiveCard(clickedCard, 'activeCardError');
        this.setActiveCard(this.gameWordArray[this.gameWordArray.length - 1].id, 'activeCard');
        playAudio('audio', errorAudio);
        this.restartTimer();
      }
    }
  }

  compareKeyPress(idx) {
    this.stopTimer();

    // eslint-disable-next-line max-len
    if (this.gameOtherThreeWordArray[idx].id === this.gameWordArray[this.gameWordArray.length - 1].id) {
      this.setActiveCard(this.gameWordArray[this.gameWordArray.length - 1].id, 'activeCard');
      this.gameWordArray[this.gameWordArray.length - 1].success = true;
      playAudio('audio', correctAudio);
      this.restartTimer();
    } else {
      this.setActiveCard(this.gameOtherThreeWordArray[idx].id, 'activeCardError');
      this.setActiveCard(this.gameWordArray[this.gameWordArray.length - 1].id, 'activeCard');
      this.attempt -= 1;
      playAudio('audio', errorAudio);
      this.restartTimer();
    }
  }

  registerKeyUpEvent(event) {
    const codeKey = event.code;

    if ((codeKey === 'Digit1') || (codeKey === 'Numpad1')) {
      this.compareKeyPress(0);
    } else if ((codeKey === 'Digit2') || (codeKey === 'Numpad2')) {
      this.compareKeyPress(1);
    } else if ((codeKey === 'Digit3') || (codeKey === 'Numpad3')) {
      this.compareKeyPress(2);
    } else if ((codeKey === 'Digit4') || (codeKey === 'Numpad4')) {
      this.compareKeyPress(3);
    }
  }

  renderResultGame() {
    const currentStatistics = new Result(this);
    currentStatistics.init();
  }

  async renderGameWords() {
    const currentWord = document.querySelector('.current__word');
    currentWord.innerText = '';
    currentWord.classList.remove('move-down');
    const idx = getRandomInt(20);

    this.group = getRandomInt(5);
    await this.createWordArray(0, 20);
    this.gameWordArray.push(this.currentWordArray[idx]);
    this.getOtherThreeWord(idx);
    currentWord.innerText = this.gameWordArray[this.gameWordArray.length - 1].word;
    currentWord.classList.remove('fadeout');
    currentWord.classList.add('move-down');
    this.createCards();
  }

  myTimer() {
    let t = 5;
    const timerDiv = document.querySelector('.timer');

    this.timerIntervalId = setInterval(() => {
      t -= 1;
      timerDiv.innerHTML = `Timer: ${t}`;

      if (t <= 0) {
        clearInterval(this.timerIntervalId);
      }
    }, 1000);

    this.timerId = setTimeout(() => {
      this.startTimer(true);
    }, 5000);
  }

  async startTimer(timeout) {
    if (timeout) this.attempt -= 1;

    this.attemptDiv.innerText = `Attempt: ${this.attempt}`;

    if (this.attempt > 0) {
      await this.renderGameWords();
      this.myTimer();
    } else {
      this.renderResultGame();
    }
  }

  init() {
    this.attemptDiv = document.querySelector('.savanna-info__attempt');
    this.attemptDiv.innerText = this.attempt;

    document.querySelector('.cards').addEventListener('click', this.registerCardsClickEvent.bind(this));
    document.addEventListener('keyup', this.registerKeyUpEvent.bind(this));

    this.startTimer();
  }
}

export default Game;
