// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 10-10: The raindrop catching game

// import Catcher from './Catcher.js'
// import Timer from './Timer.js'
// import Drop from './Drop.js'


var catcher;    // One catcher object
var timer;        // One timer object
var drops;       // An array of drop objects
var totalDrops = 0; // totalDrops
var dropStep = 1;
var bck, winScreen, loseScreen;
var kirby, kirby2, kirbyBottom;
var kirbyBool = true;
var kirbyCounter = 0;
var charList = [];
var imgList = [];
var dropSize = 80;
var credits = false;
var score = 0;
var time = 50;
// var time = 3;
var difficultyStep = 10;
var lossTimer = 0;

function preload(){
    bck = loadImage('./Assets/Fod.jpg');
    winScreen = loadImage('./Assets/WinningScreen.jpg');
    loseScreen = loadImage('./Assets/LosingScreen.jpg');
    // bck = loadImage('./Assets/WorldOfLight.jpeg');
    // bck = loadImage('./Assets/WorldOfLightDark.jpg');
    kirby = loadImage('./Assets/Kirby.png');
    kirby2 = loadImage('./Assets/Kirby2.png');
    kirbyBottom = loadImage('./Assets/KirbyBottom.png');
    charList.push('Bayo', 'Dk', 'Fox', 'Inkling', 'Mario', 'Ridley', 'Ryu', 'Shulk', 'Sonic', 'Yoshi');
    for(let i = 0; i < charList.length; i++){
        imgList.push(loadImage(`./Assets/${charList[i]}.png`));
        imgList[i].resize(dropSize, dropSize);
    }
}

function setup() {
    // var myCanvas = createCanvas(1200, 800);
    var myCanvas = createCanvas(800, 600);
    bck.resize(width, height);
    myCanvas.parent('sketch');
    catcher = new Catcher(50); // Create the catcher with passed radius
    drops = new Array(1000);    // Create 1000 spots in the array
    timer = new Timer(300);    // Create a timer that goes off every 300 milliseconds
    timer.start();             // Starting the timer
}

function draw(){
    if(credits){
        showCredits();
    } else {
        runGame();
    }
}

function keyTyped(){
    if(credits && lossTimer > 40){
        if(key == ' ') resetGame();
    }
}

function showCredits(){
    lossTimer++;
    //won
    if(time == 0){
        background(winScreen || 255);
        textAlign(LEFT);
        textSize(74);
        fill(235);
        stroke(30);
        strokeWeight(3);
        text(`You won!\n${score}%`, width/10, height/2.5);
        if(lossTimer > 40){
            textSize(40);
            text("Press SPACE to restart", width/10, height/2 + 100);
        }
    }
    else{
        background(loseScreen || 255);
        textSize(74);
        fill(197, 74, 69);
        stroke(104, 9, 9);
        strokeWeight(3);
        text(`You lost!\n${time} seconds left`, width/2, height*.75);
        if(lossTimer > 40){
            textSize(40);
            fill(220,190,190);
            text("Press SPACE to restart", width/2, height*.35);
        }
    }
}

function resetGame(){
    score = 0;
    time = 100;
    lossTimer = 0;
    credits = false;
    totalDrops = 0;
    drops = new Array(1000);
}

function runGame() {
    background(bck || 255);
    fill(0, 90);
    image(kirbyBottom, 10, height-10-kirbyBottom.height/3, kirbyBottom.width/3, kirbyBottom.height/3);
    rect(0, 0, width, height);
    fill(235);
    textSize(46);
    textAlign(CENTER);
    stroke(30);
    strokeWeight(5);
    text(score+"%", 20+ kirbyBottom.width/3, height-kirbyBottom.height/6);
    textSize(54);
    text(time, width/2, 80);
    if(frameCount%60 == 0){
        time--;
        if(time == 0 || score >= 100){
            credits = true;
        }
    }
    // Set catcher location
    catcher.setLocation(mouseX, mouseY); 
    // Display the catcher
    catcher.display(); 

    // Check the timer
    if (timer.isFinished()) {
        // Deal with raindrops
        // // Initialize dropStep drops
        for(let i = totalDrops; i < totalDrops + dropStep; i++){
            drops[i] = new Drop();
        }
        // Increment totalDrops
        totalDrops += dropStep ;
        // If we hit the end of the array
        if (totalDrops >= drops.length) {
            totalDrops = 0; // Start over
        }
        timer.start();
        kirbyCounter++;
        if(kirbyCounter%4 == 0){
            kirbyBool = !kirbyBool;
        }
    }

    // Move and display all drops
    for (let i = 0; i < totalDrops; i++ ) {
        drops[i].move();
        drops[i].display();
        if (catcher.intersect(drops[i])) {
            score+=difficultyStep;
            drops[i].caught();
        }
    }
}