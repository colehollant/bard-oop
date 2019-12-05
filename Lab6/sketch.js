var E, A, D, G, B, hiE;
var guitarStrings = [];
var neck;
var playing = false;
var currentFret = 0;
var A_Major, B_Major, C_Major, D_Major, E_Major, F_Major, G_Major;
var A_Minor, B_Minor, C_Minor, D_Minor, E_Minor, F_Minor, G_Minor;

var MINOR = false;
var nFrets = 22;

window.onload = function (){
    resizeCanvas(600, document.getElementById('writeUp').offsetHeight);
    neck = new GuitarNeck(nFrets, 1.15*height);
    var links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        if(window.location.href === links[i].href){
            links[i].classList.add('active');
        }            
    }
}

function setup() {
    var myCanvas = createCanvas(600, 600);
    myCanvas.parent('sketch');
    E   = new GuitarString( 82.41  , 2*width/10 );
    A   = new GuitarString( 110.00 , 3*width/10 );
    D   = new GuitarString( 146.83 , 4*width/10 );
    G   = new GuitarString( 196.00 , 5*width/10 );
    B   = new GuitarString( 246.94 , 6*width/10 );
    hiE = new GuitarString( 329.63 , 7*width/10 );
    // neck = new GuitarNeck(25, 1.2*900);
    neck = new GuitarNeck(nFrets, 1.15*height);
    guitarStrings.push(E, A, D, G, B, hiE);
    A_Major = new Chord(-1,0,2,2,2,0);
    B_Major = new Chord(-1,2,1,3,2,0);
    C_Major = new Chord(-1,3,2,0,1,0);
    D_Major = new Chord(-1,-1,0,2,3,2);
    E_Major = new Chord(0,2,2,1,0,0,);
    F_Major = new Chord(-1,-1,0,3,2,1);
    G_Major = new Chord(3,2,0,0,3,3);

    A_Minor = new Chord(-1,0,2,2,1,0);
    B_Minor = new Chord(-1,2,4,4,3,2);
    C_Minor = new Chord(-1,3,5,5,4,3);
    D_Minor = new Chord(-1,5,7,7,6,5);
    E_Minor = new Chord(0,2,2,0,0,0,);
    F_Minor = new Chord(1,3,3,1,1,1);
    G_Minor = new Chord(3,5,5,3,3,3);
}

function draw() {
    background(97, 102, 109);
    neck.display();
    for(let i = 0; i < guitarStrings.length; i++){
        guitarStrings[i].display();
        guitarStrings[i].play();
    }
}

// function mousePressed(){
//     MINOR = true;
// }

// function mouseReleased(){
//     MINOR = false;
// }

function keyPressed(){
    if(key == ' '){
        MINOR = !MINOR;
    }

    if(MINOR){
        console.log("minor");
        if (key.toLowerCase() == 'a') A_Minor.playChord();
        if (key.toLowerCase() == 'b') B_Minor.playChord();
        if (key.toLowerCase() == 'c') C_Minor.playChord();
        if (key.toLowerCase() == 'd') D_Minor.playChord();
        if (key.toLowerCase() == 'e') E_Minor.playChord();
        if (key.toLowerCase() == 'f') F_Minor.playChord();
        if (key.toLowerCase() == 'g') G_Minor.playChord();
    }
    else {
        console.log("major");
        if (key.toLowerCase() == 'a') A_Major.playChord();
        if (key.toLowerCase() == 'b') B_Major.playChord();
        if (key.toLowerCase() == 'c') C_Major.playChord();
        if (key.toLowerCase() == 'd') D_Major.playChord();
        if (key.toLowerCase() == 'e') E_Major.playChord();
        if (key.toLowerCase() == 'f') F_Major.playChord();
        if (key.toLowerCase() == 'g') G_Major.playChord();
    }
}

