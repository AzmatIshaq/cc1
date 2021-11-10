/**
Project 2 Prototype
Azmat

This is a prototype of Project 2 for the CART 253 Class at Concordia University.
*/

"use strict";

// A variable to introduce the player class
let player;
// Grid array in order to make game map
let grid = [];
// Rows and columns in the grid
let rows = 10;
let cols = 10;
// The unit size (how big a square for each tile)
let unit = 50;

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(500, 500);
  player = new Player(40, 40);
}


/**
Description of draw()
*/
function draw() {
  background(0);

  player.move();
  player.display();
}

// Keypress code


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    value = 255;
  } else if (keyCode === RIGHT_ARROW) {
    value = 0;
  }
}
