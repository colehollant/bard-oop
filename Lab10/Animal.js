class Animal {

  constructor(w, c) {
    this.x = random(width);
    this.y = random(height);
    this.tspeed = 0.1;
    this.fspeed = 2;
    this.sz = 15;
    this.energy = 200;
    this.reproductionRate = 0.01;
    this.heading = random(2*PI);
    this.w = w;
    this.c = c;
    this.alive = true;
  }

  display() {
    if (!this.alive) return;
    rectMode(CENTER);
    fill(this.c);
    noStroke();
    ellipse(0, 0, this.sz*2, 10);
  }

  show() {
    if (this.alive) {
      push();
      translate(this.x, this.y);
      rotate(this.heading);
      this.display();
      pop();
    }
  }

  shouldReproduce() {
      //mult by energy to actually make it relative to energy
    return random(1) < this.reproductionRate * (this.energy/200);
  }
  
  reproduce(){
    if (this.shouldReproduce()) {
      if(this instanceof Predator){
        this.w.addAnimal(new Predator(this.w));
      }
      else{
        this.w.addAnimal(new Prey(this.w));
      }
    }
  }

  turn(dRads) {
    this.heading += dRads;
  }

  forward(amount) {
    this.x += cos(this.heading) * amount;
    this.y += sin(this.heading) * amount;
  }

  move() {
    this.turn(random(-1*this.tspeed, this.tspeed));
    this.forward(random(this.fspeed));
  }

  step() {
    this.move();
    // this.fence();
    this.wrap();
    this.reproduce();
  }

  wrap() {
    if (this.x > width) this.x = 0;
    else if (this.x < 0 ) this.x = width;
    
    if (this.y > height) this.y = 0;
    else if (this.y < 0 ) this.y = height;
  }

  fence() {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  die() {
    this.alive = false;
  }

  distance(a) {
    return dist(this.x, this.y, a.x, a.y);
  }


  nearBy(maxD, T) {
    return this.w.nearBy(this, maxD, T);
  }

  //js doesnt have overloaded methods
  nearBy2() {
    return this.w.nearBy2(this);
  }
}