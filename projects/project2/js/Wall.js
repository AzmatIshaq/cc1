// Wall Class

class Wall {
  constructor(gridcol, gridrow, w, h, u) {
    this.width = w / 2;
    this.height = h;
    this.x = gridcol * u+w/2;
    this.y = gridrow * u+h/2;
    this.name = `wall`;
    this.u = u;
    this.angle = 0;
  }

  move() {
    // console.log("MOVE");
    this.angle = this.angle+0.02;
    this.u = abs(sin(this.angle))*40;



    // Wall movement so they expand and retract
    //   this.u = this.u + 0.1
    //
    // if (this.u > 40) {
    //   this.u = this.u - 10
  //  }

  }



  display() {

    push();
    fill(255, 0, 0, 120);
    ellipseMode(CENTER);
    // rect(this.x, this.y, this.width, this.height);
    ellipse(this.x,this.y, this.u);
    pop();
  }
}
