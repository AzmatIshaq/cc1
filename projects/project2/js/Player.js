// Player Class

class Player {
  constructor(w, h, unit, startColP, startRowP, createDoor) {
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
    // Pippin Barr's code for wacky keys
    this.left = "ArrowLeft";
    this.right = "ArrowRight";
    this.down = "ArrowDown";
    this.up = "ArrowUp";
    this.wackyMode = false;
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
      this.width * 2,
      this.height * 2
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
    if (key === this.left) {
      // if we are not on left boundary, adjust to remain in grid.
      if (this.currentCol - 1 >= 0) {
        this.currentCol = this.currentCol - 1;
        // Defining current cell name
        let cell = grid[this.currentCol][this.currentRow]
        // So that we cannot go over this grid
        if (grid[this.currentCol][this.currentRow].name === `Maze`) {
          console.log("no go");
          //reset change
          this.currentCol = this.currentCol + 1;
          cell.hit();
        } else {
          console.log("go ahead");
          this.x = this.x - this.speed;

        }
      }
    }

    if (key === this.right) {
      // if we are not on left boundary, adjust to remain in grid.
      if (this.currentCol + 1 <= cols - 1) {
        this.currentCol = this.currentCol + 1;
        // Defining current cell name
        let cell = grid[this.currentCol][this.currentRow]
        // So that we cannot go over this grid
        if (grid[this.currentCol][this.currentRow].name === `Maze`) {
          console.log("no go");
          //   //reset change
          this.currentCol = this.currentCol - 1;
          cell.hit();
        } else {
          console.log("go ahead");
          this.x = this.x + this.speed;
        }
      }
    }

    if (key === this.up) {
        // if we are not on left boundary, adjust to remain in grid.
      if (this.currentRow - 1 >= 0) {
        this.currentRow = this.currentRow - 1;
        // Defining current cell name
        let cell = grid[this.currentCol][this.currentRow]
        // So that we cannot go over this grid
        if (cell.name === `Maze`) {
          console.log("no go");
          //reset change
          this.currentRow = this.currentRow + 1;
          cell.hit();
        } else {
          console.log("go ahead");
          this.y = this.y - this.speed;
        }
      }
    }

    if (key === this.down) {
      // if we are not on left boundary, adjust to remain in grid.
      if (this.currentRow + 1 <= rows - 1) {
        this.currentRow = this.currentRow + 1;
        // Defining current cell name
        let cell = grid[this.currentCol][this.currentRow]
        // So that we cannot go over this grid
        if (grid[this.currentCol][this.currentRow].name === `Maze`) {
          console.log("no go");
          //reset change
          this.currentRow = this.currentRow - 1;
          cell.hit();
        } else {
          console.log("go ahead");
          this.y = this.y + this.speed;
        }
      }
    }

    // Checkpoint collection and interaction
    // Convert a checkpoint into a changed cell aka pathCell.

    let currentCellName = grid[this.currentCol][this.currentRow].name;
    tutorial.setName(currentCellName);

        // Stop radiationCircles moving if stop wall checkpoint is collected

        if (currentCellName === `stopRadiation`) {
         console.log("stopping");
         radiationIsActive =false;

        }

        // Add to bottom so it is the last state change to occur
        // Change a checkpoint cell to a changed cell.
    if (currentCellName === `checkPoint` || currentCellName === `fog` || currentCellName === `spin` || currentCellName === `stopSpin` || currentCellName === `startRadiation` || currentCellName === `stopRadiation` || currentCellName === `wackyKeys`) {
          // Scorekeeper goes up whenever checkpoint is collected
          // but only if there is no door available to get to next level
        if(this.createDoor === false) { scoreKeeper++; }
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

// Separate cheese cell name if statement to play different sound on pickup and no scoreKeeper increase
if (currentCellName === `cheese`) {
    // Trigger sound when checkpoint is collected
    cheesePickupChime.play();
    // Health gain
    if (healthBar.width < 99) {
      healthBar.width += 10
    }
  grid[this.currentCol][this.currentRow] = new ChangedCell(
    20,
    20,
    unit * this.currentCol,
    unit * this.currentRow,
    this.currentCol,
    this.currentRow
  );
}

  /** This section is for triggering gameplay elements based on pickup item */

    // Turn fog on and off based on touching fog checkpoint
    if (currentCellName === `fog`) {
          fogActive = !fogActive;
    }

    // Rotating map when collecting checkpoint
    // Start Spin
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

    // Activate radiationCircles
    if(currentCellName ==='startRadiation'){
        radiationIsActive =true;
    }
    if (currentCellName === `startRadiation` && buildRadiation === false) {
      buildRadiation = true;


    // Adding radiation overlay to the grid
        for (let c = 0; c < cols; c++) {
          // For each row add an empty array to represent the row
          radiationCircles.push([]);
          // Go through the grid's rows
          for (let r = 0; r < rows; r++) {
            if (grid[c][r].name === `Maze`) {
                radiationCircles[c].push(new Radiation(c, r, 20, 20, unit));


              }
            }
          }
        }


    // Active wacky keys

    if (currentCellName === `wackyKeys`) {
      if (!this.wackyMode) {
        this.left = "ArrowRight";
        this.right = "ArrowLeft";
        this.up = "ArrowDown";
        this.down = "ArrowUp";
        this.wackyMode = true;
      }
      else {
        this.left = "ArrowLeft";
        this.right = "ArrowRight";
        this.up = "ArrowUp";
        this.down = "ArrowDown";
        this.wackyMode = false;
      }
    }

    // Trigger game win condition
    //
    // if (scoreKeeper === 300) {
    //   state = `endWin`;
    // }

    // Change levels based on score

    if(currentCellName === "door"){
      this.createDoor = false;
      // console.log("on a door");
      if(currentLevel < 4){
            currentLevel++;
            // Bonus point for getting to door (and avoiding headaches of door spawning at next level because your score didn't change)
            scoreKeeper++;
            // Stop spinning effect if it is active
            mapAngle = 0;
            mapAngleChange = 0;
            setupLevel();
            sounds.playOscillator();
      // reset door to false
      }
    }

// Trigger win state
if (scoreKeeper === 20) {
  state = `endWin`
}


// Changing levels based on score count
    if (scoreKeeper === 4 && this.createDoor == false || scoreKeeper === 8 && this.createDoor == false || scoreKeeper === 12 && this.createDoor == false || scoreKeeper === 16 && this.createDoor == false || scoreKeeper === 20 && this.createDoor == false) {
      this.createDoor = true;
      // Have door appear next to player
          grid[this.currentCol + 1][this.currentRow] = new Door (
                20,
                20,
      // Have door appear next to player
              (this.currentCol + 1) * unit,
              this.currentRow * unit,
              (this.currentCol + 1),
              this.currentRow
          );
      }

      // ScoreKeeper from increasing when createdoor is true
      // if (createDoor === true && currentCellName =) {
      //       scoreKeeper = scoreKeeper--
      //     }




    // Trigger map spinning effect

    // if (scoreKeeper > 4 && scoreKeeper < 21 && mapAngleChange < 0.06) {
    // // Rotating map when collecting checkpoint
    // mapAngleChange = mapAngleChange + 0.004;
    //   if (key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp"|| key === "ArrowDown") {
    //     mapAngleChange = mapAngleChange + 0.001;
    //     }
    //   }

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



/** Useful console logs */
    // console.log(this.x);
    // console.log(this.y);
    // console.log(this.currentRow);
    // console.log(this.currentCol);
    console.log(grid[this.currentCol][this.currentRow].name);

  } // End of keyPressed function
} // End of Player class
