// Radiation Class

class Radiation {
  constructor(gridcol, gridrow, w, h, u) {
    this.width = w / 2;
    this.height = h;
    this.x = gridcol * u+w/2;
    this.y = gridrow * u+h/2;
    this.name = `radiation`;
    this.u = u;
    this.angle = 20;
  }

  move() {
    // Movement for radiation
    this.angle = this.angle+0.02;
    this.u = abs(sin(this.angle))*70;
  }



  display() {

    push();
    noStroke();
    fill(255, 0, 0, 120);
    ellipseMode(CENTER);
    // rect(this.x, this.y, this.width, this.height);
    ellipse(this.x,this.y, this.u);
    pop();
  }
}
