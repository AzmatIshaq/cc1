// Door Class

class Door {
  constructor(w,h,x,y,cc,cr) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = `door`;
    this.cr  = cr;
    this.cc = cc;
    }

  move() {
  }

  display() {
  //  console.log(this.x);
    push();
    noStroke();
    fill(0,255,0);
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
