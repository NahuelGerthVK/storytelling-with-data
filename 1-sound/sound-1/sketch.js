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
}

function draw() {
  background(0);

  // get volume with smoothing
  let level = amplitude.getLevel();
  ellipseSize = map(level, 0, 1, 100, 2000);

  fill(255);
  noStroke();

  // ellipse reacting to audio
  ellipse(width / 2, height / 2, ellipseSize);

  // text
  text("Click to play", width/2, height - 50);
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
