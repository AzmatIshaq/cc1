// Wall Class

class Wall {
  constructor(w, h, gridcol, gridrow, u) {
    this.width = w/2;
    this.height = h;
    this.x = gridcol*u;
    this.y = gridrow*u;
    this.name = `wall`;
  }

  move() {
     this.width = this.width + 0.02;
    // this.height = this.height + 0.02;

  }

  display() {
    push();
    fill(255);
    // rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();

  }

}
