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
    // this.currentName = currentCellName;
    // this.currentRow = startRowT;
  }

  // move() {}

  display() {


    if (this.currentNamee === `fog`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Fog of War!`, width / 2, height / 1.07);
      text(`Find another Fog of War item to disable it!`, width / 2, height / 1.04);
      pop();

    } else if (this.currentName === `startRadiation`) {
      push();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(`Fog of War!`, width / 2, height / 1.07);
      text(`Find another Fog of War item to disable it!`, width / 2, height / 1.04);
      pop();
    }
  }
}
