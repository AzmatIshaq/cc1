// PatheCell Class

class PathCell {
  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = "pathCell";
  }

  // move() {}

  display() {
    push();
    noStroke();
    fill(0);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
