
stonesNumber = 12;
stonesGroup = [];
circleAreaRadius = 200;

function setup() {
  createCanvas(800, 600, WEBGL);
  for (let i = 0; i < stonesNumber; i++) {
    let angle = 360 / stonesNumber * i;
      stonesGroup.push(new StoneGroup(angle));
  }
}

function draw() {
  background(200);
  orbitControl();

  // Ground
  push();
  translate(0, 0, 0);
  rotateX(HALF_PI);
  fill(100, 200, 100);
  plane(800, 800);
  pop();

  // Draw axis
  push();
  strokeWeight(1);
  // X axis
  stroke(255, 0, 0);
  line(0, 0, 0, 100, 0, 0);
  // Y axis
  stroke(0, 255, 0);
  line(0, 0, 0, 0, 100, 0);
  // Z axis
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, 100);
  pop();

  // Draw stones
  for (let i = 0; i < stonesGroup.length; i++) {
    stonesGroup[i].draw();
  }
}

class StoneGroup {
  constructor(angle) {
    this.totalHeight = 100;
    this.totalWidth = 90;
    this.stonesThickness = 30;
    //Uso de `circleAreaRadius`
    let x = cos(radians(angle)) * circleAreaRadius;
    let y = 0;
    let z = sin(radians(angle)) * circleAreaRadius;
    this.origin = createVector(x, y, z);

    this.leftStone = new Stone(
      this.origin.x,
      ((this.stonesThickness / 2) - this.totalHeight) / 2, 
      (this.stonesThickness / 2) + this.origin.z - this.totalWidth / 2, 
      this.stonesThickness, 
      this.totalHeight - this.stonesThickness/2, 
      this.stonesThickness, 
      this.origin.x, this.origin.y, this.origin.z, 
      -angle
    );
    this.rightStone = new Stone(
      this.origin.x,
      ((this.stonesThickness / 2) - this.totalHeight) / 2, 
      -(this.stonesThickness / 2) + this.origin.z + this.totalWidth / 2,  
      this.stonesThickness, 
      this.totalHeight - this.stonesThickness/2, 
      this.stonesThickness, 
      this.origin.x, this.origin.y, this.origin.z, 
      -angle
    );
    this.topStone = new Stone(
      this.origin.x, 
      -this.totalHeight,
      this.origin.z, 
      this.stonesThickness, 
      this.stonesThickness, 
      this.totalWidth, 
      this.origin.x, this.origin.y, this.origin.z, 
      -angle
  );
  }

  draw() {
    this.leftStone.draw();
    this.rightStone.draw();
    this.topStone.draw();
    // Draw local axis
    push();
    strokeWeight(1);
    // X axis
    stroke(255, 0, 0);
    line(this.origin.x, this.origin.y, this.origin.z, this.origin.x + 50, this.origin.y, this.origin.z);
    // Y axis
    stroke(0, 255, 0);
    line(this.origin.x, this.origin.y, this.origin.z, this.origin.x, this.origin.y + 50, this.origin.z);
    // Z axis
    stroke(0, 0, 255);
    line(this.origin.x, this.origin.y, this.origin.z, this.origin.x, this.origin.y, this.origin.z + 50);
    
    pop();
  }
}

class Stone {
  constructor(x, y, z, w, h, d, xO, yO, zO, a) {
    this.position = createVector(x, y, z);
    this.positionOrigin = createVector(xO, yO, zO);
    this.size = createVector(w, h, d);
    this.angle = a;
  }

  draw() {
    push();
    // translate to the origin
    translate(this.positionOrigin.x, this.positionOrigin.y, this.positionOrigin.z);
    // rotate around the Y axis
    rotateY(radians(this.angle));
    // revert the translation
    translate(-this.positionOrigin.x, -this.positionOrigin.y, -this.positionOrigin.z);
    // translate to the position
    translate(this.position.x, this.position.y, this.position.z);
    box(this.size.x, this.size.y, this.size.z);
    pop();
  }
}