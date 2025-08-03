ArrayList<Particle> particles;
float noiseScale = 0.01;
float timeOffset = 0;

void setup() {
  size(800, 800);
  background(20);
  particles = new ArrayList<Particle>();
  
  // パーティクルを生成
  for (int i = 0; i < 500; i++) {
    particles.add(new Particle(random(width), random(height)));
  }
}

void draw() {
  // 半透明の背景で軌跡を残す
  fill(20, 10);
  noStroke();
  rect(0, 0, width, height);
  
  // 各パーティクルを更新
  for (Particle p : particles) {
    p.update();
    p.display();
  }
  
  timeOffset += 0.01;
}

// マウスクリックで新しいパーティクルを追加
void mousePressed() {
  for (int i = 0; i < 10; i++) {
    particles.add(new Particle(mouseX + random(-20, 20), mouseY + random(-20, 20)));
  }
}

// パーティクルクラス
class Particle {
  PVector pos;
  PVector vel;
  PVector acc;
  float maxSpeed = 2;
  color col;
  float alpha;
  
  Particle(float x, float y) {
    pos = new PVector(x, y);
    vel = new PVector(0, 0);
    acc = new PVector(0, 0);
    
    // ランダムな色を設定
    colorMode(HSB, 360, 100, 100);
    col = color(random(180, 280), 80, 90);
    alpha = random(100, 200);
    colorMode(RGB, 255);
  }
  
  void update() {
    // ノイズベースのフローフィールド
    float angle = noise(pos.x * noiseScale, pos.y * noiseScale, timeOffset) * TWO_PI * 2;
    PVector force = PVector.fromAngle(angle);
    force.mult(0.1);
    
    // 力を適用
    acc.add(force);
    vel.add(acc);
    vel.limit(maxSpeed);
    pos.add(vel);
    acc.mult(0);
    
    // 画面端で反対側にワープ
    if (pos.x < 0) pos.x = width;
    if (pos.x > width) pos.x = 0;
    if (pos.y < 0) pos.y = height;
    if (pos.y > height) pos.y = 0;
  }
  
  void display() {
    stroke(col, alpha);
    strokeWeight(1.5);
    point(pos.x, pos.y);
  }
}