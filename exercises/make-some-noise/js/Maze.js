// Maze Class

class Maze {
  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = `Maze`;
    this.fillColor = color(140, 140, 255);
  }

  // move() {
  // }

  // To display the maze
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);

    // Maze Growth
    // this.width = this.width + 0.02;
    // this.height = this.height + 0.02;
    pop();
  }
}
