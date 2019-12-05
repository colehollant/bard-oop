class WordCount {
    constructor(){
        this.words = new Array();
    }
  /** 
   * Return the index of word in the array, 
   * return -1 if it does not exist
   */
  find(word) {
    for (let i = 0; i < this.words.length; i++) {
    //   console.log("comparing " + this.words[i].toString() + " " + word);
      if (this.words[i].s === word) {
        return i;
      }
    }
    return -1;
  }

  /** 
   * Add s to the word countdr
   */
  add(w) {
    if (this.find(w.s) == -1) {
        append(this.words, w);
    }
    else{
      this.words[this.find(w.s)].freq++;
    }
  }

  display() {
    console.log(this.words);
    let maxCount = 0;
    for(let i = 0; i < this.words.length; i++){
        if(this.words[i].freq > maxCount) maxCount = this.words[i].freq;
    }
    stroke(0);
    strokeWeight(2);

    let x = 0;
    for(let i = 0; i < this.words.length; i++){
       x = i * width/this.words.length;
       fill(map(this.words[i].freq, 0, maxCount, 0, 255));
       rect(x, height, width/this.words.length, -4*this.words[i].freq-160);
       push();
       translate(x + width/this.words.length, height);
       textSize((width/this.words.length) - 4);
       fill(255);
       rotate(-1*PI/2);
       text(this.words[i].s + ": " + this.words[i].freq, 4, -6);
       pop();
    }
  }
}