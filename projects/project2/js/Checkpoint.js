// Checkpoint Class

class Checkpoint {
  constructor(w, h, x, y, name) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = name;
    this.active = true;
  }

  // move() {}

  display() {
    push();
    noStroke();
    fill(0);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);

    // Display fog pickup image
    if (this.name === `fog`) {
      imageMode(CORNER);
      image(
        pickupFog,
        this.x,
        this.y,
        this.width,
        this.height
      );

    }

    // Display wakcy keys pickup image
    if (this.name === `wackyKeys`) {
      imageMode(CORNER);
      image(
        pickupWacky,
        this.x,
        this.y,
        this.width,
        this.height
      );

    }

    // Display cheese pickup image
    if (this.name === `cheese`) {
      imageMode(CORNER);
      image(
        pickupCheese,
        this.x,
        this.y,
        this.width,
        this.height
      );

    }

    // Display walls pickup image
    if (this.name === `startRadiation` || this.name === `stopRadiation`) {
      imageMode(CORNER);
      image(
        pickupRadiation,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    // Display spin pickup image
    if (this.name === `spin` || this.name === `stopSpin`) {
      imageMode(CORNER);
      image(
        pickupSpin,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    pop();

  }
}
