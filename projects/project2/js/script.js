/**
Project 2 - Morry's Maze
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
// MT is for Maze Trail
// StpMT is to stop Maze Trail
// CH is for Cheese

// Can use to potentially make random levels in future:
// let itemGrid = [`MT`,`StpMt`,`M`,``,`CH`,`F`,`S`,`StpS`,`SR`,`StpSR`,`WK`,`StpWK`]
// let itemGrid = [MT,StpMt,M,,`CH`,`F`, , S,StpS,SR,StpSR,WK,StpWK];
// let randomGame = random(itemGrid);

// Code contribution from Pippin on how to setup levels. I adjusted the contents of the array.
let levels = [
  [``, `MT`, `StpMT`, ``, ``, ``,``, ``, ``,``, ``, ``, `CH`,`M`, `M`, `M`, `M`, `M`, `M`, `M`, `M`, `M`, `M`, `F`, ``, ``],
  [``, ``, ``, ``, `M`, `M`, `WK`, ``, ``, ``, ``, `M`, `M`, `M`, `WK`, ``, ``, ``, ``, `M`, `M`, `M`, `WK`, `F`],
  [``, ``, ``, ``, `M`, `M`,``, ``, ``, ``, `M`, `M`,``, ``, ``, ``, `M`, `M`, ``, `M`, `M`, `M`,  `S`, `StpS`, `CH`],
  [``, ``, ``, ``, ``, ``, ``, ``, ``,``, ``,``, ``, `M`, `M`, `M`, `M`, `M`, `M`, `M`,  `CH`, `F`, `SR`,`SR`, `StpR`],
  [``, `M`, `M`, `M`, ``, ``, ``, ``, ``, ``, `MT`, `StpMT`, `WK`, `SR`, `CH`, `StpS`, `F`, `S`, `StpR`],
];

// Variables to alternate between specific levels
// Code contribution from Pippin on how to setup levels.
let currentLevel = 3;
// Setting a starting level variable
let level = undefined;

// A variable to introduce the player class
let player;

// Starting radiation build is set to false so they can be turned on and off
let buildRadiation = false;

// Grid array in order to make game map
let grid = [];

// Cheese end animation variables
let cheeseArray = [];

// Rows and columns in the grid
let rows = 20;
let cols = 35;

// The unit size (how big a square for each tile)
let unit = 25;

// Size for objects inside the cell

let cellObjectsWidth = 10;
let cellObjectsHeight = 10;

// Array to load radiation circles
let radiationCircles = [];

// Starting row for player
let startRow = 8;

// Starting column for player
let startCol = 8;

// Title State
let state = `title`;

// Start radiation to be off

let radiationIsActive = false;

// Radiation damage amount

let radDamage = 0.2;

// Starting values for maze size
let maze = {
  width: 20,
  height: 20,
};

// Door variable to initialize door class
let door;

// Image variables
let titleImage;
// Title image values
let titleImg = {
  width: 2,
  height: 1.2,
  x: 4,
  y: 50,
};

// Title text object values

let titleText = {
  fillR: 255,
  fillG: 255,
  fillB: 255,

  width: 2,
  height: 1.13,

  width2: 2,
  height2: 1.06,
};

// Variable to change instructions image values
let instructImg = {
  x: 20,
  y: 145,
  width: 1.3,
  height: 0.9,
}

// Instruction text values

let instructText = {
  size: 20,
  fillR: 255,
  fillG: 255,
  fillB: 255,
  x: 2,
  y: 1.1,
}

// Values for end losing rat image

let endRatImg = {
    x: 2,
    y: 2,
    width: 100,
    height: 100,
}

// Values for end losing text

let endLoseText = {
  x: 2,
  y: 2.7,
  x2: 2,
  y2: 1.2,
  size: 16,
  fill: 255,
}

// Values for end rat winning image
  let endRatWinImg = {
    x: 2,
    y: 2,
    width: 100,
    height: 100
  }

// Ending win text values
  let endingWinText = {
      x: 2,
      y: 4,
      x2: 2,
      y2: 1.5,
      size: 16,
      fill: 255,
  }

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
let mazeWalls = undefined;
let pickupMazeTrail = undefined;

// Fog variable to load fog of war image
let fog;
// Fog image position
let fogImg = {
  x: 1.5,
  y: 1.5,
}

// Variable to set fog to true for fog effect at the start
let fogActive = true;

// Map angle in order to have rotating map effect. Code help from Pippin Barr for spin effect.
let mapAngle = 0;
let mapAngleChange = 0.00;

// Variable to initiate checkpoints
let checkpoint;

// This is the scoreKeeper variable that we see at the top left of the canvas
let scoreKeeper = 0;
// Variable to position the score
let scorePosition = {
  width: 1.05,
  height: 1.02,
}

// Variable for `Score` text values
let scoreText = {
  fill: 255,
  size: 20,
  width: 1.2,
  height: 1.02,
}


// Variable to initiate health bar
let healthBar;

// Variables to initiate sounds
let sounds;
let squeak;
let cheesePickupChime;
let damageAlert;
let endingLoseChime;

// Variables for music in different states

let introMusic;
let endWinMusic;
let levelsMusic;

// Toggling music variable

let musicActive = true;

// Variables to load tutorial class

let tutorial;

// Set wacky keys to be off at beginning of program

let wackyKeysActive = false;

// Title alpha

let titleAlpha = 255;
let fadeOut = true;

// Amount of cheese instances that fallduring win state
let fallingCheeseAmount = 200;

/**
Description of preload
*/
function preload() {

  /** Images */

  // Preloading images to call them when needed

  // Image for fog checkpoint pickup
  pickupFog = loadImage("assets/images/pickupFog.png");

  // Image for wacky keys checkpoint
  pickupWacky = loadImage("assets/images/wacky2.png");

  // Image for spin checkpoint
  pickupSpin = loadImage("assets/images/pickupSpin.png");

  // Image for cheese checkpoint
  pickupCheese = loadImage("assets/images/pickupCheese.png");

  // Image for maze trail checkpoint
  pickupMazeTrail = loadImage("assets/images/pickup_maze_trail2.png");

  // Image for reactive radiationCircles checkpoint
  pickupRadiation = loadImage("assets/images/pickupRadiation.png");

  // Image for player sprite
  spritePlayer = loadImage(`assets/images/Rat_1.png`);

  // Image for maze walls
  mazeWalls = loadImage(`assets/images/maze_wall.png`);

  // Image for end game states
  endRat = loadImage(`assets/images/rat_lose2.png`);
  endRatWin = loadImage(`assets/images/rat_win.png`);

  // Background image for title screen
  titleImage = loadImage(`assets/images/title_image_morry_4.png`);

  // Image for instructions screen
  instructionsImage = loadImage(`assets/images/instructions_image7.png`);

  // Fog of war image
  fog = loadImage(`assets/images/fog_war1.png`);

  // Door image
  exitDoor = loadImage(`assets/images/door1.png`);

/** Sounds */

  //Preloading sounds to call them when needed

  // Mouse squeak for collision audio
  squeak = loadSound(`assets/sounds/mouse_squeak2.wav`);

  // Chime for cheese pickups
  cheesePickupChime = loadSound(`assets/sounds/cheeseChimePickup2.wav`);

  // Alert audio for when players health low
  damageAlert = loadSound(`assets/sounds/damage_alert2.wav`);

  // Chime when player loses
  endingLoseChime = loadSound(`assets/sounds/lose_chime4.wav`);

  // Title screen music produced by yours truly

  introMusic = loadSound(`assets/sounds/intro_music_new_1.wav`);

  // End win music
  endWinMusic = loadSound(`assets/sounds/ending_audio_win5.wav`);

  // Music during levels
  levelsMusic = loadSound(`assets/sounds/levels_music3.wav`);
}

