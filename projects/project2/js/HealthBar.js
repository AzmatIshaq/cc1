// HealthBar Class

class HealthBar {
  constructor() {
    // Position and dimensions and fill colour of health bar
    this.width = 99;
    this.height = 19;
    this.x = width / 23;
    this.y = height / 1.059;
    // Colour of healthbar
    this.healthBarFill = {
      r: 25,
      g: 161,
      b: 0,
      a: 255,
    };
    // Health bar name
    this.name = "healthBar";

    // Width of box outline of health bar
    this.outlineWidth = 100;
    this.outlineHeight = 20;
    // Position of box outline of health bar
    this.outlineX = width / 10;
    this.outlineY = height / 1.04;
    // Health box outline Color
    this.outlineStroke = 255;


    // Position for "Health" text above healtbar
    this.healthTextX = width / 10;
    this.healthTextY = height / 1.08;
    this.healthTextSize = 18;
    this.healthTextFill = 255;

    // Maximum health value
    this.healthMax = 99;

    // Minimum health value
    this.healthMin = 0;

    // Health warning activation limit
    this.healthWarningLimit = 25;

    // Damage rate for when map spin is active
    this.spinDamage = 0.1;

    // Spin speed limit before it affects health
    this.spinLimit = 0.003;

  } // End of class HealthBar class construction

  // Notification when health low function
  healthNotification() {
    if (this.width < this.healthWarningLimit) {
      lowHealthAudio();
      this.healthBarFill.r = random(180, 255);
      this.healthBarFill.g = random(180, 255);
      this.healthBarFill.b = random(180, 255);
      this.healthBarFill.a = random(180, 255);
    } else {
      this.healthBarFill.r = 25;
      this.healthBarFill.g = 161;
      this.healthBarFill.b = 0;
      this.healthBarFill.a = 255;
      }
    }

  display() {

    // Player Health text

    push();
    fill(this.healthTextFill);
    textAlign(CENTER, CENTER);
    textSize(this.healthTextSize);
    text('Health', this.healthTextX, this.healthTextY);
    pop();

    // Outline for health bar

    push();
    stroke(this.outlineStroke);
    noFill();
    rectMode(CENTER);
    rect(this.outlineX, this.outlineY, this.outlineWidth, this.outlineHeight );
    pop();

    // Health bar retangle

    push();
    noStroke();
    fill(this.healthBarFill.r, this.healthBarFill.g, this.healthBarFill.b, this.healthBarFill.a);
    rectMode();
    rect(this.x, this.y, this.width, this.height);
    pop();

    // Prevent health from increasing more than max
    if (this.width > this.healthMax) {
      this.width = this.healthMax;
    }

    // Notification when health low
    this.healthNotification();


    // Health bar affected by spin
    if (mapAngleChange > this.spinLimit) {
        this.width = this.width - this.spinDamage;
        squeakAudio();
    }

    // If health falls bellow 0 trigger end lose state
    if (this.width < this.healthMin) {
      state = `endLose`;
      // Sound effect for when your health empties completely
      endingLoseChime.play();
    }
  }




}
