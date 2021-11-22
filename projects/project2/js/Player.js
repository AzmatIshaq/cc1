// Player Class

class Player {
  constructor(w, h, unit, startColP, startRowP) {
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
    this.currentcol = startColP;
    this.currentrow = startRowP;
    this.x = this.currentcol * 25;
    this.y = this.currentrow * 25;
    console.log(this.x);
    console.log(this.y);
  }

  move() {}

// Display player square

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

// Display player sprite

    imageMode(CENTER);
    image(
      spritePlayer,
      this.x + this.width,
      this.y + this.height,
      this.width * 2,
      this.height * 2
    );
    pop();

    if (fogActive === true) {
      imageMode(CENTER);
      image(
        fog,
        this.x + this.width / 1.5,
        this.y + this.height / 1.5,
        width * 2,
        height * 2
      );
    }
  }

  // Player keypress movement and grid checking

  keypressed() {
    console.log(key);
    if (key === "ArrowLeft") {
      // reset fog
      // fogActive = true;
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
      // reset fog
      // fogActive = true;
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
      // reset fog
      // fogActive = true;
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
      // reset fog
      // fogActive = true;
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
    // Convert a checkpoint into a changed cell aka pathcell.

    if (grid[this.currentcol][this.currentrow].name === `checkPoint`) {
      grid[this.currentcol][this.currentrow] = new ChangedCell(
        20,
        20,
        unit * this.currentcol,
        unit * this.currentrow
      );
      // Scorekeeper goes up whenever checkpoint is collected
      scoreKeeper++;
      // Trigger sound when checkpoint is collected
      sounds.playOscillator()
    }


    // Use for loop to count and set spin?

    // if (scoreKeeper === 0) {
    //   // Activate fog of war
    //   fogActive = true;
    // }
    //
    // if (scoreKeeper === 10) {
    //     fogActive = false;
    // }
    //
    // // Trigger map spinning effect
    //
    // if (scoreKeeper > 4 && scoreKeeper < 21 && mapAngleChange < 0.06) {
    // // Rotating map when collecting checkpoint
    // mapAngleChange = mapAngleChange + 0.004;
    //   if (key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp"|| key === "ArrowDown") {
    //     mapAngleChange = mapAngleChange + 0.001;
    //     }
    //   }
    //
    // if (scoreKeeper > 20) {
    //     fogActive = true;
    // }
    //
    // if (scoreKeeper > 22) {
    //     mapAngleChange = 0;
    //     mapAngle = 0;
    // }
    //

  // To leave a maze trail behind player
    // if (scoreKeeper > 2) {
    //   grid[this.currentcol][this.currentrow] = new Maze(
    //     20,
    //     20,
    //     unit * this.currentcol,
    //     unit * this.currentrow
    //   );
    // }





    // // Stopping map rotation
    //
    // if (mapAngleChange === 0.003) {
    //   mapAngle = - 0.003
    //   mapAngleChange = mapAngleChange - 0.003;
    // }

  // Deactivating fog of war
    // if (grid[this.currentcol][this.currentrow].name === `pathcell`){
    // fogActive = false;
    // }

    console.log(this.x);
    console.log(this.y);
    console.log(this.currentrow);
    console.log(this.currentcol);
    console.log(grid[this.currentcol][this.currentrow].name);
  }
}
