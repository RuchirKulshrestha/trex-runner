var trex, treximage, ground, groundimage, iground, cloudsgroup, cloudimage, score, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstaclesgroup, restart, gameover, restartimage, gameoverimage;

var PLAY = 0;
var END = 1;

var gamestate = PLAY;

function preload(){
  treximage = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  groundimage = loadImage("ground2.png");
  
  cloudimage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  
  obstacle2 = loadImage("obstacle2.png");
  
  obstacle3 = loadImage("obstacle3.png");
  
  obstacle4 = loadImage("obstacle4.png");
  
  obstacle5 = loadImage("obstacle5.png");
  
  obstacle6 = loadImage("obstacle6.png");
  restartimage = loadImage("restart.png");
  gameoverimage = loadImage("gameOver.png");
  
}


function setup() {
  createCanvas(400, 400);
  trex = createSprite(30,375,10,10);
  trex.addAnimation("trexrunning",treximage);
  trex.scale = 0.5;
  
  ground = createSprite(200,385,10,10);
  ground.addImage("groundmoving", groundimage);
  
  iground = createSprite(200,395,400,10);
  iground.visible = false;
  
  cloudsgroup = new Group();
  
  score = 0;
  
  obstaclesgroup = new Group()
  
  gameover = createSprite(200,150,10,10);
  restart = createSprite(200,200,10,10);
 
 restart.addImage("restartlogo",restartimage);
  gameover.addImage("gameovertext",gameoverimage);
  
  restart.visible = false;
  gameover.visible = false;
  
}

function draw() {
  
   background(180);
  
  
  text("score = " + score,330,50);
  
  trex.collide(iground);
  
  if(gamestate === PLAY){
     score = score + 1;
    
    if(keyDown("space") && trex.y > 366){
    trex.velocityY = -10;
  }
    
     trex.velocityY = trex.velocityY + 0.5;
  
  ground.velocityX = -5;
    
    if(ground.x < 0){
    ground.x = ground.width/2;  
  }
    
  C();
  o();
    
    if(trex.isTouching(obstaclesgroup) ){
    gamestate = END;
    }
    
  }
  
  else if(gamestate === END){
    trex.velocityY = 0;
    ground.velocityX = 0;
    cloudsgroup.setVelocityXEach(0);
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setLifetimeEach(-1);
    obstaclesgroup.setLifetimeEach(-1);
    restart.visible = true;
    gameover.visible = true;
  }
  
  if(mousePressedOver(restart)){
    gamestate = PLAY;
    cloudsgroup.destroyEach();
    obstaclesgroup.destroyEach();
    restart.visible = false;
    gameover.visible = false;
    score = 0;
  }
  
 
  drawSprites();
}

function C(){
 
  if(frameCount % 80 === 0){
  
  var cloud = createSprite(400,10,10,10);
  cloud.y = Math.round(random(200,300));
//  cloud.velocityX = -(5 + score/200);
  cloud.velocityX = -5;
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
  cloud.lifetime = 85;
  cloud.addImage("cloud", cloudimage);
  cloudsgroup.add(cloud);
  }
}  

function o(){
  if(frameCount % 50 === 0 ){
    var obstacles = createSprite(400,375,10,10);
    
    var r = Math.round(random(1,6))
    
    switch(r){
        
      case 1: obstacles.addImage(obstacle1);
              break;
        
      case 2:obstacles.addImage(obstacle2);
              break;
        
      case 3:obstacles.addImage(obstacle3);
              break;
        
      case 4:obstacles.addImage(obstacle4);
              break;
        
      case 5:obstacles.addImage(obstacle5);
              break;
        
      case 6:obstacles.addImage(obstacle6);
              break;
     
            default: break;
    }
    
    obstacles.velocityX = -(5 + score/200);
    obstacles.scale = 0.5;
    obstacles.collide(iground);
    obstacles.lifetime = 85;
    obstaclesgroup.add(obstacles);
  }
  
}

