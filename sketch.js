//Jared Figdor Midterm
let g = 0;
let angle = 0;
let p;
let p2;
let fall = 100;
var ang;
var gen = 80;
let h;
let b = 0;
let al = 40;
let th;
let q = 25;
let xspacing = 16; 
let w; 
let time = 0;
let timeb = 0;
let t = 0;
let amplitude = 10; //amplitude of wave
let diam = 10; //diameter of rectangles
let period = 500.0; 
let dx; 
let yvalues;
var gravity = 0.1;
let value = 0;
var ball1;
var ball2;
var ball3;
var ball4;
var ball5;
var ball6;
var ball7;
var ball8;
var ball9;
var ball10;
let j;
let l;
let m;
let qwe;
let yu;


function setup() {
  createCanvas(800, 800);
  fill(0, 102);
  p = new Pulse(0,50); //setting variable to my object (pulsing circles)
  n = 0; //used as a sort of time function
  p2 = new Pulse(0,145);
  yu = new Pulse (400,850);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  j = new flower(0.001,800);
  v = new flowers(0.0002,300,0,0);
  qwe = new flowers(0.0002,300,800,800);// setting variables to my new objects
  ball1 = new Ball(50,100,16); // declaring all of the balls
  ball2 = new Ball(125,100,16);
  ball3 = new Ball(195,100,16);
  ball4 = new Ball(268,100,16);
  ball5 = new Ball(340,100,16);
  ball6 = new Ball(410,100,16);
  ball7 = new Ball(480,100,16);
  ball8 = new Ball(555,100,16);
  ball9 = new Ball(625,100,16);
  ball10 = new Ball(700,100,16);
  th = 0; 
}

function draw() {
  background(54, 214, 214); 
  p.display(); // displaying pulse
  p2.display();
  


  b += 1; 
  t++; //used for time

  if (t <1600 ){ //using time variable to say when to show a certain object
    wave();
  }
  if (t>3400){//bringing the wave back in to the frame using time
    wave();
  }
  if (t>5000){ //making g change only after t is greater than 5000
    g += 1;
  }

  if (t>5000){ 
    background(0,g);//make the background black after t is greater than 5000
  }
  if (t>5050){
    yu.pulseAgain();//calling our pulsing 'bugs' back in to the frame
  }

  if (t > 1400 && t < 2500){//using time variable to say when to show a certain object
    j.updat();
  }
  if(t > 4000){//using time variable to say when to show a certain object
    v.updat();
    qwe.updat();
  }


  if (t > 2500 && t <3750){//using time variable to say when to show a certain object
    timeb +=2
    rectangle();
  }


  
  al += 0.1 

  if (t>1400 && t < 1600){ //using alpha to transition
    al -= 1;
  }



  if (t > 1600){ 
    al = 75;
  }
  if (t>1530){
    q += 0.05;
  } 
  if (q > 150){
    q = 20;
  }

  
}

