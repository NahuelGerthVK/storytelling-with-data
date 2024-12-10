// click to start, then loop sound

// our sound
let mySound;
let amplitude; // get the amplitude level (between 0 and 1.0)
let audioPlayed = false;

// the value we will modify with sound
let lineSize = 0;
let rotation = 0;
let hueValue = 0;

function preload() {
  // load audio
  mySound = loadSound("clock_short.m4a");
}

function setup() {
  createCanvas(600, 600);

  // create a new Amplitude analyzer
  amplitude = new p5.Amplitude();

  textAlign(CENTER, CENTER);
  textSize(30);
  background(230);

  // text
  fill(0);
  text("Click to play", width / 2, height - 50);

  colorMode(HSB, 360, 100, 100);
}

function draw() {
  if (audioPlayed) {
    // get volume with smoothing
    let level = amplitude.getLevel();
    console.log(level);

    // get our stroke color
    hueValue = (hueValue + 0.1) % 360; // increment hueValue with each drawing loop iteration and wrap it around at 360

    // get our line size
    lineSize = map(level, 0.08, 0.2, 0, width * 0.8);
    lineSize = constrain(lineSize, 0, width * 0.8);

    // line reacting to audio
    stroke(hueValue, 100, 100);
    push();
    translate(width / 2, height / 2);
    rotate(radians(rotation));
    line(0, 0, 0, -lineSize);
    pop();

    // rotate
    rotation += 0.5;
  }
}

// loop sound when mouse is pressed
function mousePressed() {
  if (!audioPlayed) {
    mySound.play();

    mySound.setVolume(1); // set volume
    mySound.loop();
    amplitude = new p5.Amplitude();
    amplitude.setInput(mySound);
    amplitude.smooth(0.95); // smooth the sound, higher value is smoother
    audioPlayed = true;
  }
}
