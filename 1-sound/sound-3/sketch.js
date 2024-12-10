// click to start, then loop sound

// our sound
let mySound;
let amplitude; // get the amplitude level (between 0 and 1.0)
let audioPlayed = false;

// the value we will modify with sound
let ellipseSize;
let hueValue;

function preload() {
  // load audio
  mySound = loadSound("clock_short.m4a");
}

function setup() {
  createCanvas(636, 900);

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
  // get volume with smoothing
  let level = amplitude.getLevel();
  ellipseSize = map(level, 0, 1, 40, 500);

  // get our fill color
  hueValue = map(level, 0, 1, 0, 360);

  noStroke();
  fill(hueValue, 100, 100);

  // ellipse reacting to audio
  ellipse(mouseX, mouseY, ellipseSize);
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
