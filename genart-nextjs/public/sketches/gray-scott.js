// Gray-Scott反応拡散系 - 純粋p5.js版

// Avoid conflicts by using a unique namespace
if (typeof window.grayScottSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// Gray-Scott variables  
var gsGrid = [];
var gsNextGrid = [];
var gsWidth = 200;
var gsHeight = 200;
var gsFeedRate = 0.055;
var gsKillRate = 0.062;
var gsDiffusionA = 1.0;
var gsDiffusionB = 0.5;
var gsDt = 1.0;

// p5.js instance mode to avoid global conflicts
new p5(function(p) {
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
    initializeGrayScott(p);
    console.log('Gray-Scott initialized');
  }

  p.draw = function() {
    drawGrayScott(p);
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      mousePressed(p);
    }
  }

  p.keyPressed = function() {
    keyPressed(p);
  }
});

function initializeGrayScott(p) {
  p.colorMode(p.RGB, 255);
  gsGrid = [];
  gsNextGrid = [];
  
  for (let x = 0; x < gsWidth; x++) {
    gsGrid[x] = [];
    gsNextGrid[x] = [];
    for (let y = 0; y < gsHeight; y++) {
      gsGrid[x][y] = {a: 1.0, b: 0.0};
      gsNextGrid[x][y] = {a: 1.0, b: 0.0};
    }
  }
  
  // 中央に小さな種を1つ配置（シンプルに）
  let centerX = p.floor(gsWidth / 2);
  let centerY = p.floor(gsHeight / 2);
  
  for (let i = centerX - 10; i <= centerX + 10; i++) {
    for (let j = centerY - 10; j <= centerY + 10; j++) {
      if (i >= 0 && i < gsWidth && j >= 0 && j < gsHeight) {
        let dist = p.sqrt((i - centerX)*(i - centerX) + (j - centerY)*(j - centerY));
        if (dist <= 10) {
          gsGrid[i][j].a = 0.5;
          gsGrid[i][j].b = 0.25;
        }
      }
    }
  }
}

function drawGrayScott(p) {
  // 複数回の小さなステップで安定性向上
  let numSteps = 20;
  let smallDt = gsDt / numSteps;
  
  for (let step = 0; step < numSteps; step++) {
    // Gray-Scott反応拡散の計算
    for (let x = 1; x < gsWidth - 1; x++) {
      for (let y = 1; y < gsHeight - 1; y++) {
        let a = gsGrid[x][y].a;
        let b = gsGrid[x][y].b;
        
        // ラプラシアンの計算
        let laplaceA = gsGrid[x-1][y].a + gsGrid[x+1][y].a + 
                       gsGrid[x][y-1].a + gsGrid[x][y+1].a - 4*a;
        let laplaceB = gsGrid[x-1][y].b + gsGrid[x+1][y].b + 
                       gsGrid[x][y-1].b + gsGrid[x][y+1].b - 4*b;
        
        // Gray-Scott方程式
        let reaction = a * b * b;
        let newA = a + smallDt * (gsDiffusionA * laplaceA - reaction + gsFeedRate * (1 - a));
        let newB = b + smallDt * (gsDiffusionB * laplaceB + reaction - (gsKillRate + gsFeedRate) * b);
        
        gsNextGrid[x][y].a = p.constrain(newA, 0, 1);
        gsNextGrid[x][y].b = p.constrain(newB, 0, 1);
      }
    }
    
    // 境界条件（周期境界）
    for (let x = 0; x < gsWidth; x++) {
      gsNextGrid[x][0] = gsNextGrid[x][gsHeight-2];
      gsNextGrid[x][gsHeight-1] = gsNextGrid[x][1];
    }
    for (let y = 0; y < gsHeight; y++) {
      gsNextGrid[0][y] = gsNextGrid[gsWidth-2][y];
      gsNextGrid[gsWidth-1][y] = gsNextGrid[1][y];
    }
    
    // グリッドの更新
    let temp = gsGrid;
    gsGrid = gsNextGrid;
    gsNextGrid = temp;
  }
  
  // 描画
  p.loadPixels();
  let scale = p.width / gsWidth;
  
  for (let x = 0; x < gsWidth; x++) {
    for (let y = 0; y < gsHeight; y++) {
      let a = gsGrid[x][y].a;
      let b = gsGrid[x][y].b;
      
      // シンプルなカラーマッピング
      let intensity = p.floor(b * 255);
      let r = intensity;
      let g = p.floor(intensity * 0.5);
      let bl = p.floor(intensity * 0.3);
      
      // 背景色
      if (b < 0.1) {
        r = p.floor(30 + 20 * a);
        g = p.floor(10 + 15 * a);
        bl = p.floor(60 + 40 * a);
      }
      
      // ピクセル描画
      for (let dx = 0; dx < scale; dx++) {
        for (let dy = 0; dy < scale; dy++) {
          let px = p.floor(x * scale + dx);
          let py = p.floor(y * scale + dy);
          if (px < p.width && py < p.height) {
            let index = (px + py * p.width) * 4;
            p.pixels[index] = r;
            p.pixels[index + 1] = g;
            p.pixels[index + 2] = bl;
            p.pixels[index + 3] = 255;
          }
        }
      }
    }
  }
  p.updatePixels();
}

function mousePressed(p) {
  // Gray-Scottに新しい種を追加
  let gsX = p.floor(p.map(p.mouseX, 0, p.width, 0, gsWidth));
  let gsY = p.floor(p.map(p.mouseY, 0, p.height, 0, gsHeight));
  for (let i = gsX - 5; i < gsX + 5; i++) {
    for (let j = gsY - 5; j < gsY + 5; j++) {
      if (i >= 0 && i < gsWidth && j >= 0 && j < gsHeight) {
        gsGrid[i][j].b = 1;
        gsGrid[i][j].a = 0;
      }
    }
  }
}

function keyPressed(p) {
  if (p.key === 'r' || p.key === 'R') {
    initializeGrayScott(p);
  }
}

// パラメータ更新関数（Next.jsから呼び出し可能）
function updateParameter(param, value) {
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

// グローバルに公開
if (typeof window !== 'undefined') {
  window.updateGrayScottParameter = updateParameter;
  window.grayScottSketch = true; // Mark this sketch as loaded
}