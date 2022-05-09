//Jared Figdor

let rows = 8;
let cols = 10;
let barFactor = 200;
let moveRight = false;
let moveLeft = false;
let screen = 0;
let yP = 580;
let wP = 100;
let hP = 15;
let game = true;
let velocityX = 6;
let velocityY = 6;
let score = 0;
let lives = 3;
let restart = false;
let bricks = [];
let colorArray = ["#B30F0C", "#B3360C", "#B3570C", "#B3810C", "#B3A50C", "#A2B30C", "#6DB30C", "#0CB320"];
let ballSrc = {x: barFactor + 50, y: 580, radius: 20};
let pSrc= {x: barFactor + 50,  y: 0};
let pSpeed = 10;
let Paddle;
let balls;


function setup() {
  createCanvas(800,600);
  createBricks();
}


function draw() {
   pSpeed += 0.003;
     
  if (screen == 0){
    startScreen();
  }
  if (game == true && restart == false && screen == 1){ 
    ball()
  }
  if (restart == true && game == true){ 
    lifeLost()
  }
  if (game == false && restart== true){ 
    restartGame()
  }
  if (game== true && screen == 1) {
    scoreDisplay();
    livesDisplay();
    drawBricks();
    checkBricks();
    paddle();
    drawPaddle();
    

  }
   if (score > 1){
     pSpeed  += 3;
     powerUp();
   }
  

  
}



function paddle() {
this.x = barFactor
  this.y = yP;
  this.w = wP;
  this.h = hP;

}

function drawPaddle(){

  if (moveRight && barFactor < 700) {
    barFactor += 10
  }
  if (moveLeft && barFactor > 0) {
    barFactor += -10
  }
}

function ball() {
  background('black');
  noStroke()
  fill('white')
  ellipse(ballSrc.x, ballSrc.y, ballSrc.radius, ballSrc.radius)
  if (ballSrc.y <= 0) {
    velocityY = -velocityY
    score++
  }
  
    Paddle = new paddle();
    fill('red');
  rect(barFactor, Paddle.y,Paddle.w ,Paddle.h);
  if (ballSrc.y >= height - 20 && ballSrc.x > Paddle.x && ballSrc.x <= Paddle.x + wP) {//based on where it hits bar
    velocityY = -velocityY
    if (velocityX > 0) velocityX = -velocityX
    if (velocityX < 0) velocityX = velocityX
  }
  //if (ballSrc.y >= height - 15 && ballSrc.x > barFactor + 50 && ballSrc.x <= barFactor + 100) {
  //  velocityY = -velocityY
   // if (velocityX > 0) velocityX = velocityX;
  //  if (velocityX < 0) velocityX = -velocityX;
//  }
  if (ballSrc.x >= width - 10 || ballSrc.x <= 0) {
    velocityX = -velocityX
  }


  
  if (ballSrc.y > height) {
    lives--;
    restart = true;
    if (lives === 0) game = false;
  }
  ballSrc.x += velocityX;
  ballSrc.y += velocityY;
}

function createBricks() {
  const brickWidth = width / cols;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let brick = {
        x: i * 70 + 40,
        y: j * 20 + 30,
        width: 65,
        height: 18,
        color: colorArray[j]
      }
      bricks.push(brick)
    }
  }
}

function drawBricks() {
  bricks.forEach(brick => {
    fill(brick.color)
    rect(brick.x, brick.y, brick.width, brick.height)
     

  })

}

function keyPressed(value) {
  if (value.key === 'ArrowRight') {
    moveRight = true
  }
  if (value.key === 'ArrowLeft') {
    moveLeft = true
  }
  if (value.keyCode === 32 && restart == true) {
    restart = false
    ballSrc.x = barFactor + 50
    ballSrc.y = 580
  }
  if (value.keyCode === 32 && game == false) {
    game = true
    ballSrc.x = barFactor + 50
    ballSrc.y = 580
    score = 0;
    lives = 3;
    velocityY = -6
    barFactor = 250;
    createBricks()
  }
}

function keyReleased(value) {
  if (value.key === 'ArrowRight') {
    moveRight = false
  }
  if (value.key === 'ArrowLeft') {
    moveLeft = false
  }
}

function restartGame() {
  background(0);
  fill('red')
  textAlign(CENTER);
  noStroke()
  textStyle(BOLD);
  textSize(38)
  text('GAME OVER', 300, 170)
  textSize(28);
  fill('white');
  text('Final score: ' + score, 300, 200);
  textSize(18);
  text('Press SpaceBar to restart game', 300, 225);
}

function lifeLost() {
  background(0);
  fill('#FFEEEE')
  textAlign(CENTER);
  noStroke()
  textStyle(BOLD);
  textFont('Arial');
  textSize(36)
  text('Life Lost', 400, 350);
  textFont('Arial');
  textSize(24);
  fill('green');
  text(lives + ' lives remaining', 400, 375);
  textSize(18);
  fill('white');
  text('Press SpaceBar to continue', 400, 400);
}

function scoreDisplay() {
  fill('#FFEEEE')
  textStyle(BOLD);
  textAlign(CENTER);
  noStroke();
  textSize(20);
  text('Score: ' + score, 750, 20);
}

function livesDisplay() {
  textStyle(BOLD);
  textAlign(CENTER);
  noStroke()
  textSize(18);
  text('Lives: ' + lives, 40, 20);
}

function checkCollision(ball, brick) {
  if (ball.y - 30 < brick.y && ball.x > brick.x && ball.x <= brick.x + 65) {
    return true
        
  }
}

function startScreen(){
    background(0);
    fill(255);
    textAlign(CENTER);
        textSize(40);
    text('WELCOME TO BRICK BREAKER', width / 2, height / 2)
    text('click to start', width / 2, height / 2 + 45);
    
}

function mousePressed(){
  if(screen==0){
    screen=1;
  }else if(screen==2){
    screen=0;
  }
  
}

function powerUp(){
  
 fill(255);
  ellipse(pSrc.x,pSpeed,50,50);
  if (pSpeed >= height - 25 && pSrc.x > Paddle.x && pSrc.x <= Paddle.x + wP){
    wP = 200;
    
}
}

  function checkBricks(ball, brick){
    bricks.forEach((item, index) => {
    if(checkCollision(ballSrc, item)){
      velocityY = -velocityY
      score++
      bricks.splice(index, 1);
      
      
   
    }
  })
    
   
  
  }


   
  
  