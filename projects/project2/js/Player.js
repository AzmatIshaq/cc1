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

  // move() {}

// Display player square

  display() {
    push();
    noStroke();
    fill(0);
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

// Display fog around player when it is active

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
  // Also effects triggering based on keypresses

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
    // Convert a checkpoint into a changed cell aka pathcell.

    let currentCellName = grid[this.currentcol][this.currentrow].name;
    if (currentCellName === `checkPoint` || currentCellName === `fog` || currentCellName === `spin` || currentCellName === `stopSpin` || currentCellName === `startWalls`) {
        // Scorekeeper goes up whenever checkpoint is collected
        scoreKeeper++;
        // Trigger sound when checkpoint is collected
        sounds.playOscillator();

      // wallsStopMoving = true;
      grid[this.currentcol][this.currentrow] = new ChangedCell(
        20,
        20,
        unit * this.currentcol,
        unit * this.currentrow
      );
    }

    // Should these ifs be else if?
    // Turn fog on and off based on touching fog checkpoint
    if (currentCellName === `fog`) {
          fogActive = !fogActive;
    }

    // Rotating map when collecting checkpoint


    if (currentCellName === `spin`) {
      mapAngleChange = mapAngleChange + 0.004;
        if (key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp"|| key === "ArrowDown") {
          mapAngleChange = mapAngleChange + 0.001;
          }
        }

    // Stop spin
    if (currentCellName === `stopSpin`) {
      mapAngle = 0;
      mapAngleChange = 0;
      }

    // Activate walls
    if (currentCellName === `startWalls` && startWalls === false) {
      startWalls = true;
      // Adding walls overlay to the grid
      // For loop for the grid
      for (let c = 0; c < cols; c++) {
        // For each row add an empty array to represent the row
        walls.push([]);
        // Go through the grid's rows
        for (let r = 0; r < rows; r++) {
          if (grid[c][r].name === `Maze`) {
              walls[c].push(new Wall(20, 20, c, r,unit));
            }
          }
        }
      }



    // Trigger game win condition

    if (scoreKeeper === 300) {
      state = `endWin`;
    }

// Changing levels based on score count
    // if (scoreKeeper === 10) {
    //   // console.log("create door");
    //   // // Add +1 to this.currentcol in order to have door appear next to player
    //   //     grid[this.currentcol ][this.currentrow] = new Door (
    //   //           20,
    //   //           20,
    //   // // Add + 1 to this.currentcol in order to have door appear next to player
    //   //         (this.currentcol) * unit,
    //   //         this.currentrow * unit
    //   //     );
    //       // To prevent more doors from appearing
    //       // Need to find a better solution though eventually
    //       // scoreKeeper++
    //   // Change level
    //   currentLevel = 1;
    //   console.log(currentLevel);
    //   // setupLevel();
    //
    // }


    // if (scoreKeeper === 0) {
    //   // Activate fog of war
    //   fogActive = true;
    // }
    //
    // if (scoreKeeper === 10) {
    //     fogActive = false;
    // }

    // Trigger map spinning effect

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
