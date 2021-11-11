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
let cols = 20;
// The unit size (how big a square for each tile)
let unit = 25;
// Random items to populate the game map
let items = [`W`, `C`, ``];

let walls = [];

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
  createCanvas(rows * unit, cols * unit);
  player = new Player(10, 10,unit,0,5);
//  checkpoint = new Checkpoint(40, 40);
  // wall = new Wall(10, 10)

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
    //  grid[r].push(item);
      // Add a checkpoint to the show
      //let checkpoints = checkpoint.display()
      if(item ==="C"){
      grid[r].push(new Checkpoint(20,20,unit*r,unit*c));
    }
    else {
grid[r].push(new PathCell(20,20,unit*r,unit*c));
    }
      // Add user to a row
      //let playerDisplay = player.display()
    //  grid[r].push(playerDisplay);
    }
    //console.log(grid[0]);
  }
  // Make the position the player starts at empty!
  //grid[player.r][player.c] = ``;
  //done building grid
  // add some walls
  walls.push(new Wall(10, 50, 1, 1, unit));
  walls.push(new Wall(10, 30, 1, 2, unit));

}

/**
Description of draw()
*/
function draw() {
  background(0);


  //checkpoint.display();
  for (let r = 0; r < rows; r++) {
    //console.log(grid[r]);
    let row = grid[r];
    for(let c = 0; c<grid[r].length; c++){
      row[c].display();
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

function keyPressed()
{
  player.keypressed();
}
