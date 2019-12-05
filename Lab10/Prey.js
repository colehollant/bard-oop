class Prey extends Animal {

  constructor(w) {
    super(w, color(0,0,255));
    this.reproductionRate = 0.0002;
    this.deathChance = 0.001;
  }

  step() {
    super.step();
    if (this.nearBy(this.sz, Predator) || random(1) < this.deathChance) this.die();
  }
}