//Jared Figdor
//p5 Collide 2d functon examples were refrenced
let paddle;  //initializing variables
let ball; 
let bricks; 
let rows; 
let cols; 
let brickimg;
let paddleW = false;
let timer = 0;
let score = 0;
let restart = false;
let bricksRemoved;
let collide=false;
let screens;
let over = false;
let notover = false;
let hits;
let brickSound;
let paddleSound;
let sec;
var timerValue = 0;
let backimg;

function preload () { //loading images and sound
  
  brickimg = loadImage('brickimg.jpg');
  backimg = loadImage('backimg.jpg');

}


function setup() {
  createCanvas(770,600); //setting up and declaring my variables and objects
  bricksRemoved=0;
  paddle= new Paddle();
  rows = 5;
  cols = 14;
  screens = 0;
setInterval(timeIt, 1000);


  ball = new Ball();
  brickSound = new Audio('brick.mp3');
  paddleSound = new Audio('paddlesound.mp3');
  
} 


function draw() {

  if (screens==0){ //the first screen is the starting screen
    startscreens();
  }else if(screens==2){ //screen 2 runs the game
    background(backimg); //loading background image
    scoreDisplay(); //displaying score
    ball.move();  //calling class methods
    paddle.move();
    paddle.Collision(ball);
     ball.display();
    paddle.display();
    
    
        for(let i = 0; i < rows; i ++){ //itterating though the amount of collumns and rows to display bricks
      for(let j=0;j<cols;j++){
        bricks[i][j].display();
      }   
    }
     
  
    
        for(let i = 0; i < rows; i ++){ //checking for collisions checking every brick in each row and collumn
      for(let j=0;j<cols;j++){

        bricks[i][j].Collision(ball); //calling the collision function to the respective brick
   
      }
    }
    
    if (bricksRemoved>=rows*cols){ //if all bricks are removed, show the winning screen
      screens=4;
    }

  }else if (screens==3){ //if you lose, sho the game over screen
    restartGame();
  }else if (screens==4){ 
    youWin();
  }
}

class Paddle{  //creating paddle
  constructor(){
    this.width=100;
    this.height=15;
    this.x=width/2-this.width/2
    this.y=550;
  }
  
  display(){ 
   
    fill('red');
    stroke(0);
    strokeWeight(1.5);
    rect(this.x,this.y,this.width,this.height);
    if (paddleW == true){  //used for making the paddle wider after the boolean is flipped
      this.width = 150;
      timer ++;   //using a variable to control the time the text is on screen
        textSize(26);
        fill(255);
      if (timer < 350){  //as long as the timer is under 350, the text will be on screen
        text('Its getting fast! Paddle has been widened',200,592);
      }
    }
    
   
  }
  
  Collision(ball){  //collision functiuon
      if(collideRectCircle(this.x,this.y,this.width,this.height*0.25,  //p5 collide library function checking for collsion between a circle and rectangle
                           ball.x,ball.y,ball.diameter)){
        let theta= 3/4*PI *(ball.x-this.x)/this.width+1/8*PI; //changing theta based on the position if the ball (gives us different velocity changes based on where it hits paddle)
        ball.theta=PI-theta;
        paddleSound.play();
      }    
  }
  

  move(){
    if(keyIsDown(37)&&this.x>=0){ //if the left key os pressed, move the x position by a factor of 6
      this.x-=6;
    }else if(keyIsDown(39)&&this.x+this.width<=width){  //if the right key os pressed, move the x position by a factor of 6
      this.x+=6;
    }
  }
}

class Ball{  //ball class
  constructor(){
    this.x=width/2;
    this.velocity=3;
    this.y=500;
    this.diameter=20;
    this.theta=PI/4;
  }

  display(){
    
    fill(255);
    stroke(0);
    strokeWeight(1);
    ellipse(this.x,this.y,this.diameter);
 
  }
  
  move(){  //function to move the ball
    this.x+=this.velocity*cos(this.theta);  //change x by the velocity multiplied by the cos(theta)
    this.y-=this.velocity*sin(this.theta);// changing y velocity
    if(this.x+this.diameter/2>=width){
      this.theta=PI-this.theta;     //if the ball hits the wall, subract theta from pi to change the direction
      this.x=width-this.diameter/2; 
      
    }else if(this.x-this.diameter/2<=0){
      this.theta=PI-this.theta;
      this.x=this.diameter/2;
      
    }
    if(this.y+this.diameter/2>=height){ //if the ball goes below the paddle,  change to the game over scren
      

      screens= 3;
      
      
    }
    
      
    
    if(this.y-this.diameter/2<=0){  //if the ball goes below the paddle, change the theta value
      this.theta=2*PI-this.theta;
    }

  }
}

