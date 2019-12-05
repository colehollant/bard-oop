

let x, y;
let particleColor, particleRadius, particleHue;
let which = 0;
var movers;
var numMovers = 40;
var attractor;
var yoff = 0;
var xoff = 0;
var inc = 0.01;

function setup() {
    var myCanvas = createCanvas(600, 600);
    myCanvas.parent('sketch');
    x = width/2; y = height/2;
    particleHue = random(255);
    particleColor = color(particleHue, random(255), random(255));
    particleRadius = random(50)+40;
    setupSketch2();
    background(200);
}

function draw() {
    if(which == 0){
        stepsThrough3();
    } else if (which == 1){
        stepsThrough6();
    } else if (which == 2){
        drawSketch2();
    }
    
}

function mousePressed(){
    x = mouseX;
    y = mouseY;
    attractor.clicked(mouseX, mouseY);
}

function keyPressed(){
    background(200);
    if(key == '1'){
        which = 0;
    } else if(key == '2'){
        which = 1;
    } else if(key == '3'){
        which = 2;
    }
}

function stepsThrough3(){
    noStroke();
    fill(random(255), random(255), random(255));
    let radius = random(40);
    ellipse(random(width), random(height), radius, radius);
}

function stepsThrough6(){
    colorMode(HSB, 255);
    background(200);
    noStroke();
    particleColor = color(particleHue, map(x, 0, width, 0, 255), map(y, 0, height, 0, 255));
    fill(particleColor);
    ellipse(x, y, particleRadius, particleRadius);
    x += map(sin(random(frameCount*19)), -1,1, -4, 4);
    y += map(cos(random(frameCount*7)),  -1,1, -4, 4);
    x = constrain(x, 0, width);
    y = constrain(y, 0, height);
}




/*

    Static: Literally some colors
    Static animation: Noise background :frick-ya:
    Dynamic: Color of the planet things
    Interactive: Shit be movin with the mouse

*/

function setupSketch2 () {
    movers = [];
    for(var i = 0; i < numMovers; i++){
        movers.push(new Mover(random(0.1, 2), random(width), random(height) ));
    }
    attractor = new Attractor();
    ellipseMode(CENTER);
}

function drawSketch2() {
    // background(200);
    background(37, 4, 51);
    smoke();
    attractor.update();
    attractor.display();
    
    for(var i = 0; i < movers.length; i++){
        var force = attractor.attract(movers[i]);
        movers[i].applyForce(force);
        movers[i].update();
        movers[i].display();
    }
}

function Attractor() {
    this.mass = 20;
    this.pos = createVector(random(width/3, 2*width/3), random(height/3, 2*height/3));
    this.G = 1;

    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 6;
    this.maxforce = 0.1;

    this.attract = function(m){
        var force = p5.Vector.sub(this.pos, m.pos);
        var d = force.mag();
        d = constrain(d, 5.0, 50.0);
        force.normalize();
        var strength = (this.G * this.mass * m.mass) / (d*d);
        force.mult(strength);
        return force;
    }

    this.display = function() {
        stroke(0);
        colorMode(RGB, 255);
        // fill(175,200);
        fill(226, 172, 45, 200);
        ellipse(this.pos.x, this.pos.y, this.mass*2, this.mass*2);
    };

    this.clicked = function(mx, my){
        this.pos.x = mx;
        this.pos.y = my;
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    };

    this.update = function(){
        this.arrive(createVector(mouseX, mouseY));
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.arrive = function(target){
        var desired = p5.Vector.sub(target, this.pos);
        var d = desired.mag();
        if(d < 100){
            var m = map(d, 0, 100, 0, this.maxspeed);
            desired.setMag(m);
        } else {
            desired.setMag(this.maxspeed);
        }
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }
}


function Mover(m, x, y) {
    this.mass = m;
    this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);
    this.hue = floor(random(200, 320));
    
    this.applyForce = function(force) {
        var f = p5.Vector.div(force,this.mass);
        this.acc.add(f);
    };

    this.update = function(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.pos.x = constrain(this.pos.x, -.25*width, 1.25*width);
        this.pos.y = constrain(this.pos.y, -.25*height, 1.25*height);
    }
    
    this.display = function() {
        stroke(0);
        colorMode(HSB, 360);
        fill(this.hue, map(this.pos.x, 0, width, 40, 300), map(this.pos.y, 0, height, 40, 300), 200);
        ellipse(this.pos.x, this.pos.y, this.mass*25, this.mass*25);
    };
}

function smoke(){
    colorMode(HSB, 360);
    noStroke();
    let rad = 20;
    yoff += sin(frameCount)/1000;
      for (var y = 0; y < height; y+=rad) {
        xoff = sin(frameCount)/1000;
        for (var x = 0; x < width; x+=rad) {
          var r = noise(xoff, yoff) * 255;
          fill(290,r,r,140);
          rect(x, y, rad, rad);
          xoff += inc/50;
        }
        yoff += inc/50;
      }
    stroke(0);
  }