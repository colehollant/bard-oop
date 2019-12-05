// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 10-10: The raindrop catching game

class Catcher {

  constructor(tempR) {
    this.r = tempR; // radius
    this.col = color(50, 10, 10, 150); // color
    this.x = 0; // location
    this.y = 0; // location
    this.imgR = this.r * 2;
    kirby.resize(this.imgR, this.imgR);
    kirby2.resize(this.imgR, this.imgR);
  }

  setLocation(tempX, tempY) {
    this.x = tempX;
    this.y = tempY;
  }

  display() {
    // ellipse(this.x, this.y, this.r*2, this.r*2);
    if(kirbyBool){
        image(kirby, this.x - this.imgR/2 , this.y - this.imgR/2);
    } else {
        image(kirby2, this.x - this.imgR/2 , this.y - this.imgR/2);
    }
  }

  // A function that returns true or false based on
  // if the catcher intersects a raindrop
  intersect(d) {
    // Calculate distance
    let distance = dist(this.x, this.y, d.x, d.y); 

    // Compare distance to sum of radii
    //changed to d.r/2 for better collision
    if (distance < this.r + d.r/2) { 
      return true;
    } else {
      return false;
    }
  }
}