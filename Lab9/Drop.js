// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 10-10: The raindrop catching game

class Drop {  

  constructor() {
    // Radius of raindrop
    this.r = dropSize;                   // All raindrops are the same size
    this.x = random(width);       // Start with a random x location
    this.y = -this.r*4;                // Start a little above the window
    this.speed = random(1, 8);    // Pick a random speed
    this.c = color(50, 100, 150); // Color
    this.ind = floor(random(imgList.length));


    // this.imgR = this.r * 2;
    // kirby.resize(this.imgR, this.imgR);
  }

  // Move the raindrop down
  move() {
    // Increment by speed
    if(this.y < height/4){
        this.y += 1.5*this.speed;
    } else{
        this.y += this.speed;
    }
  }

  // Check if it hits the bottom
  reachedBottom() {
    // If we go a little beyond the bottom
    if (this.y > height + this.r*4) { 
      return true;
    } else {
      return false;
    }
  }

  // Display the raindrop
  display() {
    // Display the drop
    // fill(this.c);
    // noStroke();
    // for (let i = 2; i < this.r; i++ ) {
    //   ellipse(this.x, this.y + i*4, i*2, i*2);
    // }

    // ellipse(this.x, this.y, this.r, this.r);
    image(imgList[this.ind], this.x - this.r/2, this.y - this.r/2, this.r, this.r);
  }

  // If the drop is caught
  caught() {
    // Stop it from moving by setting speed equal to zero
    this.speed = 0; 
    // Set the location to somewhere way off-screen
    this.y = -1000;
  }
}