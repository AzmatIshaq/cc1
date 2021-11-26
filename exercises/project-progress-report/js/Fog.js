// Fog Class

class Fog {
  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = `fog`;
  }

  move() {

  }

  display() {
    push();
    fill(255, 0, 220);
    rect(this.x, this.y, this.width, this.height);
    pop();

  }

}
