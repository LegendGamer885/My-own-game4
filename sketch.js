//breakout close (core mechanics)
//mouse to control the paddle, click to start
var paddle, ball, wallTop, wallBottom, wallLeft, wallRight;
var bricks;
var MAX_SPEED = 9;
var WALL_THICKNESS = 30;
var BRICK_W = 80;
var BRICK_H = 40;
var BRICK_MARGIN = 4;
var ROWS = 4;
var COLUMNS = 8;
var colors = ["red","orange","green", "yellow"];
var gameOver,gameOverImg;
var ballImg;
var backgroundImg;
var play,end;

var hitSound;

var gameState = "play"

function preload(){
  backgroundImg = loadImage("background.jpg");
  gameOverImg = loadImage("game over.jpg");
  ballImg = loadImage("ball.png");

  hitSound = loadSound("./hit.mp3")
  brick_hit = loadSound("brick.mp3")
}

function setup() {
  createCanvas(800, 600);
  paddle = createSprite(width/2, height-50, 120, 10);
  paddle.immovable = true;

  wallTop = createSprite(width/2, -WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  wallTop.immovable = true;

  wallBottom = createSprite(width/2, height+WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  wallBottom.immovable = true;

  wallLeft = createSprite(-WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  wallLeft.immovable = true;

  wallRight = createSprite(width+WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  wallRight.immovable = true;

  bricks = new Group();

  var offsetX = width/2-(COLUMNS-1)*(BRICK_MARGIN+BRICK_W)/2;
  var offsetY = 80;

  for(var r = 0; r<ROWS; r++)
    for(var c = 0; c<COLUMNS; c++) {
      var brick = createSprite(offsetX+c*(BRICK_W+BRICK_MARGIN), offsetY+r*(BRICK_H+BRICK_MARGIN), BRICK_W, BRICK_H);
      brick.shapeColor = colors[r];
      bricks.add(brick);
      brick.immovable = true;
    }

  //the easiest way to avoid pesky multiple collision is to
  //have the ball bigger than the bricks
  ball = createSprite(width/2, height-200, 20, 20);
  ball.addImage(ballImg);
  ball.scale = 0.08;
  ball.maxSpeed = MAX_SPEED;
  paddle.shapeColor = color(0, 0, 255);

  gameOver = createSprite(width/2,height/2,40,40);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
}
function draw() {
  background(backgroundImg);
  
  if(gameState=== "play"){
    paddle.position.x = constrain(mouseX, paddle.width/2, width-paddle.width/2);
    
    
    ball.bounce(wallTop);
    ball.bounce(wallLeft);-
    ball.bounce(wallRight); 
    
    

    if(ball.bounce(paddle))
    {
      hitSound.play()

      var swing = (ball.position.x-paddle.position.x)/3;
      ball.setSpeed(MAX_SPEED, ball.getDirection()+swing);
       hitSound.setVolume(1);
    }
    ball.bounce(bricks, brickHit);
  
    if(ball.collide(wallBottom)){
      gameState = "end";
    }

    if(bricks.length === 0){
      gameState = "win"
    }

  }

  if(gameState === "win"){
    textSize(32);
    fill("green");
    text('Congratulations you won the game !!!', 110, height/2);
  }
  
  if(gameState === "end"){
    gameOver.visible = true;
    bricks.visible = false;
  }

  drawSprites();
  
}

function mousePressed() {
  if(ball.velocity.x == 0 && ball.velocity.y == 0)
    ball.setSpeed(MAX_SPEED, random(90-10, 90+10));
}
function brickHit(ball, brick) {
  brick.remove();
  brick_hit.play();
}

// function keyPressed(){
//   if(keyCode == 82){
//     score = 0;
//     gameState = "play";
//     gameOver.visible = false;
//     paddle.visible = true;
//     bricks.removeSprites();

//     ball = createSprite(width/2, height-200, 20, 20);
//     ball.addImage(ballImg);
//     ball.scale = 0.08;
//     ball.maxSpeed = MAX_SPEED;

//     var offsetX = width/2-(COLUMNS-1)*(BRICK_MARGIN+BRICK_W)/2;
//     var offsetY = 80;

//     for(var r = 0; r<ROWS; r++){
//       for(var c = 0; c<COLUMNS; c++) {
//         var brick = createSprite(offsetX+c*(BRICK_W+BRICK_MARGIN), offsetY+r*(BRICK_H+BRICK_MARGIN), BRICK_W, BRICK_H);
//         brick.shapeColor = colors[r];
//         bricks.add(brick);
//         brick.immovable = true;
//       }
//     }
    
//   }
// }