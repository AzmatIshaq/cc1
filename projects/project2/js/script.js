/**
Project 2 Prototype
Azmat

This is Project 2 for the CART 253 Class with Professor Pippin Barr at Concordia University.
*/

"use strict";

// Levels array to alternate variety of pickups

// M is for Maze
// C is for Checkpoints
// F is for Fog
// SR is for Start Radiation
// StpR is for Stoping Radiation
// WK is for Wacky Keys
// StpWK is to stop Wacky Keys
// S is for Spinning Maze
// StpS is for Stoping Spinning Maze
// CH is for Cheese

let levels = [
  // [``, `M`, `S`, `StpS`, `CH`, `M`, `M`, ``, `SR`, `StpR`, `F`],
  [``, `M`, `M`, `F`],
  [`WK`, `M`, `M`, `M`, ``, ``, `F`],
  [`StpR`, `M`, `M`, `M`, ``, `SR`],
  [``, ``, `M`, `M`, `M`, ``, `S`, `StpS`],
  [``, `M`, `M`, `M`, ``, ``, ``, ``, ``, ``, `SR`, `WK`, `CH`, `StpS`, `F`, `S`, `StpR`],
];

// Variables to alternate between specific levels

let currentLevel = 0;

let level = undefined;

// A variable to introduce the player class
let player;

// Walls represented by the grid
let wall;

// Starting radiation is set to false so they can be turned on and off
let buildRadiation = false;

// Grid array in order to make game map
let grid = [];

// Rows and columns in the grid
let rows = 20;
let cols = 35;

// The unit size (how big a square for each tile)
let unit = 25;

// Random items to populate the game map
// Don't think this is doing anything anymore:
// let items = [`W`, `C`, ``, `F`, `S`];

// Array to load walls
let radiationCircles = [];

// Starting row
let startRow = 8;

// Starting column
let startCol = 8;

// Title State
let state = `title`;

let radiationIsActive = false;

let maze = {
  width: 20,
  height: 20,
};

// Door variable to initialize class
let door;

// Wall variables
// let wallWidth = 10;
// let wallHeight = 30;

// Image variables
let titleImage = undefined;
let spritePlayer = undefined;
let pickupFog = undefined;
let pickupWacky = undefined;
let pickupCheese = undefined;
let pickupRadiation = undefined;
let pickupSpin = undefined;
let exitDoor = undefined;
let endRat = undefined;
let endRatWin = undefined;
let instructionsImage = undefined;

// Fog variable to load fog of war image
let fog;

// Variable to set fog to true for fog effect
let fogActive = true;

// Map angle
let mapAngle = 0;
let mapAngleChange = 0.00;

// Variable to initiate checkpoints
let checkpoint;

// This is the scoreKeeper variable that we see at the top left of the canvas
let scoreKeeper = 0;

// Variable to initiate health bar
let healthBar;

// Variables to initiate sounds
let sounds;
let squeak;
let cheesePickupChime;

// Variables to load tutorial class

let tutorial;

// Set wacky keys to be off at beginning of program

let wackyKeysActive = false;

// Title alpha

let titleAlpha = 255;
let fadeOut = true;

/**
Description of preload
*/
function preload() {

  /** Images */

  // Image for fog checkpoint pickup
  pickupFog = loadImage("assets/images/pickupFog.png");

  // Image for wacky keys checkpoint
  pickupWacky = loadImage("assets/images/wacky2.png");

  // Image for spin checkpoint
  pickupSpin = loadImage("assets/images/pickupSpin.png");

  // Image for cheese checkpoint
  pickupCheese = loadImage("assets/images/pickupCheese.png");

  // Image for reactive radiationCircles checkpoint
  pickupRadiation = loadImage("assets/images/pickupRadiation.png");

  // Image for player sprite
  spritePlayer = loadImage(`assets/images/Rat_1.png`);

  // Image for end game states
  endRat = loadImage(`assets/images/rat_lose.png`);
  endRatWin = loadImage(`assets/images/rat_win.png`);

  // Background image for title screen
  titleImage = loadImage(`assets/images/title_image_morry.png`);

  // Image for instructions screen
  instructionsImage = loadImage(`assets/images/instructions_image.png`);

  // Fog of war image
  fog = loadImage(`assets/images/fog_war1.png`);

  // Door image
  exitDoor = loadImage(`assets/images/door1.png`);

  /** Sounds */

  // Mouse squeak for collision audio
  squeak = loadSound(`assets/sounds/mouse_squeak2.wav`);

  // Chime for cheese pickups
  cheesePickupChime = loadSound(`assets/sounds/cheeseChimePickup2.wav`);

}

