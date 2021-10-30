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
}
