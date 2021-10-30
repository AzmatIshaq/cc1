/**
Object Oriented Programming Activity
Azmat Ishaq

Juggling Simulation
*/

"use strict";

let gravityforce = 0.0025;
let numBalls = 20;
let paddle;
let balls = [];


// Title State

let state = `title`;

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/

function setup() {
   createCanvas(windowWidth, windowHeight / 1.2);
   paddle = new Paddle(200, 20);

   for(let i = 0; i < numBalls; i++) {
     let x = random(0,width);
     let y = random(-400, -100);
     let ball = new Ball(x,y);
     balls.push(ball)
   }


}

/**
Description of draw()
*/
function draw() {
    background(0);

    paddle.move();
    paddle.display();

    for (let i = 0; i < balls.length; i++) {
      let ball = balls[i];
      if (ball.active){
      ball.gravity(gravityforce);
      ball.move();
      ball.bounce(paddle);
      ball.display();
    }
  }

  // Title state

    if (state === `title`) {
      // title();
    }

    // Animation State

    if (state === `animation`) {
      // animation();

    }

    // Win state

    if (state === `endingWin`) {
      // endingWin();
    }

    // Lose state

    if (state === `endingLose`) {

      // endingLose();
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
