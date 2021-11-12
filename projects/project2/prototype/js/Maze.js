// Maze Class

class Maze {
  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = `Maze`;

  }

  move() {
    // this.x =
  }

  display() {
    push();
    noStroke();
    fill(140,140,255);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    // Maze Growth
    this.width = this.width + 0.02;
    this.height = this.height + 0.02;
    pop();
    // Game goes to end state if wall width reaches a certain number
    if (this.width > 60) {
      state = `end`;
      this.width = 20;
      this.height = 20;
    }


  }

}
