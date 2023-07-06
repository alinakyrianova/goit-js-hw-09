import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const timerEl = document.querySelector('.timer');
const daysEl = timerEl.querySelector('[data-days]');
const hoursEl = timerEl.querySelector('[data-hours]');
const minutesEl = timerEl.querySelector('[data-minutes]');
const secondsEl = timerEl.querySelector('[data-seconds]');
const fieldValueEl = document.querySelectorAll('.value');
const startButton = document.querySelector('[data-start]');
let selectedDate = null;
startButton.disabled = true;
let countdownInterval;
timerEl.setAttribute(
  'style',
  'font-size: 20px; text-transform: uppercase; display: flex; gap: 20px'
);
fieldValueEl.forEach(
  el => (
    (el.style.fontSize = '50px'),
    (el.style.display = 'flex'),
    (el.style.flexDirection = 'column'),
    (el.style.alignItems = 'center')
  )
);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function startCountdown() {
  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDifference = selectedDate - currentTime;
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Report.success('The countdown has reached zero!');
      return;
    }
    startButton.disabled = true;
    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
}
startButton.addEventListener('click', startCountdown);
flatpickr('#datetime-picker', options);