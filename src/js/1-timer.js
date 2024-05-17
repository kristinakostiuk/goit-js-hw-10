import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const refs = {
    input: document.querySelector('input[type=text]'),
    button: document.querySelector('[data-start]'),
    valueDays: document.querySelector('[data-days]'),
    valueHours: document.querySelector('[data-hours]'),
    valueMinutes: document.querySelector('[data-minutes]'),
    valueSeconds: document.querySelector('[data-seconds]')
};  

let userSelectedDate = null;
let countdownInterval = null;
refs.button.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        const currentTime = Date.now();
        if (userSelectedDate < currentTime) {
            iziToast.error({
                message: 'Please choose a date in the future',
                position: 'topRight',
                maxWidth: '302px'
            });
            refs.button.disabled = true;
        } else {
            refs.button.disabled = false;
        }
    },
};

document.addEventListener('DOMContentLoaded', function () {
    flatpickr(refs.input, options);
})

refs.button.addEventListener("click", () => {
    start();
    refs.input.disabled = true;
    refs.button.disabled = true;
});

function start() {
    if (!userSelectedDate) return;

    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;
    if (deltaTime <= 0) return;

    updateClockFace(getTimeComponents(deltaTime));

    countdownInterval = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = userSelectedDate - currentTime;
        if (deltaTime <= 0) {
            refs.input.disabled = false;
            refs.button.disabled = false;
            clearInterval(countdownInterval);
            updateClockFace();
            return;
        }
        updateClockFace(getTimeComponents(deltaTime));
    }, 1000);
};

function getTimeComponents(time) {
    const days = pad(Math.floor((time % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)));
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
}

function pad(value) {
    return String(value).padStart(2, '0');
}

function updateClockFace({days, hours, mins, secs}) {
    if (!days || !hours || !mins || !secs) {
        refs.valueDays.textContent = '00';
        refs.valueHours.textContent = '00';
        refs.valueMinutes.textContent = '00';
        refs.valueSeconds.textContent = '00';
        return;
    }
    refs.valueDays.textContent = `${days}`;
    refs.valueHours.textContent = `${hours}`;
    refs.valueMinutes.textContent = `${mins}`;
    refs.valueSeconds.textContent = `${secs}`;
}
