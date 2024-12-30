let currentAct = 0;
let stopped = false;
let loseExerciseOne = false;

// Main Circle
let x = 300;
let y = 300;
let radius = 300;

// Inner Circle
let x1 = 300;
let y1 = 300;
let radius1 = 250;

// Outer Circle
let x2 = 300;
let y2 = 300;
let radius2 = 350;

let cursore = [];
let numcursor = 1;
let xcoor = 100;
let ycoor = 100;
let dx = 10;
let dy = 10; 
let speedFactor = 0.05;

let s;
let scl = 20;
let food;

let bullets = [];
let enemies = [];
let score = 0;

let rockgan;
let ethnique;

let games = [
  { name: "Finger Fun!", action: 4 },
  { name: "Circle Adventure!", action: 5 },
  { name: "Snakers", action: 6 },
  { name: "Flappy", action: 7 },
  { name: "Peacer", action: 8 }
];

function preload() {
  // Load custom fonts if available
  // rockgan = loadFont("Rockgan.otf");
  // ethnique = loadFont("ETHNIQUE.ttf");
}

function setup() {
  createCanvas(500, 700);

  // Use default fonts if custom fonts are not available
  rockgan = 'Comic Sans MS';
  ethnique = 'Comic Sans MS';

  textFont(rockgan);
}

function draw() {
  if (!stopped) {
    drawBackground();
    if (currentAct !== 0) {
      backButtons();
    }
    settings();

    if (currentAct == 0) {
      exerciseSelect();
    } else if (currentAct == 4) {
      jeu1();
    } else if (currentAct == 5) {
      jeu2();
    } else if (currentAct == 6) {
      jeu3();
    } else if (currentAct == 7) {
      jeu4();
    } else if (currentAct == 8) {
      jeu5();
    }
  } else {
    background(0);
  }
}

function backButtons() {
  fill(238, 75, 43);
  stroke('yellow');
  strokeWeight(2);
  rect(25, 25, 110, 50, 10);
  
  noStroke();
  fill(255);
  textSize(20);
  textFont(rockgan);
  textAlign(CENTER, CENTER);
  text('BACK', 80, 50);
}

function drawBackground() {
  let colors = [
    color(255, 0, 0),    // Red
    color(255, 127, 0),  // Orange
    color(255, 255, 0),  // Yellow
    color(0, 255, 0),    // Green
    color(0, 0, 255),    // Blue
    color(75, 0, 130),   // Indigo
    color(148, 0, 211)   // Violet
  ];
  let stripeHeight = height / colors.length;
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    noStroke();
    rect(0, i * stripeHeight, width, stripeHeight);
  }
}

function settings() {
  fill(238, 75, 43);
  stroke('yellow');
  strokeWeight(2);
  rect(width - 125, height - 75, 100, 50, 5);
  noStroke();
  fill(255);
  textSize(20);
  textFont(rockgan);
  textAlign(CENTER, CENTER);
  text("SETTINGS", width - 75, height - 50);
}

function exerciseSelect() {
  fill(255);
  textFont(rockgan);
  textSize(40);
  textAlign(CENTER);
  text('Exercises', width / 2, 100);
  
  let buttonHeight = 60;
  let spacing = 20;
  let totalHeight = (buttonHeight + spacing) * games.length - spacing;
  let startY = (height - totalHeight) / 2;
  
  for (let i = 0; i < games.length; i++) {
    let y = startY + i * (buttonHeight + spacing);
    fill(255, 182, 193);
    stroke('grey');
    strokeWeight(5);
    rect(width / 2 - 150, y, 300, buttonHeight, 20);
    
    noStroke();
    fill(0, 0, 205);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(games[i].name, width / 2, y + buttonHeight / 2);
  }
}

function jeu1() {
  background(65, 105, 225);
  // Draw the player
  fill(223, 255, 0);
  circle(mouseX, height - 50, 30);
  
  // Update and draw the bullets
  if (!loseExerciseOne) {
    for (let bullet of bullets) {
      bullet.y -= 5;
      fill(255, 0, 0);
      circle(bullet.x, bullet.y, 15); 
    }
  }
  // Update and draw enemies
  for (let enemy of enemies) {
    if (!loseExerciseOne) {
      enemy.y += 2;
    }
    fill(0, 255, 0);
    rect(enemy.x, enemy.y, 20, 20);
    if (enemy.y > height) {
      textFont(rockgan);
      textSize(30);
      fill(255, 0, 0);
      textAlign(CENTER, CENTER);
      text("You Lose!", width / 2, height / 2);
      loseExerciseOne = true;
      rectMode(CORNER);
    }
  }

  // Deal with collisions
  if (!loseExerciseOne) {
    for (let enemy of enemies) {
      for (let bullet of bullets) {
        if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 15) {
          enemies.splice(enemies.indexOf(enemy), 1);
          bullets.splice(bullets.indexOf(bullet), 1);
          let newEnemy = {
            x: random(0, width),
            y: random(-800, 0),
          };
          enemies.push(newEnemy);
          score += 1;
          break;
        } 
      }
    }
  }
  
  fill(255);
  textSize(20);
  textFont(rockgan);
  text("Score: " + score, 80, 50);
}

