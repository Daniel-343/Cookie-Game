const mainButton = document.getElementById('mainCookie');
const scoreDisplay = document.getElementById('score');
let score = 0;
scoreDisplay.insertAdjacentHTML('afterbegin', `score: ${score}`);

mainButton.addEventListener('click', function (event) {
  let windowWidth = window.innerWidth;
document.documentElement.style.setProperty('--windowsize', windowWidth);
console.log(windowWidth);
  score++;
  scoreDisplay.innerHTML = '';
  scoreDisplay.insertAdjacentHTML('afterbegin', `score: ${score}`);
});

let randomValue = Math.random();
document.documentElement.style.setProperty('--random', randomValue);

