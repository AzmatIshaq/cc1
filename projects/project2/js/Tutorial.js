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
    // this.spinActive;
    // this.fogActive;
    // this.wackyKeysActive;
    // this.radiationActive;

  }

  // move() {}
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
      text(`Level 1`, width / 5, height / 1.04);
      pop();
    } else if (currentLevel === 1) {
      push();
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(`Level 2`, width / 5, height / 1.04);
      pop();
    } else if (currentLevel === 2) {
      push();
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(`Level 3`, width / 5, height / 1.04);
      pop();
    } else if (currentLevel === 3) {
      push();
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(`Level 4`, width / 5, height / 1.04);
      pop();
    }

    // Tutorial information on how to play the game

    if (this.currentName === `pathCell` || this.currentName === `changedCell`) {
     push();
     fill(255);
     textSize(16);
     textAlign(CENTER, CENTER);
     text(`Collect items and enter the green exit door!`, width / 2, height / 1.07);
     text(`You can eat through the walls but you take damage`, width / 2, height / 1.03);
     pop();
} else if (this.currentName === `fog`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Fog of War!`, width / 2, height / 1.07);
      // text(`Find another Fog of War item to disable it!`, width / 2, height / 1.03);
      pop();

    } else if (this.currentName === `startRadiation`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Radiation!`, width / 2, height / 1.07);
      text(`Another random Radiation item can disable it!`, width / 2, height / 1.03);
      pop();
    } else if (this.currentName === `spin`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Spin!`, width / 2, height / 1.07);
      text(`Another random Spin item can disable it!`, width / 2, height / 1.03);
      pop();
    } else if (this.currentName === `startRadiation`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Radiation!`, width / 2, height / 1.07);
      text(`Radiation!`, width / 2, height / 1.04);
      pop();
    } else if (this.currentName === `wackyKeys`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Wacky Keys!`, width / 2, height / 1.07);
      // text(`Find another Wacky Keys item to disable it!`, width / 2, height / 1.03);
      pop();
    }
  }
}
