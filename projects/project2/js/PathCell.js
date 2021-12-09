// PatheCell Class

class PathCell {
  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = "pathCell";
  }

// Display values for the pathcell aka the black trail the player moves on
  display() {
    push();
    noStroke();
    fill(0);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
