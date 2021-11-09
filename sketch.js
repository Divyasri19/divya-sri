//Game States
var PLAY=1;
var END=0;
var gameState=1;
var life = 1;

var divya,injection ,virus,injectionGroup,enemyGroup, score,r,randominjection, position;
var divyaImage , injection, virusImage, gameOverImage


function preload(){
  
  divyaImage = loadImage("girl.png");
  virusImage = loadAnimation("corona1.png","corona2.png")
  injectionImage = loadImage("flyling_vaccine.png");

  vaccinated = loadImage("vaccinated.png");

  gameOverImage = loadImage("gameoverskull.png")
  
}

function setup() {
  createCanvas(1900, 1900);
  
  //creating divya
  divya=createSprite(100,200,50,50);
  divya.addImage(divyaImage);
  divya.scale=0.5;
  
  //set collider for divya
  divya.setCollider("rectangle",0,0,40,40);

  
 

  // Score variables and Groups
  score=0;
  injectionGroup=createGroup();
  enemyGroup=createGroup();
  
  

  gameOver= createSprite(800, 800);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = true;
  
}


function draw() 
{
    background("black");
  // knifeSwooshSound.play() 
  divya.y=World.mouseY;
  divya.x=World.mouseX;

    textSize(20);
    fill(255);
    text("Score: " + score, 500, 40);
    text("Life: " + life, 500, 60);
    drawSprites();

  if(gameState===PLAY)
  { 
      //Call injections and Enemy function
      injections();
      Enemy();
    
    // Increase score if divya touching injection
    if(injectionGroup.isTouching(divya))
    {
      injectionGroup.destroyEach();
       // knifeSwooshSound.play();
      score=score+2;
      //restart_vaccinated.visible = true;
      
     // if (mousePressedOver(restart_vaccinated)) 
      {
        if (life > 0) 
        {
          reset();
        }
      }
    }

     // Go to end state if divya touching enemy
     if(enemyGroup.isTouching(divya)){
      gameState = END;
     
         
      // Change the animation of divya to gameover and reset its position
      divya.x=500;
      divya.y=500;
    }
  }
    else if (gameState === END) {
      

        injectionGroup.destroyEach();
        enemyGroup.destroyEach();
        injectionGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
  
      //set lifetime of the game objects so that they are never destroyed
      injectionGroup.setLifetimeEach(-1);
      enemyGroup.setLifetimeEach(-1);
  
      {
        if (life > 0) {
          reset();
        }
        else{
          gameOver.visible = true
        }
      }
  
 
}

}
function Enemy(){
  if(World.frameCount % 150===0)
  {
    virus=createSprite(1800,300,20,20);
    virus.addAnimation("moving", virusImage);
    virus.scale = 0.7;
    virus.y=Math.round(random(100,700));
    virus.velocityX=-(8+(score/10));
    virus.setLifetime=50;
    
    enemyGroup.add(virus);
  }
}

function injections() {
  //write code here to create the injection
  if (frameCount % 200 === 0) 
  {
    var injection = createSprite(600, 120, 40, 10);
    injection.y = Math.round(random(80, 200));
    injection.addImage(injectionImage);
    injection.scale = 0.1;
    injection.velocityX = -3;

    //assign lifetime to the variable
    injection.lifetime = 200;

    //adjust the depth
    injection.depth = divya.depth;
    divya.depth = divya.depth + 1;

    //add each injection to the group
    injectionGroup.add(injection);
  }

}

function reset() 
{
  gameState = PLAY;
  
  enemyGroup.destroyEach();
  injectionGroup.destroyEach();

  divya.changeAnimation("running", divyaImage);
  divya.scale = 0.5;

  if (localStorage["HighestScore"] < score) 
  {
    localStorage["HighestScore"] = score;
  }
  
  score = 0; 
}
