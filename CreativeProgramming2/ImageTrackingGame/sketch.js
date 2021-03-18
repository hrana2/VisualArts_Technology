/*
In the past few years, we've seen a huge jump in
performance and availability of new tools for
helping computers see and identify objects in the
world. This example uses TensorFlow.js, the
Javascript version of Google's widely-used (and
suuuuper complicated) library TensorFlow.

In this example, TensorFlow.js loads COCO (Common 
Objects in Context), a long-used machine-learning 
model sponsored by Microsoft and Facebook. It is 
trained on about 330k images of 91 different objects. 
For each image, a human drew an outline around that 
object, which is then fed into a neural network 
that crunched the pixels from all of those images, 
resulting in a rather compact 'model' that can be 
used on images the system has never seen before!


More about COCO:
+ https://cocodataset.org
+ List of objects that COCO can identify
  in CocoObjects.txt (in this folder)

BASED ON
+ https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd
*/

let video; // webcam input
let model; // coco-ssd model

//bounding box variables 
var x, y, w, h;


//variables for ball objects 
var ball1;

//game stuff
var points = 0;
var lives = 3;

function setup() {
  createCanvas(640, 480);

  // start video as usual
  video = createCapture(VIDEO);
  video.hide();

  // load the coco-ssd model (this can take
  // quite a while), when done, set our
  // model to the loaded one
  console.log('loading model...');
  cocoSsd.load().then(cocoSsd => {
    console.log('- loaded');
    model = cocoSsd;
  });

  ball1 = new Ball();

}


function draw() {
  image(video, 0, 0);

  //displaying the text for points and lives 
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Points", width / 2 - 250, height / 2 - 170);
  text("Lives", width / 2 + 250, height / 2 - 170);
  text(points, width / 2 - 250, height / 2 - 130);
  text(lives, width / 2 + 250, height / 2 - 130);
  //if user has no lives left then end the game 
  if (lives < 1) {
    this.speed = 0;
    fill(255, 0, 0);
    textSize(40); 
    textStyle(BOLD); 
    text("GAME OVER", width / 2, height / 2);
  }


  // if the webcam is working and the model
  // has been loaded, go ahead...
  if (video.width > 0 && model !== undefined) {

    // tensorflow.js requires the input to
    // be in a specific format – we grab the
    // all the pixels (from 0,0 to width,height)
    // from 'drawingContext' (our canvas)...
    const imgData = drawingContext.getImageData(0, 0, width, height);

    // ...and feed that into the model to 
    // find objects in the frame!
    model.detect(imgData).then(predictions => {

      // the predictions come back as a list
      for (let p of predictions) {


        if (p.class !== 'cell phone') {
          continue;
        }
        // includes a bounding box
        // for the object
        x = p.bbox[0];
        y = p.bbox[1];
        w = p.bbox[2];
        h = p.bbox[3];
        stroke(255);
        noFill();
        rect(x, y, w, h);

        // as well as the name of the object
        // and a score (0–1), telling us the
        // confidence that this is correct
        fill(255);
        noStroke();
        textSize(20);
        text(p.class, x + 10, y + 15);
      }

      //updating and displaying the ball 
      ball1.update(x, y, w, h);
      ball1.display();

    });
  }
}

//class that builds a ball 
class Ball {
  constructor() {
    this.dia = 25;
    this.respawn();
  }

  //updates the position of the ball to travel down 
  update(bx, by, bw, bh) {
    this.y += this.speed;

    //if a ball collides with an object then it respawns 
    //and increases the point value
    if (this.x >= bx && this.x <= bx + bw && this.y + this.dia / 2 >= by) {
      this.respawn();
      points++;
      //if points are greater then 3 then increase 
      //the speed of the ball to go faster 
      //same thing for > 10 
      if (points > 3) {
        this.speed = random(20, 30);
      } else if (points > 10) {
         this.speed = random(40, 50); 
      }
    }
    //if a ball travels all the way to the bottom 
    //of the screen w/o hitting an object, respawn and take a life 
    if (this.y + this.dia / 2 >= height) {
      this.respawn();
      lives--;
      //if user has no lives left then stop the ball from coming down 
      if(lives < 1) {
        this.speed = 0; 
      }

    }
  }

  //makes the ball appear at the top of the screen 
  //and comes down at random speed 
  respawn() {
    this.x = random(0, width);
    this.y = -this.dia;
    this.speed = random(5, 10);
  }

  //displays the ball on the screen 
  display() {
    fill(0);
    noStroke();
    circle(this.x, this.y, this.dia);
  }
}