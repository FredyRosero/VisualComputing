let firstSegment;
let secondSegment;
let thirdSegment;
let armThickness = 20;
let armLength = 50;

function setup() {
  createCanvas(800, 600, WEBGL);
  let c;
  c = color(0, 0, 255);
  thirdSegment = new Segment(0, 0, 0, 0, 0, 0, 0.003, c, null);
  c = color(0, 255, 0);
  secondSegment = new Segment(0, 0, 0, 0, 0, 0, 0.002, c, thirdSegment);
  c = color(255, 0, 0);
  firstSegment = new Segment(0, 0, 0, 0, 0, 0, 0.001, c, secondSegment);


}

function draw() {
  background(200);
  orbitControl();
  rotateX(-PI / 6);
  rotateY(PI / 3);

  // Draw segments
  firstSegment.draw();
}

class Segment {
  constructor(x, y, z, xO, yO, zO, rotationVelocity, color, childSegment) {
    this.angle = 0;
    this.rotationVelocity = rotationVelocity;
    this.position = createVector(x, y, z);
    this.origin = createVector(xO, yO, zO);
    this.color = color;
    this.childSegment = childSegment;
  }

  draw() {
    this.drawOrigin();
     push();
    // Translate to the origin
    translate(this.origin.x, this.origin.y, this.origin.z);
    // Rotate around the X axis
    rotate(this.angle);
    this.angle += this.rotationVelocity;
    // Revert the translation
    translate(-this.origin.x, -this.origin.y, -this.origin.z);


    // Draw the child segment
    if (this.childSegment != null) {
      translate(0, armLength, 0);
      this.childSegment.draw();
      translate(0, -armLength, 0);
    }
    // Translate to the position
    translate(this.position.x, this.position.y+armLength/2, this.position.z);  
    // Draw the segment
    noFill();
    stroke(this.color);
    box(armThickness, armLength, armThickness);      
    pop();
  }

  drawOrigin() {
    push();
    fill(this.color);
    noStroke();
    sphere(5);
    translate(this.origin.x, this.origin.y, this.origin.z);
    pop();
  }

}