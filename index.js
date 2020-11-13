const canvas = document.querySelector('canvas')
const worldImg = new Image()
worldImg.src = `./images/bezos-background.jpg`

//Canvas

canvas.width = window.innerWidth;
canvas.height = 540
const ctx = canvas.getContext('2d')

let world = {
  x: 0,
  y: 0,
  w: canvas.width,
  h: canvas.height
}

worldImg.onload = function () {
  ctx.drawImage(worldImg, world.x, world.y, world.w, world.h)
}

//Health Bar

// function drawKillCount() {
//   ctx.fillStyle = "green"
//   ctx.fillRect(120, 100, 200, 20)
//   ctx.fillStyle = "white"
//   ctx.font = 'bold 15px Orbitron';
//   ctx.fillText("Battery Life ${score} :", 10, 115);
// }

// Define Images

const BezosImg = new Image()
BezosImg.src = `./images/full-sprite-sheet-v4.png`

const wealthImg = new Image()
wealthImg.src = `./images/frame-sprite-animation.png`

const pBoxImg = new Image()
pBoxImg.src = `./images/prime-box.png`

//Build Bot Class

class bot {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

let lasersRight = [];
let lasersLeft = []
class LasersR {
  constructor(img, x, y, w, h) {
    this.img = img
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  drawLasersRight = () => {
    ctx.drawImage(this.img, this.x++, this.y, this.w, this.h);
    console.log(this)
    // ctx.fillRect(this.x, this.y, 20, 20)
    this.x += 5
  }
}

class LasersL {
  constructor(img, x, y, w, h) {
    this.img = img
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  drawLasersLeft = () => {
    ctx.drawImage(this.img, this.x--, this.y, this.w, this.h);
    this.x -= 5
  }
}

//Define Character
let Bezos = new bot(395, 340, 250, 175)

//Draw Lasers

// function drawLasers() {
//   for (let blaster of Bezos.lasers) {
//     if (state.rightFace) {

//       blaster.x += 10
//     } else if (state.leftFace) {
//       blaster.x -= 10
//     }
//     // ctx.fillStyle = 'pattern'
//     ctx.drawImage(pBoxImg, blaster.x, blaster.y, blaster.w, blaster.h)
//   }
// }

// trying to dray laser left
// function drawLasers() {
//   for (let blaster of Bezos.lasers) {
//     blaster.x -= 10
//     // ctx.fillStyle = 'pattern'
//     ctx.drawImage(pBoxImg, blaster.x, blaster.y, blaster.w, blaster.h)
//   }
// }

//SFX

// Background Music
// window.addEventListener("DOMContentLoaded", event => {
//   const audio = document.getElementById("bg_audio");
//   audio.volume = 0.6;
//   audio.play();
// });


//Laser Collision Detection

function detectCollisionBeam(obs) {
  let i = 0;
  for (let beam of lasersRight) {
    console.log(beam.x, obs.x)
    if (beam.x < obs.x + obs.w &&
      beam.x + beam.w > obs.x &&
      beam.y < obs.y + obs.h &&
      beam.y + beam.h > obs.y) {
      // collision detected!

      score++;
      console.log('collision detected with laser!', score)
      // debugger;
      lasersRight.splice(lasersRight.indexOf(beam), 1)
      allObstacles.splice(allObstacles.indexOf(obs), 1)
      i++;
    }
  }
  for (let beam of lasersLeft) {
    if (beam.x < obs.x + obs.w &&
      beam.x + beam.w > obs.x &&
      beam.y < obs.y + obs.h &&
      beam.y + beam.h > obs.y) {
      // collision detected!
      score++;
      // console.log('collision detected with laser!', score)
      // console.log(lasersLeft)
      lasersLeft.splice(lasersLeft.indexOf(beam), 1)
      allObstacles.splice(allObstacles.indexOf(obs), 1)
      i++;
    }
  }
}

//Define Obstacles

let muskImg = new Image()
muskImg.src = "./images/musk.png"

let allObstacles = []

let zuckImg = new Image()
zuckImg.src = "./images/zuck.png"


class Obstacles {
  constructor(x, y, w, h, movement) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.movement = movement;
  }

