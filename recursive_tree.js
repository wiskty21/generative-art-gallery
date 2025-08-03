let angle = 25;
let lengthRatio = 0.67;
let minLength = 2;
let windForce = 0;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent('canvas-container');
  colorMode(HSB, 360, 100, 100);
  background(0);
  
  currentSketch = { remove: () => { 
    noLoop();
    remove();
  }};
}

function draw() {
  background(220, 20, 95); // 薄い空色
  
  // 風の影響を計算
  windForce = sin(frameCount * 0.01) * 10;
  
  // 複数の木を描画
  push();
  translate(width/2, height);
  stroke(30, 70, 40); // 茶色
  strokeWeight(8);
  branch(120);
  pop();
  
  // 左側の小さい木
  push();
  translate(width/4, height);
  stroke(30, 70, 40);
  strokeWeight(6);
  branch(80);
  pop();
  
  // 右側の小さい木
  push();
  translate(3*width/4, height);
  stroke(30, 70, 40);
  strokeWeight(6);
  branch(80);
  pop();
}

function branch(len) {
  // 幹を描画
  line(0, 0, 0, -len);
  translate(0, -len);
  
  if (len > minLength) {
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
    branch(len * lengthRatio);
    pop();
    
    // 左の枝
    push();
    rotate(radians(-angle + windForce * (1 - len/120)));
    branch(len * lengthRatio);
    pop();
    
    // ランダムに3つ目の枝を追加
    if (random(1) < 0.1) {
      push();
      rotate(radians(random(-angle/2, angle/2)));
      branch(len * lengthRatio * 0.8);
      pop();
    }
  } else {
    // 葉っぱを描画
    noStroke();
    fill(random(100, 140), 80, 80, 150);
    ellipse(0, 0, random(5, 15), random(5, 15));
  }
}

function mouseMoved() {
  // マウスの位置で角度を調整
  angle = map(mouseX, 0, width, 10, 45);
  lengthRatio = map(mouseY, 0, height, 0.5, 0.8);
}

function keyPressed() {
  if (key === ' ') {
    // スペースキーで再描画
    background(220, 20, 95);
  } else if (key === 's' || key === 'S') {
    // 画像を保存
    save('recursive_tree_' + frameCount + '.png');
  }
}