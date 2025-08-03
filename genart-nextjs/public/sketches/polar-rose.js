// Polar Rose - 純粋p5.js版

// 競合回避の自己クリーンアップ
if (typeof window.polarRoseSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// Polar Rose variables
var prTime = 0;
var prK = 5; // 花びらの数に関連
var prRotationSpeed = 0.003; // 回転速度を遅くする
var prNumRoses = 6; // バラの数を少し減らす
var prScale = 200;

// p5.js instance mode to avoid global conflicts
window.currentP5Instance = new p5(function(p) {
  p.setup = function() {
    console.log('Polar Rose setup called');
    const canvasContainer = document.getElementById('p5-canvas-container');
    if (!canvasContainer) {
      console.error('Canvas container not found');
      return;
    }
    
    const size = Math.min(600, window.innerWidth - 100, window.innerHeight - 100);
    console.log('Creating canvas with size:', size);
    const canvas = p.createCanvas(size, size);
    canvas.parent('p5-canvas-container');
    
    p.pixelDensity(1);
    initializePolarRose(p);
    console.log('Polar Rose initialized');
  }

  p.draw = function() {
    drawPolarRose(p);
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      mousePressedPolarRose(p);
    }
  }

  p.mouseMoved = function() {
    mouseMovedPolarRose(p);
  }

  p.keyPressed = function() {
    keyPressedPolarRose(p);
  }
});

function initializePolarRose(p) {
  p.colorMode(p.HSB, 360, 100, 100);
  p.background(0);
  prTime = 0;
}

function drawPolarRose(p) {
  // 背景をゆっくりフェード
  p.fill(0, 15);
  p.noStroke();
  p.rect(0, 0, p.width, p.height);
  
  p.push();
  p.translate(p.width / 2, p.height / 2);
  
  for (let i = 0; i < prNumRoses; i++) {
    // 色の変化をゆっくりにする
    let hue = (i * 60 + prTime * 20) % 360;
    let k = prK + p.sin(prTime * 0.5 + i) * 1.5; // kの変化をゆっくりにする
    let scale = prScale * (0.8 + 0.2 * p.sin(prTime * 0.3 + i)); // スケール変化をゆっくりにする
    
    p.stroke(hue, 70, 85, 100);
    p.strokeWeight(1.5);
    p.noFill();
    
    p.push();
    p.rotate(prTime * prRotationSpeed + i * p.TWO_PI / prNumRoses);
    
    p.beginShape();
    // より滑らかな描画のためにステップを小さくする
    for (let theta = 0; theta < p.TWO_PI * k; theta += 0.02) {
      let r = p.sin(k * theta) * scale;
      let x = r * p.cos(theta);
      let y = r * p.sin(theta);
      p.vertex(x, y);
    }
    p.endShape();
    
    p.pop();
  }
  
  p.pop();
  
  prTime += 0.008; // 時間の進行をさらに遅くする
}

function mousePressedPolarRose(p) {
  // バラの数をランダムに変更
  prNumRoses = Math.floor(p.random(3, 8));
  prTime = 0;
}

function mouseMovedPolarRose(p) {
  prK = p.map(p.mouseX, 0, p.width, 3, 8); // 範囲を狭くして安定化
  prRotationSpeed = p.map(p.mouseY, 0, p.height, 0.001, 0.008); // 回転速度を全体的に遅くする
}

function keyPressedPolarRose(p) {
  if (p.key === 'r' || p.key === 'R') {
    prTime = 0;
    p.background(0);
  } else if (p.key === 's' || p.key === 'S') {
    p.save('polar_rose_' + p.frameCount + '.png');
  }
}

// パラメータ更新関数（Next.jsから呼び出し可能）
function updatePolarRoseParameter(param, value) {
  switch(param) {
    case 'k':
      prK = value;
      break;
    case 'rotationSpeed':
      prRotationSpeed = value;
      break;
    case 'numRoses':
      prNumRoses = value;
      break;
    case 'scale':
      prScale = value;
      break;
  }
}

// グローバルに公開
if (typeof window !== 'undefined') {
  window.updatePolarRoseParameter = updatePolarRoseParameter;
  window.polarRoseSketch = true;
}