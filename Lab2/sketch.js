var x, y, speedx, speedy;
var sunDeg;
var credits;
var mover;
var yoff = 0.0;
var seed;
var translateFactor;

function setup() {
    var myCanvas = createCanvas(600, 400);
    myCanvas.parent('sketch');
    x = width/2; y = height/2;
    speedx = speedy = 0;
    credits = false;
    mover = new MyGuy(10, width/3, height/3);
    sunDeg = 0;
    seed = 904734;
    noiseSeed(seed);
    translateFactor = createVector(width/2, 2*height/3);
    select("#seed").elt.innerHTML = 'Seed is: ' + seed;
}

function draw() {
    drawScene();
    drawHelper();
    if(credits){
        colorMode(RGB, 255);
        background(200, 220);
        textAlign(CENTER);
        textSize(30);
        fill(0);
        text("Credits\n<3 Cole", width/2, height/2);
    }
}

function drawHelper(){
    colorMode(HSB, 255);
    noStroke();
    if (keyPressed){
        if(key == 'a'){
            speedx = speedx - 0.1;
        } else if(key == 'd'){
            speedx = speedx + 0.1;
        } else if(key == 'w'){
            speedy = speedy - 0.1;
        } else if(key == 's'){
            speedy = speedy + 0.1;
        }
    }
    else {
        speedx = speedy = 0;
    }
    x = x + speedx;
    y = y + speedy;
    x = constrain(x, 0, width);
    y = constrain(y, 0, height);
    fill(map(x, 0, width, 0, 255), map(y, 0, height, 0, 255), 255, 40);
    ellipse(x, y, 50,50);
    stroke(0);
    mover.applyForce(createVector(map(mouseX-mover.pos.x, -1*width, width, -1, 1),map(mouseY-mover.pos.y, -1*height, height, -1, 1)));
    mover.update();
    mover.display();
}

function keyPressed(){
    if(key == ' '){
        credits = !credits;
    } else if(key == 'r'){
        changeSeed();
    }

    if(keyCode == UP_ARROW){mover.applyForce(createVector(map(mouseX, 0, width, -1, 1),map(mouseY, 0, height, -1, 1)));
        mover.applyForce(createVector(0,-1));
        translateFactor.add(createVector(0,-3));
    } else if(keyCode == DOWN_ARROW){
        mover.applyForce(createVector(0,1));
        translateFactor.add(createVector(0,3));
    } else if(keyCode == LEFT_ARROW){
        mover.applyForce(createVector(-1,0));
        translateFactor.add(createVector(-3,0));
    } else if(keyCode == RIGHT_ARROW){
        mover.applyForce(createVector(1,0));
        translateFactor.add(createVector(3,0));
    }
    translateFactor.x = constrain(translateFactor.x, 0, width);
    translateFactor.y = constrain(translateFactor.y, height*.4, height);
}


function MyGuy(m, x, y) {
    this.mass = m;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.hue = floor(random(200, 320));
    
    this.applyForce = function(force) {
        var f = p5.Vector.div(force,this.mass/2);
        this.acc.add(f);
    };

    this.update = function(){
        this.vel.add(this.acc);
        this.vel.mult(.99);
        this.vel.limit(4);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
    }
    
    this.display = function() {
        stroke(0);
        colorMode(HSB, 360);
        fill(this.hue, map(this.pos.x, 0, width, 40, 300), map(this.pos.y, 0, height, 40, 300), 200);
        ellipse(this.pos.x, this.pos.y, this.mass*10, this.mass*10);
    };
}



function drawScene() {
    colorMode(RGB, 255);
    background(181, 216, 224);
    noiseDetail(3, 0.65);
    //sun
    push();
    translate(width/2, height*1.05);
    sunDeg = frameCount/50;
    rotate(sunDeg);
    stroke(218, 229, 61);
    fill(218, 229, 61);
    ellipse(width*.65, 0, 53,53);
    stroke(229, 234, 213);  //moon
    fill(229, 234, 213);
    ellipse(width*-.65, 0, 43,43);
    stroke(0);
    pop();
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
    //bullseye
    ellipseMode(CENTER);
    push();
    // translate(width/2, 2*height/3);
    translate(translateFactor.x, translateFactor.y);
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

function changeSeed(){
    seed = floor(random(1000000));
    noiseSeed(seed);
    console.log(select("#seed"));
    select("#seed").elt.innerHTML = 'Seed is: ' + seed;
}