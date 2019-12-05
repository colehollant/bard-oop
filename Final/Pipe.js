class Pipe{
    constructor(x){
        this.x = x;
        this.y = random(height/4, 3*height/4);
        this.dx = -3;
        this.w = 80;
        this.maxV = 5;
        this.passed = false;
    }

    update(){
        this.x += this.dx;
        if(this.x + this.w/2 < 0){
            this.reset();
        }
        if(!this.passed && this.x + this.w/2 < bird.x + bird.r/2){
            score++;
            this.passed = true;
        }
    }

    display(){
        stroke(0);
        strokeWeight(2);
        fill(0,250,0);
        // rect(this.x, 0, this.w, height);
        // noStroke();
        // fill(100);
        // rect(this.x-2, this.y, this.w+4, this.w);
        rect(this.x - this.w/2, 0, this.w, this.y);
        rect(this.x - this.w/2, this.y+this.w, this.w, height);
        
    }

    reset(){
        this.x = 1.5*width - this.w/2;
        this.y = random(height/4, 3*height/4);
        this.passed = false;
    }
}