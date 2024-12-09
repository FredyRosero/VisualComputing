function setup() {
  createCanvas(800, 600);
  background(220);
}

function draw() {
  // Draw a circle that follows the mouse
  fill(0, 102, 153);
  ellipse(mouseX, mouseY, 50, 50);
}

function mousePressed() {
  // Change background color when mouse is pressed
  background(random(255), random(255), random(255));
}

function mouseDragged() {
  // Draw a rectangle while dragging the mouse
  fill(255, 0, 0);
  rect(mouseX, mouseY, 50, 50);
}

function mouseReleased() {
  // Draw a line from the center to the mouse position when released
  stroke(0);
  line(width / 2, height / 2, mouseX, mouseY);
}