export function clockToString(date) {
  const year = date.getFullYear();
  const monthNum = (date.getMonth() < 10) ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
  const day = date.getDate();
  const hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
  const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();

  return `${year}-${monthNum}-${day} ${hours}:${minutes}:${seconds}`;
}

export function removeSomeCSSClass(elementClass, removeClass) {
  document.querySelectorAll(elementClass).forEach((item) => {
    item.classList.remove(removeClass);
  });
}

export function addSomeCSSClass(elementClass, addClass) {
  document.querySelectorAll(elementClass).forEach((item) => {
    item.classList.add(addClass);
  });
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function playAudio(audioCSSClass, audioURL) {
  const audio = document.querySelector(`.${audioCSSClass}`);
  audio.autoplay = true;
  audio.setAttribute('src', audioURL);

  audio.onerror = () => {
    // eslint-disable-next-line no-alert
    alert('Error loading audio');
  };
}

export function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
