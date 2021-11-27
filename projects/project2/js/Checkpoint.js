// Checkpoint Class

class Checkpoint {
  constructor(w, h, x, y, name, pickupF) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = name;
    this.active = true;
    this.pickupImageFog = pickupF
  }

  // move() {}

  display() {
    push();
    noStroke();
    fill(200,30,25);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);

    // Display fog pickup image

        imageMode(CENTER);
        image(
          pickupFog,
          this.x + this.width,
          this.y + this.height,
          this.width,
          this.height
        );
        pop();

  }




}