function keyReleased(){
    // if(key == ' '){
    //     MINOR = false;
    // }
    if(!keyIsPressed){
        for(let i = 0; i < this.guitarStrings.length; i++){
            guitarStrings[i].playingChord = false;
            guitarStrings[i].chordFret = -1;
        }
    }
}

class Chord {
    constructor(e, a, d, g, b, hie){
        this.chord = [];
        this.chord.push(e, a, d, g, b, hie);
    }

    playChord(){
        for(let i = 0; i < this.chord.length; i++){
            guitarStrings[i].playingChord = true;
            guitarStrings[i].chordFret = this.chord[i];
        }
    }
}

class GuitarNeck {
    constructor(numFrets, scaleLength) {
        this.numFrets = numFrets;
        this.scaleLength = scaleLength;
    }
    
    display(){
        let lastFret = this.scaleLength;
        push();
        noStroke();
        fill(51, 33, 5);
        rect(1.95*width/10, 0, 5.1*width/10, 70);
        translate(0,70);
        fill(89, 64, 41);
        rect(1.95*width/10, 0, 5.1*width/10, this.scaleLength);
        strokeWeight(10);
        for(let i = 0; i < this.numFrets; i++){
            if(mouseY-70 > this.scaleLength - (lastFret*1.059463) && mouseY-70 < this.scaleLength - lastFret){
                currentFret = i;
                stroke(140,250,100);
            } else {
                stroke(140,150,200);
            }
            line(1.95*width/10, this.scaleLength - lastFret, 7.05*width/10, this.scaleLength - lastFret);
            if(i == 3 || i == 5 || i == 7 || i == 9 || i == 15 || i == 17 || i == 19 || i == 21){
                noStroke();
                fill(240);
                ellipse(4.5*width/10, this.scaleLength - ((lastFret + lastFret*1.059463)/2), 16, 16);
            } else if(i == 12 || i == 24){
                noStroke();
                fill(240);
                ellipse(3.5*width/10, this.scaleLength - ((lastFret + lastFret*1.059463)/2), 16, 16);
                ellipse(5.5*width/10, this.scaleLength - ((lastFret + lastFret*1.059463)/2), 16, 16);
            }
            
            
            lastFret = lastFret/1.059463;
            strokeWeight(5);
        }
        if(mouseY-70 > this.scaleLength -lastFret){
            currentFret = 0;
        }
        pop();
    }

}

class GuitarString {
    constructor(baseFreq, x) {
      this.baseFreq = baseFreq
      this.x = x;
      this.playing = false;
      this.osc = new p5.Oscillator();
    //   this.osc.setType('sine');
      this.osc.setType('triangle');
      this.osc.freq(this.baseFreq);
      this.osc.amp(0);
      this.osc.start();
      this.distReq = width/21;
      this.playingChord = false;
      this.chordFret = -1;
    }
    // Getter
    get freq() {
      return this.freqAtFret();
    }
    // Method
    freqAtFret() {
        if(this.playingChord){
            if(this.chordFret == -1){
                this.playing = false;
            } else {
                return this.baseFreq * Math.pow(1.059463,  this.chordFret);
            } return -1;
        } else {
            return this.baseFreq * Math.pow(1.059463,  currentFret);
        }
    }

    play(){
        if(mouseIsPressed && Math.abs(this.x - mouseX ) < this.distReq){
            this.playing = true;
        } else {
            this.playing = false;
        }
        if(this.playing || this.playingChord){
            // this.osc.freq(this.freqAtFret());
            this.osc.freq(this.freq);
            this.osc.amp(0.5, 0.05);
        } else {
            this.osc.amp(0, 0.05);
          }
    }

    display(){
        strokeWeight(3);
        if(Math.abs(this.x - mouseX ) < this.distReq){
            stroke(255, 96, 247);
        } else {
            stroke(255);
        }
        line(this.x, 0, this.x, height);
        // line(this.x, 0, this.x, height);
    }
  }