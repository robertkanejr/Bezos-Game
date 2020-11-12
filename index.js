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

// BezosImg.onload = function () {
//   ctx.drawImage(BezosImg, 0, 0, 902, 440, 395, 340, 250, 175)
// }

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

// BezosImg.onload = function () {
//   ctx.drawImage(BezosImg, 0, 0, 902, 440, 395, 340, 250, 175)
// }

//Build Bot Class

class bot {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.lasers = []
  }

  //Cannon
  shootCannon = () => {
    console.log('shoot')
    //If Bezos facing right, shoot right. If Bezos facing left, shoot left.

    let pBoxImg = {
      x: this.x + (this.w / 2), y: this.y + 40, w: 60, h: 50
    }
    //Push to our laser array
    this.lasers.push(pBoxImg)
  }

}

//Define Character
let Bezos = new bot(395, 340, 250, 175)


//Draw Lasers

function drawLasers() {
  for (let blaster of Bezos.lasers) {
    if (state.rightFace) {

      blaster.x += 10
    } else if (state.leftFace) {
      blaster.x -= 10
    }
    // ctx.fillStyle = 'pattern'
    ctx.drawImage(pBoxImg, blaster.x, blaster.y, blaster.w, blaster.h)
  }
}

// trying to dray laser left
// function drawLasers() {
//   for (let blaster of Bezos.lasers) {
//     blaster.x -= 10
//     // ctx.fillStyle = 'pattern'
//     ctx.drawImage(pBoxImg, blaster.x, blaster.y, blaster.w, blaster.h)
//   }
// }

//SFX

// var bezosBlast = document.getElementById('sound')
// function playAudio() {
//   bezosBlast.play();
// }

// document.body.onkeyup = function (e) {
//   if (e.keyCode == 32) {
//     bezosBlast.play();
//     state = 'shooting';

//   }
//   setTimeout(function () { state = 'walking'; }, 5000);
// }

// Background Music
// window.addEventListener("DOMContentLoaded", event => {
//   const audio = document.getElementById("bg_audio");
//   audio.volume = 0.6;
//   audio.play();
// });


//Laser Collision Detection

function detectCollisionBeam(newObs) {
  let i = 0;
  for (let beam of Bezos.lasers) {
    if (beam.x < newObs.x + newObs.w &&
      beam.x + beam.w > newObs.x &&
      beam.y < newObs.y + newObs.h &&
      beam.y + beam.h > newObs.y) {
      // collision detected!
      score++;
      console.log('collision detected with laser!', score)
      console.log(Bezos.lasers)
      Bezos.lasers.splice(Bezos.lasers.indexOf(beam), 1)
      allObstacles.splice(allObstacles.indexOf(newObs), 1)
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
    ctx.drawImage(zuckImg, obs.x - 100, obs.y + 75, obs.w, obs.h)
    detectCollision(obs)
    detectCollisionBeam(obs)
  }
}


// setInterval(function () {
//   let direction = Math.random() > 0.5
//   let newObs = null;
//   if (direction == true) {
//     newObs = new Obstacles(2000, 300, muskImg.width * .45, muskImg.height * .45, -5)
//   } else {
//     newObs = new Obstacles(-2000, 300, muskImg.width * .45, muskImg.height * .45, 5)
//   }
//   allObstacles.push(newObs)
// }, 1000)

//Obstacle Collision Detection

function detectCollision(obs) {
  //console.log(obs)
  if (Bezos.x < obs.x + obs.w &&
    Bezos.x + Bezos.w > obs.x &&
    Bezos.y < obs.y + obs.h &&
    Bezos.y + Bezos.h > obs.y) {
    // collision detected!
    console.log('collision')
    allObstacles.splice(allObstacles.indexOf(obs), 1)
    lives--;
    if (lives == 0) {
      cancelAnimationFrame(animationId)
      alert(`Game Over! You lost all of your wealth but vaporized ${score} rival CEOs.`)

    }
  }
}

// for(obs of newObs){
//   if (Bezos.x < newObs.x + newObs.w &&
//   Bezos.x + Bezos.w > newObs.x &&
//   Bezos.y < newObs.y + newObs.h &&
//   Bezos.y + Bezos.h > newObs.y) {
//   // collision detected!
//   console.log('collision!')
//   newObs.splice(newObs.indexOf(this), 1)
//   lives--;
//   if (lives==0) {
//     cancelAnimationFrame(animationId)
//     // alert(`Score is ${score}`)
//   }
//}


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
      Bezos.shootCannon()
      break;
  }
}



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
setInterval(function () {
  sheetX += 902
  sheetY = state[action][direction].y
  if (sheetX >= 902 * state[action][direction].num) {
    sheetX = 0
  }
}, 50)

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
    // state = 'shooting';

  }
  // setTimeout(function () { state = 'walking'; }, 5000);
}




numImg = 2;

animationId = null;

function animate() {
  animationId = requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(worldImg, world.x, world.y, world.w, world.h)
  // ctx.drawImage(BezosImg, Bezos.x, Bezos.y, Bezos.w, Bezos.h)
  drawBezos()
  // ctx.drawImage(wealthImg, 0, 10, wealthImg.width / numImg, wealthImg.height, 120, 100, wealthImg.width, wealthImg.height)
  drawObstacles()
  drawLives()
  // drawKillCount()
  drawLasers()

}
animate()