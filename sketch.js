// グローバル変数
let currentMode = 'flow_field';

// Flow Field用変数
let particles = [];
let noiseScale = 0.01;
let timeOffset = 0;

// Wave Interference用変数
let time = 0;
let numWaves = 3;
let waves = [];

// Recursive Tree用変数
let angle = 25;
let lengthRatio = 0.67;
let minLength = 2;
let windForce = 0;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent('canvas-container');
  
  initializeSketch();
}

function initializeSketch() {
  if (currentMode === 'flow_field') {
    particles = [];
    background(20);
    for (let i = 0; i < 500; i++) {
      particles.push(new Particle(random(width), random(height)));
    }
  } else if (currentMode === 'wave_interference') {
    waves = [];
    colorMode(HSB, 360, 100, 100);
    for (let i = 0; i < numWaves; i++) {
      waves.push({
        x: random(width),
        y: random(height),
        amplitude: random(50, 150),
        frequency: random(0.02, 0.05),
        phase: random(TWO_PI)
      });
    }
  } else if (currentMode === 'recursive_tree') {
    colorMode(HSB, 360, 100, 100);
    background(220, 20, 95);
  }
}

function changeMode(mode) {
  currentMode = mode;
  clear();
  initializeSketch();
}

function draw() {
  if (currentMode === 'flow_field') {
    drawFlowField();
  } else if (currentMode === 'wave_interference') {
    drawWaveInterference();
  } else if (currentMode === 'recursive_tree') {
    drawRecursiveTree();
  }
}

// Flow Field描画
function drawFlowField() {
  fill(20, 10);
  noStroke();
  rect(0, 0, width, height);
  
  for (let p of particles) {
    p.update();
    p.display();
  }
  
  timeOffset += 0.01;
}

// Wave Interference描画
function drawWaveInterference() {
  colorMode(HSB, 360, 100, 100);
  background(0);
  
  let resolution = 4;
  for (let x = 0; x < width; x += resolution) {
    for (let y = 0; y < height; y += resolution) {
      let totalAmplitude = 0;
      
      for (let w of waves) {
        let distance = dist(x, y, w.x, w.y);
        let amplitude = w.amplitude * sin(distance * w.frequency - time + w.phase);
        amplitude *= map(distance, 0, width, 1, 0.1);
        totalAmplitude += amplitude;
      }
      
      let hue = map(totalAmplitude, -200, 200, 0, 300);
      let brightness = map(abs(totalAmplitude), 0, 200, 30, 100);
      
      fill(hue, 70, brightness);
      noStroke();
      rect(x, y, resolution, resolution);
    }
  }
  
  for (let w of waves) {
    fill(0, 0, 100);
    ellipse(w.x, w.y, 10, 10);
  }
  
  time += 0.1;
}

// Recursive Tree描画
function drawRecursiveTree() {
  colorMode(HSB, 360, 100, 100);
  background(220, 20, 95);
  
  windForce = sin(frameCount * 0.01) * 10;
  
  push();
  translate(width/2, height);
  stroke(30, 70, 40);
  strokeWeight(8);
  branch(120);
  pop();
  
  push();
  translate(width/4, height);
  stroke(30, 70, 40);
  strokeWeight(6);
  branch(80);
  pop();
  
  push();
  translate(3*width/4, height);
  stroke(30, 70, 40);
  strokeWeight(6);
  branch(80);
  pop();
}

// マウスイベント
function mousePressed() {
  if (currentMode === 'flow_field') {
    for (let i = 0; i < 10; i++) {
      particles.push(new Particle(mouseX + random(-20, 20), mouseY + random(-20, 20)));
    }
  } else if (currentMode === 'wave_interference' && mouseButton === LEFT) {
    let minDist = Infinity;
    let closestWave = 0;
    
    for (let i = 0; i < numWaves; i++) {
      let d = dist(mouseX, mouseY, waves[i].x, waves[i].y);
      if (d < minDist) {
        minDist = d;
        closestWave = i;
      }
    }
    
    waves[closestWave].x = mouseX;
    waves[closestWave].y = mouseY;
  }
}

function mouseMoved() {
  if (currentMode === 'recursive_tree') {
    angle = map(mouseX, 0, width, 10, 45);
    lengthRatio = map(mouseY, 0, height, 0.5, 0.8);
  }
}

// キーイベント
function keyPressed() {
  if (currentMode === 'wave_interference') {
    if (key === ' ') {
      for (let w of waves) {
        w.x = random(width);
        w.y = random(height);
      }
    } else if (key === 'r' || key === 'R') {
      for (let w of waves) {
        w.frequency = random(0.02, 0.05);
        w.amplitude = random(50, 150);
      }
    }
  } else if (currentMode === 'recursive_tree') {
    if (key === ' ') {
      background(220, 20, 95);
    } else if (key === 's' || key === 'S') {
      save('recursive_tree_' + frameCount + '.png');
    }
  }
}

// Particleクラス
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    
    colorMode(HSB, 360, 100, 100);
    this.col = color(random(180, 280), 80, 90);
    this.alpha = random(100, 200);
    colorMode(RGB, 255);
  }
  
  update() {
    let angle = noise(this.pos.x * noiseScale, this.pos.y * noiseScale, timeOffset) * TWO_PI * 2;
    let force = p5.Vector.fromAngle(angle);
    force.mult(0.1);
    
    this.acc.add(force);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }
  
  display() {
    stroke(red(this.col), green(this.col), blue(this.col), this.alpha);
    strokeWeight(1.5);
    point(this.pos.x, this.pos.y);
  }
}

// 再帰的な枝描画
function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  
  if (len > minLength) {
    strokeWeight(map(len, minLength, 120, 0.5, 8));
    
    if (len < 30) {
      stroke(120, 80, 60);
    } else {
      stroke(30, 70, 40);
    }
    
    push();
    rotate(radians(angle + windForce * (1 - len/120)));
    branch(len * lengthRatio);
    pop();
    
    push();
    rotate(radians(-angle + windForce * (1 - len/120)));
    branch(len * lengthRatio);
    pop();
    
    if (random(1) < 0.1) {
      push();
      rotate(radians(random(-angle/2, angle/2)));
      branch(len * lengthRatio * 0.8);
      pop();
    }
  } else {
    noStroke();
    fill(random(100, 140), 80, 80, 150);
    ellipse(0, 0, random(5, 15), random(5, 15));
  }
}