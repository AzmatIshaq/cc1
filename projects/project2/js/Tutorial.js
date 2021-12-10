// Tutorial Class

class Tutorial {
  constructor() {
    this.name = "tutorial";
    this.currentName = "name";
    this.levelName = 0;
    this.tutorialTime = 5;
    // Values to adjust pickup position in relation to on screen tutorial
    this.pickupPositionX = width / 4.1;
    this.pickupPositionY = height / 1.09;
    this.pickupWidth = 40;
    this.pickupHeight = 40;
    // Values to position tutorial text
    this.tutorialTextX = width / 2
    this.tutorialTextY = height / 1.07
    this.tutorialTextX2 = width / 2
    this.tutorialTextY2 = height / 1.03
    // Values to position current level text
    this.currentLevelTextX = width / 5;
    this.currentLevelTextY = height / 1.04
  }

  setName(currentCellName){
  this.currentName = currentCellName;
}

  display() {

    // Display which level next to player health bar

      push();
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(`Level ${currentLevel + 1}`,this.currentLevelTextX, this.currentLevelTextY);
      pop();


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
    } else if (this.currentName === `mazeTrail`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Maze Trail!`, this.tutorialTextX, this.tutorialTextY);
      text(`A trail of Maze Walls will now follow you!`, this.tutorialTextX2, this.tutorialTextY2);

      imageMode(CORNER);
      image(
        pickupMazeTrail,
        this.pickupPositionX,
        this.pickupPositionY,
        this.pickupWidth,
        this.pickupHeight
      );
      pop();
    } else if (this.currentName === `stopMazeTrail`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`You deactivated Maze Trail!`, this.tutorialTextX, this.tutorialTextY);


      imageMode(CORNER);
      image(
        pickupMazeTrail,
        this.pickupPositionX,
        this.pickupPositionY,
        this.pickupWidth,
        this.pickupHeight
      );
      pop();
    }

  } // End of display function
} // End of Tutorial class
