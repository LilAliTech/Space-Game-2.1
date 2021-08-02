var ufo;
var p1,p2,asteroid1,asteroid2,asteroid3,asteroid,asteroidGroup,asteroids;
var Background;
var laser, laserImg, laserGroup, laserSound;
var shoot = 0;
var SpaceShip;
var play = 1;
var end = 2;
var GameState = "Play";
var score = 0;
var blastImage,blastSound;


function preload(){
  ufo = loadImage("Images/ufo1.png");
  asteroid1 = loadImage("Images/Asteroid.png");
  asteroid2 = loadImage("Images/asteroid2.png")
  asteroid3 = loadImage("Images/asteroid3.png")
  laserImg = loadImage("Images/laser.png");
  spaceShip = loadImage("Images/SpaceShip.png");
  Background = loadImage("Images/Background.png");
  blastImage = loadImage("Images/blast.png");
  laserSound = loadSound("sounds/laser sound.mp3");
  blastSound = loadSound("sounds/blast.mp3");
}

function setup() {
  createCanvas(1000,700);
  SpaceShip = createSprite(400, 570, 50, 50);
  SpaceShip.addImage(spaceShip);
  SpaceShip.scale = 0.3;
  laserGroup = new Group();  
  asteroidGroup = new Group();
  Background.velocityY = 1;

  laserGroup = new Group;

  // p1 = createSprite(450,600);
  // p1.setCollider("rectangle",70,-27,5,365,156);
  // p1.debug = true; 
  // //p1.visible = true;
  // p2 = createSprite(350,500); 
  // p2.setCollider("rectangle",-70,-27,5,315,-156);
  // p2.debug = true;
  //p2.visible = true;
SpaceShip.debug = true;

}

function draw() {
  background(Background); 
 
 if (GameState === "Play"){
   if(background.y > 600){
     background.y = 400;
   }

   shoot = shoot - 1;

   if(keyDown("space") && shoot <430) {
     laser = createSprite(SpaceShip.x,SpaceShip.y - 130);
     laser.addImage(laserImg);
     laser.velocityY = -8; 
     laser.scale = 0.7;
     laserSound.play();
     laserGroup.add(laser);

     //console.log(laser.x);
     shoot = laser.y;
   }  

   if(keyDown("right") && SpaceShip.x < 1400) {
    SpaceShip.x = SpaceShip.x + 10;

  }

  if(keyDown("left") && SpaceShip.x > 50) {
    SpaceShip.x = SpaceShip.x - 10;
  }

  if(asteroidGroup.isTouching(laserGroup)) {
    asteroidGroup.destroyEach();
    laserGroup.destroyEach();
    score = score + 1;
  }

  if(asteroidGroup.isTouching(SpaceShip)) {
    asteroidGroup.destroyEach();
    var blast = createSprite(SpaceShip.x,SpaceShip.y - 50);
    blastSound.play();
    blast.addImage(blastImage);
    blast.lifetime = 25;
    SpaceShip.destroy();
    GameState = "end";
  }

  
  stroke("white");
  fill("white");
  textSize(30);
  text("score : " + score,210,60)

  }
  asteroids();
  drawSprites();

}

function asteroids() {
  if(frameCount % 110 === 0) {
  
    var asteroid = createSprite(Math.round(random(50,1350)),-20);
    asteroid.velocityY = (6 + score/10);
    asteroid.lifetime = 200;
    asteroid.scale = random(0.4,0.5);
    //asteroid.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: asteroid.addImage(asteroid1);
              asteroid.setCollider("circle",-80,10,160);
              asteroid.scale = 0.1;
              break;
      case 2: asteroid.addImage(asteroid2);
              asteroid.setCollider("circle",50,0,150);
              break;
      case 3: asteroid.addImage(asteroid3);
              asteroid.setCollider("circle",0,0,170)
      default: break;
    }
    
    //console.log(asteroid.x);
    asteroidGroup.add(asteroid);
  }
}


if(GameState === "end") {
  space.velocityY = 0;
  asteroidGroup.destroyEach();
  stroke("yellow");
  fill("white");
  textSize(40);
  text("GAME OVER!",canvas.width/2-400,canvas.height/2);
  text("The asteroids destroyed the planet",canvas.width/2-400,canvas.height/2+100);
  text("Your final score:"+score,canvas.width/2-400,canvas.height/2+200);

}




