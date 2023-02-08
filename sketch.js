let spritesheet;
let green;
let purple;
let s_guy;
let sx = 0, sy = 0;
let sw = 80, sh = 80;
let u = 0, v = 0;
let animationLength = 9;
let currentFrame = 0;
// let x = 200;
// let moving = 0;
// let xDir = 1;
let walkingAnimation, walkingAnimation2, walkingAnimation3;

function preload() {
  green = loadImage("assets/green.png");
  purple = loadImage("assets/purple.png");
  s_guy = loadImage("assets/spelunky-guy.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  walkingAnimation = new WalkingAnimation(green,80,80,100,200,9);
  walkingAnimation2 = new WalkingAnimation(s_guy,80,80,100,300,9);
  walkingAnimation3 = new WalkingAnimation(purple,80,80,100,100,9);
}

function draw() {
  background(235);
  walkingAnimation.draw();
  walkingAnimation2.draw();
  walkingAnimation3.draw();
}

function keyPressed() {
  walkingAnimation.keyPressed();
  walkingAnimation2.keyPressed();
  walkingAnimation3.keyPressed();
}

function keyReleased() {
  walkingAnimation.keyReleased();
  walkingAnimation2.keyReleased();
  walkingAnimation3.keyReleased();
}

class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength, xDirection) {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = xDirection;
  }

  draw() {
    // if (this.moving != 0)
    //   this.u = this.currentFrame % this.animationLength;
    // else
    //   this.u = 0;

    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : 0;
    push();
    translate(this.dx, this.dy);
    scale(this.xDirection,1);
    // each frame is 80 x 80
    image(this.spritesheet, 0, 0, this.sw, this.sh, this.u*this.sw,
      this.v*this.sh,this.sw,this.sh); //p5.org/references/#/p5/image
    pop();

    if (frameCount % 6 === 0) {
      this.currentFrame++; //this.dx++;
    }
    this.dx += this.moving;

    if (this.dx > width - this.sw / 4) { //hits right side of the canvas
      this.walkLeft();
    } else if (this.dx < this.sw / 4) {  //hits left side of the canvas
      this.walkRight();
    }
  }

  walkRight() {
    this.moving = 1;
    this.xDirection = 1;
  }
  walkLeft() {
    this.moving = -1;
    this.xDirection = -1;
  }

  keyPressed() {
    if (keyCode === RIGHT_ARROW) {
      this.walkRight();
      this.currentFrame = 1;
    } else if (keyCode === LEFT_ARROW) {
      this.walkLeft();
      this.currentFrame = 1;
    }
  }
  
  keyReleased() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
      this.moving = 0;
    }
  }
}