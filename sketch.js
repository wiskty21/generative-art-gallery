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

// Mandelbrot用変数
let mandelbrotZoom = 1;
let mandelbrotCenterX = -0.7;
let mandelbrotCenterY = 0.0;
let maxIterations = 100;
let mandelbrotPalette = [];

// Ornstein-Uhlenbeck用変数
let ouPaths = [];
let ouNumPaths = 50;
let ouTheta = 0.1; // 回帰速度
let ouSigma = 0.3; // ノイズ強度
let ouMu = 0; // 平均回帰値

// Gray-Scott用変数
let gsGrid = [];
let gsNextGrid = [];
let gsWidth, gsHeight;
let gsFeedRate = 0.037; // より興味深いパターンのための調整
let gsKillRate = 0.06;
let gsDiffusionA = 1.0;
let gsDiffusionB = 0.5;
let gsDt = 0.8; // 時間刻み幅（安定性のため小さく）

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
  } else if (currentMode === 'mandelbrot') {
    colorMode(RGB, 255);
    loadPixels();
    initializeMandelbrotPalette();
    drawMandelbrot();
  } else if (currentMode === 'ornstein_uhlenbeck') {
    colorMode(HSB, 360, 100, 100);
    background(0);
    ouPaths = [];
    for (let i = 0; i < ouNumPaths; i++) {
      ouPaths.push({
        x: width / 2,
        y: height / 2,
        value: 0,
        trail: []
      });
    }
  } else if (currentMode === 'gray_scott') {
    colorMode(RGB, 255);
    gsWidth = 256; // 2の累乗で効率化
    gsHeight = 256;
    initializeGrayScott();
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
  } else if (currentMode === 'mandelbrot') {
    // Mandelbrotは静的なので描画しない
  } else if (currentMode === 'ornstein_uhlenbeck') {
    drawOrnsteinUhlenbeck();
  } else if (currentMode === 'gray_scott') {
    drawGrayScott();
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
  } else if (currentMode === 'mandelbrot') {
    // マンデルブロ集合をズーム
    mandelbrotZoom *= 2;
    mandelbrotCenterX += (mouseX - width/2) / (width/4 * mandelbrotZoom);
    mandelbrotCenterY += (mouseY - height/2) / (height/4 * mandelbrotZoom);
    drawMandelbrot();
  } else if (currentMode === 'gray_scott') {
    // Gray-Scottに新しい種を追加
    let gsX = floor(map(mouseX, 0, width, 0, gsWidth));
    let gsY = floor(map(mouseY, 0, height, 0, gsHeight));
    for (let i = gsX - 5; i < gsX + 5; i++) {
      for (let j = gsY - 5; j < gsY + 5; j++) {
        if (i >= 0 && i < gsWidth && j >= 0 && j < gsHeight) {
          gsGrid[i][j].b = 1;
          gsGrid[i][j].a = 0;
        }
      }
    }
  }
}

