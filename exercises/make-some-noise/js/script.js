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
let items = [`W`, `C`, ``];
let walls = [];
// Starting row
let startRow = 8;
// Starting column
let startCol = 8;
// Synth p5 effect variable
let synth;
// Title State
let state = `title`;

let maze = {
  width: 20,
  height: 20,
};

let wallWidth = 10;
let wallHeight = 30;

/**
Description of preload
*/
function preload() {}

/**
Setup:
Create a canvas out of the rows, columns.
Player class is initiated
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

  // Added a couple of test walls

  walls.push(new Wall(wallWidth, wallHeight + 40, 1, 1, unit));
  walls.push(new Wall(wallWidth, wallHeight, 1, 2, unit));
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

  if (state === `end`) {
    wallWidth = 20;
    wallHeight = 20;
    //Ending
    push();
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(`GAME OVER`, width / 2, height / 2);
    text(`Refresh the Page to Play Again`, width / 2, height / 1.5);
    pop();
  }
}
function animation() {
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
  text(`Use the Arrow Keys to Move, Try Going In Every Direction on the Blue Tiles`, width / 2, height / 2.4);
  text(`Press Any Key to Start`, width / 2, height / 1.5);
  pop();
}
