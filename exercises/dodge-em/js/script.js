/**
CART253 - Exercise: dodge-em
Azmat Ishaq

This is an education project to practice the use of functions and variables
in Javascript.
*/

"use strict";

let covid19 = {
  x: 0,
  y: 250,
  size: 155,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: {
    r: 255,
    g: 0,
    b: 0,
  },
};

let user = {
  x: 500,
  y: 250,
  size: 50,
  vx: 0,
  vy: 0,
  fill: {
    r: 255,
    g: 255,
    b: 255,
  },
  segmentSize: 50,
};

let covdImg;
let gameoverImg;

/**
Used preload to load images of covid and gameover
*/

function preload() {
  covdImg = loadImage("assets/images/covid_img.png");
  gameoverImg = loadImage("assets/images/gameover_img.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  covid19.y = random(0, height);
  covid19.vx = covid19.speed;
}

function draw() {
  background(0);

  // Display static
  // this is a classic counting for loop
  // i starts at 0, it then is told it can't
  // be larger than 1000
  // it then is told to increase by 1 increment consistently
  // using the i++ code.

  for (let i = 0; i < 1000; i++) {
    let x = random(0, width);
    let y = random(0, width);
    stroke(255);
    point(x, y);
  }

  // Strobe light show with lines
  // random function used to randomize x,y location of lines

  for (let i = 0; i < 1; i++) {
    let x1 = random(0, width);
    let y1 = random(0, width);
    let x2 = random(0, width);
    let y2 = random(0, width);
    stroke(0, 255, 0);
    line(x1, y1, x2, y2);
  }

  // covid19 following player movement

  // This an exact copy of Pippins code from the movements tutorial
  // I just replaced circle with covid.19

  // If the mouse x position is GREATER than the covid19 x position, it must be to the RIGHT of the covid19
  if (mouseX > covid19.x) {
    // So set the covid19's x velocity to a POSITIVE number to move it to the RIGHT
    covid19.vx = 2;
  }
  // Or if the mouse x position is LESS than the covid19 x position, it must be to the LEFT of the covid19
  else if (mouseX < covid19.x) {
    // So set the covid19's x velocity to a NEGATIVE number to move it to the LEFT
    covid19.vx = -2;
  }

  // If the mouse position is GREATER than the covid19 y position, it must be BELOW the covid19
  if (mouseY > covid19.y) {
    // So set the covid19's x velocity to a POSITIVE number to move it DOWN
    covid19.vy = 2;
  }
  // Or if the mouse y position is LESS than the covid19 y position, it must be ABOVE the covid19
  else if (mouseY < covid19.y) {
    // So set the covid19's x velocity to a NEGATIVE number to move it UP
    covid19.vy = -2;
  }

  // Then we actually APPLY these changes to `vx` and `vy` to the covid19's position
  covid19.x = covid19.x + covid19.vx;
  covid19.y = covid19.y + covid19.vy;

  // Display user

  noStroke();
  fill(user.fill.r, user.fill.g, user.fill.b);
  ellipse(user.x, user.y, user.size);

  // Experimented with use of segments and "for" statement. This adds two ellipses
  // underneath the user ellipse.

  let y = user.y;
  let numSegment = 3;

  for (let i = 0; i < numSegment; i++) {
    ellipse(user.x, y, user.segmentSize);
    y = y + 25;
  }

  // Display covid19

  fill(covid19.fill.r, covid19.fill.g, covid19.fill.b);
  ellipse(covid19.x, covid19.y, covid19.size);

  // Displaying covid19 as an image
  // Image obtained from Coronavirus Disease 2019 (COVID-19) | Disease or
  // Condition of the Week | CDC
  // https://www.cdc.gov/dotw/covid-19/index.html

  imageMode(CENTER);
  image(covdImg, covid19.x, covid19.y, 200, 200);

  // Using dist function to check for catching covid19

  let dst = dist(user.x, user.y, covid19.x, covid19.y);
  if (dst < covid19.size / 2 + user.size / 2) {
    noLoop();
    image(gameoverImg, 250, 250, 200, 200); // game over image appears on contact
  }

  // Covid grows and shrinks in size based on player movement
  if (user.x > 250) {
    covid19.size = covid19.size + 2;
  }

  if (user.y > 250) {
    covid19.size = covid19.size - 2;
  }

  // User changes colour based on distance to covid19

  if (dst > covid19.size / 1) {
    user.fill.r = 65;
    user.fill.g = 105;
    user.fill.b = 225;
  } else if (dst < covid19.size / 1) {
    user.fill.r = 255;
    user.fill.g = 255;
    user.fill.b = 255;
  }
}

// User movement
function mousePressed() {
  // When the mouse button is pressed, move the circle to the mouse position
  user.x = mouseX;
  user.y = mouseY;
}
