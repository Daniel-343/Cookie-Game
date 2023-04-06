const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1400;
const CANVAS_HEIGHT = canvas.height = 600;

const cookieImage = new Image();
cookieImage.src = 'cookie.png';
let mCookieW = 300
let mCookieH = 280
let mCookieX = 550
let mCookieY = 150
let sCookieY = 10
let score = 0


canvas.addEventListener('click', function(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (x >= mCookieX && x < mCookieX + cookieImage.width && y >= mCookieY && y < mCookieY + cookieImage.height) {
    score++
    sCookie()
    console.log('clicked')
    mCookieW -= 30
    mCookieH -= 28
    mCookieX += 15
    mCookieY += 14

    setTimeout(() =>{
      mCookieW += 30
      mCookieH += 28
      mCookieX -= 15
      mCookieY -= 14
    },25)
  
  }});


function mainCookie(boo){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(cookieImage, mCookieX, mCookieY, mCookieW, mCookieH);
  ctx.font = "30px arcadeclassic";
  ctx.fillText("Score: " + score, 10, 30);
  requestAnimationFrame(mainCookie);
  }
  mainCookie();

function sCookie(){
  const tempCookie = new Image();
tempCookie.src = 'cookie.png';
  ctx.drawImage(tempCookie, 150, sCookieY, 150, 140)
  sCookieY += 2.5
  if (sCookieY > 400){
  return}
  requestAnimationFrame(sCookie);
}