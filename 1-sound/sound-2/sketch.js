// click to start, then loop sound

// our sound
let mySound;
let amplitude; // get the amplitude level (between 0 and 1.0)
let audioPlayed = false;

// the value we will modify with sound
let ellipseSize;

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
  background(0);

  // text
  fill(255);
  text("Click to play", width / 2, height - 50);
}

function draw() {
  // get volume with smoothing
  let level = amplitude.getLevel();
  ellipseSize = map(level, 0, 1, 1, 1000);

  noFill();
  stroke(255);
  strokeWeight(2);

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
