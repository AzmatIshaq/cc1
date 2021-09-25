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

  x1: 0,
  y1: 250,
  x2: 250,
  y2: 0,
  x3: 500,
  y3: 250,

  growthRate: 1



};




let angle1 = 0;


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
  angleMode(DEGREES);
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


    triangle1.y2 = triangle1.y2 + triangle1.growthRate;
    triangle1.y2 = constrain(triangle1.y2, 0, 500)
    triangle(triangle1.x1, triangle1.y1, triangle1.x2, triangle1.y2, triangle1.x3, triangle1.y3);


// linke triangle 1 to mouse x and mouse y?



// Rectangle 1S

//    rect(clockRectangle1.x,clockRectangle1.y,clockRectangle1.width,clockRectangle1.height);


// Testing rotate function


 translate(250, 250);
 rotate(angle1);
 stroke(255);
 line(0,0, 50 , 50);
 fill (0,0,0);


 angle1 = angle1 + 1;


}
