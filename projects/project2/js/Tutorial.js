// Tutorial Class

class Tutorial {
  constructor() {
    this.width = 99;
    this.height = 19;
    this.outlineWidth = 2;
    this.outlineHeight = 2;
    this.x = 0;
    this.y = 0;
    this.outlineX = 1;
    this.outlineY = 1;
    this.name = "tutorial";
    this.currentName = "name";
    this.levelName = 0;
    this.tutorialTime = 5;
    // Values to adjust pickup position in relation to on screen tutorial
    this.pickupPositionX = width / 4.1;
    this.pickupPositionY = height / 1.09;
    this.pickupWidth = 40;
    this.pickupHeight = 40;
    this.tutorialTextX = width / 2
    this.tutorialTextY = height / 1.07
    this.tutorialTextX2 = width / 2
    this.tutorialTextY2 = height / 1.03
    this.currentLevelTextX = width / 5;
    this.currentLevelTextY = height / 1.04
  }

  setName(currentCellName){
  this.currentName = currentCellName;
}

  display() {

    // Display which level next to player health bar
    if (currentLevel === 0) {
      push();
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(`Level 1`,this.currentLevelTextX, this.currentLevelTextY);
      pop();
    } else if (currentLevel === 1) {
      push();
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(`Level 2`, this.currentLevelTextX, this.currentLevelTextY);
      pop();
    } else if (currentLevel === 2) {
      push();
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(`Level 3`, this.currentLevelTextX, this.currentLevelTextY);
      pop();
    } else if (currentLevel === 3) {
      push();
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(`Level 4`, this.currentLevelTextX, this.currentLevelTextY);
      pop();
    }

    // Tutorial information on how to play the game

    if (this.currentName === `pathCell` || this.currentName === `changedCell`) {
     push();
     fill(255);
     textSize(16);
     textAlign(CENTER, CENTER);
     text(`Collect items and enter the green exit door!`, this.tutorialTextX, this.tutorialTextY);
     text(`You can eat through the walls but you take damage`, this.tutorialTextX2, this.tutorialTextY2);
     pop();
} else if (this.currentName === `fog`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Fog of War!`, this.tutorialTextX, this.tutorialTextY);
      text(`You toggled Fog of War!`, this.tutorialTextX2, this.tutorialTextY2);
      imageMode(CORNER);
      image(
        pickupFog,
        this.pickupPositionX,
        this.pickupPositionY,
        this.pickupWidth,
        this.pickupHeight
      );
      pop();

    } else if (this.currentName === `startRadiation`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Radiation!`, this.tutorialTextX, this.tutorialTextY);
      text(`You activated Radiation!`, this.tutorialTextX2, this.tutorialTextY2);

      imageMode(CORNER);
      image(
        pickupRadiation,
        this.pickupPositionX,
        this.pickupPositionY,
        this.pickupWidth,
        this.pickupHeight
      );
      pop();
    } else if (this.currentName === `stopRadiation`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Radiation!`, this.tutorialTextX, this.tutorialTextY);
      text(`You deactivated Radiation!`, this.tutorialTextX2, this.tutorialTextY2);

    // if (radiationIsActive === true) {
    //   push();
    //   fill(255);
    //   textSize(16);
    //   textAlign(CENTER, CENTER);
    //   text(`Radiation!`, width / 2, height / 1.07);
    //   text(`You deactivated Radiation!`, width / 2, height / 1.03);
    // } else {
    //   fill(255);
    //   textSize(16);
    //   textAlign(CENTER, CENTER);
    //   text(`Radiation is already disabled!!`, width / 2, height / 1.07);
    //   // text(`Radiation is Already disabled!`, width / 2, height / 1.03);
    // }
      imageMode(CORNER);
      image(
        pickupRadiation,
        this.pickupPositionX,
        this.pickupPositionY,
        this.pickupWidth,
        this.pickupHeight
      );
      pop();
    } else if (this.currentName === `spin`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Spin!`, this.tutorialTextX, this.tutorialTextY);
      text(`You activated Spin!`, this.tutorialTextX2, this.tutorialTextY2);

      imageMode(CORNER);
      image(
        pickupSpin,
        this.pickupPositionX,
        this.pickupPositionY,
        this.pickupWidth,
        this.pickupHeight
      );
      pop();
    } else if (this.currentName === `stopSpin`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Spin!`, this.tutorialTextX, this.tutorialTextY);
      text(`You dectivated Spin!`, this.tutorialTextX2, this.tutorialTextY2);

      imageMode(CORNER);
      image(
        pickupSpin,
        this.pickupPositionX,
        this.pickupPositionY,
        this.pickupWidth,
        this.pickupHeight
      );
      pop();
    } else if (this.currentName === `wackyKeys`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Wacky Keys!`, this.tutorialTextX, this.tutorialTextY);
      text(`You toggled Key Inversion`, this.tutorialTextX2, this.tutorialTextY2);

      imageMode(CORNER);
      image(
        pickupWacky,
        this.pickupPositionX,
        this.pickupPositionY,
        this.pickupWidth,
        this.pickupHeight
      );
      pop();
    }


    // This timer is based on p.5 code found here https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
    // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
 //    if (frameCount % 60 == 0 &&   this.tutorialTime > 0) {
 //      this.tutorialTime --;
 // }


  } // End of display function
} // End of Tutorial class
