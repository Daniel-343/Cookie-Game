import cookies from './cookies.js';
const mainButton = document.getElementById('mainCookie');
const scoreDisplay = document.getElementById('score');
const workersDisplay = document.getElementById('workers');
const shop = document.getElementById('shop');
const shopcontainer = document.getElementById('shopcontainer');
const shopMenu = document.getElementById('shopmenu');
const boostButton = document.getElementById('boostButton');


let score = Number(localStorage.getItem('Cscore'));
let numberOfWorkers = Number(localStorage.getItem('Wscore'));
let workerPrice = numberOfWorkers * 50 + 100;
refreshScore();
refreshWorkers();
let counter = 0;
let chosenCookie = 0;
let mainCookieIndex = 0;
let multiplier = 1;

function refreshMainCookie(){
  let mainCookieContainer = document.getElementById('mainCookieContainer');
  mainCookieContainer.innerHTML = '';
  mainCookieContainer.insertAdjacentHTML('beforeend', `    <button id="mainCookie">
  <img src="${cookies[chosenCookie].imgDir}"/>
</button>`);
  mainButtonEvent();
}

function mainButtonEvent(){
  const mainButton = document.getElementById('mainCookie');
  mainButton.addEventListener('click', function () {
    counter++;
    score+= 1000 * multiplier;
    localStorage.setItem('Cscore', score);
    scoreDisplay.innerHTML = '';
    scoreDisplay.insertAdjacentHTML('afterbegin', '<img src="public/images/cookie.png" id="scoreCookie"/> ');
    scoreDisplay.insertAdjacentHTML('beforeend', score);
    const cookie = document.createElement('div');
    cookie.classList.add('cookie');
    cookie.style.left = `${Math.random() * window.innerWidth}px`;
    cookie.style.backgroundImage = `url(${cookies[mainCookieIndex].imgDir})`; 
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
}
mainButtonEvent();

shop.addEventListener('click', function () {
  // Add unique ID for closeButton element
  if (shopcontainer.innerHTML === ''){
    shopcontainer.insertAdjacentHTML('beforeend', '<div id="shopmenuContent"><button id="closebutton">X</button></div>');
    const closeButton = document.getElementById('closebutton'); // Define closeButton after it's added to the DOM
    const shopmenuContent = document.getElementById('shopmenuContent');
    shopmenuContent.insertAdjacentHTML('beforeend', '<p id="upgrade">worker</p>');
    shopmenuContent.insertAdjacentHTML('beforeend',
      '<div id="productionContainer"><p id="costOfWorker">makes 1</p><img src="public/images/cookie.png" id="costCookieSmall"/><p id="costOfWorker">/sec</p></div>');
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
      score -= workerPrice;
      numberOfWorkers++;
      refreshWorkers();
      refreshScore();
      workerPrice += 50;
      refreshCost();
      localStorage.setItem('Wscore', numberOfWorkers);
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


function incrementScore() {
  score += numberOfWorkers;
  refreshScore();
  localStorage.setItem('Cscore', score);
  setTimeout(incrementScore, 1000);
}
incrementScore();

function refreshBoostMenuContent(){
  shopcontainer.insertAdjacentHTML('beforeend', '<div id="boostmenuContent"><button id="closebutton">X</button></div>');
  const boostmenuContent = document.getElementById('boostmenuContent');
  const closeButton = document.getElementById('closebutton'); // Define closeButton after it's added to the DOM
  boostmenuContent.insertAdjacentHTML('beforeend', `<div id="cookieName">${cookies[chosenCookie].name}</div>`);
  boostmenuContent.insertAdjacentHTML('beforeend', `<img src="${cookies[chosenCookie].imgDir}" id="boostCookie">`);
  boostmenuContent.insertAdjacentHTML('beforeend', `<div id="cookieMultiplier">Multiplier: ${cookies[chosenCookie].multiplier}</div>`);
  boostmenuContent.insertAdjacentHTML('beforeend', `<div id="cookiePrice">Price: ${cookies[chosenCookie].price}</div>`);
  boostmenuContent.insertAdjacentHTML('beforeend', '<button id="upgradeCookieButton">Upgrade</button>');
  boostmenuContent.insertAdjacentHTML('beforeend', '<button id="previousButton">Previous</button>');
  boostmenuContent.insertAdjacentHTML('beforeend', '<button id="nextButton">Next</button>');
  const nextButton = document.getElementById('nextButton');
  const previousButton = document.getElementById('previousButton');
  const upgradecookieButton = document.getElementById('upgradeCookieButton');
  closeButton.addEventListener('click', function () { // Add event listener for closeButton
    boostmenuContent.remove(); // Remove only the menu content
  });
  nextButton.addEventListener('click', function () { // Add event listener for closeButton
    chosenCookie < cookies.length - 1 ?
      (boostmenuContent.remove(), // Remove only the menu content
      chosenCookie++,
      refreshBoostMenuContent()) : null;
  });
  previousButton.addEventListener('click', function () { // Add event listener for closeButton
    chosenCookie > 0 ?
      (boostmenuContent.remove(), // Remove only the menu content
      chosenCookie--,
      refreshBoostMenuContent()) : null;
  });
  upgradecookieButton.addEventListener('click', () => {
    cookies[chosenCookie].ownIt === true ?
      (mainCookieIndex = chosenCookie,
      multiplier = cookies[chosenCookie].multiplier,
      refreshMainCookie()) : 
      score >= cookies[chosenCookie].price ? 
        (cookies[chosenCookie].ownIt = true,
          multiplier = cookies[chosenCookie].multiplier,
          mainCookieIndex = chosenCookie,
        score -= cookies[chosenCookie].price,
        refreshMainCookie()) : null;
  });
}


boostButton.addEventListener('click', function () {
  if (shopcontainer.innerHTML === ''){
    refreshBoostMenuContent();
  }
});

//calculating Cookies Per minute (CPM)
const scores = [score, score];
function saveScore() {
  scores.push(score);
  setTimeout(saveScore, 1000);
}
saveScore();
function calculateScoreIncrement() {
  scores.length > 2 ? scores.shift() : null;
  // Calculate the total score increment
  const totalIncrement = scores[1] - scores[0];
  refreshCPM(totalIncrement);
}
// Call the function every tenth of a second
setInterval(calculateScoreIncrement, 100);

function refreshCPM(cpm){
  const cpmElement = document.getElementById('cpm');
  cpmElement.innerHTML = '';
  cpmElement.insertAdjacentHTML('afterbegin', '<div>CPM:</div>');
  cpmElement.insertAdjacentHTML('beforeend', '<img src="public/images/cookie.png" id="scoreCookie"/> ');
  cpmElement.insertAdjacentHTML('beforeend', cpm);
}

//Tooltip

document.addEventListener('DOMContentLoaded', function() {
  const container = () => document.getElementById('cpm');
  const tooltip = () =>document.querySelector('.tooltip');

  container().addEventListener('mouseover', function(e) {
    tooltip().style.display = 'block';
    updateTooltipPosition(e);
  });

  container().addEventListener('mousemove', function(e) {
    updateTooltipPosition(e);
  });

  container().addEventListener('mouseout', function() {
    tooltip().style.display = 'none';
  });

  function updateTooltipPosition(e) {
    const x = e.clientX + 10;
    const y = e.clientY + 10;
    tooltip().style.left = `${x  }px`;
    tooltip().style.top = `${y  }px`;
  }
});