/**
Setup:
Create a canvas out of the rows, columns.
Player class is initiated
*/

function setup() {

  // Set up canvas size based on colums and rows
  createCanvas(cols * unit, rows * unit + width / 2);

  // Level setup function
  setupLevel();

  // Variable to start and use levels
  level = levels[currentLevel];

  // Initialize audio
  userStartAudio();
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

  if (state === `instructions`) {
    instructions();
  }

  if (state === `animation`) {
    animation();
  }

  if (state === `endLose`) {
    endLose();
  }

  if (state === `endWin`) {
    endWin()
  }



}

function animation() {

  // Collision detection and healthbar decrease

  if (radiationIsActive === true) {
    for (let r = 0; r < radiationCircles.length; r++) {
      for (let c = 0; c < radiationCircles[r].length; c++) {
        let wall = radiationCircles[r][c];
        let d = dist(player.x, player.y, wall.x, wall.y);
        if (d < player.width + wall.u / 2) {
          healthBar.width -= 0.2;
          squeakAudio();
        }
      }
    }

    console.log("collide");

    // Collision detection between player character and walls
    //let minWallDist = checkCollisionWithWalls();
    // HealthBar decrease during collision
    //healthBar.changeStatus(minWallDist);
  }


  // Map spin effect
push();
  translate(width / 2, height / 2);
  rotate(mapAngle);
  translate(-width / 2, -height / 2);

  mapAngle += mapAngleChange;


  // for loops to display the columns and rows
  for (let c = 0; c < grid.length; c++) {
    let col = grid[c];

    for (let r = 0; r < col.length; r++) {
      col[r].display();
    }
  }



  // Player animation

  player.display();

  if (radiationIsActive === true) {
    // for loops to display the columns and rows of radiationCircles
    for (let c = 0; c < radiationCircles.length; c++) {
      //console.log(grid[r]);
      let col = radiationCircles[c];

      for (let r = 0; r < col.length; r++) {
        col[r].display();
        //if (wallsStopMoving ===false) {
        // Dispaly wall growth
        col[r].move();
        //  }
      }
    }
  }

  // Display fog

  displayFog(player)

  // Health bar animation
  healthBar.display();

  // Tutorial animation
  tutorial.display();

  // To display the play score

  push();
  fill(255);
  textSize(44);
  text(scoreKeeper, width / 1.2, height / 1.02);
  textAlign(CENTER, CENTER);
  pop();

  // To prevent score from increasing while exit door is open

  // if (doorState === true) {
  //
  // }



pop();
} // End of animation function



function keyPressed() {
  if (state === `title` && key === "Enter") {
    state = `animation`;
  }

  if (state === `title` && key === "i") {
    state = `instructions`;
  }

  if (state === `instructions` && key === "Enter") {
    state = `title`;
  }



  // if (state === `title` && key === "t") {
  //   state = `tutorial`;
  // }
if(state ==='animation'){
    player.keypressed();

}
if((state ==='endWin'|| state ==='endLose')  && key === "Enter") {
  console.log('reload');
  setupLevel();
  state = `title`;
  // Set score to 0
  scoreKeeper = 0;
  // doorState = false;

  // Reset level to 0
  currentLevel = 0;
}

}

function title() {

  // Title background
background(0);
// Title screen image
push();

image(titleImage, width / 4, height / 50, width / 2, height / 1.2);
  // Opening text and instructions
pop();

  push();
  textSize(20);
  textAlign(CENTER, CENTER);
  fill(255, 255, 255, titleAlpha);

  // text(`Welcome to Manic Maze!`, width / 2, height / 2.7);
  // text(`Use the Arrow Keys to Move`, width / 2, height / 2.4);
  text(`Press i for Instructions`, width / 2, height / 1.13);
  text(`Press Enter to Start`, width / 2, height / 1.06);
  // text(`Use the Arrow Keys to Move`, width / 2, height / 2.4);
  pop();

  image(exitDoor, 20, width, 100, 100);

// Blinking starting text

if (titleAlpha >= 256 || titleAlpha <= 0) {
  fadeOut = !fadeOut;
}
if (fadeOut) {
  titleAlpha -= 5
} else {titleAlpha +=5
}
}

