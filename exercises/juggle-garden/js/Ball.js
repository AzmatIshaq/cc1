// Ball class

class Ball {
  constructor (x,y) {
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.ax = 0;
      this.ay = 0;
      this.maxSpeed = 10;
      this.size = 40;
      this.active = true;

  }

  gravity(force) {
      this.ay = this.ay + force;

  }

  move() {



      this.vx = this.vx + this.ax;
      this.vy = this.vy + this.ay;

      this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
      this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

      this.x = this.x + this.vx;
      this.y = this.y + this.vy;

      this.x = constrain(this.x, 0, width);

      if (this.y - this.size / 2 > height){
        this.active = false;
      }
  }

  bounce(paddle) {
    // Play around with this for more interesting interactions
    // Think you can remove the this.y - this.size / 2 < paddle.y + paddle.height / 2 line. Not sure if it is necessary since
    // already doing that with the first statement
    if (this.x > paddle.x - paddle.width / 2 &&
        this.x < paddle.x + paddle.width / 2 &&
        this.y + this.size / 2 > paddle.y - paddle.height / 2 &&
        this.y - this.size / 2 < paddle.y + paddle.height / 2) {
      // Bounce
      let dx = this.x - paddle.x;
      this.vx = this.vx + map(dx, -paddle.width / 2, paddle.width / 2, -2, 2);

      this.vy = -this.vy;
      this.ay = 0;
    }
  }

  bounceAi(aiPaddle) {
    // Play around with this for more interesting interactions
    // Think you can remove the this.y - this.size / 2 < aiPaddle.y + aiPaddle.height / 2 line. Not sure if it is necessary since
    // already doing that with the first statement
    if (this.x > aiPaddle.x - aiPaddle.width / 2 &&
        this.x < aiPaddle.x + aiPaddle.width / 2 &&
        this.y + this.size / 2 > aiPaddle.y - aiPaddle.height / 2 &&
        this.y - this.size / 2 < aiPaddle.y + aiPaddle.height / 2) {
      // Bounce
      let dx = this.x - aiPaddle.x;
      this.vx = this.vx + map(dx, -aiPaddle.width / 2, aiPaddle.width / 2, -2, 2);

      this.vy = -this.vy;
      this.ay = 0;
    }
  }

  display() {

    push();
    fill(255, 50, 50);
    stroke(255);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