  // drawObstacles() {
  //   for (let obs of allObstacles) {
  //     this.x--
  //     ctx.drawImage(muskImg, this.x, this.y, this.w, this.h)
  //     ctx.drawImage(zuckImg, this.x - 100, this.y + 75, this.w, this.h)
  //     detectCollision(obs)
  //     detectCollisionBeam(obs)
  //   }
  // }
}

function drawObstacles() {
  //console.log('draw', allObstacles)
  for (let obs of allObstacles) {
    obs.x += obs.movement

    ctx.drawImage(muskImg, obs.x, obs.y, obs.w, obs.h)
    //ctx.drawImage(zuckImg, obs.x - 250, obs.y + 75, obs.w, obs.h)
    detectCollision(obs)
    detectCollisionBeam(obs)
  }
}

setInterval(function () {
  let direction = Math.random() > 0.5
  let newObs = null;
  if (direction == true) {
    newObs = new Obstacles(2000, 400, muskImg.width * .45, muskImg.height * .45, -5)
  } else {
    newObs = new Obstacles(-2000, 400, muskImg.width * .45, muskImg.height * .45, 5)
  }
  allObstacles.push(newObs)
}, 1000)

//Obstacle Collision Detection

function detectCollision(obs) {
  //console.log(obs)
  if (locateX < obs.x + obs.w &&
    locateX + Bezos.w > obs.x &&
    Bezos.y < obs.y + obs.h &&
    Bezos.y + Bezos.h > obs.y) {
    // collision detected!
    console.log('collision')
    allObstacles.splice(allObstacles.indexOf(obs), 1)
    lives--;
    if (lives == 0) {
      action = 'dying';
      clearInterval(bezosInterval)
      animateBezos(300)
      allObstacles = [];
      setTimeout(function () {
        cancelAnimationFrame(animationId)
        alert(`Game Over! You lost all of your wealth but vaporized ${score} rival CEOs.`)
      }, 3000);

    }
  }
}

// window.location.reload()

let score = 0;

//Draw Each Obstacle

// function drawMusk() {
//   for (let elon of allObstacles) {
//     elon.drawObstacles()
//   }
// }

// function drawZuck() {
//   for (let mark of allObstacles) {
//     mark.drawObstacles()
//   }
// }


//Define Lives

let lives = 5
function drawLives() {
  ctx.drawImage(wealthImg, 0, 10, wealthImg.width * lives / 5, wealthImg.height, 0, 0, wealthImg.width / 5 * lives, wealthImg.height)
}

//Controls
let direction = 'right'

window.onkeydown = function (event) {
  switch (event.key) {
    case 'ArrowLeft':
      // if (sheetX === 902 * 24) {
      //   sheetX === 0
      // } else {
      //   sheetX += 902
      // }
      direction = 'left'
      locateX -= 10
      state.rightFace = false
      state.leftFace = true
      break;
    case 'ArrowRight':
      // if (sheetX === 902 * 24) {
      //   sheetX === 0
      // } else {
      //   sheetX += 902
      // }
      direction = 'right'
      locateX += 10
      state.rightFace = true
      state.leftFace = false
      break;
    case ' ':
      console.log(Bezos.x)
      if (state.rightFace) {
        lasersRight.push(new LasersR(pBoxImg, locateX + Bezos.w / 2, Bezos.y + Bezos.h / 2, 50, 60));
      } else if (state.leftFace) {
        lasersLeft.push(new LasersL(pBoxImg, locateX + Bezos.w / 2, Bezos.y + Bezos.h / 2, 50, 60));
      }
      break;
  }
};

//Animation
let sheetX = 0;
let sheetY = 0;
let locateX = 395;

let state = {
  walking: { right: { num: 24, y: 0 }, left: { num: 24, y: 1740 } },
  shooting: { right: { num: 10, y: 540 }, left: { num: 10, y: 2240 } },
  dying: { right: { num: 35, y: 1140 }, left: { num: 35, y: 2840 } },
  rightFace: true,
  leftFace: false,
}

let action = 'walking'
let bezosInterval = null;
function animateBezos(speed) {
  console.log(speed)
  bezosInterval = setInterval(function () {

    sheetX += 902
    sheetY = state[action][direction].y
    if (sheetX >= 902 * state[action][direction].num) {
      sheetX = 0
    }
  }, speed)
}
animateBezos(50);
function drawBezos() {
  ctx.drawImage(BezosImg, sheetX, sheetY, 902, 470, locateX, 340, 250, 175)
}

var bezosBlast = document.getElementById('sound')
function playAudio() {
  bezosBlast.play();
}

document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    bezosBlast.play();
    action = 'shooting';
    setTimeout(function () { action = 'walking'; }, 500);
  }
}

numImg = 2;

animationId = null;

function animate() {
  animationId = requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(worldImg, world.x, world.y, world.w, world.h)
  drawBezos()
  drawObstacles()
  drawLives()
  for (laserr of lasersRight) {
    laserr.drawLasersRight()
  }
  for (laserl of lasersLeft) {
    laserl.drawLasersLeft()
  }


}
animate()