/**
Object Oriented Programming Exercise (With some great help from Mads)
by Azmat Ishaq

Juggling Simulation
*/

"use strict";

// gravityforce is used to make the balls go downwards.
let gravityforce = 0.0025;
// numballs set the limit of how many balls can be generated.
let numBalls = 5;
// paddle is to generate the bottom blue paddle.
let paddle;
// aiPaddle is to generate the top white AI paddle.
let aiPaddle;
// This is the balls array
let balls = [];
// This is the scoreKeeper variable that we see at the top left of the canvas
let scoreKeeper = 0;
// A timer to count the number of frames in the game state (Pippins code)
let gameOverTimer = 0;
// A variable to store how long our game is (in frames) (Pippins code)
let gameLength = 60 * 30; // 30 seconds

// This is a variable to create a visual outline for the number progress of balls the player hit.

let progBar = {
  width: 0,
  height: 20,
  x: 100,
  y: 40,
  fill: 255,
};

// Title State to start the simulation

let state = `title`;

// A basic canvas for the simulation

function setup() {
  createCanvas(windowWidth, windowHeight / 1.2);

  // Generating new in game objects

  paddle = new Paddle(200, 20);

  aiPaddle = new AiPaddle(150, 20);

  // A function which creates balls using a for loop

  ballSetup();
}

/**

The draw function sets the background as well as the function states

*/
function draw() {
  background(0);

  // Title state

  if (state === `title`) {
    title();
  }

  // Animation State

  if (state === `animation`) {
    animation();
  }

  // Win state

  if (state === `endingWin`) {
    endingWin();
  }

  // Lose state

  if (state === `endingLose`) {
    endingLose();
  }
}

// Function to allow user to switch from Title to Animation

function keyPressed() {
  if (state === `title`) {
    state = `animation`;
  }

  if (state === `endingWin`) {
    gameReset();
  }

  if (state === `endingLose`) {
    gameReset();
  }
}

// States function

function title() {
  // Opening text and instructions
  push();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(`Paddle Ball!`, width / 2, height / 4);
  pop();

  push();
  textSize(16);
  textAlign(CENTER, CENTER);
  fill(255);
  text(`Welcome to Paddle Ball!`, width / 2, height / 2.9);
  text(`Click the Mouse to create balls!`, width / 2, height / 2.6);
  text(`Use the mouse to Move`, width / 2, height / 2.3);
  text(`Press Any Key to Start`, width / 2, height / 1.5);
  text(`Return any ball 60 times to win!`, width / 2, height / 2.1);
  text(
    `If you run out of balls, Mouse Click to make more!`,
    width / 2,
    height / 1.9
  );
  text(`You have 30 seconds before it's GAME OVER`, width / 2, height / 1.7);
  pop();
}

// Function to simulate the ending screen if a player wins

function endingWin() {
  push();
  fill(255);
  stroke(255);
  strokeWeight(2);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(`CONGRATULATIONS YOU WIN!`, width / 2, height / 10);
  pop();

  push();
  fill(255);
  noStroke();
  strokeWeight(2);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(`Press Any Key to Continue`, width / 2, height / 2);
  pop();
}

// Function to simulation the ending screen if a player loses.

function endingLose() {
  push();
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(`GAME OVER`, width / 2, height / 2);
  text(`Press Any Key to Continue`, width / 2, height / 1.5);
  pop();
}

// A function to reset the parts of the simulation for it to work when it is restarted

function gameReset() {
  state = `title`;
  gameOverTimer = 0;
  scoreKeeper = 0;
  balls = [];
}

// A function to simulate the animation and movement that happens on screen.

function animation() {
  // An if statement to go to winning end state when returned balls is 60

  if (scoreKeeper >= 60) {
    state = `endingWin`;
  }

  // Increase the timer's count by one frame (Pippin's code)
  gameOverTimer++;
  //  Check if we have reached the end of our timer (Pippin's code)
  if (gameOverTimer >= gameLength) {
    // The game is over! So we should check the win/lose state (Pippin's code)
    state = `endingLose`;
  }

  // Progress text

  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(25);
  text(`Returns`, 50, 12);
  pop();

  // Progress Outline

  push();
  stroke(255);
  noFill();
  rectMode(CENTER);
  rect(53, 50, 60, 40);
  pop();

  // To display the play score

  push();
  fill(255);
  textSize(44);
  text(scoreKeeper, 30, 65);
  textAlign(CENTER, CENTER);
  pop();

  // To display a timer

  push();
  fill(255);
  textSize(44);
  text(gameOverTimer, width - 120, 50);
  textAlign(CENTER, CENTER);
  pop();

  // Paddle animation and movement
  paddle.move();
  paddle.display();

  // AiPaddle animation and movement
  aiPaddle.move();
  aiPaddle.display();

  // Balls animation and movement
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.active) {
      ball.gravity(gravityforce);
      ball.move();
      ball.bounce(paddle);
      ball.bounceAi(aiPaddle);
      ball.display();
    }
  }

  // User can animate more balls with mousepress

  if (mouseIsPressed) {
    // Spawning balls

    for (let i = 0; i < numBalls; i++) {
      let x = random(0, width);
      let y = random(-400, -100);
      let ball = new Ball(x, y);
      balls.push(ball);
      console.log(i);
    }
  }
}

// Function to make generating balls more simple

function ballSetup() {
  for (let i = 0; i < numBalls; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let ball = new Ball(x, y);
    balls.push(ball);

    console.log(i);
  }
}
