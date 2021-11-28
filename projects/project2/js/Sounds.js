// Sounds Class

class Sounds {
  constructor() {
    // For sound with movement
    this.osc = new p5.Oscillator(300);
    this.name = "sounds";
  }

// Sound for checkpoint interaction
  playOscillator() {
    this.osc.start();
    this.osc.amp(0.5);

// Starts at 700Hz
    this.osc.freq(700);

// Ramps to 60Hz over 0.7 seconds
    this.osc.freq(60, 0.7);
    this.osc.amp(0, 0.1, 0.7);

  }
}