function jeu2() {
  background(255);
  for (let i = 0; i < cursore.length; ++i) {
    cursore[i].move();
    cursore[i].display(); 
  }
  
  // Main Circle
  stroke('black');
  strokeWeight(10);
  fill(255, 255, 255, 63);
  ellipse(x, y, radius, radius);

  // Inner Circle
  stroke('white');
  fill(255, 255, 255, 63);
  ellipse(x1, y1, radius1, radius1);

  // Outer Circle
  stroke('white');
  fill(255, 255, 255, 63);
  ellipse(x2, y2, radius2, radius2);
}

function Circle(xcoor, ycoor) {
  this.x = xcoor;
  this.y = ycoor;
  this.dx = dx;
  this.dy = dy;
  
  this.move = function() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x > width) this.x = 0;
    if (this.y > height) this.y = 0;
    
    this.dx = (mouseX - this.x) * speedFactor;
    this.dy = (mouseY - this.y) * speedFactor;
  };
  
  this.mouseNotInRange = function() {    
    return dist(mouseX, mouseY, x1, y1) < 140;
  };
  
  this.mouseOutOfRange = function() {
    return dist(mouseX, mouseY, x2, y2) > 155;
  };

  this.display = function() {
    if (this.mouseNotInRange() || this.mouseOutOfRange()) {
      this.col = color(255, 0, 0);
    } else {
      this.col = color(0, 204, 0);
    }
    
    fill(this.col);
    ellipse(this.x, this.y, 40, 40);
  };
}

function jeu3() {
  if (!s) {
    s = new Snake();
    pickLocation();
    frameRate(10);
  }
  
  background(51);

  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();

  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  };

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
        this.total = 0;
        this.tail = [];
      }
    }
  };

  this.update = function() {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  };

  this.show = function() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  };
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function jeu4() {
  // Simple Flappy Bird Clone
  if (!bird) {
    bird = new Bird();
    pipes = [];
    pipes.push(new Pipe());
    score = 0;
    frameRate(60);
  }
  background(135, 206, 235); // Sky blue background

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      // Reset the game
      bird = new Bird();
      pipes = [];
      pipes.push(new Pipe());
      score = 0;
      break;
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      score++;
    }
  }

  bird.update();
  bird.show();

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }

  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Score: ' + score, width / 2, 50);
}

function jeu5() {
  // Placeholder for Peacer game
  background(255, 228, 225); // Misty rose background
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Peacer Game Coming Soon!', width / 2, height / 2);
}

// Additional variables for jeu4 (Flappy)
let bird;
let pipes = [];

function Bird() {
  this.y = height / 2;
  this.x = 64;
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  this.show = function() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, 32, 32);
  };

  this.up = function() {
    this.velocity += this.lift;
  };

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };
}

function Pipe() {
  this.spacing = 125;
  this.top = random(height / 6, 3 / 4 * height);
  this.bottom = height - (this.top + this.spacing);
  this.x = width;
  this.w = 80;
  this.speed = 6;

  this.show = function() {
    fill(34, 139, 34);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  };

  this.update = function() {
    this.x -= this.speed;
  };

  this.offscreen = function() {
    return this.x < -this.w;
  };

  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  };
}

function mouseClicked() {
  let xpos = mouseX;
  let ypos = mouseY;
  
  if (currentAct !== 0 && xpos >= 25 && xpos <= 135 && ypos >= 25 && ypos <= 75) { // Back button
    currentAct = 0;
    // Reset game-specific variables
    loseExerciseOne = false;
    enemies = [];
    bullets = [];
    score = 0;
    s = null;
    bird = null;
    pipes = [];
  } else if (currentAct == 0) {
    // Check if any of the game buttons are clicked
    let buttonHeight = 60;
    let spacing = 20;
    let totalHeight = (buttonHeight + spacing) * games.length - spacing;
    let startY = (height - totalHeight) / 2;
    
    for (let i = 0; i < games.length; i++) {
      let y = startY + i * (buttonHeight + spacing);
      if (mouseX >= width / 2 - 150 && mouseX <= width / 2 + 150 && mouseY >= y && mouseY <= y + buttonHeight) {
        currentAct = games[i].action;
        if (currentAct == 4) {
          // Initialize Finger Fun game
          loseExerciseOne = false;
          enemies = [];
          bullets = [];
          score = 0;
          for (let i = 0; i < 10; i++) {
            let enemy = {
              x: random(0, width),
              y: random(-800, 0),
            };
            enemies.push(enemy);
          }
        } else if (currentAct == 5) {
          // Initialize Circle Adventure game
          cursore = [];
          for (let i = 0; i < numcursor; ++i) {
            cursore[i] = new Circle(xcoor, ycoor);
          }
        } else if (currentAct == 6) {
          // Initialize Snakers game
          s = null; // Reset snake
        } else if (currentAct == 7) {
          // Initialize Flappy game
          bird = null;
          pipes = [];
        } else if (currentAct == 8) {
          // Initialize Peacer game
          // Add game initialization if necessary
        }
        break;
      }
    }
  } 
}

function mousePressed() {
  if (currentAct == 4) {
    let bullet = {
      x: mouseX,
      y: height - 50
    };
    bullets.push(bullet);
  }
  if (currentAct == 6 && s) {
    s.total++;
  }
  if (currentAct == 7 && bird) {
    bird.up();
  }
}

function keyPressed() {
  if (currentAct == 6 && s) {
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
  if (currentAct == 7 && bird) {
    if (key == ' ') {
      bird.up();
    }
  }
}
