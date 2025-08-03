// Ornstein-Uhlenbeck Process - 純粋p5.js版

// 競合回避の自己クリーンアップ
if (typeof window.ornsteinUhlenbeckSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// Ornstein-Uhlenbeck variables
var ouPaths = [];
var ouNumPaths = 30;
var ouTheta = 0.15; // 回帰速度
var ouSigma = 0.4; // ノイズ強度
var ouMu = 0; // 平均回帰値

// p5.js instance mode to avoid global conflicts
new p5(function(p) {
  p.setup = function() {
    console.log('Ornstein-Uhlenbeck setup called');
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
    initializeOrnsteinUhlenbeck(p);
    console.log('Ornstein-Uhlenbeck initialized');
  }

  p.draw = function() {
    drawOrnsteinUhlenbeck(p);
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      mousePressedOrnsteinUhlenbeck(p);
    }
  }

  p.mouseMoved = function() {
    mouseMovedOrnsteinUhlenbeck(p);
  }

  p.keyPressed = function() {
    keyPressedOrnsteinUhlenbeck(p);
  }
});

function initializeOrnsteinUhlenbeck(p) {
  p.colorMode(p.HSB, 360, 100, 100);
  p.background(0);
  ouPaths = [];
  for (let i = 0; i < ouNumPaths; i++) {
    ouPaths.push({
      x: p.random(p.width * 0.3, p.width * 0.7),
      y: p.random(p.height * 0.3, p.height * 0.7),
      vx: 0, // X方向の値
      vy: 0, // Y方向の値
      trail: []
    });
  }
}

function drawOrnsteinUhlenbeck(p) {
  // 背景を少しずつフェード
  p.fill(0, 20);
  p.noStroke();
  p.rect(0, 0, p.width, p.height);
  
  for (let i = 0; i < ouPaths.length; i++) {
    let path = ouPaths[i];
    
    // 2次元Ornstein-Uhlenbeck過程の更新
    let dt = 0.016; // 時間刻み幅（約60fps）
    
    // X方向の更新
    let driftX = -ouTheta * path.vx * dt;
    let diffusionX = ouSigma * p.randomGaussian() * p.sqrt(dt);
    path.vx += driftX + diffusionX;
    path.vx = p.constrain(path.vx, -3, 3);
    
    // Y方向の更新
    let driftY = -ouTheta * path.vy * dt;
    let diffusionY = ouSigma * p.randomGaussian() * p.sqrt(dt);
    path.vy += driftY + diffusionY;
    path.vy = p.constrain(path.vy, -3, 3);
    
    // 位置の更新
    path.x += path.vx * 8;
    path.y += path.vy * 8;
    
    // 境界で反射
    if (path.x < 0) {
      path.x = 0;
      path.vx = -path.vx * 0.8; // 減衰を伴う反射
    } else if (path.x > p.width) {
      path.x = p.width;
      path.vx = -path.vx * 0.8;
    }
    
    if (path.y < 0) {
      path.y = 0;
      path.vy = -path.vy * 0.8;
    } else if (path.y > p.height) {
      path.y = p.height;
      path.vy = -path.vy * 0.8;
    }
    
    // トレイルに追加
    path.trail.push({x: path.x, y: path.y, vx: path.vx, vy: path.vy});
    if (path.trail.length > 120) {
      path.trail.shift();
    }
    
    // トレイルの描画
    if (path.trail.length > 1) {
      for (let j = 1; j < path.trail.length; j++) {
        let alpha = p.map(j, 0, path.trail.length, 0, 1);
        let speed = p.sqrt(path.trail[j].vx * path.trail[j].vx + path.trail[j].vy * path.trail[j].vy);
        let hue = p.map(speed, 0, 4, 180, 320); // 青から紫へ
        let sat = p.map(speed, 0, 4, 60, 100);
        let brightness = p.map(alpha, 0, 1, 40, 90);
        
        p.stroke(hue, sat, brightness, alpha * 150);
        p.strokeWeight(p.map(alpha, 0, 1, 0.5, 2.5));
        p.line(path.trail[j-1].x, path.trail[j-1].y, path.trail[j].x, path.trail[j].y);
      }
    }
  }
}

function mousePressedOrnsteinUhlenbeck(p) {
  // 新しいパスを追加
  ouPaths.push({
    x: p.mouseX,
    y: p.mouseY,
    vx: 0,
    vy: 0,
    trail: []
  });
  // パス数制限
  if (ouPaths.length > ouNumPaths * 2) {
    ouPaths.shift();
  }
}

function mouseMovedOrnsteinUhlenbeck(p) {
  // パラメータをマウス位置で調整
  ouTheta = p.map(p.mouseX, 0, p.width, 0.05, 0.3);
  ouSigma = p.map(p.mouseY, 0, p.height, 0.2, 0.8);
}

function keyPressedOrnsteinUhlenbeck(p) {
  if (p.key === 'r' || p.key === 'R') {
    for (let path of ouPaths) {
      path.x = p.random(p.width * 0.3, p.width * 0.7);
      path.y = p.random(p.height * 0.3, p.height * 0.7);
      path.vx = 0;
      path.vy = 0;
      path.trail = [];
    }
    p.background(0);
  } else if (p.key === 's' || p.key === 'S') {
    p.save('ornstein_uhlenbeck_' + p.frameCount + '.png');
  }
}

// パラメータ更新関数（Next.jsから呼び出し可能）
function updateOrnsteinUhlenbeckParameter(param, value) {
  switch(param) {
    case 'theta':
      ouTheta = value;
      break;
    case 'sigma':
      ouSigma = value;
      break;
    case 'numPaths':
      ouNumPaths = value;
      break;
  }
}

// グローバルに公開
if (typeof window !== 'undefined') {
  window.updateOrnsteinUhlenbeckParameter = updateOrnsteinUhlenbeckParameter;
  window.ornsteinUhlenbeckSketch = true;
}