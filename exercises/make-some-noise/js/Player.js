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
    //For movement
    this.osc = new p5.Oscillator(300);
    // Wall distance
    this.osc2 = new p5.Oscillator(300);
    this.timePassed =0;
    this.interval =1500;
    this.startTime =millis();
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
    pop();
  }

  checkWallCollision() {
    this.timePassed = millis() - this.startTime;
  //  console.log(this.timePassed)

    let minDist = 10000;
    let minWallCol = 0;
    let minWallRow = 0;
    // for loops to display the columns and rows
    for (let c = 0; c < grid.length; c++) {
      //console.log(grid[r]);
      let col = grid[c];

      for (let r = 0; r < col.length; r++) {
          if (col[r].name === `Maze`){
        //    console.log(col[r])
        let d = dist(this.x, this.y, col[r].x, col[r].y);
        if (d < minDist) {
          minDist = d;
          minWallCol = c;
          minWallRow = r;
        }
      }


      }

    }

      let testValue = grid[minWallCol][minWallRow].width-minDist;

      // Can change the colour to see distance between player and maze more clearly
      grid[minWallCol][minWallRow].fillColor = color(140,140,255);


      // Time interval to prevent sound from overlapping.
      if(this.timePassed>this.interval){
        console.log("start sound");
        this.startTime = millis();
        this.timePassed = 0;

          // To adjust oscillator sound value
           this.playWallOscillator(testValue*10);
      //  }
      }


  }

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

        }
        else if (grid[this.currentcol][this.currentrow].name === `checkpoint`) {
        //  console.log(grid[this.currentcol][this.currentrow].name);
          //reset change
          // grid[this.currentcol][this.currentrow].active = false;
        //  console.log(grid[this.currentcol][this.currentrow].active);
          // Movement
          this.x = this.x - this.speed;
          // Play Oscillator sound
          this.playOscillator();


        }
        else {
          console.log("go ahead");
            // Movement
          this.x = this.x - this.speed;
          // Play synth music
            synth.play(`F4`, 1, 0, 1);

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
          // Reset change
          this.currentcol = this.currentcol - 1;
        }   else if (grid[this.currentcol][this.currentrow].name === `checkpoint`) {
          //  console.log(grid[this.currentcol][this.currentrow].name);
            //reset change
            // grid[this.currentcol][this.currentrow].active = false;
          //  console.log(grid[this.currentcol][this.currentrow].active);
            // Movement
            this.x = this.x + this.speed;
            // Play oscillation sound
            this.playOscillator();
          }

        else {
          console.log("go ahead");
          // Movement
          this.x = this.x + this.speed;
          // Play synth music
          synth.play(`G4`, 1, 0, 1);
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
        } else if (grid[this.currentcol][this.currentrow].name === `checkpoint`) {
          //  console.log(grid[this.currentcol][this.currentrow].name);
            //reset change
            // grid[this.currentcol][this.currentrow].active = false;
          //  console.log(grid[this.currentcol][this.currentrow].active);
            this.y = this.y - this.speed;
            // Play oscillator sound
            this.playOscillator();
          }

        else {
          console.log("go ahead");
          // Play synth music
          synth.play(`Ab4`, 1, 0, 1);
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
        }
        else if (grid[this.currentcol][this.currentrow].name === `checkpoint`) {
          //  console.log(grid[this.currentcol][this.currentrow].name);
            //reset change
            // grid[this.currentcol][this.currentrow].active = false;
          //  console.log(grid[this.currentcol][this.currentrow].active);
            this.y = this.y + this.speed;
            this.playOscillator();
          }
        else {
          console.log("go ahead");
          synth.play(`Bb4`, 1, 0, 1);
          this.y = this.y + this.speed;
        }
      }
    }

    // console.log(this.x);
    // console.log(this.y);
    // console.log(this.currentrow);
    // console.log(this.currentcol);
    // console.log(grid[this.currentcol][this.currentrow].name);
  }
 startOscillator(){
   this.osc2.start();
   this.osc2.amp(0.1);
   // start at 700Hz
   this.osc2.freq(700);

 }
  playWallOscillator(freqPar) {
    this.osc2.start();
    this.osc2.amp(0.5);
    // start at 700Hz
    this.osc2.freq(700);
    // ramp to 60Hz over 0.7 seconds
    this.osc2.freq(freqPar, 0.7);
    this.osc2.amp(0, 0.1, 0.7);
 }

//for checkpoint
   playOscillator() {
  this.osc.start();
  this.osc.amp(0.5);
  // start at 700Hz
  this.osc.freq(700);
  // ramp to 60Hz over 0.7 seconds
  this.osc.freq(60, 0.7);
  this.osc.amp(0, 0.1, 0.7);
}
}
