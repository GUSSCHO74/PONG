const canvas = document.getElementById("pongGame")
const context = canvas.getContext("2d")
canvas.width = 650;
canvas.height = 400;



//var add = canvas.getContext("2d")
//var canvas = document.createElement("canvas");
//canvas.style = "position:absolute; left: 50%; width: 650px; height 400px; margin-left: -200px; border:1px solid #000000;";
//document.body.insertAdjacentElement("beforeend", canvas)
//console.log(canvas)


class Element{
    constructor(options){
        this.x = options.x
        this.y = options.y
        this.width = options.width
        this.height = options.height
        this.color = options.color
        this.speed = options.speed || 2
        this.gravity = options.gravity
        
    }
}


function drawElements(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawElement(playerOne);
    drawElement(playerTwo);
    drawElement(ball);
}

//player 1
const playerOne = new Element({
    x: 10,
    y: 200,
    width: 15,
    height: 80,
    color: "#fff",
    gravity: 2,
})

//player 2 
const playerTwo = new Element({
    x: 625,
    y: 200,
    width: 15,
    height: 80,
    color: "#fff",
    gravity: 2,
})

//ball
const ball = new Element({
    x: 650 / 2,
    y: 400 / 2,
    width: 15,
    height: 15,
    color: "#20C20E",
    speed: 1,
    gravity: 1,
})

function bounce(){
    if (ball.y + ball.gravity <= 0 || ball.y + ball.gravity >= canvas.height){
        ball.gravity = ball.gravity * -1;
        ball.y += ball.gravity;
        ball.x += ball.speed;
    }
    else {
        ball.y += ball.gravity;
        ball.x += ball.speed;
    }
    collision();
}
// change to opposite direction if hit function
function collision(){
    if (ball.x + ball.speed <= 0 || ball.x + ball.speed + ball.width >= canvas.width){
        ball.y += ball.gravity;
        ball.speed = ball.speed -1;
        ball.x += ball.speed;
    }
    else {
        ball.y += ball.gravity;
        ball.x += ball.speed; 
    }
    drawElements();
}


function drawElement(element) {
    context.fillStyle = element.color
    context.fillRect(element.x, element.y, element.width, element.height)
}

drawElement(playerOne)
drawElement(playerTwo)
drawElement(ball)

// score

// rounds?
// update hit register function
// winner function
// key onclick direction function

// Inspiration video: https://www.youtube.com/watch?v=IISA4XaE2gE