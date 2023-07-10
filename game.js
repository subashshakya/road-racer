"use strict";

const canvas = document.querySelector("#game-canvas");
const instructionCanvas = document.querySelector("#instruction");
const context = instructionCanvas.getContext("2d");
const ctx = canvas.getContext("2d");
const body = document.querySelector("#body");
const scoreHeading = document.querySelector("#score");
console.log(scoreHeading);
const gameOverElement = document.querySelector("#end-menu");
const lives = document.querySelector("#lives");
const restart_btn = document.querySelector("#restart-button");

const bestscore = document.querySelector("#end-best-score");
const endScorePrompt = document.querySelector("#end-score");
const coinP = document.querySelector("#coins");
const points = document.querySelector("#point");

// lives.removeChild(lives.childNodes[1]);
// lives.appendChild(lifeImage);

instructionCanvas.height = 800;
instructionCanvas.width = 400;
instructionCanvas.style.background = "url(./img/ins.png)";
// context.font = "40px Arial";
// context.fillText("INSTRUCTIONS", 50, 50);

// context.font = "20px Arial";
// context.fillText("1. Movement using A,S,D,W or Arrow Keys");

window.addEventListener("keydown", (e) => {
  console.log(e.code);
  if (e.code === "Space") {
    gamePlaying = true;
  } else {
    gamePlaying = false;
  }
});

