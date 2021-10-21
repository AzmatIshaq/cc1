/**
Project 1
Azmat Ishaq


This is a Javascript game made for the CART253 Class at Concordia University.
This is a game where you can play as Gabe Newell or a Half Life fan. The objective, if you are Gabe, is to avoid the fans from convincing you to make Half Life 3. Just dodge, what they throw at you. Make sure your CONVINCE BAR doesn't fill to the max! If it does, Gabe will have to make Half Life 3 and you will lose the game.

If you are a fan, your objective is to fill the CONVINCE BAR to the max in order to persuade.

Use the arrow keys to move your character. Use the space bar to launch objects if you are a fan.
*/

"use strict";

let circleGaben = {
  x: 250,
  y: 450,
  size: 100,
};

let squareFan = {
  x: 250,
  y: 25,

};

let circleH3 = {
  x: squareFan.x,
  y: squareFan.y,
  size: 40,
};


let health = {
  width: 0,
  y: 0,
  size: 10,
  fill: 255,
}


// Image variables

let gabbenImg = undefined;
let h3IconImg = undefined;

// Sound variables

let barkSFX = undefined;

// Title State

let state = `title`;



/**
Description of preload
*/
function preload() {
  h3IconImg = loadImage(`assets/images/half_life_logo_pixelated.png`);
  gabbenImg = loadImage(`assets/images/gaben_pixelated2.png`);

  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

/**
Description of setup
*/
function setup() {
  createCanvas(500, 500);

  // Formatting for state text
  textSize(32);
  textAlign(CENTER, CENTER);

}

function keyPressed() {
  if (state === `title`) {
    state = `animation`;
  }
}

/**
Description of draw()
*/
function draw() {
  background(0);

// States code

if (state === `title`) {

  // Title text
  fill(255);
  text(`Half Life 3 vs GABEN`,width/2,height/2);

  push();

  textSize(16);
  textAlign(CENTER,CENTER);
  fill(255);
  text(`Press Any Key to Start`,width/2,height/1.5);

  pop();
}

else if (state === `animation`) {

    // Basic starting objects

    // Gaben's ellipse for distance detection
    push();

    stroke(0, 255, 238);
    ellipseMode(CENTER);
    ellipse(circleGaben.x, circleGaben.y, circleGaben.size);

    pop();

    rect(squareFan.x, squareFan.y, 40, 40);


    push();
    ellipseMode(CENTER);
    fill(0);
    stroke(243, 0, 43);
    ellipse(circleH3.x, circleH3.y, circleH3.size);
    pop();


    // Light show to add ambiance
    push();
    for (let i = 0; i < 1; i++) {
      let x1 = random(0, width);
      let y1 = random(0, width);
      let x2 = random(0, width);
      let y2 = random(0, width);
      stroke(0, 255, 0);
      line(x1, y1, x2, y2);
    }

    pop();

    // Movement for objects

    if (state === `animation`) {
      circleH3.y = circleH3.y + 3;
      circleH3.x = circleH3.x + random(-10, 10);
    }

    if (circleH3.y === 499) {
      circleH3.y = squareFan.y;
      circleH3.x = squareFan.x;
    }

    if (keyIsDown(LEFT_ARROW)) {
      circleGaben.x = circleGaben.x - 2;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      circleGaben.x = circleGaben.x + 2;
    }

    // Adding images to the objects

    imageMode(CENTER);
    image(gabbenImg, circleGaben.x, circleGaben.y, 100, 100);

    imageMode(CENTER);
    image(h3IconImg, circleH3.x, circleH3.y, 50, 50);



    // Convince meter outline and text

    textSize(12);
    text('Convince Meter', 400, 30);

    push();
    stroke(255);
    fill(0);
    rectMode(CENTER);
    rect(400, 55, 140, 20);
    pop();

    // Convince meter heatlh bar
    push();
    noStroke();
    fill(255, 161, 0);
    rectMode(CENTER);
    rect(400, 55, health.width, 19);
    pop();


    // Distance between Gaben and half life logo
    // If the objects touch then health bar
    // decreases.

    let d = dist(circleH3.x, circleH3.y, circleGaben.x, circleGaben.y);
    if (d < circleGaben.size/2 + circleH3.size/2) {
      health.width = health.width + 1

    }

    if (health.width === 139) {
        state = `ending`

    }

  }





if (state === `ending`) {
  //Ending
  fill(255);
  text(`GAME OVER`,width/2,height/2);

  }


// This function states that if the ENTER
// key is pressed, then the title state should
// go to the animation state.




}

function title() {


}

function animation() {


}

function ending () {


}
