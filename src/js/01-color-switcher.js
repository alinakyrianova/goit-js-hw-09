function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const bodyEl = document.querySelector('body');
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
buttonStart.addEventListener('click', colorBackground);
let timerId = null;
function colorBackground() {
  buttonStart.disabled = true;
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  buttonStart.disabled = false;
});
