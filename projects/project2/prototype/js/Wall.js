// Paddle Class

class Wall {
  constructor(w, h, gridcol, gridrow, u) {
    this.width = w;
    this.height = h;
    this.x = gridcol*u;
    this.y = gridrow*u;
    this.name = `wall`;
  }

  move() {

  }

  display() {
    push();
    fill(255);
    rect(this.x, this.y, this.width, this.height);
    pop();

  }

}
