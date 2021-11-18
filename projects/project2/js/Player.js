// Player Class

class Player {
  constructor(w, h, unit, startcol, startrow) {
    this.x = 0;
    this.y = 250;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 10;
    this.size = 20;
    this.speed = unit;
    this.active = true;
    this.width = w;
    this.height = h;
    this.r = 0;
    this.c = 0;
    this.currentcol = startcol;
    this.currentrow = startrow;
    this.x = this.currentcol * 25;
    this.y = this.currentrow * 25;
    console.log(this.x);
    console.log(this.y);
  }

  move() {}

  display() {
    push();
    noStroke();
    fill(0, 320, 255);
    rectMode(CORNER);
    rect(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.width,
      this.height
    );

    imageMode(CENTER);
    image(spritePlayer, this.x + this.width, this.y + this.height, this.width * 2, this.height * 2);


    imageMode(CENTER);
    image(fog, this.x + this.width / 1.5, this.y + this.height / 1.5, width * 2, height * 2);
    pop();


  }

  // Player keypress movement and grid checking

  keypressed() {
    console.log(key);
    if (key === "ArrowLeft") {
      // if we are not on left boundary, adjust to remain in grid.
      if (this.currentcol - 1 >= 0) {
        this.currentcol = this.currentcol - 1;
        // So that we cannot go over this grid
        if (grid[this.currentcol][this.currentrow].name === `Maze`) {
          console.log("no go");
          //reset change
          this.currentcol = this.currentcol + 1;
        } else {
          console.log("go ahead");
          this.x = this.x - this.speed;
        }
      }
    }

    if (key === "ArrowRight") {
      // if we are not on left boundary, adjust to remain in grid.
      if (this.currentcol + 1 <= cols - 1) {
        this.currentcol = this.currentcol + 1;
        // So that we cannot go over this grid
        if (grid[this.currentcol][this.currentrow].name === `Maze`) {
          console.log("no go");
          //   //reset change
          this.currentcol = this.currentcol - 1;
        } else {
          console.log("go ahead");
          this.x = this.x + this.speed;
        }
      }
    }


    if (key === "ArrowUp") {
      // if we are not on left boundary, adjust to remain in grid.
      if (this.currentrow - 1 >= 0) {
        this.currentrow = this.currentrow - 1;
        // So that we cannot go over this grid
        if (grid[this.currentcol][this.currentrow].name === `Maze`) {
          console.log("no go");
          //reset change
          this.currentrow = this.currentrow + 1;
        } else {
          console.log("go ahead");
          this.y = this.y - this.speed;
        }
      }
    }

    if (key === "ArrowDown") {
      // if we are not on left boundary, adjust to remain in grid.
      if (this.currentrow + 1 <= rows - 1) {
        this.currentrow = this.currentrow + 1;
        // So that we cannot go over this grid
        if (grid[this.currentcol][this.currentrow].name === `Maze`) {
          console.log("no go");
          //reset change
          this.currentrow = this.currentrow - 1;
        } else {
          console.log("go ahead");
          this.y = this.y + this.speed;
        }
      }
    }

    // Checkpoint collection and interaction
    // Essentially we convert a checkpoint into a pathcell

    if (grid[this.currentcol][this.currentrow].name === `checkPoint`) {
        grid[this.currentcol][this.currentrow] = new PathCell(20,20,unit*this.currentcol,unit*this.currentrow);
}
    console.log(this.x);
    console.log(this.y);
    console.log(this.currentrow);
    console.log(this.currentcol);
    console.log(grid[this.currentcol][this.currentrow].name);
  }
}
