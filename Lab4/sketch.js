var paddle_x;
var paddle_step;
var paddle_h = 16;
var paddle_w = 5 * paddle_h;
var ball_x, ball_y;
var ball_x_step, ball_y_step;
var ball_r = 13;
var credits = false;
var score = 0;
var singlePlayer = true;
var running = false;
var paddleA, paddleB;


function setup() {
    var myCanvas = createCanvas(600, 300);
    myCanvas.parent('sketch');
    paddle_x = width/2;
    paddle_step = 0;
    paddleA = new Paddle(width/2, height, paddle_w, paddle_h, false);
    paddleB = new Paddle(width/2, paddle_h, paddle_w, paddle_h, true);

    reset();
}

function draw() {
    if(running){
        if(credits){
            showCredits();
        } else {
            playGame();
        }
    } else {
        showControls();
    }
}

function showCredits(){
    background(40);
    textAlign(CENTER);
    textSize(32);
    if(singlePlayer){
        text("Game over\nScore: "+paddleA.score, width/2, height/2);
    }
    else {
        text("Game over\nScore: "+paddleA.score + ", " + paddleB.score, width/2, height/2);
        if(paddleA.score > paddleB.score){
            text("Player 1 wins", width/2, height/4);
        } else {
            text("Player 2 wins", width/2, height/4);
        }
    }    
}

function showControls(){
    background(40);
    textAlign(CENTER);
    textSize(24);
    fill(255);
    text("Pong!\nPress '1' for one player\nPress '2' for two player\nPress 'h' for this screen\n\nPlayer one: arrows\nPlayer two: mouse", width/2, height/5);
      
}

function playGame(){
    background(40);
    ballCollisions();
    moveBall();
    drawBall();  
    paddleA.update();
    paddleA.display();
    if(!singlePlayer){
        paddleB.update();
        paddleB.display();
    }
}

function drawBall(){
    //draw ball
    noStroke();
    fill(20, 50, 170);
    ellipse(ball_x, ball_y, ball_r*2, ball_r*2);
}

function moveBall(){
    //ball movement
    ball_x = ball_x + ball_x_step;
    ball_y = ball_y + ball_y_step;
}

function ballCollisions(){
    //ball wall collision
    if (ball_x - ball_r < 0 || ball_x + ball_r > width) {
        ball_x_step = -ball_x_step;
    }
    //ball top wall collision
    if(singlePlayer){
        if (ball_y - ball_r < 0) {
            ball_y_step = -ball_y_step;
        }
    }
    checkLoss();
}

function checkLoss(){
    if(singlePlayer){
        if(ball_y > height){
            credits = true;
        }
    } else {
        if(ball_y > height || ball_y < 0){
            credits = true;
        }
    }
}

function keyPressed(){
    if(credits){
        reset();
    }
    if (key == '1') {
        running = true;
        singlePlayer = true;
        reset();
    }
    else if (key == '2') {
        running = true;
        singlePlayer = false;
        reset();
    }
    else if (key == 'h') {
        running = false;
        reset();
    }
}

function reset() {
    ball_x = random(ball_r, width - ball_r);
    ball_y = random(ball_r, height/2 );
    ball_x_step = random(-3, 3);
    ball_y_step = random(1, 3);
    paddleA.score = 0;
    paddleB.score = 0;
    credits = false;
}

// https://yal.cc/rectangle-circle-intersection-test/
// returns true if a rectangle (rx, ry, rw, rh) intersects with a circle (cx,cy,cr)
function rectIsOnCircle(rx, ry, rw, rh, cx, cy, cr) {
    var nx = max(rx, min(cx, rx + rw));
    var ny = max(ry, min(cy, ry + rh));
    var dx = cx - nx;
    var dy = cy - ny;
    return dx * dx + dy * dy < cr * cr;
}

function Paddle(x, y, w, h, mouseControl) {
    this.pos = createVector(x, y);
    this.mouseControl = mouseControl;
    this.w = w; this.h=h;
    this.score = 0;
    this.paddle_step = 3;

    this.update = function(){
        this.pos.x = constrain(this.pos.x, 0, width);
        if(mouseControl){
            if (mouseX < this.pos.x) {
                this.paddle_step = -3;
            } else if (mouseX > this.pos.x + this.w) {
                this.paddle_step = 3;
            } else{
                this.paddle_step = 0;
            }
        }
        else{
            if(keyIsPressed){
                if (keyCode == LEFT_ARROW) {
                    this.paddle_step = -3;
                } else if (keyCode == RIGHT_ARROW) {
                    this.paddle_step = 3;
                } else if (key == ' ') {
                    reset();
                }
            } else {
                this.paddle_step = 0;
            }
        }
        this.movePaddle();
        this.checkCollisions();
    }

    this.checkCollisions = function(){
        if (rectIsOnCircle(this.pos.x, this.pos.y - this.h/2, this.w, -1*this.h, 
            ball_x, ball_y, ball_r)) {
            ball_y_step = -ball_y_step;
            this.score++;
        }
    }

    this.movePaddle = function(){
        this.pos.x += this.paddle_step;
    }
    
    this.display = function() {
        stroke(0);
        colorMode(RGB, 250);
        fill(0,200,0);
        rect(this.pos.x, this.pos.y-this.h, this.w, this.h);
        textAlign(CENTER);
        textSize(32);
        if(this.mouseControl){
            text(this.score, width/2, 100);
        } else {
            text(this.score, width/2, 200);
        }
    };
}