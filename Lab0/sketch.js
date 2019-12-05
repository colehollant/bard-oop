
var yoff = 0.0;
var seed;

function setup() {
    var myCanvas = createCanvas(600, 400);
    myCanvas.parent('sketch');
    seed = 904734;
    noiseSeed(seed);
    // let myDiv0 = createDiv('Seed is: ' + seed).id('seed');
    select("#seed").elt.innerHTML = 'Seed is: ' + seed;
}

function draw() {
    background(181, 216, 224);
    noiseDetail(3, 0.65);
    //back mountains
    fill(94, 71, 28);
    beginShape(); 
    var xoff = 0;
    for (var x = 0; x <= width; x += 5) {
        var y = map(noise(pow(noise(xoff, xoff), 2)) + noise(pow(noise(xoff, xoff), 3)), 0, 2, height-140,height-280);
        vertex(x, y); 
        xoff += 0.12;
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
    //mid mountains
    fill(102, 86, 15);
    beginShape(); 
    var xoff = 0;
    for (var x = 0; x <= width; x += 10) {
        var y = map(noise(pow(noise(xoff, xoff), 2)) + noise(pow(noise(xoff, xoff), 3)), 0, 2, height-80,height-240);
        vertex(x, y); 
        xoff += 0.0537;
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
    //sun
    stroke(168, 168, 18);
    fill(168, 168, 18);
    ellipse(width*.83, height/5, 53,53);
    stroke(0);
    //bullseye
    ellipseMode(CENTER);
    push();
    translate(width/2, 2*height/3);
    fill(78, 96, 19);
    ellipse(0,height/2.7, width*2, 200);
    for(let i = 100; i >0; i-=20){
        fill(map(i*i, 0,10000,0,185));
        ellipse(0,0,i,i);
    }
    point(0,0);
    //stands
    fill(99, 38, 0);
    rect(-35,35,10,20);
    rect(25,35,10,20);
    pop();

    //front grass
    fill(33, 112, 10);
    beginShape(); 
    var xoff = 0;
    for (var x = 0; x <= width; x += 10) {
        var y = map(noise(xoff, yoff), 0, 1, height-10,height-100);
        vertex(x, y); 
        xoff += 0.025;
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
}

function keyTyped(){
    if(key == ' '){
        seed = floor(random(1000000));
        noiseSeed(seed);
        select("#seed").elt.innerHTML = 'Seed is: ' + seed;
    }
}