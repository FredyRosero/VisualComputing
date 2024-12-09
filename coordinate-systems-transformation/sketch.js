class Box {
  constructor(x, y, z, size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
  }

  drawAxes() {
    strokeWeight(2);

    // X axis in red
    stroke(255, 0, 0);
    line(0, 0, 0, this.size, 0, 0);

    // Y axis in green
    stroke(0, 255, 0);
    line(0, 0, 0, 0, this.size, 0);

    // Z axis in blue
    stroke(0, 0, 255);
    line(0, 0, 0, 0, 0, this.size);
  }

  drawBox() {
    push();
    translate(this.x, this.y, this.z);
    this.drawAxes();
    noFill();
    stroke(255);
    box(this.size);
    pop();
  }
}

let myBox;

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
  myBox = new Box(0, 0, 0, 100);
}

function draw() {
  background(200);
  orbitControl();
  //rotateY(frameCount * 0.5);
  myBox.drawBox();

  
  push();
  translate(150, 0, 0); 
  rotateX(frameCount * 0.5);
  let localBox = new Box(0, 0, 0, 50);
  localBox.drawBox();
  pop();  
}