function mouseMoved() {
  if (currentMode === 'recursive_tree') {
    angle = map(mouseX, 0, width, 10, 45);
    // lengthRatioの範囲を制限して、再帰が深くなりすぎないようにする
    lengthRatio = map(mouseY, 0, height, 0.5, 0.7); // 0.8から0.7に減少
  } else if (currentMode === 'ornstein_uhlenbeck') {
    // パラメータをマウス位置で調整
    ouTheta = map(mouseX, 0, width, 0.01, 0.5);
    ouSigma = map(mouseY, 0, height, 0.1, 1.0);
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
  } else if (currentMode === 'mandelbrot') {
    if (key === 'r' || key === 'R') {
      mandelbrotZoom = 1;
      mandelbrotCenterX = -0.7;
      mandelbrotCenterY = 0.0;
      drawMandelbrot();
    } else if (key === 's' || key === 'S') {
      save('mandelbrot_' + frameCount + '.png');
    }
  } else if (currentMode === 'ornstein_uhlenbeck') {
    if (key === 'r' || key === 'R') {
      for (let path of ouPaths) {
        path.x = width / 2;
        path.y = height / 2;
        path.value = 0;
        path.trail = [];
      }
      background(0);
    } else if (key === 's' || key === 'S') {
      save('ornstein_uhlenbeck_' + frameCount + '.png');
    }
  } else if (currentMode === 'gray_scott') {
    if (key === 'r' || key === 'R') {
      initializeGrayScott();
    } else if (key === 's' || key === 'S') {
      save('gray_scott_' + frameCount + '.png');
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

// Mandelbrot集合の描画
function initializeMandelbrotPalette() {
  mandelbrotPalette = [];
  for (let i = 0; i < maxIterations; i++) {
    let t = i / maxIterations;
    mandelbrotPalette.push({
      r: floor(9 * (1-t) * t * t * t * 255),
      g: floor(15 * (1-t) * (1-t) * t * t * 255),
      b: floor(8.5 * (1-t) * (1-t) * (1-t) * t * 255)
    });
  }
}

function mandelbrotIterations(x, y) {
  let cx = (x - width/2) / (width/4 * mandelbrotZoom) + mandelbrotCenterX;
  let cy = (y - height/2) / (height/4 * mandelbrotZoom) + mandelbrotCenterY;
  
  let zx = 0, zy = 0;
  let iterations = 0;
  
  while (zx*zx + zy*zy < 4 && iterations < maxIterations) {
    let temp = zx*zx - zy*zy + cx;
    zy = 2*zx*zy + cy;
    zx = temp;
    iterations++;
  }
  
  return iterations;
}

function drawMandelbrot() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let iterations = mandelbrotIterations(x, y);
      let colorIndex = iterations % mandelbrotPalette.length;
      let col = mandelbrotPalette[colorIndex];
      
      let index = (x + y * width) * 4;
      pixels[index] = col.r;
      pixels[index + 1] = col.g;
      pixels[index + 2] = col.b;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
}

// Ornstein-Uhlenbeck過程の描画
function drawOrnsteinUhlenbeck() {
  // 背景を少しずつフェード
  fill(0, 15);
  noStroke();
  rect(0, 0, width, height);
  
  for (let i = 0; i < ouPaths.length; i++) {
    let path = ouPaths[i];
    
    // Ornstein-Uhlenbeck過程の更新（時間刻み幅を小さく）
    let dt = 0.02; // 時間刻み幅
    let drift = -ouTheta * path.value * dt;
    let diffusion = ouSigma * randomGaussian() * sqrt(dt);
    path.value += drift + diffusion;
    
    // 値を制限して発散を防ぐ
    path.value = constrain(path.value, -4, 4);
    
    // 位置の更新（より滑らかに）
    path.x += random(-1, 1);
    path.y += path.value * 3; // スケールを小さく
    
    // 境界で反射（ラップではなく）
    if (path.x < 0) {
      path.x = 0;
    } else if (path.x > width) {
      path.x = width;
    }
    
    if (path.y < 0) {
      path.y = 0;
      path.value = abs(path.value) * 0.5; // 反射時に値を調整
    } else if (path.y > height) {
      path.y = height;
      path.value = -abs(path.value) * 0.5; // 反射時に値を調整
    }
    
    // トレイルに追加
    path.trail.push({x: path.x, y: path.y, value: path.value});
    if (path.trail.length > 150) {
      path.trail.shift();
    }
    
    // トレイルの描画
    if (path.trail.length > 1) {
      for (let j = 1; j < path.trail.length; j++) {
        let alpha = map(j, 0, path.trail.length, 0, 1);
        let currentValue = path.trail[j].value;
        let hue = map(currentValue, -4, 4, 240, 360);
        let sat = map(abs(currentValue), 0, 4, 40, 100);
        stroke(hue, sat, 90, alpha * 120);
        strokeWeight(map(alpha, 0, 1, 0.5, 3));
        line(path.trail[j-1].x, path.trail[j-1].y, path.trail[j].x, path.trail[j].y);
      }
    }
  }
}

// Gray-Scott反応拡散系の初期化と描画
function initializeGrayScott() {
  gsGrid = [];
  gsNextGrid = [];
  
  for (let x = 0; x < gsWidth; x++) {
    gsGrid[x] = [];
    gsNextGrid[x] = [];
    for (let y = 0; y < gsHeight; y++) {
      gsGrid[x][y] = {a: 1, b: 0};
      gsNextGrid[x][y] = {a: 1, b: 0};
    }
  }
  
  // 複数の種を異なる場所に配置
  let seedPositions = [
    {x: gsWidth/2, y: gsHeight/2},
    {x: gsWidth/3, y: gsHeight/3},
    {x: 2*gsWidth/3, y: 2*gsHeight/3},
    {x: gsWidth/4, y: 3*gsHeight/4}
  ];
  
  for (let seed of seedPositions) {
    for (let i = seed.x - 8; i < seed.x + 8; i++) {
      for (let j = seed.y - 8; j < seed.y + 8; j++) {
        if (i >= 0 && i < gsWidth && j >= 0 && j < gsHeight) {
          let dist = sqrt((i - seed.x)*(i - seed.x) + (j - seed.y)*(j - seed.y));
          if (dist < 8) {
            gsGrid[i][j].b = random(0.5, 1.0);
            gsGrid[i][j].a = random(0, 0.5);
          }
        }
      }
    }
  }
}

function drawGrayScott() {
  // Gray-Scott反応拡散の計算（安定性を考慮した改良版）
  for (let x = 1; x < gsWidth - 1; x++) {
    for (let y = 1; y < gsHeight - 1; y++) {
      let a = gsGrid[x][y].a;
      let b = gsGrid[x][y].b;
      
      // 5点ラプラシアンの計算（より正確）
      let laplaceA = (gsGrid[x-1][y].a + gsGrid[x+1][y].a + 
                      gsGrid[x][y-1].a + gsGrid[x][y+1].a - 4*a);
      let laplaceB = (gsGrid[x-1][y].b + gsGrid[x+1][y].b + 
                      gsGrid[x][y-1].b + gsGrid[x][y+1].b - 4*b);
      
      // Gray-Scott方程式（安定化された形）
      let reaction = a * b * b;
      let newA = a + gsDt * (gsDiffusionA * laplaceA - reaction + gsFeedRate * (1 - a));
      let newB = b + gsDt * (gsDiffusionB * laplaceB + reaction - (gsKillRate + gsFeedRate) * b);
      
      // 値の制限（数値的安定性のため）
      gsNextGrid[x][y].a = constrain(newA, 0, 1);
      gsNextGrid[x][y].b = constrain(newB, 0, 1);
    }
  }
  
  // 境界条件（ゼロフラックス）
  for (let x = 0; x < gsWidth; x++) {
    gsNextGrid[x][0] = gsNextGrid[x][1];
    gsNextGrid[x][gsHeight-1] = gsNextGrid[x][gsHeight-2];
  }
  for (let y = 0; y < gsHeight; y++) {
    gsNextGrid[0][y] = gsNextGrid[1][y];
    gsNextGrid[gsWidth-1][y] = gsNextGrid[gsWidth-2][y];
  }
  
  // グリッドの更新
  let temp = gsGrid;
  gsGrid = gsNextGrid;
  gsNextGrid = temp;
  
  // より美しい描画（カラーマップ改善）
  loadPixels();
  let scale = width / gsWidth;
  
  for (let x = 0; x < gsWidth; x++) {
    for (let y = 0; y < gsHeight; y++) {
      let a = gsGrid[x][y].a;
      let b = gsGrid[x][y].b;
      
      // カラーマッピング（より鮮やかに）
      let r, g, bl;
      if (b > 0.1) {
        // パターンのある領域
        r = floor(255 * (1 - a) * b * 4);
        g = floor(255 * b * 2);
        bl = floor(255 * b * b * 8);
      } else {
        // 背景領域
        r = floor(20 + 50 * a);
        g = floor(10 + 30 * a);
        bl = floor(40 + 80 * a);
      }
      
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      bl = constrain(bl, 0, 255);
      
      // ピクセル描画（アンチエイリアシング付き）
      for (let dx = 0; dx < scale; dx++) {
        for (let dy = 0; dy < scale; dy++) {
          let px = floor(x * scale + dx);
          let py = floor(y * scale + dy);
          if (px < width && py < height) {
            let index = (px + py * width) * 4;
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = bl;
            pixels[index + 3] = 255;
          }
        }
      }
    }
  }
  updatePixels();
}