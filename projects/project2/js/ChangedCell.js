// ChangedCell Class

class ChangedCell {
  constructor(w, h, x, y, startColCc, startRowCc) {
    // Position and size and changed cell
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.currentCol = startColCc;
    this.currentRow = startRowCc;
    this.name = "changedCell";
    this.fill = 0;
  }

// Display changed cell

  display() {
    push();
    noStroke();
    fill(this.fill);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    pop();


  }
}
