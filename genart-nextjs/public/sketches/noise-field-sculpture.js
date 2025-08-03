// Noise Field Sculpture - 純粋p5.js版

// 競合回避の自己クリーンアップ
if (typeof window.noiseFieldSculptureSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// Noise Field Sculpture variables
var nfsNoiseScale = 0.01;
var nfsZOffset = 0;
var nfsNumContours = 12;
var nfsContourSpacing = 20;

// p5.js instance mode to avoid global conflicts
window.currentP5Instance = new p5(function(p) {
  p.setup = function() {
    console.log('Noise Field Sculpture setup called');
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
    initializeNoiseFieldSculpture(p);
    console.log('Noise Field Sculpture initialized');
  }

  p.draw = function() {
    drawNoiseFieldSculpture(p);
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      mousePressedNoiseFieldSculpture(p);
    }
  }

  p.mouseMoved = function() {
    mouseMovedNoiseFieldSculpture(p);
  }

  p.keyPressed = function() {
    keyPressedNoiseFieldSculpture(p);
  }
});

function initializeNoiseFieldSculpture(p) {
  p.colorMode(p.HSB, 360, 100, 100);
  p.background(220, 15, 95);
  nfsZOffset = 0;
}

function drawNoiseFieldSculpture(p) {
  p.background(220, 15, 95);
  
  // 滑らかな等高線を描画
  for (let level = 0; level < nfsNumContours; level++) {
    let targetHeight = level * nfsContourSpacing;
    let hue = (160 + level * 25) % 360;
    let sat = 80 + level * 2;
    let brightness = 70 + level * 2;
    
    p.stroke(hue, sat, brightness, 180);
    p.strokeWeight(1.5 + level * 0.15);
    p.noFill();
    
    // マーチングスクエア法による滑らかな等高線
    let res = 8; // 解像度
    for (let x = 0; x < p.width - res; x += res) {
      for (let y = 0; y < p.height - res; y += res) {
        // 四角形の4つの角のノイズ値
        let val1 = p.noise(x * nfsNoiseScale, y * nfsNoiseScale, nfsZOffset) * 255;
        let val2 = p.noise((x + res) * nfsNoiseScale, y * nfsNoiseScale, nfsZOffset) * 255;
        let val3 = p.noise((x + res) * nfsNoiseScale, (y + res) * nfsNoiseScale, nfsZOffset) * 255;
        let val4 = p.noise(x * nfsNoiseScale, (y + res) * nfsNoiseScale, nfsZOffset) * 255;
        
        // 等高線の交点を見つけて滑らかに接続
        let points = [];
        
        // 上辺
        if ((val1 <= targetHeight && val2 > targetHeight) || (val1 > targetHeight && val2 <= targetHeight)) {
          let t = (targetHeight - val1) / (val2 - val1);
          points.push({ x: x + t * res, y: y });
        }
        
        // 右辺
        if ((val2 <= targetHeight && val3 > targetHeight) || (val2 > targetHeight && val3 <= targetHeight)) {
          let t = (targetHeight - val2) / (val3 - val2);
          points.push({ x: x + res, y: y + t * res });
        }
        
        // 下辺
        if ((val3 <= targetHeight && val4 > targetHeight) || (val3 > targetHeight && val4 <= targetHeight)) {
          let t = (targetHeight - val3) / (val4 - val3);
          points.push({ x: x + res - t * res, y: y + res });
        }
        
        // 左辺
        if ((val4 <= targetHeight && val1 > targetHeight) || (val4 > targetHeight && val1 <= targetHeight)) {
          let t = (targetHeight - val4) / (val1 - val4);
          points.push({ x: x, y: y + res - t * res });
        }
        
        // 点を線で結ぶ
        if (points.length >= 2) {
          for (let i = 0; i < points.length - 1; i += 2) {
            if (points[i + 1]) {
              p.line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
            }
          }
        }
      }
    }
  }
  
  nfsZOffset += 0.002;
}

function mousePressedNoiseFieldSculpture(p) {
  // ノイズフィールドをリセット
  nfsZOffset = p.random(1000);
}

function mouseMovedNoiseFieldSculpture(p) {
  nfsNoiseScale = p.map(p.mouseX, 0, p.width, 0.003, 0.03); // 左右を逆にしてズーム感を直感的に
  nfsNumContours = Math.floor(p.map(p.mouseY, 0, p.height, 5, 20));
}

function keyPressedNoiseFieldSculpture(p) {
  if (p.key === 'r' || p.key === 'R') {
    nfsZOffset = 0;
    p.background(220, 15, 95);
  } else if (p.key === 's' || p.key === 'S') {
    p.save('noise_field_sculpture_' + p.frameCount + '.png');
  }
}

// パラメータ更新関数（Next.jsから呼び出し可能）
function updateNoiseFieldSculptureParameter(param, value) {
  switch(param) {
    case 'noiseScale':
      nfsNoiseScale = value;
      break;
    case 'numContours':
      nfsNumContours = value;
      break;
    case 'contourSpacing':
      nfsContourSpacing = value;
      break;
  }
}

// グローバルに公開
if (typeof window !== 'undefined') {
  window.updateNoiseFieldSculptureParameter = updateNoiseFieldSculptureParameter;
  window.noiseFieldSculptureSketch = true;
}