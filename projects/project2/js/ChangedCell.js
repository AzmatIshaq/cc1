// ChangedCell Class

class ChangedCell {
  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = "changedCell";
  }

  move() {
    
  }

  display() {
    push();
    noStroke();
    fill(0,30,255);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

}
