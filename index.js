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

function drawHealthBar() {
  ctx.fillStyle = "green"
  ctx.fillRect(120, 100, 200, 20)
  ctx.fillStyle = "white"
  ctx.font = 'bold 15px Orbitron';
  ctx.fillText("Battery Life :", 10, 115);
}

//Build Bot Class

const BezosImg = new Image()
BezosImg.src = `./images/bezos-bot-v2.png`

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
    //Make a new beam when we shoot 
    let beam = {
      x: this.x + (this.w / 2), y: this.y + 60, w: 50, h: 15
    }
    //Push to our laser array
    this.lasers.push(beam)
  }
}

//Define Character
let Bezos = new bot(0, 340, 250, 175)


//Draw Lasers

function drawLasers() {
  for (let beam of Bezos.lasers) {
    beam.x += 10
    ctx.fillStyle = 'red'
    ctx.fillRect(beam.x, beam.y, beam.w, beam.h)
  }
}

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
      // Bezos.lasers.splice(i, 1)
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
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  drawObstacles() {
    for (let obs of allObstacles) {
      this.x--
      ctx.drawImage(muskImg, this.x, this.y, this.w, this.h)
      ctx.drawImage(zuckImg, this.x - 100, this.y + 75, this.w, this.h)
      detectCollision(obs)
      detectCollisionBeam(obs)
    }
  }
}


setInterval(function () {
  let newObs = new Obstacles(2000, 300, muskImg.width * .45, muskImg.height * .45)
  allObstacles.push(newObs)
}, 10000)

//Obstacle Collision Detection

function detectCollision(newObs) {
  if (Bezos.x < newObs.x + newObs.w &&
    Bezos.x + Bezos.w > newObs.x &&
    Bezos.y < newObs.y + newObs.h &&
    Bezos.y + Bezos.h > newObs.y) {
    // collision detected!
    console.log('collision!')
    cancelAnimationFrame(animationId)
    alert(`You vaporized ${score} Marks and Elons`)
    window.location.reload()
  }
}

let score = 0;

//Draw Each Obstacle

function drawMusk() {
  for (let elon of allObstacles) {
    elon.drawObstacles()
  }
}

function drawZuck() {
  for (let mark of allObstacles) {
    mark.drawObstacles()
  }
}

//Controls

window.onkeydown = function (event) {
  switch (event.key) {
    case 'ArrowLeft':
      Bezos.x -= 15
      break;
    case 'ArrowRight':
      Bezos.x += 15
      break;
    case ' ':
      Bezos.shootCannon()
      break;
  }
}


// Old Health Bar (if needed)

// class progressBar {
//   constructor(element, initialValue = 0) {
//     this.valueElem = elements.querySelector('.progress-bar-value');
//     this.fillElem = elements.querySelector('.progress-bar-fill');

//     this.setValue(initialValue);
//   }

//   setValue(newValue) {
//     if (newValue < 0) {
//       newValue = 0;
//     }
//     if (newValue > 100) {
//       newValue = 100;
//     }
//     this.value = newValue;
//     this.update();

//   }

//   update() {
//     const percentage = this.value + '%';

//     this.fillElem.style.width = percentage;
//     this.valueElem.textContent = percentage;
//   }

// }
// //  for some reason the code below breaks the bezos character
// new progressBar(document.querySelector('.progress-bar'));




//Animation

animationId = null;

function animate() {
  animationId = requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(worldImg, world.x, world.y, world.w, world.h)
  ctx.drawImage(BezosImg, Bezos.x, Bezos.y, Bezos.w, Bezos.h)
  drawMusk()
  drawHealthBar()
  drawLasers()
}
animate()



