const mainButton = document.getElementById('mainCookie');
const scoreDisplay = document.getElementById('score');
let score = 0;
scoreDisplay.insertAdjacentHTML('afterbegin', `score: ${score}`);

mainButton.addEventListener('click', function (event) {
  score++;
  scoreDisplay.innerHTML = '';
  scoreDisplay.insertAdjacentHTML('afterbegin', `score: ${score}`);
});
