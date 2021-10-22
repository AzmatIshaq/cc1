/**
Project 1
Azmat Ishaq


This is a Javascript game made for the CART253 Class at Concordia University.
This is a game where you can play as Gabe Newell. The objective is to avoid the
Half Life 3 projectiles from convincing you to make Half Life 3.

Just dodge, what comes at you. Make sure your CONVINCE BAR doesn't fill to the
max!

If it does, Gabe will have to make Half Life 3 and you will lose the game.

Use the arrow keys to move your character.

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
  width: 40,
  height: 40,
  fill: 0,
};

let circleH3 = {
  x: squareFan.x,
  y: squareFan.y,
  fill: 0,
  size: 80,
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
  speed: 0.08,

};

// Image variables

let gabenImg = undefined;
let h3IconImg = undefined;
let gabenWinImg = undefined;

// Title State

let state = `title`;

/**
Preload contains images and sound.
*/
function preload() {
  h3IconImg = loadImage(`assets/images/2_new_HL3_logo.png`);
  gabenImg = loadImage(`assets/images/gaben_pixelated2.png`);
  gabenWinImg = loadImage(`assets/images/510px-Gabe_Newell_-_2002.jpg`);
}

/**
Setup is a basic canvas with text formatting
*/
function setup() {
  createCanvas(500, 500);
}

/**
Draw contains how the variables look, animate, and interact.
*/

function draw() {
  background(0);

  movement();

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

function animation() {

  // Fan rectangle

  push();
  rectMode(CENTER);
  fill(squareFan.fill);
  rect(squareFan.x, squareFan.y, squareFan.width, squareFan.height);
  pop();

  // Gaben's ellipse

  push();
  stroke(0, 255, 238);
  strokeWeight(2);
  ellipseMode(CENTER);
  ellipse(circleGaben.x, circleGaben.y, circleGaben.size);
  pop();

  // Add Gaben image to ellipse

  imageMode(CENTER);
  image(gabenImg, circleGaben.x, circleGaben.y, width / 5, height / 5);

  // Constrain Gaben and easter egg
  // If your Convince amount is above

  if (health.width < 120) {
    circleGaben.x = constrain(circleGaben.x, circleGaben.size / 2, width - circleGaben.size / 2)
  } else if (health.width > 120) {
    circleGaben.x = constrain(circleGaben.x, circleGaben.size / 2, width * 1.1)
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
  image(h3IconImg, circleH3.x, circleH3.y, 80, 80);

  // Resetting the h3 projectile

  if (circleH3.y > 499) {
    circleH3.y = squareFan.y;
    circleH3.x = squareFan.x;
  }

  // Half life 3 logo starting position

  imageMode(CENTER);
  image(h3IconImg, squareFan.x, squareFan.y, 50, 50);

  // Light show
  push();
  for (let i = 0; i < 2; i++) {
    let x1 = random(squareFan.x, squareFan.x);
    let y1 = random(squareFan.y, squareFan.y);
    let x2 = random(0, 500);
    let y2 = random(0, 500);
    stroke(255, 0, 0);
    line(x1, y1, x2, y2);
  }
  pop();

  // Timer

  // Timer outline and text

  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  text(`Timer`, 100, 12);
  pop();

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

  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Convince Meter', 400, 12);
  pop();

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
  if (state === `animation`) {
    circleH3.y = circleH3.y + circleH3.speed;
    if (random() < 1) {
      circleH3.x = circleH3.x + random(-20, 20);
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
    timer.width = timer.width + timer.speed;

  }
}

function title() {
  // Opening text and instructions
  push();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(`Half Life 3 vs GABEN`, width / 2, height / 4);
  pop();

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

  push();
  fill(255);
  stroke(255);
  strokeWeight(2);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(`CONGRATULATIONS YOU WIN!`, width / 2, height / 10);
  pop();

  imageMode(CENTER);
  image(gabenWinImg, width / 2, height / 2, width / 1.5, height / 1.5);

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
  health.width = 0;
  timer.width = 0;
  circleH3.x = squareFan.x;
  circleH3.y = squareFan.y;

}

function gameTime() {

}
