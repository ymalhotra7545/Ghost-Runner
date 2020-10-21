var tower,towerImage
var door, doorImage, doorGroup;
var climber, climberImage;
var ghost, ghostImage;
var invisble, invisibleGroup;
var gamestate = "play";
var spooky;





function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spooky = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower", towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,50,50);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.4;
  
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
}

function draw(){
  background(0);
  spooky.loop();
  
  if(gamestate === "play"){
    
  if(tower.y >600){
     tower.y = 300;
  }
  console.log(tower.y);
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  if(keyDown("left")){
    ghost.x = ghost.x -3;
  }
  
  if(keyDown("right")){
    ghost.x = ghost.x +3;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
  }
  
  if(invisibleGroup.isTouching(ghost)||ghost>600)  {
    ghost.destroy();
    gamestate = "end";
  }
  
  spawndoor();
  drawSprites();
  }
  else
    if(gamestate === "end"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("GAME OVER", 230, 250);
    }
      
}

function spawndoor(){
  if(frameCount % 240===0){
    door = createSprite(200,-50);
    door.addImage("door", doorImage);
    door.x = Math.round(random(100,500))
    
    climber = createSprite(door.x,10);
    climber.addImage("climber", climberImage);
    
    invisible = createSprite(door.x, 15, climber.width, 2);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisible.velocityY = 1;
    
    door.lifetime = 600;
    climber.lifetime = 600;
    invisible.lifetime = 600;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleGroup.add(invisible);
    
    ghost.depth = door.depth
    ghost.depth += 1;
    
    invisible.debug = true;
    
    
  
  }
  
  
}

