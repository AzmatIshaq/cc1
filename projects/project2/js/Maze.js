// Maze Class

class Maze {
  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = `Maze`;
    this.health = 2;

  }

  move() {
  }

  hit() {
    this.health--;

    if(this.health === 0) {
      this.name = `pathcell`
    }
  }

  display() {
    push();
    noStroke();
    let healthAlpha = map(this.health, 0, 2, 0, 255)
    fill(140,140,255, healthAlpha);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    pop();



  }
}
