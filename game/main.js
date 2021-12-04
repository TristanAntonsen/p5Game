const height = 700;
const width = height * 1.5;
const startingX = width / 20;
const startingY = height / 2;
let inc = .01;

// GROUND PARAMETERS
const groundColor = '#143642'

//SKY PARAMETERS

const skyColor = "#DAD2D8"

//PLAYER PARAMETERS
let player
const playerColor = "#0F8B8D"

//PHYSICS PARAMETERS
let gravity = 1;
let moveForce = 6;
let jumpForce = 14;
let deceleration = 1;
let acceleration = .375;


//COLLIDERS
let colliders = []

let gridPositions = []
let colliderSize = 50;
let numColliders = 25;
let colliderPositions = []
let Nc = 0
let groundLevel = height * .5;

for (let x = 0; x < width; x += colliderSize) {
  for (let y = 100; y < (groundLevel); y += colliderSize) {
    gridPositions.push([x, y])
  }
}



// PROJECTILES

let pellets = []

// GAME PARAMETERS

let collisionCounter = 0;


function setup() {
  // put setup code here
  createCanvas(width, height)
  player = new Player(startingX, startingY, playerColor)

  //Ground
  colliders.push(new GroundCollider(0, groundLevel, width, height - groundLevel, 0, 0, 100, 0))

  while (Nc < numColliders) {
    let gridPosition = gridPositions[Math.floor(random(gridPositions.length))]
    if (!colliderPositions.includes(gridPosition)) {
      colliders.push(new Collider(gridPosition[0], gridPosition[1], colliderSize, colliderSize, 5, random(255), random(100), random(100)))
      colliderPositions.push(gridPosition);
      Nc++
    } else {
      continue
    }
  }
}

function draw() {
  // noLoop();
  frameRate(60);
  // console.log(frameRate())
  background(skyColor)
  noStroke();
  fill(groundColor);
  rectMode(CORNER);

  //PHYSICS PARAMETERS

  for (let collider of colliders) {
    collider.draw();
    corners = collider.corners;
  }

  player.edges();
  player.checkForCollision(colliders);
  player.checkKeys();
  player.sumAllForces();
  player.update();
  player.draw();
  collisionCounter = 0;
  for (let collider of colliders) {

    if (collider.hit == true) {
      collisionCounter += 1;
    }
    if (collisionCounter == numColliders + 1) {
      console.log("game over")
      colliders = [];
      colliderPositions = [];
      pellets = [];
      Nc = 0;
      //Ground
      colliders.push(new GroundCollider(0, groundLevel, width, height - 300, 0, 0, 100, 0))
      //Allows duplicates
      // for (let i = 0; i < numColliders; i++) {
      //   let gridPosition = gridPositions[Math.floor(random(gridPositions.length))]

      //   colliders.push(new Collider(gridPosition[0], gridPosition[1], colliderSize * .95, colliderSize * .95, 5, random(255), random(100), random(100)))
      // }
      // Without duplicates
      while (Nc < numColliders) {
        let gridPosition = gridPositions[Math.floor(random(gridPositions.length))]
        if (!colliderPositions.includes(gridPosition)) {
          colliders.push(new Collider(gridPosition[0], gridPosition[1], colliderSize, colliderSize, 5, random(255), random(100), random(100)))
          Nc++
          colliderPositions.push(gridPosition);
        } else {
          continue
        }
      }


    }
  }

  for (let pellet of pellets) {
    pellet.calcDirection();
    pellet.collide(colliders);
    pellet.update();
    pellet.draw();
  }


}

function keyPressed() {
  if (keyCode == 69) {
    let Vp = createVector(player.position.x, player.position.y - player.width / 2)
    let Vt = createVector(1, 1) //angle
    pellets.push(new Pellet(Vp, Vt))
    if (pellets.length > 20) {
      pellets.shift();
    }
  }
}