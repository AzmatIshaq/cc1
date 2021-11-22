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
  }

  move() {
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
  fill(25, 161, 0);
  rectMode(CENTER);
  rect(width / 10, height / 1.04, this.width, this.height);
  pop();

  }

}
