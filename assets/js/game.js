var s;
var scl = 50;
var food;
var score = 0;

function setup() {
  createCanvas(500, 500);
  s = new Snake();
  //delay the movement of the square for arcade effect
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(0);
  s.death();
  s.update();
  s.show();

  if (s.eat(food)) {
    pickLocation();
  }

  // Vẽ điểm số:
  fill(255);
  textSize(24);
  text("Điểm số: " + score, 10, 30);

  // Vẽ thức ăn:
  fill(242, 242, 242);
  rect(food.x, food.y, scl, scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.dir = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.eat = function (pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 4) {
      this.total++;
      score++; // Tăng điểm số
      return true;
    } else {
      return false;
    }
  };

  this.death = function (a) {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
        score = 0; // Đặt điểm số về 0
      }
      
      if(score < 1) {
        alert("Bạn chơi ngu vc 😒")
      }
    }
  };

  this.update = function () {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;
    //avoid snake to go out of canvas
    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  };

  this.show = function () {
    fill(1, 254, 0);
    for (var i = 0; i < this.total; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  };
}

