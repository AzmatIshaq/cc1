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
let rows = 25;
let cols = 30;
// The unit size (how big a square for each tile)
let unit = 25;
// Random items to populate the game map
let items = [`W`, `C`, ``];
let walls = [];
// Starting row
let startRow = 8;
// Starting column
let startCol = 8;

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


      // Add a checkpoint to the columns

      if (item === "C") {
        grid[c].push(new Maze(20, 20, unit * c, unit * r));
      } else {
        grid[c].push(new PathCell(20, 20, unit * c, unit * r));
      }
    }
  }

  // Added a couple of test walls

  walls.push(new Wall(10, 50, 1, 1, unit));
  walls.push(new Wall(10, 30, 1, 2, unit));

}

/**
Draw:
Display player, checkpoints,
*/
function draw() {
  background(0);

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

}

function keyPressed() {
  player.keypressed();
}
