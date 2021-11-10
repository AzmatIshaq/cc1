class Player {
  constructor(w, h) {
    this.x = 0;
    this.y = 250;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 10;
    this.size = 40;
    this.speed = 1;
    this.active = true;
    this.width = w;
    this.height = h;
    this.r = 0;
    this.c = 0;
  }

  move() {
    // First of all create new variables for the player's position
    // This will enable us to check what's there without actually
    // moving the player
    // let newR = player.r;
    // let newC = player.c;
    //
    // // Adjust the row and column position based on the arrow key
    // if (keyCode === LEFT_ARROW) {
    //   newR -= 1;
    // } else if (keyCode === RIGHT_ARROW) {
    //   newR += 1;
    // } else if (keyCode === UP_ARROW) {
    //   newC -= 1;
    // } else if (keyCode === DOWN_ARROW) {
    //   newC += 1;
    // }
    //
    // // Constrain so the player can't walk off the edges
    // newR = constrain(newR, 0, rows - 1);
    // newC = constrain(newC, 0, cols - 1);
    //
    // // Now check what is at the position the player tried to move to
    // if (grid[newR][newC] === ``) {
    //   // If nothing, they can just move there
    //   player.r = newR;
    //   player.c = newC;
    // } else if (grid[newR][newC] === `c`) {
    //   // If it's a collectible then empty that spot
    //   grid[newR][newC] = ``;
    //   // Make the player grow (but constrain to the unit size)
    //   player.size += unit / 10;
    //   player.size = constrain(player.size, 0, unit);
    //   // And let them move to that space
    //   player.r = newR;
    //   player.c = newC;
    // }

    if (keyIsDown(LEFT_ARROW)) {
      this.x = this.x - this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x = this.x + this.speed;
    }

    if (keyIsDown(UP_ARROW)) {
      this.y = this.y - this.speed;
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.y = this.y + this.speed;
    }
  }

  display() {

    // // Display the player
    // push();
    // fill(255,0,0);
    // noStroke();
    // rectMode(CENTER);
    // rect(this.r * unit + unit/2, this.c * unit + unit/2, this.size, this.size);
    // pop();


    noStroke();
    fill(140, 140, 255);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    
  }
}