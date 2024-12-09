function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  let x0 = width/2;
  let y0 = height/2;
  let angle = frameCount % 360;

  // Apply the transformations
  push();
  
  // Rotate by the desired angle
  rotate(angle);  
  
  // Draw the object (a rectangle in this case)
  rectMode(CENTER);
  rect(x0, y0, 100, 50);

  // Restore the original transformation
  pop();  

  // Apply the transformations
  push();

  // Translate to the point of rotation
  translate(x0, y0);
  
  // Rotate by the desired angle
  rotate(angle);
  
  // Translate back to the original position
  translate(-x0, -y0);
  
  // Draw the object (a rectangle in this case)
  rectMode(CENTER);
  rect(x0, y0, 100, 50);

  // Restore the original transformation
  pop();

}