var canvas = document.getElementById("stage");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x=canvas.width/2;
var y=canvas.height-30;
var dx=2;
var dy=-2;
var rightPressed= false;
var leftPressed=false;
var score = 0;
var lives = 3;
var paddleSound = new Audio("paddle.mp3");
var brickSound = new Audio("brick.mp3");


//  ball object& FUNCTIONALITY
function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,2*Math.PI);
    ctx.fillstyle="#0033FF";
    ctx.fillStroke="#0033FF";
    ctx.Stroke="10"
    ctx.fill();
    ctx.closePath();
    }



//  Paddle object & FUNCTIONALITY
var paddle = {
    w: 80,
    h: 15,
    x: canvas.width / 2 - 40,
    y: canvas.height - 15,
    draw: function() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
    },
    move: function(mouseX) {
        this.x = mouseX - this.w / 2;
    }
}

    //Control it
canvas.addEventListener("mousemove", function move(e) {
    mouseX = event.clientX - this.offsetLeft;
    paddle.move(mouseX);
});
document.addEventListener("keydown",function keyDownHandler(e){
    if(e.keyCode==39){
        
        rightPressed=true;
        
        }
        else if(e.keyCode==37){
        
        leftPressed=true;
        
        }
        
    });
document.addEventListener("keyup",function keyUpHandler(e){
    
    if(e.keyCode==39){
        
        rightPressed=false;
    }
    else if(e.keyCode==37){
        
        leftPressed=false;
        
    }
});



// brick object

var w = 75, h = 20, brickPadding = 10, brickRows = 3, brickCol = 9, brickTop = 15, brickLeft = 20 ;
var brick = [];
for(c=0; c<brickCol; c++) {
    brick[c] = [];
    for(r=0; r<brickRows; r++) {
         brick[c][r] = { status: 1 };
    }
}
function drawBrick () {
    for ( c = 0; c < brickCol; c++) {
        for (r = 0; r < brickRows; r++) {
            if (brick[c][r].status == 1) {
                var brickX =  (c * (w + brickPadding) + brickLeft);
                var brickY =  (r * (h + brickPadding) + brickTop);
                brick[c][r].x = brickX;
                brick[c][r].Y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, w, h);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function ballCollision () {
    for ( c = 0; c < brickCol; c++) {
        for (r = 0; r < brickRows; r++) {
            var b = brick[c][r];
            var brickX = brick[c][r].x;
            var brickY = brick[c][r].Y
            if (b.status == 1) {
               if (x>brickX && x<brickX+w && y>brickY && y<brickY+h) {
                dy = -dy;
                b.status = 0; 
                score += 1;
                brickSound.play();
                if (score == brickCol*brickRows) {
                    alert("you won")
                    document.location.reload();
                }
               }
            }
        }
    }
}


function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
function update(){
    ctx.clearRect(0 , 0, canvas.width, canvas.height);
    drawBall();
    paddle.draw();
    drawBrick();
    ballCollision();
    drawScore();
    drawLives();
     if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddle.x && x < paddle.x + paddle.w) {
             if(y = y-paddle.h){
            dy = -dy  ;
             }
            paddleSound.play();
        }
        else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
                paddle.x = (canvas.width-paddle.w)/2;
            }
        }
    }
    
    if(rightPressed && paddle.x < canvas.width-paddle.w) {
        paddle.x += 7;
    }
    else if(leftPressed && paddle.x > 0) {
        paddle.x -= 7;
    }
    
    x += dx;
    y += dy;

    requestAnimationFrame(update, 10);
};


requestAnimationFrame(update);