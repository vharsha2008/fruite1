var sword,s_i;
var gameOver,gO_i;
var fruit1,fruit2,fruit3,fruit4;
var f1_i,f2_i,f3_i,f4_i;

var alien1,alien2;
var a1_i,a2_i;
var gO_i;
var PLAY=1;
var END=0;
var gameState=1;

var gameoverS,knifeS;
var score=0;
function preload(){
  s_i=loadImage("sword.png");
  f2_i=loadImage("fruit2.png");
   f3_i=loadImage("fruit3.png");
   f4_i=loadImage("fruit4.png");
   f1_i=loadImage("fruit1.png");
   a1_i=loadImage("alien1.png");
  a2_i=loadImage("alien2.png");
  gO_i=loadImage("gameover.png");
  gameoverS=loadSound("gameover.mp3");
  knifeS=loadSound("knifeSwooshSound.mp3");
}


function setup(){
  createCanvas(600,600);
  
  sword=createSprite(300,300,10,10);
  sword.addImage(s_i);
  sword.scale=0.5;
  
  alienGroup=new Group();
  fruitGroup=new Group();
}
function draw(){
  background("lightblue");
  if(gameState===PLAY){
    sword.x=World.mouseX;
    sword.y=World.mouseY;
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeS.play();
      score=score+2;
      
    }
    if(alienGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      alienGroup.destroyEach();
      gameState=END;
    }
    ENEMY();
    fruits();
    if(gameState===END){
      fruitGroup.setVelocityXEach(0);
      alienGroup.setVelocityXEach(0);
      sword.addImage(gO_i);
      sword.scale=1.5
      sword.x=200;
      sword.y=200;
      gameoverS.play();
}
    
  }
drawSprites();
  text("score"+score,500,50)
}

function fruits(){
  if(World.frameCount%80===0){
    position=Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(f1_i);
    }else if(r==2){
      fruit.addImage(f2_i);
    }else if(r==3){
      fruit.addImage(f3_i);
    }else if(r==4){
      fruit.addImage(f4_i);
    }
    if(position==1)
      {
        fruit.x=400;
        fruit.velocityX=-(7+(score/4));
      }
    else
      {
        if(position==2){
          fruit.x=0;
          fruit.velocityX=(7+(score/4))
        }
      }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
    
  }
      
    
  
}
function ENEMY(){
  if(World.frameCount%200===0){
    alien=createSprite(400,200,20,20);
    
     alien.addAnimation("moving",a1_i);
    alien.y=Math.round(random(50,340));
    alien.velocityX=-(7+(score/10));
    alien.setLifetime=100;
    
    alienGroup.add(alien);
  }
  if(World.frameCount%200===0){
    alien2=createSprite(0,200,20,20);
    alien2.addAnimation("moving",a2_i);
    alien2.y=Math.round(random(50,340));
    alien2.velocityX=(7+(score/10));
    alien2.setLifetime=100;
    
    alienGroup.add(alien2);
  }
}


