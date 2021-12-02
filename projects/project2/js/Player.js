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
    this.currentCol = startColP;
    this.currentRow = startRowP;
    this.x = this.currentCol * unit + w;
    this.y = this.currentRow * unit + h;
    console.log(this.x);
    console.log(this.y);
    this.createDoor = false;
  }

  // move() {}

// Display player square

  display() {
    push();
    noStroke();
    fill(0);
    rectMode(CENTER);
    rect(
      this.x,
      this.y,
      this.width*2,
      this.height*2
    );

// Display player sprite

    imageMode(CENTER);
    image(
      spritePlayer,
      this.x,
      this.y,
      this.width * 2,
      this.height * 2
    );
    pop();
  }

  // Player keypress movement and grid checking
  // Also effects triggering based on keypresses

  keypressed() {
    console.log(key);
    if (key === "ArrowLeft") {
      // if we are not on left boundary, adjust to remain in grid.
      if (this.currentCol - 1 >= 0) {
        this.currentCol = this.currentCol - 1;
        // So that we cannot go over this grid
        if (grid[this.currentCol][this.currentRow].name === `Maze`) {
          console.log("no go");
          //reset change
          this.currentCol = this.currentCol + 1;
        } else {
          console.log("go ahead");
          this.x = this.x - this.speed;
        }
      }
    }

    if (key === "ArrowRight") {
      // if we are not on left boundary, adjust to remain in grid.
      if (this.currentCol + 1 <= cols - 1) {
        this.currentCol = this.currentCol + 1;
        // So that we cannot go over this grid
        if (grid[this.currentCol][this.currentRow].name === `Maze`) {
          console.log("no go");
          //   //reset change
          this.currentCol = this.currentCol - 1;
        } else {
          console.log("go ahead");
          this.x = this.x + this.speed;
        }
      }
    }

    if (key === "ArrowUp") {
        // if we are not on left boundary, adjust to remain in grid.
      if (this.currentRow - 1 >= 0) {
        this.currentRow = this.currentRow - 1;
        // So that we cannot go over this grid
        if (grid[this.currentCol][this.currentRow].name === `Maze`) {
          console.log("no go");
          //reset change
          this.currentRow = this.currentRow + 1;
        } else {
          console.log("go ahead");
          this.y = this.y - this.speed;
        }
      }
    }

    if (key === "ArrowDown") {
      // if we are not on left boundary, adjust to remain in grid.
      if (this.currentRow + 1 <= rows - 1) {
        this.currentRow = this.currentRow + 1;
        // So that we cannot go over this grid
        if (grid[this.currentCol][this.currentRow].name === `Maze`) {
          console.log("no go");
          //reset change
          this.currentRow = this.currentRow - 1;
        } else {
          console.log("go ahead");
          this.y = this.y + this.speed;
        }
      }
    }

    // Checkpoint collection and interaction
    // Convert a checkpoint into a changed cell aka pathcell.

    let currentCellName = grid[this.currentCol][this.currentRow].name;

    if(currentCellName === "door"){
      console.log("on a door");
      if(currentLevel < 4){
            currentLevel++;
            setupLevel();
      }
    }


        // Stop walls moving if stop wall checkpoint is collected

        if (currentCellName === `stopWalls`) {
         console.log("stopping");
         wallsAreActive =false;

        }

        // Add to bottom so it is the last state change to occur
    if (currentCellName === `checkPoint` || currentCellName === `fog` || currentCellName === `spin` || currentCellName === `stopSpin` || currentCellName === `startWalls` || currentCellName === `stopWalls` || currentCellName === `wackyKeys` || currentCellName === `cheese`) {
        // Scorekeeper goes up whenever checkpoint is collected
        scoreKeeper++;
        // Trigger sound when checkpoint is collected
        sounds.playOscillator();

      // wallsStopMoving = true;
      grid[this.currentCol][this.currentRow] = new ChangedCell(
        20,
        20,
        unit * this.currentCol,
        unit * this.currentRow,
        this.currentCol,
        this.currentRow
      );
    }

  /** This section is for triggering gameplay elements */

    // Should these ifs be else if?
    // Turn fog on and off based on touching fog checkpoint
    if (currentCellName === `fog`) {
          fogActive = !fogActive;
    }

    // Rotating map when collecting checkpoint


    // if (currentCellName === `spin`) {
    //   mapAngleChange = mapAngleChange + 0.004;
    //     if (key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp"|| key === "ArrowDown") {
    //       mapAngleChange = mapAngleChange + 0.001;
    //       }
    //     }

    // Stop spin
    if (currentCellName === `stopSpin`) {
      mapAngle = 0;
      mapAngleChange = 0;
      }

    // Activate walls
    if(currentCellName ==='startWalls'){
        wallsAreActive =true;
    }
    if (currentCellName === `startWalls` && buildWalls === false) {
      buildWalls = true;


    // Adding walls overlay to the grid
        for (let c = 0; c < cols; c++) {
          // For each row add an empty array to represent the row
          walls.push([]);
          // Go through the grid's rows
          for (let r = 0; r < rows; r++) {
            if (grid[c][r].name === `Maze`) {
                walls[c].push(new Wall(c, r, 20, 20, unit));


              }
            }
          }
        }


    // Active waky keys

    if (currentCellName === `wackyKeys` && wackyKeysActive === false) {
          wackyKeysActive = true;
        }


    if (currentCellName === `cheese`) {
          console.log(`cheese`)

          //find way to increase health
        }

    // Trigger game win condition

    if (scoreKeeper === 300) {
      state = `endWin`;
    }

// Changing levels based on score count
    if (scoreKeeper === 4 && this.createDoor == false || scoreKeeper === 8 && this.createDoor == false || scoreKeeper === 12 && this.createDoor == false || scoreKeeper === 16 && this.createDoor == false || scoreKeeper === 20 && this.createDoor == false) {
      this.createDoor = true;
      console.log("create door");
      // Have door appear next to player
          grid[this.currentCol + 1 ][this.currentRow] = new Door (
                20,
                20,
      // Have door appear next to player
              (this.currentCol + 1) * unit,
              this.currentRow * unit,
              (this.currentCol + 1),
              this.currentRow
          );
      }



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
    //   grid[this.currentCol][this.currentrow] = new Maze(
    //     20,
    //     20,
    //     unit * this.currentCol,
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
    // if (grid[this.currentCol][this.currentrow].name === `pathcell`){
    // fogActive = false;
    // }

    console.log(this.x);
    console.log(this.y);
    console.log(this.currentRow);
    console.log(this.currentCol);
    console.log(grid[this.currentCol][this.currentRow].name);
  } // End of keyPressed function
}
