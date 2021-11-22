// HealthBar Class

class HealthBar {
  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
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
  fill(255, 161, 0);
  rectMode(CENTER);
  rect(400, 28, health.width, 19);
  pop();

  }

}
