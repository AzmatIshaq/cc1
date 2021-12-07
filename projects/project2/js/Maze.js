// Maze Class

class Maze {
  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = `Maze`;
    // Change this health value to increase maze wall strength
    this.health = 5;

  }

  move() {
  }

  hit() {
    this.health--;

    if(this.health === 0) {
      this.name = `pathCell`
    }
    healthBar.width -= 5
    squeakAudio();
  }

  display() {
    push();
    noStroke();
    // If you increase maze health adjust the map to match the new health amount
    let healthAlpha = map(this.health, 0, 5, 0, 255)
    fill(140,140,255, healthAlpha);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    pop();

    push();
    if (this.health > 0) {
    imageMode(CORNER);
    image(
      mazeWalls,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
    pop();


  }
}