class Pulse { //class for pulsing circles in beginning
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display(){
    angle += 5;
    let val = cos(radians(angle)) * 20;
    for (let a = 0; a < 360; a += 75) { //itterating 5 times by 75 each time giving me 5 circles
      let xoff = cos(radians(a)) * val; // calculating the offset from the centrer
      let yoff = sin(radians(a)) * val;

      fill(200,0,b);
      stroke(200);
      for (let i = 0; i < 15; i ++){ //using a for loop to manipulate i to use as the size of my circles
        ellipse(this.x + xoff, this.y + yoff, i, i);


      }
      
      
    }
    fill(255);
    ellipse(this.x, this.y, 2, 2);

    if (this.x < 795 && t < 4900){ //when the shape reaches the end take it out of view
      this.x += 1;
    }else{
      this.x = 850;
    }

    if (b > 255){
      b = 0;
    }
    if (this.x > 50){//all of these update and show functions below are being used to display object (ball) in a timely manner
                      // and then update it top make the ball fall
      ball1.show();
    }
    if (this.x > 725){
      ball1.update();
    }
    if(this.x > 125){
      ball2.show();
    }
    if (this.x > 730){
      ball2.update();
    }

    if (this.x > 195){
      ball3.show();
    }
    if (this.x > 735){
      ball3.update();
    }
    if(this.x > 268){
      ball4.show();
    }
    if (this.x > 740){
      ball4.update();
    }
    if (this.x > 340){
      ball5.show();
    }
    if (this.x > 745){
      ball5.update();
    }
    if(this.x > 410){
      ball6.show();
    }
    if (this.x > 750){
      ball6.update();
    }
    if (this.x > 480){
      ball7.show();
    }
    if (this.x > 755){
      ball7.update();
    }
    if (this.x > 555){
      ball8.show();
    }
    if (this.x > 760){
      ball8.update();
    }
    if(this.x > 625){
      ball9.show();
    }
    if (this.x > 765){
      ball9.update();
    }
    if(this.x > 700){
      ball10.show();
    }
    if (this.x > 770){
      ball10.update();
    }



       if (t > 2700){ /* running the second update function to make the balls go back up */
      ball1.updatetwo();
    }
    if(t > 2750){
      ball2.updatetwo();
    }
    if (t > 2800){
      ball3.updatetwo();
    }
    if (t > 2850){
      ball4.updatetwo();
    }
    if (t > 2900){
      ball5.updatetwo();
    }
    if (t > 2950){
      ball6.updatetwo();
    }
    if (t > 3000){
      ball7.updatetwo();
    }
    if(t > 3050){
      ball8.updatetwo();
    }
    if (t > 3100){
      ball9.updatetwo();
    }
    if (t > 3150){
      ball10.updatetwo();
    }

  }

  pulseAgain(){
   angle += 5;
    let val = cos(radians(angle)) * 20;
    for (let a = 0; a < 360; a += 75) { //itterating 5 times by 75 each time giving me 5 circles
      let xoff = cos(radians(a)) * val; // calculating the offset from the centrer
      let yoff = sin(radians(a)) * val;

      fill(200,0,b);
      stroke(255);
      for (let i = 0; i < 15; i ++){ //using a for loop to manipulate i to use as the size of my circles
        ellipse(this.x + xoff, this.y + yoff, i, i);


      }
      
      
    }
    fill(255);
    ellipse(this.x, this.y, 2, 2);








        if (t>5000){
      this.y -= 1;
      ellipse(this.x,this.y,2,2);
    }
  }
}

function rectangle(){ //creating a function for the pulsing and duplicating rectangles

  if (timeb < 200){ //using time to increase my diameter over time
    diam += 5;
  }

  if (timeb > 200){
    diam -= 5;
  }
  if (timeb > 400){//resets the time and diameter
    diam += 0;
    timeb = 0;
  }

  
  noStroke();
  fill(247,62,127,50);
  rectMode(CENTER);
  rect(width/2,height/2, diam, diam);
  if (t > 2600){ //adding each rectangle using an if statement with a time variable so each rectangle gets added 1 by 1
    stroke(0);  // and so they do not show up until I want them to
    rect(width/2,height/2,diam + 75, diam + 75);
  }
  if (t > 2700){
    rect(width/2,height/2,diam + 150, diam + 150);
  }
  if (t > 2800){
    rect(width/2,height/2,diam + 225, diam + 225);
  }
  if (t > 2900){
    rect(width/2,height/2,diam - 75 , diam - 75);
  }
  if (t > 3000){
    rect(width/2,height/2,diam + 300 , diam + 300);
  }
  if (t > 3100){
    rect(width/2,height/2,diam - 150 , diam - 150);
  }


}

