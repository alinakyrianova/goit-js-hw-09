import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');
formEl.setAttribute(
  'style',
  'display: flex; align-content: center;flex-wrap: wrap;flex-direction: column;align-items: flex-end; gap: 10px;'
);
formEl.addEventListener('submit', exportPromis);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
    resolve({ position, delay });
    // Fulfill
      } else {
                reject({ position, delay });
      }
    }, delay);
  });
}
    // Reject
    function exportPromis(event) {
  event.preventDefault();
  let delayValue = Number(delayEl.value);
  const stepValue = Number(stepEl.value);
  const amountValue = Number(amountEl.value);
  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayValue += stepValue;
  }
}
