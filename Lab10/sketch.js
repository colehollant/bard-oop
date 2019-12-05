
var w;

function setup() {
    var myCanvas = createCanvas(600, 400);
    myCanvas.parent('sketch');
    w = new World();
    for (let i = 0; i < 50; i++) {
      w.addAnimal(new Prey(w));
    }
  
    for (let i = 0; i < 10; i++) {
      w.addAnimal(new Predator(w));
    }
}

function draw() {
    background(196);
    w.tic();
    drawPop();
}

function drawPop() {
    let numPrey     = w.count(Prey);
    let numPredator = w.count(Predator);
  
    if (numPrey == 0 || numPredator == 0) {
      background(196);
      textSize(32);
      fill(24);
      text("steps: " + frameCount, 50, 50);
      text("prey: " + numPrey, 50, 100);
      text("predator: " + numPredator, 50, 150);
      noLoop();
    } else {  
      noStroke();
      fill(0, 0, 255, 124);
      rect(0, 10, numPrey*3, 18);
      fill(255, 0, 0, 124);
      rect (0, 30, numPredator*3, 18);
    }
  }
