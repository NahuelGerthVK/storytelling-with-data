/*
A matter.js circle that we can bounce around with our mouse.
We also have ceiling, floor and walls that the element can bounce off of.

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
let bouncerSize = 80;

// our box
let box;
let boxSize = 150;

/* - - - Setup - - - */
function setup() {
  createCanvas(600, 600);
  noCursor();

  // start matter.js engine
  engine = Engine.create();

  // no gravity
  engine.gravity.x = 0;
  engine.gravity.y = 0;

  // create the bouncing box
  box = Bodies.rectangle(300, 300, boxSize, boxSize); // x, y, width, height
  Composite.add(engine.world, [box]); // add box to world

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
}

/* - - - Draw - - - */
function draw() {
  background(0);

  // update matter.js engine
  Engine.update(engine);

  // update mouse bouncer position
  Matter.Body.setPosition(mouseBouncer, { x: mouseX, y: mouseY });

  // draw the box
  fill("white");
  stroke("black");
  strokeWeight(6);
  rectMode(CENTER);
  rect(box.position.x, box.position.y, boxSize, boxSize);

  // draw the mouse bouncer
  fill("orange");
  ellipse(mouseX, mouseY, bouncerSize);
}
