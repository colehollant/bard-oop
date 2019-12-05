class Word {

  constructor(s) {
    this.freq = 1;
    this.s = s.toLowerCase().replace(/[\W_]+/g,"");
  }

  toString() {
    return this.s + ":" + this.freq;
  }
}