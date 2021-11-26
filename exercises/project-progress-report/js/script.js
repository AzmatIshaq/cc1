/**
Project 2 Prototype
Azmat

This is a prototype of Project 2 for the CART 253 Class at Concordia University.
*/

"use strict";

// Levels array to alternate variety of pickups

let levels = [
 [`W`,`C`,``],
 [`W`,`C`,``,`F`],
 [`W`,`C`,``,`S`],
 [`W`,`C`,``,`X`],
 [`W`,`C`, `C`, `C`, ``, ``, `X`,`F`,`S`],
];

// Variables to alternate between specific levels

let currentLevel = 4;

let level = undefined;


// A variable to introduce the player class
let player;
// Walls represented by the grid
let wall;

// Grid array in order to make game map
let grid = [];
// Rows and columns in the grid
let rows = 20;
let cols = 25;
// The unit size (how big a square for each tile)
let unit = 25;
// Random items to populate the game map
let items = [`W`, `C`, ``, `F`, `S`];
let walls = [];
// Starting row
let startRow = 8;
// Starting column
let startCol = 8;
// Title State
let state = `title`;

let wallsStopMoving =false;

let maze = {
  width: 20,
  height: 20,
}

// Door variable to initialize class
let door;

// Wall variables

let wallWidth = 10;
let wallHeight = 30;

// Image variables

let titleBackground = undefined;
let spritePlayer = undefined;


// Fog
let fog;

// Variable to set fog to true for fog effect
let fogActive;

// Map angle

let mapAngle = 0;
let mapAngleChange = 0.00;

// Checkpoint variables

// Checkpoints
let checkpoint;

// This is the scoreKeeper variable that we see at the top left of the canvas
let scoreKeeper = 0;

// Variable to initiate health bar

let healthBar;

// Variable to initiate sounds

let sounds;

/**
Description of preload
*/
function preload() {

spritePlayer = loadImage(`assets/images/test_sprite.png`);
titleBackground = loadImage(`assets/images/title_background3.png`);
fog = loadImage(`assets/images/fog_war1.png`);
}

/**
Setup:
Create a canvas out of the rows, columns.
Player class is initiated
*/

function setup() {
  createCanvas(cols * unit, rows * unit + width / 2);

  // Levels
  setupLevel();

  level = levels[currentLevel]

  // Initialize audio
  userStartAudio();

  // door = new Door();


}

/**
Draw:
Display states
*/
function draw() {
  background(0);

  if (state === `title`) {
  title();
  }

  if (state === `animation`) {
  animation();
  }

  if (state === `endLose`) {
  endLose();
  }

  if (state === `endWin`) {
    // wallWidth = 20;
    // wallHeight = 20;
    //Ending
  push();
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(`You Win!`, width / 2, height / 2);
  text(`Refresh the Page to Play Again`, width / 2, height / 1.5);
  pop();
  }

}

function animation() {

  // Collision detection between player character and walls
  let minWallDist = checkCollisionWithWalls();
  // HealthBar decrease during collision
  healthBar.changeStatus(minWallDist);


  // Map spin effect

  translate(width / 2, height / 2);
  rotate(mapAngle);
  translate(-width / 2, -height / 2);
  mapAngle += mapAngleChange;


  // for loops to display the columns and rows
  for (let c = 0; c < grid.length; c++) {
    //console.log(grid[r]);
    let col = grid[c];

  for (let r = 0; r < col.length; r++) {
      col[r].display();
    }
    // For each row add an empty array to represent the row
    // Go through all the columns in this row
    // for (let c = 0; c < cols; c++) {
    //     grid[r][c].display();
    // }
  }

// Door animation

// door.display();

  // Player animation

  player.display();

  // for loops to display the columns and rows of walls
  for (let c = 0; c < walls.length; c++) {
    //console.log(grid[r]);
    let col = walls[c];

    for (let r = 0; r < col.length; r++) {
        col[r].display();
        //if (wallsStopMoving ===false) {
        // Dispaly wall growth
        col[r].move();
      //  }
    }
  }


  // Health bar animation
  healthBar.display();


  // To display the play score

    push();
    fill(255);
    textSize(44);
    text(scoreKeeper, width / 1.2, height / 1.02);
    textAlign(CENTER, CENTER);
    pop();

}

