// click to start, then loop sound

// our sound
let mySound;
let amplitude; // get the amplitude level (between 0 and 1.0)
let audioPlayed = false;

// the value we will modify with sound
let hueValue;

let posX = 0;
let posY;

function preload() {
  // load audio
  mySound = loadSound("clock_short.m4a");
}

function setup() {
  createCanvas(900, 636);

  // create a new Amplitude analyzer
  amplitude = new p5.Amplitude();

  textAlign(CENTER, CENTER);
  textSize(30);
  background(230);

  // text
  fill(0);
  text("Click to play", width / 2, height - 50);

  colorMode(HSB, 360, 100, 100);

  posY = height;
}

function draw() {
  if (audioPlayed) {
    // get volume with smoothing
    let level = amplitude.getLevel();

    // get our fill color
    hueValue = map(level, 0, 1, 0, 360);

    // get our y position
    posY = map(level, 0, 1, height, -1400);

    stroke(hueValue, 100, 100);

    // line reacting to audio
    line(posX, height, posX, posY);

    // move downwards
    posX += 1;
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
