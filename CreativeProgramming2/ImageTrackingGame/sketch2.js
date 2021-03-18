let b;
let x, y, w, h;

function setup() {
  createCanvas(400, 400);
  
  b = new Ball();
  
  x = width/2-50;
  y = height-height/4;
  w = 100;
  h = 100;
}

function draw() {
  background(50);
  
  x = mouseX-50;
  y = mouseY-50;
  
  stroke(255);
  noFill();
  rect(x, y, w, h);
  
  b.update(x, y, w, h);
  b.display();
}

class Ball {
  constructor() {
    this.dia = 50;
    this.respawn();
  }
  update(bx, by, bw, bh) {
    this.y += this.speed;
    
    if (this.x >= bx && this.x <= bx+bw && this.y+this.dia/2 >= by) {
      this.respawn();
    }
    if (this.y+this.dia/2 >= height) {
      this.respawn();
    }
  }
  respawn() {
    this.x = random(0,width);
    this.y = -this.dia;
    this.speed = random(1,5);
  }
  display() {
    fill(255);
    noStroke();
    circle(this.x, this.y, this.dia);
  }
}