function instructions() {
  image(instructionsImage, width / 9, 20, width / 1.8, height);
  push();
  textSize(20);
  textAlign(CENTER, CENTER);
  fill(255, 255, 255, titleAlpha);
  // text(`Welcome to Manic Maze!`, width / 2, height / 2.7);
  // text(`Use the Arrow Keys to Move`, width / 2, height / 2.4);
  text(`Press Enter to go Back`, width / 2, height / 1.1);
  // text(`Use the Arrow Keys to Move`, width / 2, height / 2.4);
  pop();

  // Blinking text
  if (titleAlpha >= 256 || titleAlpha <= 0) {
    fadeOut = !fadeOut;
  }
  if (fadeOut) {
    titleAlpha -= 5
  } else {titleAlpha +=5
  }
}

function endWin() {
  push();
  // End text
  imageMode(CENTER)
  image(endRatWin, width / 2, height / 2, 100, 100);

  //Ending text

  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(`You Win!`, width / 2, height / 4);
  // text(`Click your Mouse to make more balloons!!`, width / 2, height / 3);
  text(`Press Enter to Play Again`, width / 2, height / 1.5);
  pop();


  // Turn into falling cheese
  // for (let i = 0; i < 50; i++) {
  //
  // }
}

function endLose() {
  push();
  // End image
  imageMode(CENTER)
  image(endRat, width / 2, height / 2, 100, 100);
  // End text

  textSize(16);
  textAlign(CENTER, CENTER);
  fill(255);
  text(`GAME OVER`, width / 2, height / 2.7);
  text(`Don't worry, he's just tuckered out. Press Enter to try again!`, width / 2, height / 1.2);
  pop();
}

function setupLevel() {
  console.log(`set up level ${currentLevel}`)
  grid = [];
  buildRadiation = false;
  //Set radiation array
  radiationCircles = [];
  radiationIsActive = false;
  // Set levels array to change levels
  level = levels[currentLevel];

  // Reset title text values
  titleAlpha = 255;
  fadeOut = true;

  // Reset spinning maze
  mapAngle = 0;
  mapAngleChange = 0;

  // Variable to set fog to true for fog effect
  let fogActive = true;

  // Initialize player class
  player = new Player(10, 10, unit, startCol, startRow);

  // Initialize health bar class
  healthBar = new HealthBar();

  // Initialize sounds class

  sounds = new Sounds();


  // Initialize tutorial class

  tutorial = new Tutorial();

  // Section to introduce new checkpoint elements

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
      if (item === `M` && (c !== startCol || r !== startRow)) {
        grid[c].push(new Maze(maze.width, maze.height, unit * c, unit * r, `Maze`));
      } else if (item === `W` && (c !== startCol || r !== startRow)) {
        grid[c].push(new Checkpoint(20, 20, unit * c, unit * r, `checkPoint`));
      } else if (item === `F` && (c !== startCol || r !== startRow)) {
        grid[c].push(new Checkpoint(20, 20, unit * c, unit * r, `fog`));
      } else if (item === `S` && (c !== startCol || r !== startRow)) {
        grid[c].push(new Checkpoint(20, 20, unit * c, unit * r, `spin`));
      } else if (item === `StpS` && (c !== startCol || r !== startRow)) {
        grid[c].push(new Checkpoint(20, 20, unit * c, unit * r, `stopSpin`));
      } else if (item === `SR` && (c !== startCol || r !== startRow)) {
        grid[c].push(new Checkpoint(20, 20, unit * c, unit * r, `startRadiation`));
      } else if (item === `StpR` && (c !== startCol || r !== startRow)) {
        grid[c].push(new Checkpoint(20, 20, unit * c, unit * r, `stopRadiation`));
      } else if (item === `WK` && (c !== startCol || r !== startRow)) {
        grid[c].push(new Checkpoint(20, 20, unit * c, unit * r, `wackyKeys`));
      } else if (item === `CH` && (c !== startCol || r !== startRow)) {
        grid[c].push(new Checkpoint(20, 20, unit * c, unit * r, `cheese`));
      } else {
        grid[c].push(new PathCell(20, 20, unit * c, unit * r));
      }
    }
  }
} // End of setupLevel function


// Function to play squaking audio
function squeakAudio() {
  if (!squeak.isPlaying()) {
    squeak.play();
  }
} // End of squakAudio function




// Display fog around player when it is active
function displayFog(player) {
  if (fogActive === true) {
    imageMode(CENTER);
    image(
      fog,
      player.x + player.width / 1.5,
      player.y + player.height / 1.5,
      width * 2,
      height * 2
    );
  }
} // End of displayFog function
