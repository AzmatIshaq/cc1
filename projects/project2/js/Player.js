// Player Class

class Player {
  constructor(w, h, unit, startColP, startRowP) {
    this.x = 0;
    this.y = 250;
    // unit movement for player
    this.speed = unit;
    this.active = true;
    this.width = w;
    this.height = h;
    this.r = 0;
    this.c = 0;
    // Starting column and row for player
    this.currentCol = startColP;
    this.currentRow = startRowP;
    this.x = this.currentCol * unit + w;
    this.y = this.currentRow * unit + h;
    // console.log(this.x);
    // console.log(this.y);
    this.createDoor = false;
    this.createTrail = false;
    // Pippin Barr's code for wacky keys
    this.left = "ArrowLeft";
    this.right = "ArrowRight";
    this.down = "ArrowDown";
    this.up = "ArrowUp";
    // Starting wacky keys mode is false
    this.wackyMode = false;
    // Amount of health from cheese pickup
    this.cheeseHealthIncrease = 10;
    // Track if spin is active
    this.spinIsActive = false;
    // Adjust spin values
    this.mapAngleIncrease = 0.004;
    this.mapAnglePlayerIncrease = 0.001;
    // Maxmimum speed for spin
    this.mapAngleChangeMax = 0.02;
  }

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

  } // end of Display function

  // Setup new level whe interacting with door
  // Made in collaboration with Sabine and I adjusted the values and game dynamics as needed.
  doorNewLevel() {
    // console.log("on a door");
    // Activate fog
    fogActive = true;
    // Change level
    if (currentLevel < 6) {
      currentLevel++;
      // Bonus point for getting to door (and avoiding headaches of door spawning at next level because your score didn't change)
      scoreKeeper = 0;
      // Stop spinning effect if it is active
      mapAngle = 0;
      mapAngleChange = 0;
      setupLevel();
      sounds.playOscillator();
    } else if (currentLevel === 6) { // Trigger end state based on level
      state = `endWin`;
    }
  }

  revealDoor() {
    // Have door appear next to player
    grid[this.currentCol + 1][this.currentRow] = new Door(
      //Position and size for door
      this.width * 2,
      this.height * 2,
      (this.currentCol + 1) * unit,
      this.currentRow * unit,
      (this.currentCol + 1),
      this.currentRow
    );
  }

  // Function for when a checkpoint is collected and the cell becomes ChangedCell
  transformCell() {

    grid[this.currentCol][this.currentRow] = new ChangedCell(
      // Position and size for changed cell
      20,
      20,
      unit * this.currentCol,
      unit * this.currentRow,
      this.currentCol,
      this.currentRow
    );
  }

  // This structure for wacky mode code provided by Pippin

  wackyKeys() {
    if (this.wackyMode === true) {
      this.left = "ArrowRight";
      this.right = "ArrowLeft";
      this.up = "ArrowDown";
      this.down = "ArrowUp";
    } else {
      this.left = "ArrowLeft";
      this.right = "ArrowRight";
      this.up = "ArrowUp";
      this.down = "ArrowDown";

    }
  }

  /** Movement functions to put in keypress function */

  moveLeft() {
    // if we are not on left boundary, adjust to remain in grid.
    if (this.currentCol - 1 >= 0) {
      this.currentCol = this.currentCol - 1;
      // Defining current cell name
      let cell = grid[this.currentCol][this.currentRow]
      // So that we cannot go over this grid
      if (grid[this.currentCol][this.currentRow].name === `Maze`) {
        // console.log("no go");
        //reset change
        this.currentCol = this.currentCol + 1;
        cell.hit();
      } else {
        // console.log("go ahead");
        this.x = this.x - this.speed;

        // Create a maze trail if it is active
        if (this.createTrail === true) {
          // Have trail appear next to player
          grid[this.currentCol + 1][this.currentRow] = new Maze(
            20,
            20,
            (this.currentCol + 1) * unit,
            this.currentRow * unit,
            (this.currentCol + 1),
            this.currentRow
          );
        }
      }
    }
  }

  moveRight() {
    // if we are not on left boundary, adjust to remain in grid.
    if (this.currentCol + 1 <= cols - 1) {
      this.currentCol = this.currentCol + 1;
      // Defining current cell name
      let cell = grid[this.currentCol][this.currentRow]
      // So that we cannot go over this grid
      if (grid[this.currentCol][this.currentRow].name === `Maze`) {
        // console.log("no go");
        //   //reset change
        this.currentCol = this.currentCol - 1;
        cell.hit();
      } else {
        // console.log("go ahead");
        this.x = this.x + this.speed;

        // Create a maze trail if it is active
        if (this.createTrail === true) {
          // Have trail appear next to player
          grid[this.currentCol - 1][this.currentRow] = new Maze(
            20,
            20,
            (this.currentCol - 1) * unit,
            this.currentRow * unit,
            (this.currentCol - 1),
            this.currentRow
          );
        }
      }
    }
  }

  moveUp() {
    // if we are not on left boundary, adjust to remain in grid.
    if (this.currentRow - 1 >= 0) {
      this.currentRow = this.currentRow - 1;
      // Defining current cell name
      let cell = grid[this.currentCol][this.currentRow]
      // So that we cannot go over this grid
      if (cell.name === `Maze`) {
        // console.log("no go");
        //reset change
        this.currentRow = this.currentRow + 1;
        cell.hit();
      } else {
        // console.log("go ahead");
        this.y = this.y - this.speed;

        // Create a maze trail if it is active
        if (this.createTrail === true) {
          // Have trail appear next to player
          grid[this.currentCol][this.currentRow + 1] = new Maze(
            20,
            20,
            (this.currentCol) * unit,
            (this.currentRow + 1) * unit,
            (this.currentCol),
            (this.currentRow + 1)
          );
        }
      }
    }
  }

  moveDown() {
    // if we are not on left boundary, adjust to remain in grid.
    if (this.currentRow + 1 <= rows - 1) {
      this.currentRow = this.currentRow + 1;
      // Defining current cell name
      let cell = grid[this.currentCol][this.currentRow]
      // So that we cannot go over this grid
      if (grid[this.currentCol][this.currentRow].name === `Maze`) {
        // console.log("no go");
        //reset change
        this.currentRow = this.currentRow - 1;
        cell.hit();
      } else {
        // console.log("go ahead");
        this.y = this.y + this.speed;

        // Create a maze trail if it is active
        if (this.createTrail === true) {
          // Have trail appear next to player
          grid[this.currentCol][this.currentRow - 1] = new Maze(
            20,
            20,
            (this.currentCol) * unit,
            (this.currentRow - 1) * unit,
            (this.currentCol),
            (this.currentRow - 1)
          );
        }
      }
    }
  }

  // Collaborated with Sabine to organize some of the keypressed code in this way
  keypressed() {

    if (key === this.left) {
      this.moveLeft();
    }

    if (key === this.right) {
      this.moveRight();
    }

    if (key === this.up) {
      this.moveUp();
    }

    if (key === this.down) {
      this.moveDown();
    }

    let currentCellName = grid[this.currentCol][this.currentRow].name;
    // Code contribution from Sabine on display cell name
    tutorial.setName(currentCellName);

    // Stop radiationCircles moving if stop radiation checkpoint is collected

    if (currentCellName === `stopRadiation`) {
      radiationIsActive = false;

    }


    // Change a checkpoint cell to a changed cell. Some collaboration with teaching staff to develop this
    // section.
    if (currentCellName === `checkPoint` || currentCellName === `fog` || currentCellName === `spin` || currentCellName === `stopSpin` || currentCellName === `startRadiation` || currentCellName === `stopRadiation` || currentCellName === `wackyKeys` || currentCellName === `mazeTrail` || currentCellName === `stopMazeTrail`) {
      // Scorekeeper goes up whenever checkpoint is collected
      // but only if there is no door available to get to next level
      if (this.createDoor === false) {
        scoreKeeper++;
      }
      // Trigger sound when checkpoint item is collected
      sounds.playOscillator();
      this.transformCell();
    }

    // Separate cheese cell name 'if statement' to play different sound on pickup and no scoreKeeper increase
    if (currentCellName === `cheese`) {
      // Trigger sound when checkpoint is collected
      cheesePickupChime.play();
      // Health gain
      if (healthBar.width < healthBar.healthMax) {
        healthBar.width += this.cheeseHealthIncrease
      }
      this.transformCell();
    }


    /** This section is for triggering gameplay elements based on pickup item */

    // Active wacky keys

    if (currentCellName === `wackyKeys`) {
      this.wackyMode = !this.wackyMode;
    }
    this.wackyKeys();

    // Turn fog on and off based on touching fog checkpoint

    if (currentCellName === `fog`) {
      fogActive = !fogActive;
    }

    // Rotating map when collecting checkpoint
    // Start Spin

    if (currentCellName === `spin`) {
      mapAngleChange = mapAngleChange + this.mapAngleIncrease;
      this.spinIsActive = true;
      // Don't increase spinning to beyond max
      if (mapAngleChange > this.mapAngleChangeMax) {
        mapAngleChange = this.mapAngleChangeMax;
      }
    }
    // Make spin faster as player moves
    if (this.spinIsActive === true && (key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp" || key === "ArrowDown")) {
      mapAngleChange += this.mapAnglePlayerIncrease;
      // Don't increase spinning to beyond max
      if (mapAngleChange > this.mapAngleChangeMax) {
        mapAngleChange = this.mapAngleChangeMax;
      }

    }


    // Stop spin
    if (currentCellName === `stopSpin`) {
      mapAngle = 0;
      mapAngleChange = 0;
      this.spinIsActive = false;
    }

    // Start a maze trail when maze trail checkpoint is collected
    // Start mazeTrail
    if (currentCellName === `mazeTrail`) {
      this.createTrail = true;
    }

    // Stop mazeTrail
    if (currentCellName === `stopMazeTrail`) {
      this.createTrail = false;
    }

    // Tracking if radiation is active
    if (currentCellName === 'startRadiation') {
      radiationIsActive = true;
    }

    // Triggering the display for radiation
    if (currentCellName === `startRadiation` && buildRadiation === false) {
      buildRadiation = true;

      // Code contribution from Sabine
      // Adding radiation to the grid
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


    // Change levels by moving on door

    if (currentCellName === "door") {
      this.createDoor = false;
      this.createTrail = false;
      this.doorNewLevel();
    }

    // Reveal door based on scorecount
    // Change the scorekeeper amount to adjust when a door should appear
    if (scoreKeeper === 25 && this.createDoor === false) {
      this.createDoor = true;
      this.revealDoor();
    }

  } // End of keyPressed function
} // End of Player class
