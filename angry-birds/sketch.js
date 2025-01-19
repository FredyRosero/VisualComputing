/*
# "Angry Birds" assignment

## Description
Implement Angry Birds using a Physics Engine
* Design a complete level.
* Add pigs with textures.
* Add a background.
* Add a texture to the slingshot.
* Define a lifetime for the objects and enemies.

*/

const { Engine, World, Bodies, Mouse, MouseConstraint, Body, Constraint, Events } = Matter;

let 
engine, 
world, 
ground, 
boxes = [], 
boxImg, 
groundImg, 
bird, 
birdImg = [], 
pigImg,
slingshot, 
mc,
pigs = [];

function setup() {
  const canvas =
    createCanvas(500, 300);

  boxImg = loadImage("img/box.png");
  groundImg = loadImage("img/ground.jpg");

  birdImg = [
    loadImage("img/red.png"),
    loadImage("img/yellow.png"),
  ]

  pigImg = loadImage("img/pig.png");

  engine = Engine.create();
  world = engine.world;

  const mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  mc =
    MouseConstraint.create(engine,
      {
        mouse: mouse,
        collisionFilter: { mask: 2 }
      });
  World.add(world, mc);

  ground = new Ground(
    width / 2, height - 10,
    width, 20, groundImg
  );

  for (let i = 0; i <= 6; i++) {
    let box = new Box(
      400, height - 40 * i,
      40, 40, boxImg
    );
    boxes.push(box);

    box = new Box(
      400 + 80, height - 40 * i,
      40, 40, boxImg
    );
    boxes.push(box);
  }

  bird = new Bird(100, 200, 15, birdImg[0]);
  slingshot = new SlingShot(bird);

  let pig = new Pig(450, 100, 20, pigImg);
  pigs.push(pig);

  Events.on(engine, 'collisionStart', handleCollisions);  
}

function draw() {
  background("#C6E7FF");
  Engine.update(engine);
  slingshot.fly(mc);
  bird.update();

  for (const box of boxes) {
    box.show();
  }

  for (const pig of pigs) {
    pig.show();
  }  

  slingshot.show();
  bird.show();
  ground.show();
}

function keyPressed() {
  if (key == ' ') {
    bird.clear();
    const index = floor(random(0, birdImg.length));
    bird = new Bird(100, 200, 15, birdImg[index]);
    slingshot.attach(bird);
  }
}

function handleCollisions(event) {
  const pairs = event.pairs;

  for (const pair of pairs) {
    const bodyA = pair.bodyA;
    const bodyB = pair.bodyB;

    if (bodyA === bird.body || bodyB === bird.body) {
      const otherBody = bodyA === bird.body ? bodyB : bodyA;

      for (const box of boxes) {
        if (box.body === otherBody) {
          const velocity = Math.sqrt(
            bird.body.velocity.x ** 2 + bird.body.velocity.y ** 2
          );
          const damage = Math.max(10, velocity * 10);
          box.hit(damage);
          break;
        }
      }

      for (const pig of pigs) {
        if (pig.body === otherBody) {
          const velocity = Math.sqrt(
            bird.body.velocity.x ** 2 + bird.body.velocity.y ** 2
          );
          const damage = Math.max(10, velocity * 10);
          pig.hit(damage);
          break;
        }
      }
    }
  }
}

class Bird {
  constructor(x, y, r, img) {
    this.body = Bodies.circle(
      x, y, r, // set x and y position and radius
      {
        restitution: 0.5, // bounciness
        collisionFilter: { category: 2 } // set collision category to 2
      }
    );
    Body.setMass(this.body, 2);
    this.img = img;
    World.add(world, this.body);
    this.isFlying = false;
    this.timeToLiveAfterCollision = 100;
  }

  show() {
    push();
    if (this.img) {
      imageMode(CENTER);
      translate(this.body.position.x, this.body.position.y);
      rotate(this.body.angle);
      image(this.img, 0, 0, 2 * this.body.circleRadius, 2 * this.body.circleRadius);
    } else {
      ellipse(this.body.position.x, this.body.position.y, 2 * this.body.circleRadius, 2 * this.body.circleRadius);
    }
    pop();
  }

