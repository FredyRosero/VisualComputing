function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  // Translation
  push();
  translate(100, 100);
  fill(255, 0, 0);
  rect(0, 0, 50, 50);
  pop();

  // Rotation
  push();
  translate(200, 200);
  rotate(45);
  fill(0, 255, 0);
  rect(0, 0, 50, 50);
  pop();

  // Scaling
  push();
  translate(300, 300);
  scale(1.5);
  fill(0, 0, 255);
  rect(0, 0, 50, 50);
  pop();
}