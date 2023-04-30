const mainButton = document.getElementById('mainCookie');
const scoreDisplay = document.getElementById('score');
const workersDisplay = document.getElementById('workers');
const shop = document.getElementById('shop');
const shopcontainer = document.getElementById('shopcontainer');
const shopMenu = document.getElementById('shopmenu');

let workerPrice = 100;

let score = 500;
let numberOfWorkers = 0;
refreshScore();
refreshWorkers();
let counter = 0;

mainButton.addEventListener('click', function () {
  counter++;
  score++;
  scoreDisplay.innerHTML = '';
  scoreDisplay.insertAdjacentHTML('afterbegin', '<img src="public/images/cookie.png" id="scoreCookie"/> ');
  scoreDisplay.insertAdjacentHTML('beforeend', score);
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

shop.addEventListener('click', function () {
  // Add unique ID for closeButton element
  if (shopcontainer.innerHTML === ''){
    shopcontainer.insertAdjacentHTML('beforeend', '<div id="shopmenuContent"><button id="closebutton">X</button></div>');
    const closeButton = document.getElementById('closebutton'); // Define closeButton after it's added to the DOM
    const shopmenuContent = document.getElementById('shopmenuContent');
    shopmenuContent.insertAdjacentHTML('beforeend', '<p id="upgrade">upgrade</p>');
    shopmenuContent.insertAdjacentHTML('beforeend', '<img src="public/images/cook.png" id="cook"/>');
    shopmenuContent.insertAdjacentHTML('beforeend',
     `<div id="costContainer"><img src="public/images/cookie.png" id="costCookie"/><p id="costOfWorker">${workerPrice}</p></div>`);

    shopmenuContent.insertAdjacentHTML('beforeend', '<button id="hire">hire</button>');
    const hireButton = document.getElementById('hire');
    closeButton.addEventListener('click', function () { // Add event listener for closeButton
      document.getElementById('shopmenuContent').remove(); // Remove only the menu content
    });
    hireWorkers(hireButton);
  }
});

function refreshScore(){
  scoreDisplay.innerHTML = '';
  scoreDisplay.insertAdjacentHTML('afterbegin', '<img src="public/images/cookie.png" id="scoreCookie"/> ');
  scoreDisplay.insertAdjacentHTML('beforeend', score);
}


function hireWorkers(hireButton){
  hireButton.addEventListener('click', function(){
    if (score > workerPrice){
      score -= 100;
      numberOfWorkers++;
      refreshWorkers();
      refreshScore();
      workerPrice += 50;
      refreshCost();
    }
  });
}

function refreshWorkers(){
  workersDisplay.innerHTML = '';
  workersDisplay.insertAdjacentHTML('beforeend', '<img src="public/images/cook.png" id="worker"/> ');
  workersDisplay.insertAdjacentHTML('beforeend', numberOfWorkers);
}

function refreshCost(){
  const costContainer = document.getElementById('costContainer');
costContainer.innerHTML = '';
costContainer.insertAdjacentHTML('beforeend', `<img src="public/images/cookie.png" id="costCookie"/><p id="costOfWorker">${workerPrice}</p>`);
}