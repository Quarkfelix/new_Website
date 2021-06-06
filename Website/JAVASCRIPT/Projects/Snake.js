let canvas, ctx
var rows
var colums
var blocksize
var movementdirection
var food 
var snake
var oldsnake

//methode ruft automatisch init auf wenn die seite(html teil) geladen hat
document.addEventListener('DOMContentLoaded', init)

function init() {
    movementdirection = 'right'
    rows = 28
    colums = 28
    blocksize = 25
    if(window.innerWidth < window.innerHeight-100) {
      blocksize = window.innerWidth-200
      blocksize = blocksize/rows
    } else {
      blocksize = window.innerHeight-200
      blocksize = blocksize/rows
    }
    canvas = document.getElementById('myCanvas')
    ctx = canvas.getContext('2d')
    ctx.canvas.width = blocksize*rows;
    ctx.canvas.height = blocksize*rows;
    snake = [new Bodypart(3,3), new Bodypart(2,3), new Bodypart(1,3)]
    food = new Food(colums, rows)
    startGameloop()
}

//resize game if window is resized
window.addEventListener("resize", function() {
  blocksize = 25
  if(window.innerWidth < window.innerHeight-100) {
    blocksize = window.innerWidth-200
    blocksize = blocksize/rows
  } else {
    blocksize = window.innerHeight-200
    blocksize = blocksize/rows
  }
  ctx.canvas.width = blocksize*rows;
  ctx.canvas.height = blocksize*rows;
});

function startGameloop() {
  gameloop = setInterval(() => {
  this.move()
    this.snake[this.snake.length-1].x
    if(this.snake[this.snake.length-1].x == this.food.x && this.snake[this.snake.length-1].y == this.food.y) {
      //food got eaten
      this.snake.splice(0,0,new Bodypart(-5,-5))
      this.food.new(this.colums-1, this.rows-1)
    }
    this.draw()
}, 200)
}


function move() {
    let y = this.snake[this.snake.length-1].y
    let x = this.snake[this.snake.length-1].x
    switch(this.movementdirection) {
        //up
      case 'up': 
        if(y-1 >= 0) {
          this.snake.push(new Bodypart(x, y-1))
          this.snake.splice(0,1);
        }
        break;
        //down
      case 'down': 
        if(y+1 < this.rows) {
          this.snake.push(new Bodypart(x, y+1))
          this.snake.splice(0,1);
        }
        break;
        //left
      case 'left': 
        if(x-1 >= 0) {
          this.snake.push(new Bodypart(x-1, y))
          this.snake.splice(0,1);
        }
        break;
        //right
      case 'right': 
        if(x+1 < this.colums) {
          this.snake.push(new Bodypart(x+1, y))
          this.snake.splice(0,1);
        }
        break;
      default: 
        break;
    }
}

function draw() {
    ctx.fillStyle = 'rgb(34,34,34)'
    ctx.fillRect(0,0,this.colums*this.blocksize, this.rows*this.blocksize)
    ctx.fillStyle = 'blue'
    for(var i=0;i<this.snake.length;i++) {
        ctx.fillRect(this.snake[i].x*this.blocksize,this.snake[i].y*this.blocksize,this.blocksize,this.blocksize)
    }
    ctx.fillStyle = 'red'
    ctx.fillRect(this.food.x*this.blocksize + this.blocksize/4,this.food.y*this.blocksize + this.blocksize/4,this.blocksize/2,this.blocksize/2)
}


  //keyinput
document.addEventListener('keydown', function(event) {    
    switch(event.key) {
      case 'ArrowUp': {
        if(movementdirection != 'down') {
            movementdirection = 'up'
        }
        break
      }
      case 'ArrowDown': {
        if(movementdirection != "up") {
          movementdirection = "down"
        }
        break
      }
      case 'ArrowLeft': {
        if(movementdirection != "right") {
          movementdirection = "left"
        }
        break
      }
      case 'ArrowRight': {
        if(movementdirection != "left") {
          movementdirection = "right"
        }
        break
      }
    } 
})
  document.onkeypress = function(e) {
    
  }

class Bodypart {
    x
    y

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    move(x, y) {
        this.x = x
        this.y = y
    }
}

class Food {
    x
    y
  
    constructor(width, height) {
        this.x = Math.floor(Math.random()* (width))
        this.y = Math.floor(Math.random()* (height))
    }
  
    new(width, height) {
      this.x = Math.floor(Math.random() * (width + 1));
      this.y = Math.floor(Math.random() * (height + 1));
    }
}


