var bird;
var pipes = [];
var numPipes = 3;
var score = 0;
var credits = false;
var lost = false;
var canReset = 0;
var highscore = 0;

function setup() {
    var myCanvas = createCanvas(600, 400);
    myCanvas.parent('sketch');
    bird = new Bird();
    //prob make a loop
    pipes.push(new Pipe(width + (0               )));
    pipes.push(new Pipe(width + ((1.5*width)/3   )));
    pipes.push(new Pipe(width + (2*(1.5*width)/3)));
}

function draw() {
    textSize(40);
    if(lost){
        if(score > highscore){
            highscore = score;
        }
        background(100);
        for(let i = 0; i < numPipes; i++){
            pipes[i].display();
        }
        bird.fall();
        bird.display();
        if(credits){
            fill(0, 90);
            rect(0,0,width, height);
            strokeWeight(3);
            stroke(50);
            fill(0,255,0);
            rect(width/4, height/3, width/2, height);
            textSize(50);
            textAlign(CENTER);
            fill(255);
            text(score, width/2, height/2 + 30);
            textSize(30);
            text("Points", width/2, height/2 + 70);
            textSize(26);
            text("Highscore: " + highscore, width/2, height/2 + 105);
            textSize(26);
            strokeWeight(1);
            stroke(120);
            fill(0);
            text("Space to play!", width/2, height/2 + 150);
            canReset ++;
        } 
    }
    else {
        background(100);
        for(let i = 0; i < numPipes; i++){
            pipes[i].update();
            pipes[i].display();
        }
        bird.update();
        bird.display();
        textSize(40);
        fill(250);
        text(score, width/2, 50);
    }
}

function resetGame(){
    canReset = 0;
    score = 0;
    credits = false;
    lost = false;
    bird = new Bird();
    pipes[0] = new Pipe(width + (0               ));
    pipes[1] = new Pipe(width + ((1.5*width)/3   ));
    pipes[2] = new Pipe(width + (2*(1.5*width)/3));
}

function keyTyped(){
    bird.keyHandler(key);
    if(canReset > 60){
        if(key == ' '){
            resetGame();
        }
    }
}