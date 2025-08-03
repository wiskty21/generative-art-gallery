// Gray-Scott反応拡散系 - 純粋p5.js版

// Avoid conflicts by using a unique namespace
if (typeof window.grayScottSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// p5.js instance mode to avoid global conflicts
window.currentP5Instance = new p5(function(p) {
  // Gray-Scott variables - instance scope
  let gsGrid = [];
  let gsNextGrid = [];
  let gsWidth = 200;
  let gsHeight = 200;
  let gsFeedRate = 0.055;
  let gsKillRate = 0.062;
  let gsDiffusionA = 1.0;
  let gsDiffusionB = 0.5;
  let gsDt = 1.0;

  p.setup = function() {
    console.log('Gray-Scott setup called');
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
    initializeGrayScott();
    console.log('Gray-Scott initialized');
  }

  p.draw = function() {
    drawGrayScott();
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      mousePressedGrayScott();
    }
  }

  p.mouseDragged = function() {
    mouseDraggedGrayScott();
  }

  // タッチイベントサポート（モバイル対応）- スクロールを維持
  p.touchStarted = function() {
    if (p.touches.length > 0) {
      let touch = p.touches[0];
      // キャンバス内のタッチのみ処理
      if (touch.x >= 0 && touch.x <= p.width && touch.y >= 0 && touch.y <= p.height) {
        addBAt(touch.x, touch.y);
        return false; // prevent default only for canvas touches
      }
    }
    // キャンバス外のタッチはデフォルト動作（スクロール）を許可
    return true;
  }

  p.touchMoved = function() {
    if (p.touches.length > 0) {
      let touch = p.touches[0];
      // キャンバス内のタッチのみ処理
      if (touch.x >= 0 && touch.x <= p.width && touch.y >= 0 && touch.y <= p.height) {
        addBAt(touch.x, touch.y);
        return false; // prevent default only for canvas touches
      }
    }
    // キャンバス外のタッチはデフォルト動作（スクロール）を許可
    return true;
  }

  p.keyPressed = function() {
    keyPressedGrayScott();
  }

  // Helper functions within the p5 instance scope
  function initializeGrayScott() {
    gsGrid = [];
    gsNextGrid = [];
    
    for (let x = 0; x < gsWidth; x++) {
      gsGrid[x] = [];
      gsNextGrid[x] = [];
      for (let y = 0; y < gsHeight; y++) {
        gsGrid[x][y] = { a: 1, b: 0 };
        gsNextGrid[x][y] = { a: 1, b: 0 };
      }
    }
    
    // 中央にBの種を配置
    let centerX = Math.floor(gsWidth / 2);
    let centerY = Math.floor(gsHeight / 2);
    let size = 10;
    
    for (let i = centerX - size; i < centerX + size; i++) {
      for (let j = centerY - size; j < centerY + size; j++) {
        if (i >= 0 && i < gsWidth && j >= 0 && j < gsHeight) {
          if (p.random(1) < 0.5) {
            gsGrid[i][j].b = 1;
          }
        }
      }
    }
  }

  function drawGrayScott() {
    // Gray-Scott反応拡散の計算（複数回実行で高速化）
    for (let i = 0; i < 10; i++) {
      updateGrayScott();
    }
    
    // グリッドを画面に描画 - よりシンプルで安定した方法
    p.loadPixels();
    let scaleFactor = Math.floor(p.width / gsWidth);
    
    for (let x = 0; x < gsWidth; x++) {
      for (let y = 0; y < gsHeight; y++) {
        let a = gsGrid[x][y].a;
        let b = gsGrid[x][y].b;
        let c = Math.floor((a - b) * 255);
        c = p.constrain(c, 0, 255);
        
        // ピクセルを拡大して描画 - モバイル対応の安定した方法
        for (let dx = 0; dx < scaleFactor; dx++) {
          for (let dy = 0; dy < scaleFactor; dy++) {
            let px = x * scaleFactor + dx;
            let py = y * scaleFactor + dy;
            if (px < p.width && py < p.height) {
              let idx = 4 * (py * p.width + px);
              p.pixels[idx] = c;
              p.pixels[idx + 1] = c;
              p.pixels[idx + 2] = c;
              p.pixels[idx + 3] = 255;
            }
          }
        }
      }
    }
    p.updatePixels();
  }

  function updateGrayScott() {
    // Gray-Scott反応拡散の更新
    for (let x = 1; x < gsWidth - 1; x++) {
      for (let y = 1; y < gsHeight - 1; y++) {
        let a = gsGrid[x][y].a;
        let b = gsGrid[x][y].b;
        
        let laplaceA = 0;
        let laplaceB = 0;
        
        // ラプラシアンの計算（3x3カーネル）
        laplaceA += gsGrid[x-1][y-1].a * 0.05;
        laplaceA += gsGrid[x][y-1].a * 0.2;
        laplaceA += gsGrid[x+1][y-1].a * 0.05;
        laplaceA += gsGrid[x-1][y].a * 0.2;
        laplaceA += gsGrid[x][y].a * -1.0;
        laplaceA += gsGrid[x+1][y].a * 0.2;
        laplaceA += gsGrid[x-1][y+1].a * 0.05;
        laplaceA += gsGrid[x][y+1].a * 0.2;
        laplaceA += gsGrid[x+1][y+1].a * 0.05;
        
        laplaceB += gsGrid[x-1][y-1].b * 0.05;
        laplaceB += gsGrid[x][y-1].b * 0.2;
        laplaceB += gsGrid[x+1][y-1].b * 0.05;
        laplaceB += gsGrid[x-1][y].b * 0.2;
        laplaceB += gsGrid[x][y].b * -1.0;
        laplaceB += gsGrid[x+1][y].b * 0.2;
        laplaceB += gsGrid[x-1][y+1].b * 0.05;
        laplaceB += gsGrid[x][y+1].b * 0.2;
        laplaceB += gsGrid[x+1][y+1].b * 0.05;
        
        // Gray-Scott方程式
        let newA = a + (gsDiffusionA * laplaceA - a * b * b + gsFeedRate * (1 - a)) * gsDt;
        let newB = b + (gsDiffusionB * laplaceB + a * b * b - (gsKillRate + gsFeedRate) * b) * gsDt;
        
        gsNextGrid[x][y].a = p.constrain(newA, 0, 1);
        gsNextGrid[x][y].b = p.constrain(newB, 0, 1);
      }
    }
    
    // グリッドの入れ替え
    let temp = gsGrid;
    gsGrid = gsNextGrid;
    gsNextGrid = temp;
  }

  function mousePressedGrayScott() {
    addBAt(p.mouseX, p.mouseY);
  }

  function mouseDraggedGrayScott() {
    addBAt(p.mouseX, p.mouseY);
  }

  function addBAt(mx, my) {
    let gridX = Math.floor(mx * gsWidth / p.width);
    let gridY = Math.floor(my * gsHeight / p.height);
    let dropSize = 5;
    
    for (let i = -dropSize; i <= dropSize; i++) {
      for (let j = -dropSize; j <= dropSize; j++) {
        let x = gridX + i;
        let y = gridY + j;
        if (x >= 0 && x < gsWidth && y >= 0 && y < gsHeight) {
          gsGrid[x][y].b = 1;
        }
      }
    }
  }

  function keyPressedGrayScott() {
    if (p.key === 'r' || p.key === 'R') {
      initializeGrayScott();
    } else if (p.key === 's' || p.key === 'S') {
      p.saveCanvas('gray_scott_' + Date.now(), 'png');
    }
  }

  // パラメータ更新関数（Next.jsから呼び出し可能）
  window.updateGrayScottParameter = function(param, value) {
    switch(param) {
      case 'feedRate':
        gsFeedRate = value;
        break;
      case 'killRate':
        gsKillRate = value;
        break;
      case 'diffusionA':
        gsDiffusionA = value;
        break;
      case 'diffusionB':
        gsDiffusionB = value;
        break;
    }
  }
});

// グローバルに公開
if (typeof window !== 'undefined') {
  window.grayScottSketch = true; // Mark this sketch as loaded
}