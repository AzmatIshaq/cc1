// Ai Paddle Class

class AiPaddle {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.x = windowWidth/2;
    this.y = this.height;
  }

  move() {

  // Random movement for Ai Paddle

  if(frameCount % 99 == 0) {
    let change = random(0,1);

    if (change < 0.5) {
      this.x = this.x - 30
    }
    if (change > 0.5) {
      this.x = this.x + 30
      }

  }



  }

  display() {
    push();
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

}
