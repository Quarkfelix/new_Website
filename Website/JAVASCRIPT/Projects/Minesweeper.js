let canvas, ctx
var width, height

const rows = 10;
var filedsize;

//call init() if html is loaded
document.addEventListener('DOMContentLoaded', init)


function init() {
    canvas = document.getElementById('myCanvas')
    ctx = canvas.getContext('2d')
    setupCanvas()
    startGameloop()
}

//called if window is resized
window.addEventListener("resize", function() {
    width = window.innerWidth/2
    height = window.innerHeight/2
    if(width < height) {
        height = width
    }else if(height < width) {
        width = height
    }
    canvas.height = height
    canvas.width = width
    filedsize = width/rows

})


function setupCanvas() {
    width = window.innerWidth/2
    height = window.innerHeight/2
    if(width < height) {
        height = width
    }else if(height < width) {
        width = height
    }
    canvas.height = height
    canvas.width = width
    filedsize = width/rows

}

function startGameloop() {
    gameloop = setInterval(() => {
        draw()
    }, 200)
}

function draw() {
    ctx.fillStyle = 'rgb(255, 62, 68)'
}
