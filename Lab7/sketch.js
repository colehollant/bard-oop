var particleSet;
var which = 1;

function setup() {
    var myCanvas = createCanvas(600, 400);
    myCanvas.parent('sketch');
    // particle = new Particle(createVector(width/2, height/2));
    particleSet = new ParticleSet(250, createVector(width/2, 50));
}

function draw() {
    if(which == 1) partOne();
    else if(which == 2) partTwo();
    
}

function partOne(){
    colorMode(RGB, 255);
    background(100);
    stroke(0);
    fill(255);
    drawCirclePartOne(width/2, height/2, 300);
}

function drawCirclePartOne(x, y, r){
    if(r > 2){
        ellipse(x, y, r, r);
        r *= 0.75;
        drawCirclePartOne(x, y, r);
    }
}

function partTwo(){
    // particle.update();
    // particle.display();
    particleSet.step();
}

function mouseDragged(){
    colorMode(RGB, 255);
    background(255, 2);
    this.particleSet.add();
}

function keyPressed(){
    if(key == '1') which = 1;
    if(key == '2') {
        colorMode(RGB, 255);
        background(255);
        which = 2;
    }
}


class Particle {  
    constructor(l) {
        this.location = l.copy();
        this.acceleration = createVector(0, 0.05);
        this.velocity = createVector(random(-1, 1), random(-2, 0));
        this.radiusc = 23;
        // this.radiusc = width/2;
        // this.c = color("#ffffff");
        this.hue = 200;
        this.sat = 200;
        this.bright = 200;

    }
  
    update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
    }

    reset(){
        this.hue = random(360);
        this.location.set(mouseX, mouseY);
        this.acceleration = createVector(0, 0.05);
        this.velocity = createVector(random(-1, 1), random(-2, 0));
    }
    
    updateAttrs(){
        this.setSaturation(select("#particleSaturation").elt.value.toString());
        this.setBrightness(select("#particleBrightness").elt.value.toString());
    }

    setColorHex(c){
        if(c.startsWith("#")){
            c = c.slice(1);
        }
        this.c = "#" + c.slice(0,6);
    }

    setSaturation(s){
        this.sat = s;
    }

    setBrightness(b){
        this.bright = b;
    }
  
    display() {
        this.drawCircle(this.radiusc);
    }

    displayBasic() {
        colorMode(HSB, 360);
        fill(this.hue, this.sat, this.bright);
        ellipse(this.location.x, this.location.y, this.radiusc);
    }

    drawCircle(radius) {
        if (radius > 2) {
          stroke(10*radius, 75);
          colorMode(HSB, 360);
        //   fill(this.c);
          fill(this.hue, this.sat, this.bright);
          ellipse(this.location.x, this.location.y, radius, radius);
          radius *= 0.75;
          this.drawCircle(radius);
        }
      }
  }

  class ParticleSet{
      constructor(num, loc){
        this.particles = [];
        this.loc = loc.copy();
        for(let i = 0; i < num; i++){
            this.particles.push(new Particle(this.loc));
            this.particles[i].hue = random(360);
        }
      }

      add(){
        this.particles[floor(random(this.particles.length))].reset();
      }

      step(){
          noStroke();
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].update();
            this.particles[i].displayBasic();
        }
        if(frameCount%60==0){
            for(let i = 0; i < this.particles.length; i++){
                this.particles[i].updateAttrs();
            }
        }
      }
  }