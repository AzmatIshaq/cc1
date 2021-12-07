// ChangedCell Class

class ChangedCell {
  constructor(w, h, x, y, startColCc, startRowCc) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.currentCol = startColCc;
    this.currentRow = startRowCc;
    this.name = "changedCell";
  }

// Display changed cell 

  display() {
    push();
    noStroke();
    fill(0);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    pop();


  }
}
