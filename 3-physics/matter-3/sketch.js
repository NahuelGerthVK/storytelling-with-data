/*
Click to add more boxes and elements to the world.

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

  // start matter.js engine
  engine = Engine.create();

  // horizontal gravity
  engine.gravity.x = 1;
  engine.gravity.y = 0;

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

    // check type of the shape and draw accordingly
    // circles
    if (boxes[i].circleRadius) {
      ellipseMode(RADIUS);
      ellipse(0, 0, boxes[i].circleRadius);
    }

    // polygons
    else if (boxes[i].vertices.length == 6) {
      beginShape();
      boxes[i].vertices.forEach((v) => {
        vertex(v.x - pos.x, v.y - pos.y);
      });
      endShape(CLOSE);
    }

    // rectangles
    else {
      rectMode(CENTER);
      rect(0, 0, boxSize, boxSize);
    }
    pop();
  }
  //rect(box.position.x, box.position.y, boxSize, boxSize);

  // draw the mouse bouncer
  fill("orange");
  ellipse(mouseX, mouseY, bouncerSize);
}

/* - - - Mouse pressed - - - */
function mousePressed() {
  // add box to the world when mouse is pressed
  boxes.push(Bodies.rectangle(mouseX, mouseY, boxSize, boxSize)); // x, y, width, height
  Composite.add(engine.world, boxes[boxes.length - 1]);

  // add a circle
  boxes.push(Bodies.circle(mouseX, mouseY, boxSize / 2)); // x, y, radius
  Composite.add(engine.world, boxes[boxes.length - 1]);

  // add a polygon
  boxes.push(Bodies.polygon(mouseX, mouseY, 6, boxSize / 2)); // x, y, number of sides, radius
  Composite.add(engine.world, boxes[boxes.length - 1]);
}
