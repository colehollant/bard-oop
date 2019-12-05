var paddle_x;
var paddle_step;
var paddle_h = 16;
var paddle_w = 5 * paddle_h;
var ball_x, ball_y;
var ball_x_step, ball_y_step;
var ball_r = 13;
var credits = false;
var score = 0;

function setup() {
    var myCanvas = createCanvas(600, 300);
    myCanvas.parent('sketch');
    let myDiv0 = createDiv("Some Text").id('divThing');
    paddle_x = width/2;
    paddle_step = 0;
    reset();
}

function draw() {
    if(credits){
        showCredits();
    } else {
        playGame();
    }
}

function showCredits(){
    background(0);
    textAlign(CENTER);
    textSize(32);
    text("Game over\nScore: "+score, width/2, height/2);
}

function playGame(){
    background(0);
    movePaddle();
    ballCollisions();
    moveBall();
    drawBall();  
    drawPaddle();
    textAlign(CENTER);
    textSize(32);
    text(score, width/2, 50);
}

function drawPaddle(){
    //draw paddle
    stroke(24);
    fill(0,200,0);
    rect(paddle_x, height-paddle_h, paddle_w, paddle_h);
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


function movePaddle(){
    //move paddle
    paddle_x = paddle_x + paddle_step;
}

function ballCollisions(){
    //ball wall collision
    if (ball_x - ball_r < 0 || ball_x + ball_r > width) {
        ball_x_step = -ball_x_step;
    }
    //ball top wall collision
    if (ball_y - ball_r < 0) {
        ball_y_step = -ball_y_step;
    }
    //ball paddle collision
    if (rectIsOnCircle(paddle_x, height - paddle_h, paddle_w, paddle_h, 
        ball_x, ball_y, ball_r)) {
        ball_y_step = -ball_y_step;
        score++;
    }
    checkLoss();
}

function checkLoss(){
    if(ball_y > height){
        credits = true;
    }
}

function mousePressed(){
    select("#divThing").elt.innerHTML = 'Seed is: ';
}

function keyPressed(){
    if (keyCode == LEFT_ARROW) {
        paddle_step = -3;
    } else if (keyCode == RIGHT_ARROW) {
        paddle_step = 3;
    } else if (key == ' ') {
        reset();
    }
    if(credits){
        reset();
    }
}

function keyReleased() {
    paddle_step = 0;
}

function reset() {
    ball_x = random(ball_r, width - ball_r);
    ball_y = random(ball_r, height/2 );
    ball_x_step = random(-3, 3);
    ball_y_step = random(1, 3);
    score = 0;
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