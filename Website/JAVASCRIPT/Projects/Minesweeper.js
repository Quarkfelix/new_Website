let canvas, ctx
var width = 700
var height = 700
var linewidth = 3
var mineammount = 10

const rows = 10;
var filedsize;
var field   //2dim array in size of rows
var clickedfield
var mines   //2dim arr in size of mineammount

//call init() if html is loaded
document.addEventListener('DOMContentLoaded', init)


function init() {
    canvas = document.getElementById('myCanvas')
    ctx = canvas.getContext('2d')
    setupCanvas()
    setupGame()
    startGameloop()
}

//called if window is resized
window.addEventListener("resize", function() {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
    if(windowWidth < width || windowHeight < height) {
        if(windowWidth < windowHeight) {
            windowHeight = windowWidth
        }else if(windowHeight < windowWidth) {
            windowWidth = windowHeight
        }
        canvas.height = windowHeight
        canvas.width = windowWidth
        filedsize = windowWidth/rows
    } else {
        canvas.height = height
        canvas.width = width
        filedsize = width/rows
    }
})


function setupCanvas() {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
    if(windowWidth < width || windowHeight < height) {
        if(windowWidth < windowHeight) {
            windowHeight = windowWidth
        }else if(windowHeight < windowWidth) {
            windowWidth = windowHeight
        }
        canvas.height = windowHeight
        canvas.width = windowWidth
        filedsize = windowWidth/rows
    } else {
        canvas.height = height
        canvas.width = width
        filedsize = width/rows
    }
}

// 

function setupGame() {
    canvas.addEventListener('click', function(event){
        x = event.clientX - canvas.offsetLeft
        y = event.clientY - canvas.offsetTop

        clickedfield[parseInt((width/rows)/x)][parseInt((height/rows)/y)] = 1
        console.log(x)
        console.log(parseInt((width/rows)/x))

    }, false);

    mines = new Array(mineammount)
    clickedfield = new Array(rows)
    for (i=0;i<rows; i++) {
        clickedfield[i] = new Array(rows)
        for (j=0;j<rows; j++) {
            clickedfield[i][j] = 0
        }
    }
    field = new Array(rows)
    for (i=0;i<rows; i++) {
        field[i] = new Array(rows)
        for (j=0;j<rows; j++) {
            field[i][j] = "0"
        }
    }
    for (i=0;i<mineammount;i++) {
        mineposition = (Math.random() * (rows*rows)).toFixed()
        var x = parseInt(mineposition/rows)
        var y = parseInt(mineposition-(x*rows))
        //check here for duplicate mines        
        
        field[x][y] = "9"
        mines[i] = [x, y]
    }


    //fill in all numbers
    minecounter = 0
    for (i=0;i<rows;i++) {
        for (j=0;j<rows;j++) {
            if(field[i][j] != "9") {
                try {
                    if (field[i][j-1] == "9") { //oben
                        minecounter++
                    }
                } catch (error) {}
                try {
                    if (field[i+1][j-1] === "9") { //rechts oben
                        minecounter++
                    }
                } catch (error) {}
                try {
                    if (field[i+1][j] == "9") { //rechts
                        minecounter++   
                    }
                } catch (error) {}
                try {
                    if (field[i+1][j+1] == "9") { //unten rechts
                        minecounter++
                    }
                } catch (error) {}
                try {
                    if (field[i][j+1] == "9") { //unten
                        minecounter++
                    }
                } catch (error) {}
                try {
                    if (field[i-1][j+1] == "9") { //unten links
                        minecounter++
                    }
                } catch (error) {}
                try {
                    if (field[i-1][j] == "9") { //links
                        minecounter++  
                    }
                } catch (error) {}
                try {
                    if (field[i-1][j-1] == "9") { //oben links
                        minecounter++  
                    }
                } catch (error) {}
                field[i][j] = minecounter.toString()
                minecounter = 0 
            }
        }   
    }
    console.log(field)  


}

function startGameloop() {
    gameloop = setInterval(() => {
        draw()
    }, 200)
}

function draw() {
    //background
    ctx.fillStyle = 'rgb(19, 19, 19)'
    ctx.fillRect(0,0,width,height)

    
    // border
    ctx.beginPath()
    ctx.lineWidth = linewidth.toString()
    ctx.strokeStyle="rgb(47, 196, 222)"
    ctx.rect(0,0,width,height)
    ctx.stroke()

    y = 0
    x = 0
    for(i=0; i<rows; i++) {
        ctx.beginPath()
        ctx.lineWidth = (linewidth/2).toString()
        ctx.strokeStyle="rgb(47, 196, 222)"
        ctx.rect(0,y,width,0)
        ctx.rect(x,0,0,height)
        ctx.stroke()
        y += height/rows
        x += width/rows
    }

    //display numbers
    for (i=0;i<rows;i++) {
        for (j=0;j<rows;j++) {
            ctx.fillStyle = 'rgb(0, 255, 43)'
            if (field[i][j] == "0") {
                ctx.fillStyle = 'rgb(255, 255, 255)'
            }
            if (field[i][j] == "1") {
                ctx.fillStyle = 'rgb(211, 218, 255)'
            }
            if (field[i][j] == "2") {
                ctx.fillStyle = 'rgb(181, 193, 255)'
            }
            if (field[i][j] == "3") {
                ctx.fillStyle = 'rgb(135, 155, 251)'
            }
            if (field[i][j] == "4") {
                ctx.fillStyle = 'rgb(97, 123, 252)'
            }
            if (field[i][j] == "5") {
                ctx.fillStyle = 'rgb(64, 96, 255)'
            }
            if (field[i][j] == "6") {
                ctx.fillStyle = 'rgb(28, 66, 253)'
            }
            if (field[i][j] == "7") {
                ctx.fillStyle = 'rgb(0, 43, 255)'
            }
            if (field[i][j] == "8") {
                ctx.fillStyle = 'rgb(0, 7, 42)'
            }
            //ctx.fillRect((width/rows)*i, (height/rows)*j, width/rows, height/rows)
            ctx.textAlign = 'center'
            ctx.font = ctx.font.replace(/\d+px/, "25px");
            ctx.fillText(field[i][j], (width/rows)*i + (width/rows)/2, (height/rows)*j + (height/rows)/2, width/rows, height/rows)
        }
    }

    //display mines
    for (i=0;i<mineammount;i++) {
        ctx.fillStyle = 'rgb(255, 19, 19)'
        ctx.fillRect((width/rows)*mines[i][0]+1, (height/rows)*mines[i][1]+1, width/rows-2, height/rows-2)
    }


    //display viewprotectiopn


    

    ctx.fillStyle = 'rgb(255, 62, 68)'
}
