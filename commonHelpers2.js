import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                     */import{i as n}from"./assets/vendor-77e16229.js";const e={inputNumber:document.querySelector("input[type=number]"),inputFulfilled:document.querySelector('input[value="fulfilled"]'),inputRejected:document.querySelector('input[value="rejected"]'),button:document.querySelector("button[type=submit]")};e.button.addEventListener("click",o);function o(t){t.preventDefault(),r(),c()}function r(){if(e.inputNumber.value==="")return n.error({message:"❌ Please enter a number in delay",icon:"",position:"topRight"});const t=parseInt(e.inputNumber.value);new Promise((i,u)=>{e.inputFulfilled.checked?setTimeout(()=>{i(t)},t):e.inputRejected.checked&&setTimeout(()=>{u(t)},t)}).then(i=>{n.success({message:`✅ Fulfilled promise in ${i}ms`,position:"topRight",maxWidth:"384px",icon:""})}).catch(i=>{n.error({message:`❌ Rejected promise in ${i}ms`,position:"topRight",maxWidth:"384px",icon:""})})}function c(){e.inputNumber.value="",e.inputFulfilled.checked=!1,e.inputRejected.checked=!1}
//# sourceMappingURL=commonHelpers2.js.map
