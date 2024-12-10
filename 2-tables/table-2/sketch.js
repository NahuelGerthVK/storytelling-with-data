let table;
let selector;

/* - - - preload - - - */
function preload() {
  // load our table
  table = loadTable("/cities.csv", "csv", "header");
}

/* - - - setup - - - */
function setup() {
  createCanvas(600, 600);

  // styling
  textAlign(CENTER, CENTER);
  textSize(15);
  noCursor();

  // how many rows do we have?
  console.log(table.getRowCount());
}

/* - - - draw - - - */
function draw() {
  background(255);

  // get a city by moving from left to right
  selector = int(map(mouseX, 0, width, 0, table.getRowCount()));
  selector = constrain(selector, 0, table.getRowCount() - 1);

  // draw city as ellipse
  let citySize = map(
    table.getString(selector, "inhabitants"),
    0,
    10,
    100,
    width * 0.9
  );
  let cityColor = table.getString(selector, "color");

  fill(cityColor);
  noStroke();
  ellipse(width / 2, height / 2, citySize);

  fill(255);
  textSize(60);
  text(table.getString(selector, "inhabitants"), width / 2, height / 2);

  // mouse cursor
  fill(0);
  textSize(20);
  ellipse(mouseX, mouseY, 30);
  fill(255);
  text(selector, mouseX, mouseY);
  fill(0);
  text(table.getString(selector, "name"), mouseX, mouseY + 30);
}
