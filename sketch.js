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
let minLength = 4; // 2から4に増加して再帰の深さを制限
let windForce = 0;
let maxRecursionDepth = 12; // 最大再帰深度を追加
let treeRandomSeed = 0; // 木の構造を固定するためのシード

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
    treeRandomSeed = 42; // 固定シードを設定
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
  
  // 毎フレーム同じランダムシードを使用して点滅を防ぐ
  randomSeed(treeRandomSeed);
  
  // メインの木
  push();
  translate(width/2, height);
  stroke(30, 70, 40);
  strokeWeight(8);
  drawBranch(120, 0, 'main');
  pop();
  
  // 左の木
  push();
  translate(width/4, height);
  stroke(30, 70, 40);
  strokeWeight(6);
  drawBranch(80, 0, 'left');
  pop();
  
  // 右の木
  push();
  translate(3*width/4, height);
  stroke(30, 70, 40);
  strokeWeight(6);
  drawBranch(80, 0, 'right');
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
    // lengthRatioの範囲を制限して、再帰が深くなりすぎないようにする
    lengthRatio = map(mouseY, 0, height, 0.5, 0.7); // 0.8から0.7に減少
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

// 再帰的な枝描画（改善版）
function drawBranch(len, depth = 0, treeId = 'main') {
  // 最大深度に達したら終了
  if (depth > maxRecursionDepth) {
    return;
  }
  
  // 幹を描画
  line(0, 0, 0, -len);
  
  if (len > minLength) {
    push(); // 現在の状態を保存
    translate(0, -len); // 枝の先端に移動
    
    // 枝の太さを徐々に細く
    strokeWeight(map(len, minLength, 120, 0.5, 8));
    
    // 色を徐々に変化（茶色から緑へ）
    if (len < 30) {
      stroke(120, 80, 60); // 緑
    } else {
      stroke(30, 70, 40); // 茶色
    }
    
    // 右の枝
    push();
    rotate(radians(angle + windForce * (1 - len/120)));
    drawBranch(len * lengthRatio, depth + 1, treeId);
    pop();
    
    // 左の枝
    push();
    rotate(radians(-angle + windForce * (1 - len/120)));
    drawBranch(len * lengthRatio, depth + 1, treeId);
    pop();
    
    // 固定された3つ目の枝を追加（深度が浅い時のみ）
    // ハッシュを使って決定論的にランダム性を作る
    let branchHash = (depth * 17 + len * 23 + treeId.charCodeAt(0)) % 100;
    if (depth < 8 && branchHash < 10) {
      push();
      let extraAngle = ((branchHash * 13) % 60) - 30; // -30から30度の範囲
      rotate(radians(extraAngle));
      drawBranch(len * lengthRatio * 0.8, depth + 1, treeId);
      pop();
    }
    
    pop(); // 状態を復元
  } else {
    // 葉っぱを描画（固定された色と大きさ）
    push();
    translate(0, -len);
    noStroke();
    // 決定論的な色と大きさを計算
    let leafHash = (len * 37 + depth * 41 + treeId.charCodeAt(0)) % 100;
    let leafHue = 100 + (leafHash % 40); // 100-140の範囲
    let leafSize = 5 + (leafHash % 10); // 5-15の範囲
    fill(leafHue, 80, 80, 150);
    ellipse(0, 0, leafSize, leafSize);
    pop();
  }
}