let table;
let selector;
let previousSize = 0; // To store the previous city size
let previousColor; // To store the previous city color

/* - - - preload - - - */
function preload() {
  // load our table
  table = loadTable("/cities.csv", "csv", "header");
}

/* - - - setup - - - */
function setup() {
  createCanvas(600, 600);

  // Styling
  textAlign(CENTER, CENTER);
  textSize(15);
  noCursor();

  // Initialize previousColor with a default value
  previousColor = color(255); // White as default

  // How many rows do we have?
  console.log(table.getRowCount());
}

/* - - - draw - - - */
function draw() {
  background(255);

  // Get a city by moving from left to right
  selector = int(map(mouseX, 0, width, 0, table.getRowCount()));
  selector = constrain(selector, 0, table.getRowCount() - 1);

  // Calculate the current size
  let targetSize = map(
    table.getString(selector, "inhabitants"),
    0,
    10,
    100,
    width * 0.9
  );

  // Get the target color
  let targetColor = color(table.getString(selector, "color")); // Convert string to p5.js color

  // Interpolate between previous size and target size
  let citySize = lerp(previousSize, targetSize, 0.1);
  previousSize = citySize; // Update previous size for the next frame

  // Interpolate between previous color and target color
  let cityColor = lerpColor(previousColor, targetColor, 0.2);
  previousColor = cityColor; // Update previous color for the next frame

  // Draw city as ellipse
  fill(cityColor);
  noStroke();
  ellipse(width / 2, height / 2, citySize);

  // Display inhabitants as text
  fill(255);
  textSize(60);
  text(table.getString(selector, "inhabitants"), width / 2, height / 2);

  // Mouse cursor
  fill(0);
  textSize(20);
  ellipse(mouseX, mouseY, 30);
  fill(255);
  text(selector, mouseX, mouseY);
  fill(0);
  text(table.getString(selector, "name"), mouseX, mouseY + 30);
}
