// Paddle Class

class Checkpoint {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.x = 200;
    this.y = 300;
  }

  move() {
    // this.x =
  }

  display() {
    push();
    noStroke();
    fill(140,140,255);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

}
