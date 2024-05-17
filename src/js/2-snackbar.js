import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    inputNumber: document.querySelector('input[type=number]'),
    inputFulfilled: document.querySelector('input[value="fulfilled"]'),
    inputRejected: document.querySelector('input[value="rejected"]'),
    button: document.querySelector('button[type=submit]')
}

// console.log(refs.inputNumber);
// console.log(refs.inputFulfilled);
// console.log(refs.inputRejected);
// console.log(refs.button);
refs.button.addEventListener("click", handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    handleStart();
    clearInputs();
}

function handleStart() {
    if (refs.inputNumber.value === '') {
    return iziToast.error({
        message: '❌ Please enter a number in delay',
        icon: '',
        position: 'topRight'
        })
    }
    const delay = parseInt(refs.inputNumber.value);
    const promise = new Promise((resolve, reject) => {
        if (refs.inputFulfilled.checked) {
            setTimeout(() => {
                resolve(delay);
            }, delay);
        } else if (refs.inputRejected.checked) {
            setTimeout(() => {
                reject(delay);
            }, delay);
        }
        
    })


    promise.then((delay) => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
            maxWidth: '384px',
            icon: ''
        });
    }).catch((delay) => {
        iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
            maxWidth: '384px',
            icon: ''
        });
    });
};

function clearInputs() {
    refs.inputNumber.value = '';
    refs.inputFulfilled.checked = false;
    refs.inputRejected.checked = false;
}
