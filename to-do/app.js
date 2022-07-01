const input = document.querySelector('.container__input');
const btn = document.querySelector('.container__button');
const ul = document.querySelector('.container__list');
const li = document.querySelector('.container__item');
const deleteItem = document.querySelector('#deleteItem');

li.onclick = function () {
  if (li.classList.contains('item__checked')) {
    li.classList.remove('item__checked');
  } else {
    li.classList.add('item__checked');
  }
};

deleteItem.onclick = function () {
  deleteItem.parentElement.style.display = 'none';
  console.log('x');
};

btn.onclick = function () {
  if (input.value === '') {
    console.log('Prazan string');
  } else {
    const newLi = document.createElement('li');
    newLi.innerHTML = `${input.value} <span id="deleteItem">X</span>`;
    newLi.classList.add('container__item');
    ul.appendChild(newLi);
    input.value = '';
  }
};
