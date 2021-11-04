/**
Object Oriented Programming Activity
Azmat Ishaq

Juggling Simulation
*/

"use strict";

let gravityforce = 0.0025;
let numBalls = 5;
let paddle;
let aiPaddle;
let balls = [];
let time;
let scoreKeeper = 0;
// A timer to count the number of frames in the game state (Pippins code)
let gameOverTimer = 0;
// A variable to store how long our game is (in frames) (Pippins code)
let gameLength = 60 * 10; // 10 seconds


let progBar = {
  width: 0,
  height: 20,
  x:100,
  y: 40,
  fill: 255,
};

// Title State to start the simulation

let state = `title`;

/**
Description of preload
*/
function preload() {

}

/**
The setup function contains the code in order to introduce the Paddle, AiPaddle, and balls to the game
*/

function setup() {
   createCanvas(windowWidth, windowHeight / 1.2);

// Generating new in game objects

   paddle = new Paddle(200, 20);

   aiPaddle = new AiPaddle(150, 20);

   ballSetup();

}

/**
The draw function contains the background colour as well as the states for the game
*/
function draw() {
    background(0);

  // Title state

    if (state === `title`) {
      title();
      scoreKeeper = 0;
    }

    // Animation State

    if (state === `animation`) {
      animation();
       setTimeout(gameOverTimer, gameLength);

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




function endingLose() {

  //Ending
  push();
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(`GAME OVER`, width / 2, height / 2);
  text(`Press Any Key to Continue`, width / 2, height / 1.5);
  pop();
}

function gameReset() {
  state = `title`;
  gameOverTimer = 0;
  scoreKeeper = 0;
  balls = [];
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
  text(`Welcome to Paddle Ball!`, width / 2, height / 2.7);
  text(`Use the mouse to move`, width / 2, height / 2.4);
  text(`Press Any Key to Start`, width / 2, height / 1.5);
  text(`Return any ball 60 times to win!`, width / 2, height / 2.1);
  text(`If you run out of balls, mouse click to make more!`, width / 2, height / 1.9);
  pop();
}

function animation() {

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

// Progress outline and text

push();
fill(255);
textAlign(CENTER, CENTER);
textSize(25);
text(`Returns`, 50, 12);
pop();

// Progress Bar Outline

push();
stroke(255);
noFill();
rectMode(CENTER);
rect(53, 50, 60, 40);
pop();

push();
fill(255);
textSize(44)
text(scoreKeeper, 30, 65);
textAlign(CENTER, CENTER)
pop();

// Game over Timer

push();
fill(255);
textSize(44)
text(gameOverTimer, 200, 65);
textAlign(CENTER, CENTER)
pop();

  // Code for the animation state of the game

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

  if (mouseIsPressed)  {

    // Spawning balls

    for(let i = 0; i < numBalls; i++) {
      let x = random(0,width);
      let y = random(-400, -100);
      let ball = new Ball(x,y);
      balls.push(ball);
      console.log(i);
    }
  }

  // If statement so that when a player reaches 60 returned balls the
  // state switches to the winning animation text.

}


function ballSetup() {
  // Balls setup

     for(let i = 0; i < numBalls; i++) {
       let x = random(0,width);
       let y = random(-400, -100);
       let ball = new Ball(x,y);
       balls.push(ball);

        console.log(i);
     }

}
