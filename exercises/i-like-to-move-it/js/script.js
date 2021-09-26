/**
I like to move it project.
Azmat Ishaq

Using functions, shapes, variables, and properties
in order to make things move around interestingly on a canvas.
*/

"use strict";

// Variable to change background colour

let bg = {
  red: 0,
  green: 0,
  blue: 0,
};

// Variable to alter properties for circle1

let circle1 = {
  x: 0,
  y: 250,
  size: 100,
  growthRate: 4,
  speed: 1,
  fill: 255,
  alpha: 200,
};

// Variable to alter properties for circle2

let circle2 = {
  x: 500,
  y: 250,
  size: 50,
  sizeRatio: 0.5,
  speed: -1,
  fill: 255,
  alpha: 200,
};

// Variable to alter properties for triangle1

let triangle1 = {
  x1: 0,
  y1: 250,
  x2: 250,
  y2: 0,
  x3: 500,
  y3: 250,
  fill: 0,
  growthRate: 1,
};

// Variable to set angle properties for line

let angle1 = 0;

// Variable to alter properties for rectangleTop

let rectangleTop = {
  x: 250,
  y: 0,
  width: 10,
  lengt: 30,
  growthRate: 4,
  speed: 1,
  fill: 255,
  alpha: 200,
  bStroke: 255,

  red: 0,
  green: 0,
  blue: 0,
};

// Variable to alter properties for rectangleBot

let rectangleBot = {
  x: 250,
  y: 0,
  width: 10,
  lengt: 30,
  growthRate: 4,
  speed: 1,
  fill: 255,
  alpha: 200,
  bStroke: 255,

  red: 0,
  green: 0,
  blue: 0,
};

// Variable to alter properties for rectangleLeft

let rectangleLeft = {
  x: 0,
  y: 250,
  width: 10,
  lengt: 30,
  growthRate: 4,
  speed: 1,
  fill: 255,
  alpha: 200,
  bStroke: 255,

  red: 0,
  green: 0,
  blue: 0,
};

// Variable to alter properties for rectangleRight

let rectangleRight = {
  x: 500,
  y: 250,
  width: 10,
  lengt: 30,
  growthRate: 4,
  speed: -1,
  fill: 255,
  alpha: 200,
  bStroke: 255,

  red: 0,
  green: 0,
  blue: 0,
};

// Variable for adjusting properties of the Mouse controlled rectangle

let mouseRect = {
  size: 10,
};

// Colour change for mouse movement

let mouseColor = {
  red: 255,
  green: 204,
  blue: 0,
};

/**
Description of preload
*/
function preload() {}

/**
Set anglemode to degrees in order to make line rotate
*/
function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  noStroke();
}

/**
Description of draw()
*/
function draw() {
  // Background
  background(bg.red, bg.green, bg.blue);
  bg.red = map(circle1.size, 100, width, 0, 255);

  // Circle 1
  noStroke();
  circle1.size = circle1.size + 0.25;
  circle1.x = circle1.x + circle1.speed; //getting circle1 to move
  circle1.x = constrain(circle1.x, 0, width / 2); //constrain the circle
  circle1.size = circle1.size + circle1.growthRate;
  circle1.size = constrain(circle1.size, 0, width);
  fill(circle1.fill, circle1.alpha);
  ellipse(circle1.x, circle1.y, circle1.size, circle1.size);

  // Circle 2
  noStroke();
  circle2.x = circle2.x + circle2.speed; //getting circle2 to move
  circle2.x = constrain(circle2.x, width / 2, width); //constrain the circle
  circle2.size = circle1.size * circle2.sizeRatio;
  fill(circle2.fill, circle2.alpha);
  ellipse(circle2.x, circle2.y, circle2.size, circle2.size);

  // Triangle 1
  noStroke();
  triangle1.fill = random(0, 255); //random colour fill for the triangle
  fill(triangle1.fill, 0, 0);
  triangle1.y2 = triangle1.y2 + triangle1.growthRate;
  triangle1.y2 = constrain(triangle1.y2, 0, 500); //constrain the triangle
  triangle(
    triangle1.x1,
    triangle1.y1,
    triangle1.x2,
    triangle1.y2,
    triangle1.x3,
    triangle1.y3
  );

  // Testing mouseX and mouseY, as well as random function, with a rectangle

  noStroke(255);
  mouseRect.size = random(10, 100);
  fill(mouseColor.red, mouseColor.green, mouseX);
  rectMode(CENTER);

  rect(mouseX, mouseY, mouseRect.size, mouseRect.size); // set rectangle to move with mouse and also to randomly change size

  // Rectangle at top
  rectangleTop.green = map(triangle1.y2, 100, width, 0, 255); //mapping the top rectangle fill colour to the movement of triangle1
  rectangleTop.y = rectangleTop.y + rectangleTop.speed;
  rectangleTop.y = constrain(rectangleTop.y, 0, 40); //constrain the rectangle
  stroke(0, 0, rectangleTop.bStroke);
  strokeWeight(5);
  fill(rectangleTop.red, rectangleTop.green, rectangleTop.blue);
  rectMode(CENTER);
  rect(rectangleTop.x, rectangleTop.y, 10, 30);

  // Rectangle at bottom
  rectangleBot.green = map(triangle1.y2, 100, width, 0, 255); //mapping the bottom rectangle fill colour to the movement of triangle1
  rectangleBot.y = rectangleBot.y + rectangleBot.speed; //getting rectangle to move
  rectangleBot.y = constrain(rectangleBot.y, 0, 450); //constrain the rectangle
  stroke(0, 0, rectangleBot.bStroke);
  strokeWeight(5);
  fill(rectangleBot.red, rectangleBot.green, rectangleBot.blue);
  rectMode(CENTER);
  rect(rectangleBot.x, rectangleBot.y, 10, 30);

  // Rectangle at left
  rectangleLeft.green = map(triangle1.y2, 100, width, 0, 255); //mapping the left rectangle fill colour to the movement of triangle1
  rectangleLeft.x = rectangleLeft.x + rectangleLeft.speed; //getting rectangle to move
  rectangleLeft.x = constrain(rectangleLeft.x, 0, 50); //constrain the rectangle
  stroke(0, 0, rectangleLeft.bStroke);
  strokeWeight(5);
  fill(rectangleLeft.red, rectangleLeft.green, rectangleLeft.blue);
  rectMode(CENTER);
  rect(rectangleLeft.x, rectangleLeft.y, 10, 30);

  // Rectangle at right
  rectangleRight.green = map(triangle1.y2, 100, width, 0, 255); //mapping the right rectangle fill colour to the movement of triangle1
  rectangleRight.x = rectangleRight.x + rectangleRight.speed; //getting rectangle to move
  rectangleRight.x = constrain(450, rectangleRight.x, 500); //constrain the rectangle
  stroke(0, 0, rectangleRight.bStroke);
  strokeWeight(5);
  fill(rectangleRight.red, rectangleRight.green, rectangleRight.blue);
  rectMode(CENTER);
  rect(rectangleRight.x, rectangleRight.y, 10, 30);

  // Line utilizing rotate function
  fill(0, 0, 0);
  translate(250, 250);
  rotate(angle1);
  stroke(255, 0, 0);
  line(0, 0, 50, 50);

  angle1 = angle1 + 1; // getting line to rotate continuously
}
