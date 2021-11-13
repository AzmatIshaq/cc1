// PatheCell Class

class PathCell {
  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = "pathcell";
  }

  move() {
    // this.x =
  }

  display() {
    push();
    noStroke();
    fill(20,53,200);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

}
