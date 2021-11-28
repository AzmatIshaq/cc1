// Wall Class

class Wall {
  constructor(gridcol, gridrow, w, h, u) {
    this.width = w / 2;
    this.height = h;
    this.x = gridcol * u;
    this.y = gridrow * u;
    this.name = `wall`;
    this.u = u;
  }

  move() {
    // Wall movement so they expand and retract
      this.u = this.u + 0.1

    if (this.u > 40) {
      this.u = this.u - 10
    }
  }

  display() {

    push();
    fill(255, 0, 0, 120);
    ellipseMode(CORNER);
    // rect(this.x, this.y, this.width, this.height);
    ellipse(this.x,this.y, this.u);
    pop();
  }
}
