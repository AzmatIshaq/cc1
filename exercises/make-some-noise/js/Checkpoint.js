// Checkpoint Class

class Checkpoint {
  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = "checkpoint";
    this.active = true;
  }

  move() {
    // this.x =
  }

  display() {
      if (this.active === true) {
    push();
    noStroke();
    fill(200,30,25);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
  }

}
