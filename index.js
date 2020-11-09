const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const worldImg = new Image()
worldImg.src = `./images/bezos-background.jpg`

let world = { 
    x: 0,
    y: 0, 
    w: canvas.width , 
    h: canvas.height * 0.65}

worldImg.onload = function () {
    ctx.drawImage(worldImg, world.x, world.y, world.w, world.h)
  }

  const BezosImg = new Image ()
  BezosImg.src = `./images/bezos-bot-v2.png`
  
  class bot {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
  }

  let Bezos = new bot(-20, 0, 200, 175)

  // BezosImg.onload = function () {
  //   // ctx.drawImage(BezosImg, Bezos.x, Bezos.y, Bezos.w, Bezos.h)
  // }

  
animationId = null;

function animate() {
    animationId = requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(worldImg, world.x, world.y, world.w, world.h)
    ctx.drawImage(BezosImg, Bezos.x, Bezos.y, Bezos.w, Bezos.h)
  }
  animate()