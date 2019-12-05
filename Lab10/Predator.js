class Predator extends Animal {

  constructor(w) {
    super(w, color(255,0,0));
    this.reproductionRate = 0.0002;
  }

  step() {
    super.step();
    // this.nearBy(this.sz, Prey) ? this.energy += 20 : this.energy-=1;
    if(this.nearBy(this.sz, Prey)) {
        console.log("get ate");
        this.energy += 200;
    } else { this.energy--; }
    if (this.energy <= 0) this.die();
  }
}