  clear() {
    bird = new Bird(100, 200, 15, birdImg[0]);
    slingshot.setSling(bird);
  }

  update() {    
    if (this.isFlying) {
      this.timeToLiveAfterCollision--;
      if (this.timeToLiveAfterCollision <= 0) {
        this.clear();
      }
    }
  }
}

class Pig {
  constructor(x, y, r, img) {
    this.body = Bodies.circle(
      x, y, r, // set x and y position and radius
      {
        restitution: 0.5, // bounciness
        collisionFilter: { category: 2 }, // set collision category to 2
      }
    );
    Body.setMass(this.body, 2);
    this.img = img;
    this.r = r;
    this.health = 50; // Vida inicial del cerdo
    this.isDestroyed = false;
    World.add(world, this.body);
  }

  show() {
    if (this.isDestroyed) return;

    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);

    if (this.img) {
      imageMode(CENTER);
      image(this.img, 0, 0, 2 * this.r, 2 * this.r);
    } else {
      ellipseMode(CENTER);
      ellipse(0, 0, 2 * this.r, 2 * this.r);
    }

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(Math.round(this.health), 0, 0);

    pop();
  }

  hit(damage) {
    if (this.isDestroyed) return;

    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }

  destroy() {
    World.remove(world, this.body);
    this.isDestroyed = true;
  }
}

class Box {
  constructor(x, y, w, h, img, options = {}) {
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.img = img;
    World.add(world, this.body);
    this.health = 100;
    this.isDestroyed = false; 
  }

  /**
   * Show the box
   */
  show() {
    if (this.isDestroyed) return;

    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);

    if (this.img) {
      imageMode(CENTER);
      image(this.img, 0, 0, this.w, this.h);
    } else {
      rectMode(CENTER);
      rect(0, 0, this.w, this.h);
    }

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(Math.round(this.health), 0, 0);

    pop();
  }

  /**
   * Decrease the health of the box
   * 
   * @param {*} damage 
   */
  hit(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }

  /**
   * Destroy the box (remove from world and mark as destroyed)
   */
  destroy() {
    World.remove(world, this.body); // Remover del motor físico
    this.isDestroyed = true; // Marcar como destruida para evitar dibujarla
  }  

}

class Ground extends Box {
  constructor(x, y, w, h, img) {
    super(x, y, w, h, img,
      { isStatic: true });
  }
}

class SlingShot {
  constructor(bird) {
    this.sling = Constraint.create({
      pointA: {
        x: bird.body.position.x,
        y: bird.body.position.y
      },
      bodyB: bird.body,
      length: 5,
      stiffness: 0.01
    });
    World.add(world, this.sling);
  }
  
  setSling(bird) {
    this.sling.pointA = {
      x: bird.body.position.x,
      y: bird.body.position.y
    };
    this.sling.bodyB = bird.body;
  }

  show() {
    if (this.sling.bodyB) {
      line(this.sling.pointA.x,
        this.sling.pointA.y,
        this.sling.bodyB.position.x,
        this.sling.bodyB.position.y);
    }
  }

  /**
   * Mechanism to release the bird and make it fly
   * 
   * @param {*} mc 
   */
  fly(mc) {
    // If the bodyB is not null and the mouse button is released AND the bodyB is to the right of the slingshot
    if (this.sling.bodyB && mc.mouse.button === -1 && (this.sling.bodyB.position.x > this.sling.pointA.x + 10)) {
      // now the bodyB can collide with other bodies in the category 1
      this.sling.bodyB.collisionFilter.category = 1;
      bird.isFlying = true;
      // detach the body
      this.detach();
    }
  }

  /**
   * Detach the bird from the slingshot
   */
  detach() {
    this.sling.bodyB = null;
  }

  /**
   * Attach the bird to the slingshot
   * 
   * @param {*} bird 
   */
  attach(bird) {
    this.sling.bodyB = bird.body;
  }
}