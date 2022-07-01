const btn = document.querySelector('#btn');
const stopaInflacije = document.querySelector('#stopaInflacije');
const novac = document.querySelector('#novac');
const godine = document.querySelector('#godine');
const target = document.querySelector('#target');

btn.onclick = function () {
  rezultat =
    (parseFloat(stopaInflacije.value) / 100) *
    parseInt(godine.value) *
    parseFloat(novac.value);
  rezultat += parseFloat(novac.value);
  target.innerText = `Današnjih ${novac.value}$ vrijedi isto kao ${rezultat}$ za ${godine.value} godina po stopi inflacije od ${stopaInflacije.value}%`;
};
