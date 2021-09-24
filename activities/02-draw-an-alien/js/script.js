/**
Alien Drawing
Azmat Ishaq

Alien drawn made in Javascript.

*/

"use strict";


/**
Description of preload
*/
function preload() {


}


/**
Canvas and Background
*/
function setup() {
  createCanvas(640, 480);
  background(255,192,203);

// Body of alien

  noStroke();
  fill(200);
  ellipse(320, 480, 100, 300);

// Head of alien

  noStroke();
  fill(200);
  ellipse(320, 250, 100, 180);

// Eyes of alien

  fill(0,0,0);
  ellipse(300, 230, 20, 10);
  ellipse(340, 230, 20, 10);

// Nostrils of Alien

  ellipse(315, 240, 5, 5);
  ellipse(325, 240, 5, 5);

// Mouth of alien

  stroke(200, 0, 0);
  strokeWeight(5);
  rectMode(CENTER);
  rect(320,280,20,10);





}


/**
Description of draw()
*/
function draw() {

}
