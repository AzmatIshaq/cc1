// Door Class

class Door {
  constructor(w, h, x, y, cc, cr) {
    // Door size and position
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = `door`;
    // Current column and row to position door
    this.cc = cc;
    this.cr = cr;

  }

  move() {}

  display() {
    push();
    noStroke();
    fill(0, 255, 0);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);


    // Display end door image
    if (this.name === `door`) {
      imageMode(CORNER);
      image(
        exitDoor,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    pop();
  }
}
