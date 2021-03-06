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
    // Wall movement so they expand and retract
      this.width = this.width + 0.1

    if (this.width > 30) {
      this.width = this.width - 10
    }
  }

  display() {
    push();
    fill(255);
    // rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
