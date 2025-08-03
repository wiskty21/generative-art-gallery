let time = 0;
let numWaves = 3;
let waves = [];

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent('canvas-container');
  colorMode(HSB, 360, 100, 100);
  
  // 波の初期化
  for (let i = 0; i < numWaves; i++) {
    waves.push({
      x: random(width),
      y: random(height),
      amplitude: random(50, 150),
      frequency: random(0.02, 0.05),
      phase: random(TWO_PI)
    });
  }
  
  currentSketch = { remove: () => { 
    noLoop();
    waves = [];
    remove();
  }};
}

function draw() {
  background(0);
  
  // グリッドで波の干渉を計算
  let resolution = 4;
  for (let x = 0; x < width; x += resolution) {
    for (let y = 0; y < height; y += resolution) {
      let totalAmplitude = 0;
      
      // 各波からの影響を合計
      for (let w of waves) {
        let distance = dist(x, y, w.x, w.y);
        let amplitude = w.amplitude * sin(distance * w.frequency - time + w.phase);
        amplitude *= map(distance, 0, width, 1, 0.1); // 距離による減衰
        totalAmplitude += amplitude;
      }
      
      // 振幅を色にマッピング
      let hue = map(totalAmplitude, -200, 200, 0, 300);
      let brightness = map(abs(totalAmplitude), 0, 200, 30, 100);
      
      fill(hue, 70, brightness);
      noStroke();
      rect(x, y, resolution, resolution);
    }
  }
  
  // 波の中心を表示
  for (let w of waves) {
    fill(0, 0, 100);
    ellipse(w.x, w.y, 10, 10);
  }
  
  time += 0.1;
}

// マウスクリックで波の位置を変更
function mousePressed() {
  if (mouseButton === LEFT) {
    // 最も近い波をマウス位置に移動
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

// キー押下で設定変更
function keyPressed() {
  if (key === ' ') {
    // ランダムに再配置
    for (let w of waves) {
      w.x = random(width);
      w.y = random(height);
    }
  } else if (key === 'r' || key === 'R') {
    // パラメータをランダムに変更
    for (let w of waves) {
      w.frequency = random(0.02, 0.05);
      w.amplitude = random(50, 150);
    }
  }
}