class Player {
  constructor(w, h) {
    this.x = 0;
    this.y = 250;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 10;
    this.size = 40;
    this.speed = 1;
    this.active = true;
    this.width = w;
    this.height = h;
  }

  move() {

    if (keyIsDown(LEFT_ARROW)) {
      this.x = this.x - this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x = this.x + this.speed;
    }

    if (keyIsDown(UP_ARROW)) {
      this.y = this.y - this.speed;
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.y = this.y + this.speed;
    }
  }

  display() {
    push();
    noStroke();
    fill(140, 140, 255);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
