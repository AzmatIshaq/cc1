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
let ballTouchPaddle;
let timer = [];
let time;

// Title State to start the simulation

let state = `title`;

/**
Description of preload
*/
function preload() {

}

//  for loop to count how many times user returned a ball

      for (let i = 0; i < arr.length; i++) {

       console.log(i);
        // state = `endingWin`
      }

/**
Description of setup
*/

function setup() {
   createCanvas(windowWidth, windowHeight / 1.2);

   paddle = new Paddle(200, 20);

   aiPaddle = new AiPaddle(150, 20);

   for(let i = 0; i < numBalls; i++) {
     let x = random(0,width);
     let y = random(-400, -100);
     let ball = new Ball(x,y);
     balls.push(ball);

      console.log(i);
   }




}

/**
Description of draw()
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
      // endingWin();
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

  // if (state === `endingWin`) {
  //   gameReset();
  // }

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
  text(`Press Any Key to Continue`, width / 2, height / 7.5);
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
  text(`Use the mouse move`, width / 2, height / 2.4);
  text(`Press Any Key to Start`, width / 2, height / 1.5);
  text(`Return a ball 10 times to the AI Paddle to win!`, width / 2, height / 2.1);
  text(`If you run out of balls, mouse click to make more!`, width / 2, height / 1.9);
  pop();
}

function animation() {

// Timer starts


// for (let i = 0; i < 10000; i++) {
//   let time = timer[i];
//
// }

// let time = 7000
//
// if (time > millis()) {
//   state = `endingLose`;
// }
//
// // Use a for loop to go through each element in the circle's trail array in order
// for (let i = 0; i < time.trail.length; i++) {
//   // Get the element at the index indicated by i (0, then 1, then 2, etc.)
//   let element = circle.trail[i];
//   // Draw an ellipse the same size as the circle at that position
//   ellipse(element.x, element.y, circle.size);
// }



// console.log(millis())

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

    for(let i = 0; i < numBalls; i++) {
      let x = random(0,width);
      let y = random(-400, -100);
      let ball = new Ball(x,y);
      balls.push(ball);
      console.log(i);
    }
  }

  if (ballTouchPaddle >= 50) {
  state = `endingWin`;
}




}
