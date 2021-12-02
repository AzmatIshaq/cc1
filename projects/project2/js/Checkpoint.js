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
    fill(255, 20, 50);
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
        // pop();
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
            // pop();
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
          // pop();
    }

    // Display walls pickup image
    if (this.name === `startWalls` || this.name === `stopWalls`) {
        imageMode(CORNER);
        image(
          pickupWalls,
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
              pickupWalls,
              this.x,
              this.y,
              this.width,
              this.height
            );
            }
          pop();


  }
}
