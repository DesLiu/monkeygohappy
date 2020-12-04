
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground, obstacle, fruit;
var score=0;
var gameState="play";


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  monkey=createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running)
  monkey.scale=0.1
  
  ground=createSprite(400, 350, 900, 10);
  ground.velocityX=-4;
 
  obstacleGroup=createGroup();
  foodGroup=createGroup();
 
}


function draw() {
  background("white");
  monkey.collide(ground)

  if (ground.x===0){
    ground.x=80;
  }

  if (keyDown("space")&&monkey.y>=310){
    monkey.velocityY=-10;
  }

  monkey.velocityY=monkey.velocityY+0.5;
  
  stroke("black");
  textSize(15);
  fill("black");
  text("Score: "+ score, 20, 50)

  stroke("black");
  textSize(15);
  fill("black");
  var survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 200, 50);
  
  spawnBanana();
  spawnObstacles();
  
  if (monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score=score+1
  }  
  
  if (monkey.isTouching(obstacleGroup)){
    gameState="end"
  }
  
  drawSprites();
}
function spawnBanana(){
  if(frameCount%80===0){
    banana=createSprite(450, Math.round(random(190, 240)), 25, 25);
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.scale=0.1;
    foodGroup.add(banana);
    banana.lifetime=200
  }
}

function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(450, 330, 15, 15);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-4;
    obstacle.scale=0.1;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}