// if (
//   car.x < obstacleArr.obsX + obstacleArr.obsWidth ||
//   car.x + car.width > obstacleArr.obsX + obstacleArr.obsWidth ||
//   car.y < obstacle.obsY + obstacle.obsHeight ||
//   car.y + car.height > obstacle.obsY
// ) {
//   console.log("collision detection");
// }

///////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------AUDIO---------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////////////////
// const driving = new Audio();
// driving.src = "./sounds/car-audio.mp3";

// const point = new Audio();
// point.src = "./sounds/coin.mp3";

// const lifeOver = new Audio();
// lifeOver.src = "./sounds/life-over.mp3";

// const horn = new Audio();
// horn.src = "./sounds/horn.wav";

// /////old collision detection
// //collision on side bars of roads in the animation
// if (car.x <= 50 || car.x + car.width / 2 >= 500) {
//   // console.log(true);
//   lifeOver.play();
//   return true;
// }

// //collision with the top and bottom of the canvas
// if (car.y >= canvas.height - car.height || car.y <= 1) {
//   // console.log("out of bounds");
//   lifeOver.play();
//   return true;
// }

// if (
//   car.x + car.width > obstacle.obsX - obstacle.width ||
//   car.x - car.width > obstacle.width + obstacle.obsX
// ) {
//   lifeOver.play();
//   return true;
//   // console.log("hit");
// }

//   if (
//     car.x < obstacle.obsX + obstacle.obsWidth ||
//     car.x + car.width > obstacle.obsX + obstacle.obsWidth ||
//     car.y < obstacle.obsY + obstacle.obsHeight ||
//     car.y + car.height > obstacle.obsY
//   ) {
//     lifeOver.play();
//     console.log("here");
//     // console.log("collision detection");
//   }

function checkCollision(obj1, obj2) {
  return (
    obj1.x < obj2.coinX + obj2.coinWidth &&
    obj1.x + obj1.width > obj2.coinX &&
    obj1.y < obj2.coinY + obj2.coinHeight &&
    obj1.y + obj1.height > obj2.coinY
  );
}

function hit(b, o) {
  return (
    // b.y <= o.obsY + o.obsHeight &&
    // b.x + b.width > o.obsX &&
    // b.x + b.width <= o.obsX + o.obsWidth

    b.x + b.width >= o.obsX &&
    b.x <= o.obsX + o.obsWidth &&
    b.y + b.height >= o.obsY &&
    b.y <= o.obsY + o.obsHeight
  );
}
