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
  size: 100,
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
  x: 250,
  y: 250,
  size: 100,
  fill: 255,
};

let covdImg;


/**
Used preload to load image
*/
function preload() {

covdImg = loadImage('assets/images/covid_img.png');

}



/**
This is a basic Canvas
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  covid19.y = random(0, height);
  covid19.vx = covid19.speed;

  noCursor();
}

/**
Description of draw()
*/
function draw() {
  background(0);

  // Display static
  // this is a classic counting for loop
  // i starts at 0, it then is told it can't
  // be larger than 1000
  // it then is told to increase by 1 increment consistently
  // using the i++ code.

  for (let i = 0; i < 2000; i++) {
    //Set static to 2000 so it is more visible
    let x = random(0, width);
    let y = random(0, width);
    stroke(255);
    point(x, y);
  }


  // covid19 movement
  covid19.x = covid19.x + covid19.vx;
  covid19.x = covid19.x + covid19.vy;

  if (covid19.x > width) {
    covid19.x = 0;
    covid19.y = random(0, height);
  }

  // user movement
  user.x = mouseX;
  user.y = mouseY;

  // Display user
  fill(user.fill);
  ellipse(user.x, user.y, user.size);

  // Top-left corner of the img is at (0, 0)
  // Width and height are the img's original width and height
  // Image obtained from Coronavirus Disease 2019 (COVID-19) | Disease or
  // Condition of the Week | CDC
  // https://www.cdc.gov/dotw/covid-19/index.html

  // Displaying covid19 as an image
  image(covdImg,covid19.x,covid19.y,30,30);

  // Display covid19
  fill(covid19.fill.r, covid19.fill.g, covid19.fill.b);
  ellipse(covid19.x, covid19.y, covid19.size);





  // Using dist function to check for catching covid19
  let dst = dist(user.x, user.y, covid19.x, covid19.y);
  if (dst < covid19.size / 2 + user.size / 2) {
    noLoop();
  }
}
