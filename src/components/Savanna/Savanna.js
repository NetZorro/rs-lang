import './savanna.scss';
import Game from './Game';
import templatesHTML from './templatesHTML';

class Savanna {
  constructor() {
    this.currentGameObject = '';
    this.container = '';
  }

  createNewGame(group) {
    this.currentGameObject = new Game(group);
    this.currentGameObject.init();
  }

  registerStartButtonEvent() {
    const startPage = document.querySelector('.start-page');

    startPage.classList.add('hidden');
    startPage.classList.remove('d-flex');
    this.createNewGame(0);
    this.container.classList.remove('hidden');
    this.container.classList.add('d-flex');
  }

  init(elementId) {
    // const el = document.getElementById(elementId);
    //
    // el.classList.add('mt-0');
    // el.insertAdjacentHTML('beforeEnd', templatesHTML.getStartPageHTML());

    const startButton = document.querySelector('.start-page__intro-btn');

    startButton.addEventListener('click', this.registerStartButtonEvent.bind(this));
    document.querySelector('.result-page__new-game').addEventListener('click', () => {
      // todo: new game button should start new game
      document.location.reload(true);
    });

    this.container = document.querySelector('.savanna-container');
  }
}

export default Savanna;
