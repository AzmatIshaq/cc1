// Maze Class

class Maze {
  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.mazeWallFill = {
      r: 140,
      g: 140,
      b: 255,
      a: 255,
    };
    this.name = `Maze`;
    // Change this health value to increase maze wall strength
    this.health = 5;
    // Minimum maze wall health
    this.minHealth = 0;
    // Maze wall damage rate
    this.wallDamageRate = 5;
    this.wallsImageWidth = this.width + 5
    this.wallsImageHeight = this.height + 5

  }

  // Code contribution from Pippin. I added some naming conventions and other adjustments.
  // Function to destroy maze walls and change them to pathCell when collisions with player
  hit() {
    this.health--;

    if(this.health === this.minHealth) {
      this.name = `pathCell`
    }
    healthBar.width -= this.wallDamageRate
    squeakAudio();
  }

// Some code contribution from Pippin in display in order to make walls disapear on collision.
// To display maze walls.
  display() {
    push();
    noStroke();
    // If you increase maze health adjust the map to match the new health amount
    let healthAlpha = map(this.health, 0, 5, 0, 255)
    fill(this.mazeWallFill.r,this.mazeWallFill.g,this.mazeWallFill.b, healthAlpha);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    pop();

// Image overlay on maze walls.
    push();
    if (this.health > this.minHealth) {
    imageMode(CORNER);
    // tint(255, 0, 0, 255);
    image(
      mazeWalls,
      this.x,
      this.y,
      this.wallsImageWidth,
      this.wallsImageHeight,
    );
  }
    pop();


  }
}
