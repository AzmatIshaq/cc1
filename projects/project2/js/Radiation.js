// Radiation Class

class Radiation {
  constructor(gridcol, gridrow, w, h, u) {
    this.width = w / 2;
    this.height = h;
    this.x = gridcol * u + w / 2;
    this.y = gridrow * u + h / 2;
    this.name = `radiation`;
    this.u = u;
    this.angle = 20;
    this.angleIncrease = 0.02;
  }

  move() {
    // Movement for radiation
    this.angle = this.angle + this.angleIncrease;
    this.u = abs(sin(this.angle))*70;
  }



  display() {
    push();
    noStroke();
    fill(255, 0, 0, 120);
    ellipseMode(CENTER);
    ellipse(this.x,this.y, this.u);
    pop();
  
  }
}