/**
Setup:
Create a canvas out of the rows, columns.
Level setup is initiated
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

  // Set up array for end animation
  // Code contribution from Sabine for falling cheese at end of game. I adjusted cheese amount and speed.
  for (let i = 0; i < fallingCheeseAmount; i++) {
      cheeseArray.push({x:random(1,width - 10), y:random(-50,0), vy:random(1, 10)});
  }


}

/**
Draw:
Display states
*/
function draw() {
  background(0);


// If statements to alternate between game states
  if (state === `title`) {
    title();
    //Play title music
      introAudio();
  }

  if (state === `instructions`) {
    instructions();
  }

  if (state === `animation`) {
    animation();
    // Play level music
    levelsAudioMusic()

  }

  if (state === `endLose`) {
    endLose();
  }

  if (state === `endWin`) {
    endWin()
    // Play ending winning audio
    endingWinAudio()
  }
}

// Animation function to hold all of the animation for the project
function animation() {
  // Stop intro music
  introMusic.stop();


  // Collision detection and healthbar decrease
  // Code contribution from Sabine and Pippin. I also adjusted some values and added sound

  if (radiationIsActive === true) {
    for (let r = 0; r < radiationCircles.length; r++) {
      for (let c = 0; c < radiationCircles[r].length; c++) {
        let radCircle = radiationCircles[r][c];
        let d = dist(player.x, player.y, radCircle.x, radCircle.y);
        if (d < player.width + radCircle.u / 2) {
          healthBar.width -= radDamage;
          squeakAudio();
        }
      }
    }
  }


  // Map spin effect
  // Code Contribution from Pippin. I adjusted some of the values.
push();
  translate(width / 2, height / 2);
  rotate(mapAngle);
  translate(-width / 2, -height / 2);

  mapAngle += mapAngleChange;

  // Code contribution from Sabine and Pippin
  // for loops to display the columns and rows
  for (let c = 0; c < grid.length; c++) {
    let col = grid[c];

    for (let r = 0; r < col.length; r++) {
      col[r].display();
    }
  }

  // Player animation

  player.display();

  // Code contribution from Sabine and Pippin
  if (radiationIsActive === true) {
    // for loops to display the columns and rows of radiationCircles
    for (let c = 0; c < radiationCircles.length; c++) {
      let col = radiationCircles[c];

      for (let r = 0; r < col.length; r++) {
        col[r].display();
        col[r].move();
      }
    }
  }

  // Display fog
  displayFog(player)

  // Health bar animation
  healthBar.display();

  // Tutorial animation
  tutorial.display();

  // Display the play score

  push();
  fill(255);
  textSize(44);
  text(scoreKeeper, width / scorePosition.width, height / scorePosition.height);
  textAlign(CENTER, CENTER);
  pop();

// Display `Score` text

push();
fill(scoreText.fill);
textSize(scoreText.size);
text(`Score`, width / scoreText.width, height / scoreText.height);
textAlign(CENTER, CENTER);
pop();

pop();
} // End of animation function

