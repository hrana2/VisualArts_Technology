/*
HAR 371 Final Project 
Himanshu Rana 

*/

let startButton; //button for the first scene 
let whichScene = 0;   // variable to control which scene is shown

let startTime = 0; //starting the time for when the user clicks on button 


let warmth = 'Warmth';
let comfort = 'Comfort';

//angles for word
let startAngle = 0; // angle where text should start
let distanceAngle = 90; // how far (in degrees) text will go
let radius; // set dynamically in setup()
let wordAngle = 0; 


//image angle stuff 
let imageAngle = 0; 
let imageScale = 3.0; 


let alata; //font 


//bezier on intro scene 
let bezierX1; 
let speed = 1; 

//article images 
let article1; 
let article2; 
let article3; 
let article4; 
let alpha = 0; 
let imageX; 

//word wave 
let yWave; 
let yWaveSize = 10; 
let yWaveLength = 0.5;  
let yWaveSpeed = 0.05; 
let tracking = 25; 
let inp = 'enjoy the ride';

//alegria art people and objects; 
let leftMan, rightMan, leftWoman, rightWoman; 
let man1, man2, woman1, woman2; 
let cloud1, cloud2, cloud3; 
let cloudX; 
let cloudSpeed = 1; 

function preload() {
  alata = loadFont('assets/Alata-Regular.ttf');
  article1 = loadImage('images/cambridgeAnalytical.png'); 
  article2 = loadImage('images/criminalInvestigation.png'); 
  article3 = loadImage('images/howFBusesYourData.png'); 

  leftMan = loadImage('images/people/pink_man1.png'); 
  rightMan = loadImage('images/people/pink_man2.png'); 
  leftWoman = loadImage('images/people/pink_woman1.png'); 
  rightWoman = loadImage('images/people/purple_woman1.png'); 

  cloud1 = loadImage('images/objects/2.png'); 
  cloud2 = loadImage('images/objects/3.png'); 
  cloud3 = loadImage('images/objects/4.png'); 

  man1 = loadImage('images/people/Man1-1.png'); 
  man2 = loadImage('images/people/Man2-1.png'); 
  woman1 = loadImage('images/people/Woman1-1.png'); 
  woman2 = loadImage('images/people/Woman2-1.png'); 

}


function setup() {
  createCanvas(windowWidth, windowHeight);


  startButton = createButton('enter :) ');
  startButton.position(windowWidth/2 - 75, windowHeight/2);
  startButton.mousePressed(goToScene1);

  radius = 55;


  textSize(radius / 3);
  textFont(alata);
  textAlign(CENTER, BASELINE);

  bezierX1 = width/2; 

  imageMode(CENTER);
  article1.resize(400,100); 
  article2.resize(400,100); 
  article3.resize(400,100); 
  //article4.resize(400,200); 

  leftMan.resize(150,350); 
  leftWoman.resize(150,350); 
  rightMan.resize(150,350); 
  rightWoman.resize(150,350); 

  cloud1.resize(100,50); 
  cloud2.resize(100,50); 
  cloud3.resize(100,50); 
  cloudX = width/2; 

  man1.resize(350,350); 
  man2.resize(350,350); 
  woman1.resize(350,350); 
  woman2.resize(350,350); 

}

function goToScene1() {
  startTime = millis(); 
  whichScene = 1; 
}


function draw() {
  // intro code could go here, if you want one
  if (whichScene === 0) {
    intro();
  }
  else if (whichScene === 1) {
    //console.log(startTime); 
    if(millis() > startTime + 10000) {
      whichScene = 2; 
    }
    sceneOne();
  }
  else if (whichScene === 2) {
    sceneTwo();
  } 
  else if(whichScene === 3) {
    sceneThree(); 
  } 
  
}


function intro() {
  
  background('#6ccfbd');

  //people in the intro scene 
  //imageMode(CENTER); 
  image(leftMan, 100, windowHeight-170); 
  image(leftWoman, 200, windowHeight-170); 
  image(rightMan, 1000, windowHeight-170); 
  image(rightWoman, 1100, windowHeight-170); 
  
  //clouds in the intro scene 
  image(cloud1, cloudX - 200, 100); 
  image(cloud2, cloudX- 100, 100);   
  image(cloud3, cloudX, 100); 
  image(cloud2, cloudX + 100, 100); 
  image(cloud1, cloudX + 200, 100); 
  cloudX += cloudSpeed; 

  //if the clouds reach the end of the screen, reverse direction 
  if(cloudX > windowWidth - 250 || cloudX < 230) {
    cloudSpeed *= -1; 
  }

  translate(width/2 - 190,height/2 - 50);

  //https://editor.p5js.org/kiel.d.m/sketches/ZRMoatb5Y
  //link for original source to make text move in a wave 
  for(var i = 0; i < inp.length; i++){
    yWave = sin(frameCount*yWaveSpeed + i*yWaveLength) * yWaveSize;
    
    noStroke(); 
    fill(0);
    push();
    translate(i*tracking,0);
    text(inp.charAt(i),0,yWave);
    pop();
  }
  
}


