const {Engine, World, Bodies,
  Mouse, MouseConstraint,
  Body, Constraint, Events
} = Matter;

let engine, world, ground,
boxes = [], boxImg, groundImg,
bird, birdImg = [], slingshot,
mc;

function setup(){
const canvas = 
  createCanvas(500,300);

boxImg = loadImage("img/box.png");
groundImg = loadImage("img/ground.jpg");

birdImg = [
  loadImage("img/red.png"),
  loadImage("img/yellow.png"),
] 

engine = Engine.create();
world = engine.world;

const mouse = Mouse.create(canvas.elt);
mouse.pixelRatio = pixelDensity();
mc =
  MouseConstraint.create(engine,
  {
    mouse: mouse,
    collisionFilter: {mask: 2}
  });
World.add(world, mc);

ground = new Ground(
  width/2, height-10,
  width, 20, groundImg
);

for (let i=0; i<=6; i++) {
  let box = new Box(
    400, height - 40*i,
    40, 40, boxImg
  );
  boxes.push(box);
  
  box = new Box(
    440, height - 40*i,
    40, 40, boxImg
  );
  boxes.push(box);
}

bird = new Bird(
  100, 200, 15, birdImg[0]);
  
slingshot = new SlingShot(
  bird);
  
/*Events.on(engine,
  'afterUpdate',
  () => slingshot.fly(mc)
  );*/
}

function draw(){
background("#C6E7FF");
Engine.update(engine);
slingshot.fly(mc);

for (const box of boxes){
  box.show();
}

slingshot.show();
bird.show();  
ground.show();
}

function keyPressed(){
if (key== ' ') {
  bird.clear();
  
  const index =
    floor(random(0, birdImg.length));
  
  bird = new Bird(
  100, 200, 15, birdImg[index]);
  slingshot.attach(bird);
}
}