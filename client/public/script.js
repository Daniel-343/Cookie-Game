const mainButton = document.getElementById('mainCookie');
const scoreDisplay = document.getElementById('score');
let score = 0;
scoreDisplay.insertAdjacentHTML('afterbegin', `score: ${score}`);
let counter = 0;

mainButton.addEventListener('click', function () {
  counter++;
  score++;
  scoreDisplay.innerHTML = '';
  scoreDisplay.insertAdjacentHTML('afterbegin', `score: ${score}`);
  const cookie = document.createElement('div');
  cookie.classList.add('cookie');
  cookie.style.left = `${Math.random() * window.innerWidth}px`;
  document.body.appendChild(cookie);
  setTimeout(() => {
    cookie.style.top = `${window.innerHeight + 50}px`;
    setTimeout(() => {
      document.body.removeChild(cookie);
      counter--;
    }, 1000);
  }, 100);

  console.log(counter);
});


