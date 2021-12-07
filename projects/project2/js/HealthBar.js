// HealthBar Class

class HealthBar {
  constructor() {
    this.width = 99;
    this.height = 19;
    this.outlineWidth = 2;
    this.outlineHeight = 2;
    this.x = 0;
    this.y = 0;
    this.outlineX = 1;
    this.outlineY = 1;
    this.name = "healthBar";
    this.healthBarFill = {
      r: 25,
      g: 161,
      b: 0,
      a: 255,
    };
  }

  display() {

    // Player Health text

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text('Health', width / 10, height / 1.08);
    pop();

    // Outline for health bar

    push();
    stroke(255);
    noFill();
    rectMode(CENTER);
    rect(width / 10, height / 1.04, 100, 20);
    pop();

    // Health bar retangle

    push();
    noStroke();
    fill(this.healthBarFill.r, this.healthBarFill.g, this.healthBarFill.b, this.healthBarFill.a);
    rectMode();
    rect(width / 23, height / 1.059, this.width, this.height);
    pop();

    // Prevent health from increasing more than max
    if (this.width > 99) {
      this.width = 99;
    }

    // Notification when health low

    if (this.width < 25) {
      damageAudio();
      this.healthBarFill.r = random(180, 255);
      this.healthBarFill.g = random(180, 255);
      this.healthBarFill.b = random(180, 255);
      this.healthBarFill.a = random(180, 255);
    } else {
      this.healthBarFill.r = 25;
      this.healthBarFill.g = 161;
      this.healthBarFill.b = 0;
      this.healthBarFill.a = 255;
    }

    // Health bar affected by spin
    if (mapAngleChange > 0.003) {
        this.width = this.width - 0.1
    }

    // Health bar reset depending on state
    if (this.width < 0) {
      state = `endLose`;
    }
  }
}
