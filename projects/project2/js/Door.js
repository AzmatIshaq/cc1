// Door Class

class Door {
  constructor(w,h,x,y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.name = `door`;


  }

  move() {
  }

  display() {
    for (let i = 0; i === 0; i++) {
    console.log(this.x);
    push();
    noStroke();
    fill(0,255,0);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    pop();
    }
  }
}