function keyPressed() {
  if (state === `title` && key === "Enter") {
    state = `animation`;
  }

  // if (state === `title` && key === "t") {
  //   state = `tutorial`;
  // }

    player.keypressed();
}

function title() {

  // Title background
  background(titleBackground);

  // Opening text and instructions
  push();
  textSize(16);
  textAlign(CENTER, CENTER);

  fill(255);
  text(`Welcome to Manic Maze!`, width / 2, height / 2.7);
  text(`Use the Arrow Keys to Move`, width / 2, height / 2.4);
  text(`Press Enter to Start`, width / 2, height / 1.5);
  pop();


}

function tutorial() {
  fill(255);
  text(`Welcome to Manic Maze!`, width / 2, height / 2.7);
  text(`Use the Arrow Keys to Move`, width / 2, height / 2.4);
  text(`Collect Checkpoints to move to the next level`, width / 2, height / 1.5);
  text(`Watch your Health Bar and Escape through the door when it appears`, width / 2, height / 1.5);
  pop();
}

function endLose() {
  // End text
  push();
  textSize(16);
  textAlign(CENTER, CENTER);
  fill(255);
  text(`GAME OVER`, width / 2, height / 2.7);
  pop();
}

/*** COLLISION  BETWEEN WALLS  AND PLAYER**/
function checkCollisionWithWalls(){
  let minDist = 500;
  let minWallCol = 0;
  let minWallRow = 0;
  // for loop the columns and rows
  for (let c = 0; c < walls.length; c++) {
    //console.log(grid[r]);
    let col = walls[c];

    for (let r = 0; r < col.length; r++) {

        //    console.log(col[r])
        // Establish distance between player and maze
        // Have to add + 10 to player in order to prevent maze distance
        // Calculation from going back to positive
        let d = dist(player.x + 12, player.y, col[r].x + col[r].width, col[r].y);

        if (d < minDist) {
          minDist = d;
          minWallCol = c;
          minWallRow = r;
        }
        // if(player.x > col[r].x && player.x > col[r].x+col[r].width ){
        //     if(player.y > col[r].x && player.x > col[r].x+col[r].width )
        // }

      }

  }
   // console.log(minDist);
   return minDist;


}

function setupLevel() {
  level = levels[currentLevel];
  // Initialize player class
  player = new Player(10, 10, unit, startCol, startRow);

  // Initialize health bar class
  healthBar = new HealthBar();

  // Initialize sounds class

  sounds = new Sounds();

  // Initialize door class

  // door = new Door();

  // For loop for the grid
  for (let c = 0; c < cols; c++) {
    // For each row add an empty array to represent the row
    grid.push([]);
    // Go through the grid's rows
    for (let r = 0; r < rows; r++) {
      // Choose a random item to add at this position
      // (W, c, or nothing)
      let item = random(level);
        // Add a Maze and paths to the columns
        if (item === `C` && (c!==startCol || r!==startRow)) {
          grid[c].push(new Maze(maze.width, maze.height, unit * c, unit * r));
        }
          else if (item === `W` && (c!==startCol || r!==startRow)) {
            grid[c].push(new Checkpoint(20, 20, unit * c, unit * r,`checkPoint`));
          }
            else if (item === `F` && (c!==startCol || r!==startRow)) {
              grid[c].push(new Checkpoint(20, 20, unit * c, unit * r, `fog`));
            }
              else if (item === `S` && (c!==startCol || r!==startRow)) {
                grid[c].push(new Checkpoint(20, 20, unit * c, unit * r, `spin`));
              }
                else if (item === `X` && (c!==startCol || r!==startRow)) {
                  grid[c].push(new Checkpoint(20, 20, unit * c, unit * r, `stopSpin`));
                }

        else {
          grid[c].push(new PathCell(20, 20, unit * c, unit * r));
        }
      }
    }

  // Added a couple of test walls

//  walls.push(new Wall(wallWidth, wallHeight + 40, 1, 1, unit));
//  walls.push(new Wall(wallWidth, wallHeight, 1, 2, unit));

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
