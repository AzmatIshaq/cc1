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
    this.radiationSize = 70;
    this.fill = {
      r: 255,
      g: 0,
      b: 0,
      a: 120,
    };
  }

  move() {
    // Movement for radiation made in collaboration with Sabine
    // Pippin suggested wrapping the sin with abs to prevent negative numbers from breaking the
    // collision detection
    this.angle = this.angle + this.angleIncrease;
    this.u = abs(sin(this.angle)) * this.radiationSize;
  }


    // To display radiation
  display() {
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
    ellipseMode(CENTER);
    ellipse(this.x,this.y, this.u);
    pop();

  }
}
