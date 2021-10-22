/**
Project 1
Azmat Ishaq


This is a Javascript game made for the CART253 Class at Concordia University.
This is a game where you can play as Gabe Newell or a Half Life fan. The objective, if you are Gabe, is to avoid the fans from convincing you to make Half Life 3. Just dodge, what they throw at you. Make sure your CONVINCE BAR doesn't fill to the max! If it does, Gabe will have to make Half Life 3 and you will lose the game.

If you are a fan, your objective is to fill the CONVINCE BAR to the max in order to persuade.

Use the arrow keys to move your character. Use the space bar to launch objects if you are a fan.
*/

"use strict";

// Variables

let circleGaben = {
  x: 250,
  y: 450,
  size: 100,
  speed: 2,
};

let squareFan = {
  x: 250,
  y: 80,

};

let circleH3 = {
  x: squareFan.x,
  y: squareFan.y,
  size: 40,
  speed: 3,
};

let health = {
  width: 0,
  y: 0,
  size: 10,
  fill: 255,
};

let timer = {
  width: 0,
};

// Image variables

let gabenImg = undefined;
let h3IconImg = undefined;
let gabenWinImg = undefined;

// Sound variables

let barkSFX = undefined;

// Title State

let state = `title`;

/**
Preload contains images and sound.
*/
function preload() {
  h3IconImg = loadImage(`assets/images/half_life_logo_pixelated.png`);
  gabenImg = loadImage(`assets/images/gaben_pixelated2.png`);
  gabenWinImg = loadImage(`assets/images/510px-Gabe_Newell_-_2002.jpg`);
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

/**
Setup is a basic canvas with text formatting
*/
function setup() {
  createCanvas(500, 500);

  // Formatting for state text
  textSize(32);
  textAlign(CENTER, CENTER);
}

/**
Draw contains how the variables look, animate, and interact.
*/

function draw() {
  background(0);

  movement();

  gameTime();

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


  // Ending state

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

function animation() {


  // Fan rectangle

  push();
  rectMode(CENTER)
  rect(squareFan.x, squareFan.y, 40, 40);
  pop();



  // Gaben's ellipse

  push();
  stroke(0, 255, 238);
  strokeWeight(2);
  ellipseMode(CENTER);
  ellipse(circleGaben.x, circleGaben.y, circleGaben.size);
  // circleGaben.x = constrain(circleGaben.x, 0, width);
  pop();

  // Add Gaben image to ellipse

  imageMode(CENTER);
  image(gabenImg, circleGaben.x, circleGaben.y, 100, 100);

  // Constrain Gaben and easter egg

  if (health.width < 120) {
      circleGaben.x = constrain(circleGaben.x, circleGaben.size / 2, width - circleGaben.size / 2)
  }

  else if (health.width > 120) {
      circleGaben.x = constrain(circleGaben.x, 0, 548)
  }









  // Half Life 3 projectile ellipse
  push();
  fill(0);
  stroke(243, 0, 43);
  strokeWeight(2);
  ellipseMode(CENTER);
  ellipse(circleH3.x, circleH3.y, circleH3.size);
  pop();

  // Add Half Life 3 image to circleH projectile ellipse

  imageMode(CENTER);
  image(h3IconImg, circleH3.x, circleH3.y, 50, 50);

  // Resetting the h3 projectile

  if (circleH3.y > 499) {
    circleH3.y = squareFan.y;
    circleH3.x = squareFan.x;
  }


      // Light show to add ambiance

      push();
      for (let i = 0; i < 3; i++) {
        let x1 = random(0, width);
        let y1 = random(0, width);
        let x2 = random(0, width);
        let y2 = random(0, width);
        stroke(0, 255, 0);
        line(x1, y1, x2, y2);
      }
      pop();

      // Timer

      // Timer outline and text

      textSize(12);
      text(`Timer`, 100, 12);

      push();
      stroke(255);
      noFill();
      rectMode(CENTER);
      rect(100, 28, 140, 20);
      pop();

    // Timer bar

    push();
    noStroke();
    fill(0, 161, 63);
    rectMode();
    rect(30.5, 18.5, timer.width, 19);
    pop();


    if (timer.width > 139.5) {
          state = `endingWin`;
          }


    // Convince meter outline and text

    textSize(12);
    text('Convince Meter', 400, 12);

    push();
    stroke(255);
    noFill();
    rectMode(CENTER);
    rect(400, 28, 140, 20);
    pop();

    // Convince meter heatlh bar

    push();
    noStroke();
    fill(255, 161, 0);
    rectMode(CENTER);
    rect(400, 28, health.width, 19);
    pop();

    // If Convince meter fills, the game ends

    if (health.width > 139) {
      state = `endingLose`;
      }





}

function movement() {

  // Movement for h3 projectile

  circleH3.x = constrain(circleH3.x, 0, width);

//  for (let i = 0; i < 1; i++) {}
  if (state === `animation`) {
    circleH3.y = circleH3.y + circleH3.speed;
    if (random() < 1) {
    circleH3.x = circleH3.x + random(-10, 10);
    }
  }

  // Movement for GabeN

  if (keyIsDown(LEFT_ARROW)) {
    circleGaben.x = circleGaben.x - circleGaben.speed;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    circleGaben.x = circleGaben.x + circleGaben.speed;
  }


  // Convince bar increase based on distance to Gaben

  let d = dist(circleH3.x, circleH3.y, circleGaben.x, circleGaben.y);
  if (d < circleGaben.size / 2 + circleH3.size / 2) {
    health.width = health.width + 1;
  }

  // Movement for timer

  if (state === `animation`) {
    timer.width = timer.width + 0.05;

    }
}

function title() {
  // Opening text and instructions
  fill(255);
  text(`Half Life 3 vs GABEN`, width / 2, height / 4);

  push();
  textSize(16);
  textAlign(CENTER, CENTER);
  fill(255);
  text(`Play as Gabe Newell and avoid the Half Life 3 requests`, width / 2, height / 2.7);
  text(`Use the Left and Right Arrows Keys to move`, width / 2, height / 2.4);
  text(`Press Any Key to Start`, width / 2, height / 1.5);
  text(`Watch your Convince Meter`, width / 2, height / 2.1);
  text(`If it fills up, you lose the game!`, width / 2, height / 1.9);
  pop();
}

function endingWin() {

  fill(255);
  stroke(255);
  strokeWeight(2);

  textSize(16);
  textAlign(CENTER,CENTER);
  text(`CONGRATULATIONS YOU WIN!`, width / 2, height / 10);
  imageMode(CENTER);
  image(gabenWinImg, width / 2, height / 2, width / 1.5, height / 1.5);

}

function endingLose(){

  //Ending
  fill(255);
  textSize(16);
  textAlign(CENTER,CENTER)
  text(`GAME OVER`, width / 2, height / 2);
  text(`Press Any Key to Continue`, width / 2, height / 1.5);

}

function gameReset() {
  state = `title`
  health.width = 0
  timer.width = 0
  circleH3.x = squareFan.x
  circleH3.y = squareFan.y

}

function gameTime() {

}
