/**
I like to move it
Azmat Ishaq

Shapes associated to variables moving around on a canvas.
*/

"use strict";


let bg = {

  red: 0,
  green: 0,
  blue: 0

};

let circle1 = {

  x: 0,
  y: 250,
  size: 100,
  growthRate: 4,
  speed: 1,
  fill: 255,
  alpha: 200

};

let circle2 = {

  x: 500,
  y: 250,
  size: 50,
  sizeRatio: 0.5,
  speed: -1,
  fill: 255,
  alpha: 200


};



let triangle1 = {

  x1: 20,
  y1: 30,
  x2: 30,
  y2: 40,
  x3: 250,
  y3: 250,
  growthRate: 0



};



let clockRectangle1 = {

  x: 250,
  y: 0,
  width: 10,
  height: 40,
  size: 10,
  growthRate: 4,
  speed: 1,
  fill: 255,
  alpha: 200



};



/**
Description of preload
*/
function preload() {


}


/**
Description of setup
*/
function setup() {
  createCanvas(500,500);
  noStroke();



}


/**
Description of draw()
*/
function draw() {

// Background

    background(bg.red,bg.green,bg.blue);
    bg.red = map(circle1.size,100,width,0,255);

circle1.size =  circle1.size + 0.25;

// Circle 1

    circle1.x = circle1.x + circle1.speed; //getting circle1 to move
    circle1.x = constrain(circle1.x,0,width/2); //constrain the circle
    circle1.size =  circle1.size + circle1.growthRate;
    circle1.size = constrain(circle1.size, 0, width);
    fill(circle1.fill,circle1.alpha);
    ellipse(circle1.x,circle1.y,circle1.size,circle1.size);

// Circle 2
    circle2.x = circle2.x + circle2.speed; //getting circle2 to move
    circle2.x = constrain(circle2.x,width/2,width); //constrain the circle
    circle2.size = circle1.size * circle2.sizeRatio;
    fill(circle2.fill,circle2.alpha);
    ellipse(circle2.x,circle2.y,circle2.size,circle2.size);

// Triangle 1

    triangle1.x1 = triangle1.x1 + triangle1.growthRate;
    triangle(triangle1.x1, triangle1.y1, triangle1.x2, triangle1.y2, triangle1.x3, triangle1.y3);


// Rectangle 1S

//    rect(clockRectangle1.x,clockRectangle1.y,clockRectangle1.width,clockRectangle1.height);


// Testing rotate function

  translate(width / 2, height / 2);
  rotate(PI /3.0 + 4);
  rect(-26, -26, 52, 52);


}