class Brick {  //creating bricks
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 68;
    this.height = 30;
    if (random(1)>0.9){ //bricks have a small probability of recieving a hit value of 3
      this.hit=3;
    }else{
      this.hit=1;
    }
    

  }
  
  display() {
   

    image(brickimg, this.x, this.y, this.width, this.height); //putting image as brick background
    if (this.hit>=3){  //if the bricks recieve a hit value of 3, they will have two extra lines to indicate they need more hits
      strokeWeight(5);
      noFill();
      line(this.x+20, this.y + 2, this.x+20, this.y+this.height - 2);
      line(this.x+48, this.y + 2, this.x+48, this.y+this.height - 2);
    }
    if (this.hit>=2){ //removing one of the lines after collision
      strokeWeight(5);
      noFill();
       line(this.x+48, this.y + 2, this.x+48, this.y+this.height - 2);
      
    }
    

    
  }
  
  Collision(ball) { //checking bricks for collision with ball
    if(this.hit>0) {   //checking all 4 sides of the box for collision
      if(collideLineCircle(this.x, this.y, this.x+this.width, this.y, // Using a p5 collide function to check for collision on bottom of brick
                           ball.x, ball.y, ball.diameter)){
        ball.theta=2*PI-ball.theta; //if collision is true, change ball theta
        
        this.hit--;  
        score ++;  
        brickSound.play();  //play sound when hit
        ball.velocity+= 0.2;
  
      }else if(collideLineCircle(this.x, this.y+this.height, this.x+this.width, this.y+this.height,
                                 ball.x, ball.y, ball.diameter)){  // Using p5 collide function to check for collision on top of the brick
        ball.theta=2*PI-ball.theta;
        this.hit--;
        score++;
        ball.velocity+= 0.2; // increase velocity on each hit
       brickSound.play();
      }else if(collideLineCircle(this.x, this.y, this.x, this.y+this.height,
                                 ball.x, ball.y, ball.diameter)){ //Using p5 collide function to check for collision on the left side of the brick
        ball.theta=PI-ball.theta;
      ball.velocity+= 0.2;
        this.hit--;
        score++
       brickSound.play();
      }else if(collideLineCircle(this.x+this.width, this.y, this.x+this.width, this.y+this.height,
                                 ball.x, ball.y, ball.diameter)){ //Using p5 collide function to check for collision using 
        ball.theta=PI-ball.theta;
      ball.velocity+= 0.2;
        this.hit--;
        score++
        brickSound.play();
      }
      
    if (bricksRemoved > 10){ //after 10 bricks are gone, the paddle gets wider
      paddleW = true;
    }
      
  
      if (this.hit<=0){ //if hit is 0 (box is gone), add 1 to the bricks removed list
        bricksRemoved++;
    
        
      }
    }else{
        
        this.x = 1200; //if the hit gets below zero, move the brick off of the screen
        this.y = 1200;
       
    }
  
  }
}



function mousePressed(){
  if (screens==3||screens==4){ //if mouse is pressed and the screen is 3 or 4
    screens=0;  //go back to the starting screen
    score = 0; //reset the score

    start();
    timerValue = 0;
    loop();
  }else if (screens==0){ //if on starting screen

      screens=2; //go to game
    timerValue = 0;
      start(); //reset game
    
  }
}



function restartGame() { //'game over' screen
  background(0);
  fill('red')
  textAlign(CENTER);
  noStroke()
  textStyle(BOLD);
  textSize(50);
  text('GAME OVER', 380, 220)
  textSize(28);
  fill('white');
  text('Total Bricks: ' + score, 380, 260);
  text('Final Time: ' + timerValue + ' Seconds', 380,290);
  textSize(18);
  text('Click to restart game', 380, 315);
}


function startscreens(){ //starting screen
    background(0);
    fill(255);
    textAlign(CENTER);
        textSize(40);
        textStyle(BOLD);
    text('WELCOME TO BRICK BREAKER', width / 2, height / 3);
        textStyle(NORMAL);
        textSize(30);
        text('Try and clear all the bricks!', width/2, 265);
        text('Use the arrow keys to move', width/2, height /2 + 45);
    text('click to start', width / 2, height / 2 + 130);
    
}

   
function start(){  //reset function used in beginning and when you lose, resets the variables and arrays as well as used in start to initiate
  paddle= new Paddle();
  bricks = [];
  rows = 5;
  cols = 14;
   ball = new Ball();
  for (let i = 0; i < rows; i ++ ){
    let row=[];
    for(let j = 0; j < cols; j++) { //placing the bricks
      row.push(new Brick(j*77 + 5, i*52+ 5));
    }
    bricks.push(row);
  }
 
  
  bricksRemoved=0;
}
 
function scoreDisplay(){ //display score and time
  strokeWeight(0);
  textSize(20);
  fill(255);
  text("Blocks Collected: " + score ,85, height-10);
 
  text('Time: ' + timerValue , 30, height-40);
  
}

function timeIt() { //function used to create a timer for game
    if(screens==2){
    timerValue ++;
  }
    
  if(screens==3){
    timerValue = timerValue;
  }
  
  
}

function youWin() {  //screen showed if all bricks are removed
  background(0);
  fill('red')
  textAlign(CENTER);
  noStroke()
  textStyle(BOLD);
  textSize(50);
  text('You Win!!', 380, 220)
  fill('white');
  textSize(18);
  text('Click to restart game', 380, 260);
}


  