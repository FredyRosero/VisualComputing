function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  background(200);

  // Activate moouse orbit control
  orbitControl();

  // Rotate around the X axis
  rotateX(frameCount * 0.01);
  
  // Rotate around the Y axis
  rotateY(frameCount * 0.01);
  
  // Rotate around the Z axis
  rotateZ(frameCount * 0.01);
  
  // Draw a box
  fill(150, 0, 0);
  box(100);
}