function wave() {
 
  th += 0.2;
  
  time += 2;
  if (time > 1880){ //using time to change my amplitude over time
    amplitude += 3;
  }
  if (time > 2100){//when the time goes over 2100, increment amplitude by -10
    amplitude -= 10;
  }
  if (time > 2400){
    amplitude += 10;
  }
  if (t > 3200){
    amplitude -= 10;
  }
  if (t > 3400){
    amplitude += 10;
  }
  if(t>3800){
    amplitude -= 10;
  }
  if(t>3800 && amplitude <=91){ //'catches' the curve on the screen
    amplitude = 91;
  }
let ca = map(mouseX, 0, width, 0, 60);//using map to make mouseX register between 0 and 60
if(t<1000){
  amplitude = ca;// make mouseX control the amplitude of the wave
}
let cap = map(mouseX, 0, width, 0, 0.05);//using map to make mouseX only go from 0 to 0.05
if(t>3800){
  th = th + cap;//make the speed of trhe wave controlled by mousdeX
}



  
  let x = th;
  for (let i = 0; i < yvalues.length; i++) {//calculating a y value using sin
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }




  noStroke();

  if(t>3800){ //using a different time variable and telling it to being counting after the initial time variable reaches 3800
    n += 0.05;
  }
  

  
  
    
    fill(200,0,175,al);
    for (let x = 0; x < yvalues.length; x++) {//using a for loop to draw all of ellipses in a sin formation across the screen


      ellipse((x * xspacing) -15, height / 2.7 + yvalues[x]-10, 16, 16); //using time variable n to control when the extra siun waves come on to screen
    
     
      if (n>6){
        ellipse((x*xspacing)+0,height/2.25 + yvalues[x]-40,16,16);
      }
      if (n>8 ){
        ellipse((x*xspacing)+15,height/2 + yvalues[x]-50,16,16);
      }
      if (n>10){
        ellipse((x*xspacing)+20,height/1.85 + yvalues[x]-60,16,16);
      }
      if (n>12){
        ellipse((x*xspacing)+25,height/1.7 + yvalues[x]-70,16,16);
      }
      if (n>12){
        ellipse((x*xspacing)+30,height/1.55 + yvalues[x]-80,16,16);
      }
      if (n>12){
        ellipse((x*xspacing)+30,height/1.4 + yvalues[x]-90,16,16);
      }
    }
  }
  class flower{ //class for the line 'flower'
    constructor(gen,h){ //my constructors control the speed as well as size of the 'flowers'
      this.h = h;
    }
    updat(){ 
      ang = sin(gen*44)*44;

      push(); //push matrix
      translate(400, 400); //translating matrix to mouse X and Y position
      rotate(gen*2);
      for(let i = 0; i < 250; i+= 1){//using a for loop to draw 250 lines
        rotate(6 / gen*44);//rotating the shapes
        stroke(255,245,254,q);
        strokeWeight(3);
        noFill();
        curve(i, i, 0, ang+i, this.h, ang-i, i+this.h, i);
      }
      pop();
      if (mouseIsPressed == true){//slowing the rotation if mouse is pressed
        gen += 0.006;

      }else{
        gen += 0.001
      }
    }
  }
  class flowers{//copied the other flower class so I could translate to coordinates instead
    constructor(gen,h,l,m){
      this.h = h;
      this.l = l; //l and m are used as x and y here
      this.m = m;
    }
    updat(){
      ang = sin(gen*44)*44;

      push();
      translate(this.l,this.m);
      rotate(gen*2);
      for(let i = 0; i < 250; i+= 1){
        rotate(6 / gen*44);
        stroke(255,233,244,60);
        strokeWeight(3);
        noFill();
        line(i, i, 0, ang+i, this.h, ang-i, i+this.h, i);
      }
      pop();
      if (mouseIsPressed == true){
        gen += 0.0007;

      }else{
        gen += 0.001
      }
    }
  }

  function Ball(posX, posY, posV) { //function for the falling balls
  this.x = posX; 
  this.y = posY;  
  this.w = posV;  
  this.speed = 0;  

  this.show = function() {//displays ellipses
    
    fill(175); 
    stroke(0); 
    ellipse(this.x,this.y,10,10);
  }

  this.update = function() {
    this.y = this.y + this.speed;  //adds the speed to location of ball

    
    this.speed = this.speed + gravity; //adds speed with gravity

    if (this.y > 250 && this.y < 799 && t < 2600){ //creating a 'slow zone' for the balls when they fall
      this.speed = 2;
    }
    if(this.y >799 && t < 3200){
      this.speed = (this.speed * -0.5); 
    }
  }

    this.updatetwo = function() {
    this.y = this.y + this.speed;  //adds the speed to location of ball

    
    this.speed = this.speed + gravity; //adds speed with gravity

    
      this.speed = -3;
    }
   
  }


