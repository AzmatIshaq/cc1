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
let rows = 10;
let cols = 10;
// The unit size (how big a square for each tile)
let unit = 50;
// Random items to populate the game map
let items = [`W`, `c`, ``, ``, ``, ``, ``, ``];

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
  createCanvas(rows * unit, cols * unit);
  player = new Player(100, 100);
  checkpoint = new Checkpoint(40, 40);
  wall = new Wall(10, 10)
}

/**
Description of draw()
*/
function draw() {
  background(0);

  player.move();
  player.display();
  checkpoint.display();

  // Go through the grid's rows
  for (let r = 0; r < rows; r++) {
    // For each row add an empty array to represent the row
    grid.push([]);
    // Go through all the columns in this row
    for (let c = 0; c < cols; c++) {
      // Choose a random item to add at this position
      // (A W, c, or nothing)
      let item = random(items);
      // Add it to the row
      grid[r].push(item);
      // Add a checkpoint to the show
      let checkpoints = checkpoint.display()
      grid[r].push(checkpoints);
      // Add user to a row
      let playerDisplay = player.display()
      grid[r].push(playerDisplay);
    }
  }
  // Make the position the player starts at empty!
  grid[player.r][player.c] = ``;



  // Go through all the rows and columns
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Get the item at this position
      let item = grid[r][c];

      // Display the walls

      wall.display();
      // // Draw a square so we can see the grid space
      push();
      stroke(255);
      noFill();
      rect(r * unit, c * unit, unit, unit);
      pop();

      // Display the item (as text for now)
      push();
      textSize(unit);
      textAlign(CENTER, CENTER);
      fill(255);
      text(item, r * unit + unit / 2, c * unit + unit / 2);
      pop();
    }
  }
}
