// variables
var cursore = [];
var numcursor = 1;
let xcoor = 100;
let ycoor = 100;
let dx = 10;
let dy = 10;
let speedFactor = 1;
let message = "";

function setup() {
  createCanvas(600, 600);
  for (var i = 0; i < numcursor; ++i) {
    cursore[i] = new Circle(xcoor, ycoor);
  }
}

// Three circles
// The circle that is in between the two circles
var x = 300;
var y = 300;
radius = 300; 

// Innermost circle
var x1 = 300;
var y1 = 300;
radius1 = 250;

// Outer circle
var x2 = 300;
var y2 = 300;
radius2 = 350;

function draw() {
  background(0); // background color "black"

  // Cursor positions
  for (var i = 0; i < cursore.length; ++i) {
    cursore[i].move();
    cursore[i].display();
  }

  // text display
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("Motor Skills", width / 2, 40); // The title

  
  //This sets the stroke color the middle circle to white
  stroke(255); 
  strokeWeight(10);
  fill(0, 0, 0, 63);
  ellipse(x, y, radius, radius);

  // This to black, so it get's mixed up in the back ground
  stroke(0);
  fill(0, 0, 0, 63);
  ellipse(x1, y1, radius1, radius1);

  // This to black, so it get's mixed up in the back ground
  stroke(0);
  fill(0, 0, 0, 63);
  ellipse(x2, y2, radius2, radius2, 63);

  // To display the messages when the cursor is red and when it is green in color
  if (cursore[0].col.levels[1] === 0) {
    // Cursor is red
    message = "You are out of the boundaries.";
  } else {
    // Cursor is green
    message = "You're going in the correct path. Follow up!";
  }

  // Display message
  fill(255); // Set text color to white
  textSize(24);
  textAlign(CENTER);
  text(message, width / 1.9, height - 26);
}


function Circle(xcoor, ycoor) {
  // Move the cursor
  this.move = function() {
    xcoor += dx;
    ycoor += dy;

    if (xcoor > width) xcoor = 0;
    if (ycoor > height) ycoor = 0;

    dx = (mouseX - xcoor) * speedFactor;
    dy = (mouseY - ycoor) * speedFactor;
  }

  // Cursor
  this.display = function() {
    if (this.mouseNotInRange() || this.mouseOfOutRange()) {
      this.col = color(255, 0, 0); // Red
    } else {
      this.col = color(0, 204, 0); // Green
    }
    fill(this.col);
    ellipse(xcoor, ycoor, 40, 40);
  }

  
  // Check if the cursor is not in the inner range
  this.mouseNotInRange = function() {
    return dist(mouseX, mouseY, x1, y1) < 140;
  }
  

  // Check if the cursor is out of the outer range
  this.mouseOfOutRange = function() {
    let outOfRange = dist(mouseX, mouseY, x2, y2) > 155;
    return outOfRange;
  }
}