function keyPressed() {

  // Change between states based on keyPressed

  if (state === `title` && key === "Enter") {
    state = `animation`;
  }

  if (state === `title` && (key === "i" || key === "I")) {
    state = `instructions`;
  }

  if (state === `instructions` && key === "Enter") {
    state = `title`;
  }

  if (state === `animation`){
    player.keypressed();

  }

// Restart from beginning if you end up in end winning or losing state
  if((state ==='endWin'|| state ==='endLose')  && key === "Enter") {
    // Reset level to 0
    currentLevel = 0;
    // Reset some elements at end states
    setupLevel();
    state = `title`;
    // Set score to 0
    scoreKeeper = 0;
    // doorState = false;

  }

  // Disable music

  if (state === `animation` && (key === "m" || key === "M")) {
    if (musicActive === true) {

    levelsMusic.stop();
    musicActive = false;
  }else {
      levelsMusic.play();
      musicActive = true;
  }
}


} // End of keyPressed function

function title() {

// Stop end winning music
endWinMusic.stop();

// Title background
background(0);

// Title screen image
push();

image(titleImage, width / titleImg.x, height / titleImg.y, width / titleImg.width, height / titleImg.height);
  // Opening text and instructions
pop();


  push();
  textSize(20);
  textAlign(CENTER, CENTER);
  fill(titleText.fillR,titleText.fillG,titleText.fillB, titleAlpha);
  text(`Press i for Instructions`, width / titleText.width, height / titleText.height);
  text(`Press Enter to Start`, width / titleText.width2, height / titleText.height2);
  pop();

// Blinking starting text
// Code contribution from Sabine. I adjusted some of the values.

if (titleAlpha >= 256 || titleAlpha <= 0) {
  fadeOut = !fadeOut;
}
if (fadeOut) {
  titleAlpha -= 5
} else {titleAlpha +=5
}
// if (state === `title`) {
//
// }
}

// Function for instructions section of game
function instructions() {
  image(instructionsImage, width / instructImg.x, width / instructImg.y, width / instructImg.width, height / instructImg.height);
  push();
  textSize(instructText.size);
  textAlign(CENTER, CENTER);
  fill(instructText.fillR, instructText.fillG, instructText.fillB, titleAlpha);
  text(`Press Enter to go Back`, width / instructText.x, height / instructText.y);
  pop();

  // Blinking text. Reused Sabines code for blinking text in this section
  if (titleAlpha >= 256 || titleAlpha <= 0) {
    fadeOut = !fadeOut;
  }
  if (fadeOut) {
    titleAlpha -= 5
  } else {titleAlpha += 5
  }
}

