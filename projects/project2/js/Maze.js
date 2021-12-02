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
  }

  display() {
    push();
    noStroke();
    fill(140,140,255);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    pop();


    if (mazeDamage > 10) {
      this.name = `checkPoint`
    }
  }
}
