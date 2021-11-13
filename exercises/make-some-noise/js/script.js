/**
Project 2 Prototype
Azmat

This is a prototype of Project 2 for the CART 253 Class at Concordia University.
*/

"use strict";

// A variable to introduce the player class
let player;
// Walls represented by the grid
let wall;
// Checkpoints for player to reach
let checkpoint;
// Grid array in order to make game map
let grid = [];
// Rows and columns in the grid
let rows = 20;
let cols = 25;
// The unit size (how big a square for each tile)
let unit = 25;
// Random items to populate the game map
let items = [`W`, `C`, ``, ``, ``];
// Array for walls
let walls = [];
// Starting row
let startRow = 8;
// Starting column
let startCol = 8;
// Synth p5 effect variable
let synth;
// Title State
let state = `title`;
// Maze variable
let maze = {
  width: 20,
  height: 20,
};

// Variables to set height and width of walls
let wallWidth = 10;
let wallHeight = 30;

/**
Setup:
Create a canvas out of the rows, columns.
Classes are introduced and initiated
*/
function setup() {

  userStartAudio();

    synth = new p5.PolySynth();

  createCanvas(cols * unit, rows * unit);

  // Initialized player class
  player = new Player(10, 10, unit, startCol, startRow);

  // For loop for the grid
  for (let c = 0; c < cols; c++) {
    // For each row add an empty array to represent the row
    grid.push([]);
    // Go through the grid's rows
    for (let r = 0; r < rows; r++) {
      // Choose a random item to add at this position
      // (W, c, or nothing)
      let item = random(items);

      // Add a Maze and paths to the columns

      if (item === `C`) {
        grid[c].push(new Maze(maze.width, maze.height, unit * c, unit * r));
      }
      // Add checkpoints to columns
      // Not yet functional
      else if (item === `W`) {
        grid[c].push(new Checkpoint(20, 20, unit * c, unit * r));
      } else {
        grid[c].push(new PathCell(20, 20, unit * c, unit * r));
      }
    }
  }

}

/**
Draw:
Display states
*/
function draw() {
  background(0);

  // If statements to load title and animation state
  if (state === `title`) {
    title();
  }
  if (state === `animation`) {
    animation();
  }
}
function animation() {
  // for loops to display the columns and rows
  for (let c = 0; c < grid.length; c++) {
    //console.log(grid[r]);
    let col = grid[c];
    // For loops to display
    for (let r = 0; r < col.length; r++) {
      col[r].display();
    }
  }
  for (let i = 0; i < walls.length; i++) {
    walls[i].display();
  }
  // Player
  player.move();
  player.display();
  player.checkWallCollision();
}

function keyPressed() {
  if (state === `title`) {
    state = `animation`;

  }

  player.keypressed();
}

function mousePressed(){
  //player.mousepress();
}

function title() {
  // Opening text and instructions
  push();
  textSize(16);
  textAlign(CENTER, CENTER);
  fill(255);
  text(`Explore the Maze and Trigger Sounds along the way`, width / 2, height / 2.7);
  text(`Use the Arrow Keys to Move, Try Going In Every Direction on the Blue Tiles`, width / 2, height / 2.3);
  text(`You Cannot Go on Purple Squares, But Listen to What Happens If You Try!`, width / 2, height / 2.1);
  text(`Also See What Happens When are Further or Closer to Them`, width / 2, height / 1.8);
  text(`Press Any Key to Start`, width / 2, height / 1.5);
  pop();
}