// Function for end winning state of the game
function endWin() {
  // Stop level music
  levelsMusic.stop()

  push();
  // Display ynd win image
  imageMode(CENTER)
  image(endRatWin, width / endRatWinImg.x, height / endRatWinImg.y, endRatWinImg.width, endRatWinImg.height);

// Display end winning text

  fill(endingWinText.fill);
  textSize(endingWinText.size);
  textAlign(CENTER, CENTER);
  text(`You Win!`, width / endingWinText.x, height / endingWinText.y);
  text(`Press Enter to Play Again`, width / endingWinText.x2, height / endingWinText.y2);
  pop();

// Code contribute from Sabine on how to make falling cheese at end of game.
  for (let i = 0; i < fallingCheeseAmount; i++) {
    if(cheeseArray[i].y < height){
      cheeseArray[i].y = cheeseArray[i].y + cheeseArray[i].vy;
    image(pickupCheese, cheeseArray[i].x, cheeseArray[i].y);
  } else {cheeseArray[i].y = random(-50,0);}
  }
}

// Function for end lose state of the game
function endLose() {
  // Stop level music
  levelsMusic.stop()
  push();
  // End image
  imageMode(CENTER)
  image(endRat, width / endRatImg.x, height / endRatImg.y, endRatImg.width, endRatImg.height);


  // End text
  textSize(endLoseText.size);
  textAlign(CENTER, CENTER);
  fill(endLoseText.fill);
  text(`GAME OVER`, width / endLoseText.x, height / endLoseText.y);
  text(`Don't worry, he's just tuckered out. Press Enter to try again!`, width / endLoseText.x2, height / endLoseText.y2);
  pop();

  // Reset levels at end state
  let currentLevel = 0;
}

// On Pippin's advice, took setup code and turned it into a function.
function setupLevel() {

  // Setup an empty grid array
  grid = [];
  // Don't want radiation active for new setup.
  buildRadiation = false;
  //Set radiation array
  radiationCircles = [];
  // In order to track radiation status correctly this needs to be false also
  radiationIsActive = false;
  // Set levels array to change levels
  level = levels[currentLevel];

  // Set title text values
  titleAlpha = 255;
  fadeOut = true;

  // Set spinning maze
  mapAngle = 0;
  mapAngleChange = 0;

  // Variable to set fog to true for fog effect
  let fogActive = true;

  // Initialize player class
  player = new Player(cellObjectsWidth, cellObjectsHeight, unit, startCol, startRow);

  // Initialize health bar class
  healthBar = new HealthBar();

  // Initialize sounds class
  sounds = new Sounds();

  // Initialize tutorial class
  tutorial = new Tutorial();

  // Section to introduce new checkpoint elements
  // This code structure for the checkpoints was initially built in collaboration with Sabine and
  // restructured with Pippin.

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
      } else if (item === `MT` && (c !== startCol || r !== startRow)) {
        grid[c].push(new Checkpoint(20, 20, unit * c, unit * r, `mazeTrail`));
      } else if (item === `StpMT` && (c !== startCol || r !== startRow)) {
        grid[c].push(new Checkpoint(20, 20, unit * c, unit * r, `stopMazeTrail`));
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

}

// Function to play low health audio
function lowHealthAudio() {
  if (!damageAlert.isPlaying()) {
    damageAlert.play();
  }
}

// Function to play intro music audio
function introAudio() {
  if (!introMusic.isPlaying() && state ===`title` && musicActive === true) {
    introMusic.play();
  }
}

// Function to play ending win music audio
function endingWinAudio() {
  if (!endWinMusic.isPlaying()) {
    endWinMusic.play();
  }
}

// Function to play levels music audio
function levelsAudioMusic() {
  if (!levelsMusic.isPlaying() && state ===`animation` && musicActive === true) {
    levelsMusic.play();
  }
}


// Display fog around player when it is active
function displayFog(player) {
  if (fogActive === true) {
    imageMode(CENTER);
    image(
      fog,
      player.x + player.width / fogImg.x,
      player.y + player.height / fogImg.y,
      width * 2,
      height * 2
    );
  }
}



// You found the end of the script. Congratulations!