function removeLives(car) {
  if (lives.hasChildNodes()) {
    if (car.x > 550 || car.x < 50 || car.y < 1 || car.x > canvas.height) {
      lives.removeChild(childNodes[-1]);
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------HTML ELEMENTS-----------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////////////////////
const instructions = `
<div id="instructions">
<h2>Instructions to the game:</h2>
<ol>
  <li>
    Move UP, DOWN, RIGHT, LEFT using Arrow Keys or using W,S,D,A keys
    respectively
  </li>
  <li>Dogde Obstacles To Earn Points</li>
  <li>2 Bullet Can Destroy 1 Enemy</li>
  <li>Cannot Collide With Any Object Or The Game Borders</li>
</ol>
<br>
<h3>Press Space To Play</h3>
</div>
`;

/////////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------GAME VARIABLES--------------------------------------------------------//
///////////////////////////////////////////////////////////////////////////////////////////////////
let score = 0;
let best = 0;
canvas.height = 800;
canvas.width = 600;
let gamePlaying = false;
let gameOver = false;
let collisionCount = 0;
let roadVelocity = 1;
let coinCount = 0;
let hitCount = 0;

function showInstructions() {
  lives.insertAdjacentHTML("afterend", instructions);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------IMAGES---------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////////
const carImage = new Image();
carImage.src = "./img/car-4.png";

const roadImage = new Image();
roadImage.src = "./img/road.png";

const sideRoadImage = new Image();
sideRoadImage.src = "./img/side-road.png";

const obsImage = new Image();
obsImage.src = "./img/obs-1.png";

const obsImage2 = new Image();
obsImage2.src = "./img/obs-2.png";

const bullet = new Image();
bullet.src = "./img/bullet.png";

const coin = new Image();
coin.src = "./img/point.png";

const tree = new Image();
tree.src = "./img/tree.png";

///////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------AUDIO---------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////////////////
const driving = new Audio();
driving.src = "./sounds/car-audio.mp3";

const point = new Audio();
point.src = "./sounds/coin.mp3";

const lifeOver = new Audio();
lifeOver.src = "./sounds/life-over.mp3";

const horn = new Audio();
horn.src = "./sounds/horn.wav";

const GO = new Audio();
GO.src = "./sounds/about2end.wav";

/////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------RACING CAR-----------------------------------------------------------//
///////////////////////////////////////////////////////////////////////////////////////////////
class RacingCar {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  renderRacingCar() {
    ctx.drawImage(carImage, this.x, this.y, this.width, this.height);
  }

  moveCar(e) {
    if (e.code === "KeyA" || e.code === "ArrowLeft") {
      this.x -= 15;
      // driving.play();
      // console.log("jashdjahs");
    } else if (e.code === "KeyW" || e.code === "ArrowUp") {
      this.y -= 15;
      // driving.play();
    } else if (e.code === "KeyD" || e.code === "ArrowRight") {
      this.x += 15;
      // driving.play();
    } else if (e.code === "KeyS" || e.code === "ArrowDown") {
      this.y += 15;
      // driving.play();
    } else if (e.code === "Space") {
      shootBullet(this.x + 20, this.y - 20);
      // console.log(bulletArr);
      // console.log("not shooting");
      // horn.play();
    } else {
      return;
    }
  }
}

const carWidth = 60,
  carHeight = 80;

let x = canvas.width / 2;
let y = canvas.height / 2;
const car = new RacingCar(x, y, carWidth, carHeight);

// const bulletObj = new Bullet(car.x, car.y + car.height, 20, 10, 20);

//////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------BULLET-------------------------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////
let bulletX = car.x;
let bulletY = car.y + car.height;
let bulletVelocity = 10;
const bulletWidth = 20;
const bulletHeight = 30;

class Bullet {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  drawBullet() {
    ctx.drawImage(bullet, this.x, this.y, this.width, this.height);
  }

  shoot() {
    this.y -= 10;
    this.drawBullet();
  }
}

let bulletArr = [];

const shootBullet = (x, y) => {
  let bullet = {
    x: x,
    y: y,
    width: bulletWidth,
    height: bulletHeight,
  };

  bulletArr.push(bullet);
};

////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------OBSTACLES--------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////

let obsX = 150;
let obsY = 0;
let obsVelocity = 3;
const obsWidth = 50;
const obsHeight = 80;

let obstacleArr = [];

const obstablePosition = () => {
  let randomXvalue = obsX - obsHeight / 4 - Math.random() * (obsHeight / 2);

  let obs1 = {
    obsImage: obsImage,
    obsX: randomXvalue,
    obsY: obsY,
    obsWidth: obsWidth,
    obsHeight: obsHeight,
    passed: false,
  };

  //   let obs2 = {
  //     obsImage: obsImage2,
  //     obsX: randomXvalue + 200,
  //     obsY: obsY,
  //     obsWidth: obsWidth,
  //     obsHeight: obsHeight,
  //     passed: false,
  //   };
  obstacleArr.push(obs1);
  //   obstacleArr.push(obs2);
};

const treeGeneration = () => {
  let treeX = Math.random() * 500;
  if (treeX < 50) {
    treeX = 60;
  } else if (treeX > 550) {
    treeX = 500;
  }
  let obs3 = {
    obsImage: tree,
    obsX: treeX,
    obsY: obsY,
    obsWidth: obsWidth,
    obsHeight: obsHeight,
    passed: false,
  };

  obstacleArr.push(obs3);
};

const obstacleRandom = () => {
  let randomX2 = obsX + 180 - obsWidth / 4 - Math.random() * (obsWidth / 2);

  let obs2 = {
    obsImage: obsImage2,
    obsX: randomX2,
    obsY: obsY,
    obsWidth: obsWidth,
    obsHeight: obsHeight,
    passed: false,
  };

  obstacleArr.push(obs2);
};

function drawObstables(obsX) {
  ctx.drawImage(obsImage, obsX, obsY, 100, 100);
}

//where the car moves from
window.addEventListener("keydown", (e) => {
  car.moveCar(e);
});

let coinX = 70;
let coinY = 0;
const coinWidth = 40;
const coinHeight = 40;

let coinsArr = [];

const generateCoin = () => {
  let randomPositionCoin = Math.random() * 400;
  let coin1 = {
    coinImg: coin,
    coinX: randomPositionCoin,
    coinY: coinY,
    coinWidth: coinWidth,
    coinHeight: coinHeight,
  };

  coinsArr.push(coin1);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------------------GAME RENDERING--------------------------------------------//
///////////////////////////////////////////////////////////////////////////////////////////////////
//roads

restart_btn.addEventListener("click", () => {
  gamePlaying = false;
  location.reload();
  // coinsArr = [];
  // score = 0;
  // hitCount = 0;
  // obstacleArr = 0;
  // obsVelocity = 3;
  // bulletArr = 0;
});

function drawRoads() {
  let roadY = 0;
  roadY += roadVelocity;

  ctx.drawImage(roadImage, 50, roadY, 166, canvas.height);
  ctx.drawImage(roadImage, 216, roadY, 166, canvas.height);
  ctx.drawImage(roadImage, 382, roadY, 166, canvas.height);
}

////////////////////////////////////////////////////////////////////////////
//-------------LEVEL UP--------------------------------------------------//
//////////////////////////////////////////////////////////////////////////
function increaseScore() {
  // if (obs.obsY > canvas.height) {
  //   obstacleArr.splice(index, 1);
  //   score++;
  //   // console.log(score);
  //   scoreHeading.innerHTML = `Score: ${score}`;
  //   obs.obsWidth = 0;
  //   obs.obsHeight = 0;
  // }

  score = hitCount;
  scoreHeading.innerHTML = `Score ${score}`;
  if (best < score) {
    best = score;
  }

  if (score > 10 && score < 20) {
    ctx.fillText("LEVEL UP!!!", canvas.width / 2 - 100, canvas.height * 0.1);
    ctx.font = "30px Arial";
    obsVelocity = 8;
    body.style.background = "url(./img/bggg.avif)";
  } else if (score > 20) {
    ctx.fillText(
      "LEVEL UPP!! LEVEL UP!!!",
      canvas.width / 2 - 100,
      canvas.height * 0.1
    );
    body.style.background = "url(./img/bggg.avif)";
    ctx.font = "30px Arial";
    obsVelocity = 16;
  }
}

//collision detection
function collisionDetection(car, obstacle) {
  if (
    car.x < obstacle.obsX + obstacle.obsWidth &&
    car.x + car.width > obstacle.obsX &&
    car.y < obstacle.obsY + obstacle.obsHeight &&
    car.y + car.height > obstacle.obsY
  ) {
    car.x += 20;
    car.y += 20;
    return true;
  }
  if (
    car.x < 50 ||
    car.x + car.width > 550 ||
    car.y < 0 ||
    car.y + car.height > canvas.height
  ) {
    car.x = canvas.width / 2;
    car.y = canvas.height * 0.75;
    return true;
  }
}

const render = () => {
  const renderKey = requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.fillRect(0, 0, 50, canvas.height);
  ctx.drawImage(sideRoadImage, 0, 0, 50, canvas.height);
  //   ctx.fillStyle("black");

  //   ctx.fillStyle("black");
  //   ctx.fillRect(550, 0, 50, canvas.height);
  ctx.drawImage(sideRoadImage, canvas.width - 50, 0, 50, canvas.height);
  drawRoads();
  car.renderRacingCar();

  if (obsY <= canvas.height) {
    // drawObstables(270);
    for (let i = 0; i < obstacleArr.length; i++) {
      let obs = obstacleArr[i];
      // let ret = collisionDetection(car, obs);
      // if (ret === true) {
      //   removeLives(car);
      // }
      // console.log(obs);
      //   ctx.clearRect(0, 0, canvas.width, canvas.height);
      increaseScore(obs, i);
      ctx.drawImage(obs.obsImage, obs.obsX, obs.obsY, 100, 100);
      if (collisionDetection(car, obs)) {
        collisionCount++;
        if (collisionCount % 5 === 0 || collisionCount === 25) {
          lives.removeChild(lives.childNodes[1]);
          if (lives.children.length < 1) {
            cancelAnimationFrame(renderKey);
            gameOverElement.style.display = "block";
            bestscore.innerHTML = `${best}`;
            endScorePrompt.innerHTML = `${score}`;
            GO.play();
          }
        }
        // obstacleArr.splice[i];

        // collisionCount = 0;
        console.log("collision");
      } else {
        // console.log("not working");
        // increaseScore();
      }

      obs.obsY += obsVelocity;

      for (let k = 0; k < bulletArr.length; k++) {
        let b = bulletArr[k];
        ctx.drawImage(bullet, b.x, b.y, b.width, b.height);
        b.y -= 5;

        if (hit(b, obs)) {
          obstacleArr.splice(i, 1);
          hitCount++;
          score = hitCount;

          // console.log("hitttttttttttt");
          // console.log(hitCount);
          bulletArr.splice(k, 1);
          if (hitCount > 0) {
            // console.log("this works");
            obs.obsWidth = 0;
            obs.obsHeight = 0;
          }
          // hitCount = 0;
        }
      }

      // obs.obsY = 0s;
      // collisionCount = 0;
    }
    for (let i = 0; i < coinsArr.length; i++) {
      let c = coinsArr[i];
      ctx.drawImage(c.coinImg, c.coinX, c.coinY, c.coinWidth, c.coinHeight);
      c.coinY += obsVelocity;

      if (checkCollision(car, c)) {
        point.play();
        coinsArr.splice(i);
        coinCount++;
        coinP.innerHTML = `Coins: ${coinCount}`;
        // points.innerHTML = `Coins: ${coinCount}`;
      }
    }

    // drawObstables(100);
    // obsY += obsVelocity;
  } else {
    obsY = 0;
    // score++;
    // scoreHeading.innerHTML = `Score: ${score}`;
    // console.log(score);
  }

  // obstacleArr = [];
  // increaseScore();
};

window.onload = function () {
  console.log(gamePlaying);
  // if (!gamePlaying) {
  //   lives.insertAdjacentHTML("afterend", instructions);
  // } else {
  render();
  // }s

  setInterval(() => {
    treeGeneration();
  }, 2000);
  setInterval(() => {
    obstablePosition();
  }, 2700);
  setInterval(() => {
    obstacleRandom();
  }, 4500);
  setInterval(() => {
    generateCoin();
  }, 10000);

  // console.log(gamePlaying);
};
