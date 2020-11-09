const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const worldImg = new Image()
worldImg.src = `./worldimage.png`

let world = { 
    x: 0,
    y: 0, 
    w: canvas.width , 
    h: canvas.height *.5 }

worldImg.onload = function () {
    ctx.drawImage(worldImg, world.x, world.y, world.w, world.h)
  }


  
animationId = null;

function animate() {
    animationId = requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(worldImg, world.x, world.y, world.w, world.h)
  
  
  }
  animate()