function sceneOne() {

  startButton.hide(); 
  //background(220); 

  noStroke();
  //green rectangle - left 
  fill('#c7ffd2');
  rect(0, 0, windowWidth / 2, windowHeight);

  //pink rectangle - right
  fill('#ffd8d8');
  rect(windowWidth / 2, 0, windowWidth / 2, windowHeight);

  //orange circle - top left 
  fill('#f67452');
  circle(windowWidth / 2 - 200, windowHeight / 4, 100);


  //purple circle - top right 
  fill('#6a52b2');
  circle(windowWidth / 2 + 200, windowHeight / 4, 100);

  fill(0); 
  text("Joy", width/4, windowHeight - windowHeight/4);
  text("Happy", windowWidth - windowWidth/4, windowHeight - windowHeight/4);

 
  //letter and word rotation

  //word Warmth
  let angleBetweenLetters = radians(distanceAngle) / warmth.length;

  push();
  translate(width / 2 - 200, height / 2 - 150);
  rotate(wordAngle); 
    for (let i = 0; i < warmth.length; i++) {

      push();
      rotate(i * angleBetweenLetters);
      translate(0, -radius);
      fill(0);
      noStroke();
      text(warmth[i], 0, 0);
      pop();

    }

  
  pop();
  wordAngle+= radians(2); 


  //word Comfort
  let angleBetweenLetters2 = radians(distanceAngle) / comfort.length;

  push();
  translate(width / 2 + 205, height / 2 - 150);
  rotate(wordAngle); 
  for (let i = 0; i < comfort.length; i++) {

    push();
    rotate(i * angleBetweenLetters2);
    translate(0, -radius);
    fill(0);
    noStroke();
    text(comfort[i], 0, 0);
    pop();
  }
  pop();


  //fill(0); 
  //nose lines 
  stroke(1); 
  strokeWeight(4); 
  line((windowWidth/2) + 25, windowHeight/2 - 50, windowWidth/2 - 25, windowHeight/2 + 100);
  line(windowWidth/2 - 25, windowHeight/2 + 100, windowWidth/2 + 25, windowHeight/2 + 100) 


  noFill();

  //bezier to make the smile 
  beginShape();
  vertex(width/2, height/2 + 200);
  bezierVertex(width/2, height/2 + 200, width/2+137, height/2+204, width/2+139, height/2 +120);
  endShape();

}

//making the rectangles move 
let disappear = 1; 

function sceneTwo() {
  // same for the second scene
  background(220); 
  wordAngle = 0; 

  noStroke(); 
  //green rectangle - left 
  fill('#c7ffd2');
  rect(0, 0, windowWidth / 2, windowHeight - disappear);
  disappear++; 

  //pink rectangle - right
  fill('#ffd8d8');
  rect(windowWidth / 2 + disappear, 0, windowWidth / 2 + disappear, windowHeight);

  //orange circle - top left 
  fill('#f67452');
  circle(windowWidth / 2 - 200, windowHeight / 4 + disappear, 100);


  //purple circle - top right 
  fill('#6a52b2');
  circle(windowWidth / 2 + 200 - disappear*1.5, windowHeight / 4, 100);


  fill(0); 
  stroke(1); 
  strokeWeight(4); 
  line((windowWidth/2) + 25 + disappear, windowHeight/2 - 50 - disappear, windowWidth/2 - 25 + disappear, windowHeight/2 + 100 - disappear);
  line(windowWidth/2 - 25 + disappear, windowHeight/2 + 100, windowWidth/2 + 25 + disappear, windowHeight/2 + 100) 

  // console.log(disappear); 

  //when the objects have moved off screen, switch to next scene 
  if(disappear > 600) {
    whichScene++; 
  }
  
}

function sceneThree() {
  background(220); 
  //making the headlines fade in 
  tint(255, alpha); 
    if(alpha == 255) {
      alpha = 255; 
    } else {
      alpha++; 
    }
   

  //my headline of "what's lying underneath" which "lying" in red 
  fill(0); 
  noStroke(); 
  textFont('Georgia'); 
  textStyle(BOLDITALIC);
  textSize(25); 
  text("What's", windowWidth/2-100, windowHeight/2 - 200); 
  fill(255,0,0); 
  text("Lying", windowWidth/2-5, windowHeight/2 - 200); 
  fill(0); 
  text("Underneath", windowWidth/2+120, windowHeight/2 - 200); 



  //displaying artcile headlines 
  image(article1, width/2 + 100, height/2); 
  image(article2, width/2 - 50, height/2 + 100); 
  image(article3, width/2 - 50, height/2 - 100); 


  //my own creations 
  image(man1, width/4, height/4); 
  image(woman2, width/4, height/4 + 300); 
  image(man2, windowWidth - windowWidth/4 + 50, height/4); 
  image(woman1, windowWidth - windowWidth/4 + 50, height/4 + 300); 


}