class Bird{
    constructor(){
        this.x = width/3;
        this.y = height/2;
        this.dy = 0;
        this.ay = .2;
        this.r = 20;
        this.maxV = 5;
    }

    update(){
        this.dy += this.ay;
        this.dy = constrain(this.dy, -this.maxV, this.maxV);
        this.y += this.dy;
        this.y = constrain(this.y, 0, height+10);
        if(this.y > height){
            lost = true;
        }
        if(this.checkCollisions()){
            lost = true;
        }
    }

    fall(){
        if(this.y + (this.r*.35) < height){
            this.dy += this.ay*1.5;
            this.y += this.dy;
            this.x += this.ay*10;
        }
        else {
            credits = true;
        }
    }

    checkCollisions(){
        for(let i = 0; i < pipes.length; i++){
            if(    this.x + this.r/2 > pipes[i].x - pipes[i].w/2
                && this.x - this.r/2 < pipes[i].x + pipes[i].w/2){
                    if(!(  this.y - this.r/2 > pipes[i].y
                        && this.y + this.r/2 < pipes[i].y  + pipes[i].w)){
                            return true;
                        }
                }
            
        } return false;
    }

    display(){
        fill(255,0,0);
        stroke(0);
        strokeWeight(3);
        ellipse(this.x, this.y, this.r, this.r);
    }

    keyHandler(key){
        if(key == ' ') this.jump();
    }

    jump(){
        this.dy -= 30*this.ay;
    }
}