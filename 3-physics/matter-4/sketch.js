/*
A bunch of letters (rectangles) following our mouse.

- In setup, we define the objects in our Matter.js world.
- In draw, we render them on the canvas.
- Play around with boxSize and bouncerSize.

*/

// Import Matter.js components
const { Engine, Bodies, Composite, Body } = Matter;

// matter.js engine
let engine;

// our mouse bouncer
let mouseBouncer;
let bouncerSize = 50;

// our boxes
var boxes = [];
let boxSize = 50;

/* - - - Setup - - - */
function setup() {
  createCanvas(600, 600);
  noCursor();

  textAlign(CENTER, CENTER);
  textSize(50);

  // start matter.js engine
  engine = Engine.create();

  // create our walls
  let walls = [
    Bodies.rectangle(width / 2, 0, width, 10, { isStatic: true }), // top
    Bodies.rectangle(width / 2, height, width, 10, { isStatic: true }), // bottom
    Bodies.rectangle(0, height / 2, 10, height, { isStatic: true }), // left
    Bodies.rectangle(width, height / 2, 10, height, { isStatic: true }), // right
  ];
  Composite.add(engine.world, walls); // add walls to world

  // create our bouncing circle
  mouseBouncer = Bodies.circle(0, 0, bouncerSize * 0.5);
  Composite.add(engine.world, [mouseBouncer]); // add circle to world

  // create 50 boxes at random positions (for our letters)
  for (let i = 0; i < 50; i++) {
    boxes.push(
      Bodies.rectangle(random(width), random(height), boxSize, boxSize)
    ); // x, y, width, height
    Composite.add(engine.world, boxes[i]);
  }
}

/* - - - Draw - - - */
function draw() {
  background(0);

  // update matter.js engine
  Engine.update(engine);

  // update mouse bouncer position
  Matter.Body.setPosition(mouseBouncer, { x: mouseX, y: mouseY });

  // draw our boxes
  fill("white");
  stroke("black");
  strokeWeight(6);

  // loop through all the boxes we created
  for (let i = 0; i < boxes.length; i++) {
    let pos = boxes[i].position;
    let angle = boxes[i].angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);

    // box
    rectMode(CENTER);
    stroke(0);
    strokeWeight(5);
    fill("white");
    rect(0, 0, boxSize, boxSize);

    // text
    noStroke();
    fill(0);

    // loop through the alphabet
    let charCode = 65 + (i % 26); // ASCII 'A' is 65
    let charStr = String.fromCharCode(charCode);
    text(charStr, 0, 0);

    pop();

    /* MAGNET */
    // calculate distance between each box and the mouse ellipse
    let towardsMouseX = mouseBouncer.position.x - boxes[i].position.x;
    let towardsMouseY = mouseBouncer.position.y - boxes[i].position.y;

    // Increase the velocity of the box and point it into the new direction to create the attraction effect
    // setVelocity() increases speed (magnitude) and direction of the box
    Matter.Body.setVelocity(boxes[i], {
      x: boxes[i].velocity.x + towardsMouseX * 0.01, // make this number bigger to increase attraction
      y: boxes[i].velocity.y + towardsMouseY * 0.01, // make this number bigger to increase attraction
    });
  }

  // draw the mouse bouncer
  fill("orange");
  ellipse(mouseX, mouseY, bouncerSize);
}
