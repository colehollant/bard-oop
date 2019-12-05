var particles = [];
var b = 300;

function setup() {
    var myCanvas = createCanvas(600, 400);
    myCanvas.parent('sketch');
    for(let i = 0; i < 250; i++){
        particles.push(new Particle(width/2, height/2, 8));
    }
}

function draw() {
    colorMode(RGB, 255);
    background(100);
    for(let i = 0; i < particles.length; i++){
        particles[i].update();
        particles[i].display();
    }
}

function mousePressed(){
    for(let i = 0; i < particles.length; i++){
        particles[i].pos.set(mouseX, mouseY);
    }
}

function keyPressed(){
    switch (keyCode) {
        case UP_ARROW:
            for(let i = 0; i < particles.length; i++){
                particles[i].c+=5;
                particles[i].c = constrain(particles[i].c, 0, 360);
            }
            break;
        case DOWN_ARROW:
            for(let i = 0; i < particles.length; i++){
                particles[i].c-=5;
                particles[i].c = constrain(particles[i].c, 0, 360);
            }
            break;
        case LEFT_ARROW:
            b-=5;
            break;
        case RIGHT_ARROW:
            b+=5;
            break;
    
        default:
            break;
    }
    if(key == 'r'){
        for(let i = 0; i < particles.length; i++){
            particles[i].c = random(360);
        }
    } else if(key == 'p'){
        for(let i = 0; i < particles.length; i++){
            particles[i].pos.set(random(width), random(height));
        }
    }
}

function Particle(x, y, r) {
    this.pos = createVector(x, y);
    this.r=r;
    this.vel = createVector(random(-1, 1), random(1, -1));
    this.c = random(360);

    this.update = function(){
        this.pos.add(this.vel);
    }

    this.display = function(){
        noStroke();
        colorMode(HSB, 360);
        fill(this.c, 360, b, 124);
        ellipse(this.pos.x, this.pos.y, this.r)
    }

}