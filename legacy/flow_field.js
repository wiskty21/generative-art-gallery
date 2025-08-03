let particles = [];
let noiseScale = 0.01;
let timeOffset = 0;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent('canvas-container');
  background(20);
  
  // パーティクルを生成
  for (let i = 0; i < 500; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
  
  currentSketch = { remove: () => { 
    noLoop();
    particles = [];
    remove();
  }};
}

function draw() {
  // 半透明の背景で軌跡を残す
  fill(20, 10);
  noStroke();
  rect(0, 0, width, height);
  
  // 各パーティクルを更新
  for (let p of particles) {
    p.update();
    p.display();
  }
  
  timeOffset += 0.01;
}

// マウスクリックで新しいパーティクルを追加
function mousePressed() {
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(mouseX + random(-20, 20), mouseY + random(-20, 20)));
  }
}

// パーティクルクラス
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    
    // ランダムな色を設定
    colorMode(HSB, 360, 100, 100);
    this.col = color(random(180, 280), 80, 90);
    this.alpha = random(100, 200);
    colorMode(RGB, 255);
  }
  
  update() {
    // ノイズベースのフローフィールド
    let angle = noise(this.pos.x * noiseScale, this.pos.y * noiseScale, timeOffset) * TWO_PI * 2;
    let force = p5.Vector.fromAngle(angle);
    force.mult(0.1);
    
    // 力を適用
    this.acc.add(force);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    // 画面端で反対側にワープ
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