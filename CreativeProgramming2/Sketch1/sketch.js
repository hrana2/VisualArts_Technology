let font; 

// function preload() {
//   font = loadFont('assets/JosefinSans-Medium.ttf'); 
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  //textFont(font); 
  //textAlign(CENTER, BASELINE); 
}

function draw() {
  background('#CCCCCC');
  noFill(); 
  stroke(1); 
  text('The North Face', windowWidth/2, windowHeight/2); 
}

