let table;

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
}

/* - - - draw - - - */
function draw() {
  background(255);

  // draw each city as an ellipse
  for (let i = 0; i < table.getRowCount(); i++) {
    // get city name
    let cName = table.getString(i, "name");

    // get city inhabitants
    let cSize = table.getString(i, "inhabitants");

    // we want to map city inhabitants to larger values so we can see them
    let cSizeEnlarged = map(cSize, 0, 10, 20, 140);

    // font size according to city inhabitants
    let fontSizeEnlarged = map(cSize, 0, 10, 6, 60);

    // get city color
    let cColor = table.getString(i, "color");

    // x position
    let xPos = map(i, 0, table.getRowCount() - 1, width * 0.12, width * 0.88);

    //console.log(size);

    // draw city inhabitants as ellipse
    fill(cColor);
    ellipse(xPos, height / 2, cSizeEnlarged);
    fill(255);
    textSize(fontSizeEnlarged);
    text(cSize, xPos, height * 0.5);

    // text label
    noStroke();
    textSize(15);
    fill(0);
    text(cName + ": " + cSize, xPos, height * 0.65);
  }
}
