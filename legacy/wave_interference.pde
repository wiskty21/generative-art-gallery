float time = 0;
int numWaves = 3;
Wave[] waves;

void setup() {
  size(800, 800);
  colorMode(HSB, 360, 100, 100);
  
  // 波の初期化
  waves = new Wave[numWaves];
  for (int i = 0; i < numWaves; i++) {
    waves[i] = new Wave(
      random(width), 
      random(height),
      random(50, 150),
      random(0.02, 0.05),
      random(TWO_PI)
    );
  }
}

void draw() {
  background(0);
  
  // グリッドで波の干渉を計算
  int resolution = 4;
  for (int x = 0; x < width; x += resolution) {
    for (int y = 0; y < height; y += resolution) {
      float totalAmplitude = 0;
      
      // 各波からの影響を合計
      for (Wave w : waves) {
        float distance = dist(x, y, w.x, w.y);
        float amplitude = w.amplitude * sin(distance * w.frequency - time + w.phase);
        amplitude *= map(distance, 0, width, 1, 0.1); // 距離による減衰
        totalAmplitude += amplitude;
      }
      
      // 振幅を色にマッピング
      float hue = map(totalAmplitude, -200, 200, 0, 300);
      float brightness = map(abs(totalAmplitude), 0, 200, 30, 100);
      
      fill(hue, 70, brightness);
      noStroke();
      rect(x, y, resolution, resolution);
    }
  }
  
  // 波の中心を表示
  for (Wave w : waves) {
    fill(0, 0, 100);
    ellipse(w.x, w.y, 10, 10);
  }
  
  time += 0.1;
}

// マウスクリックで波の位置を変更
void mousePressed() {
  if (mouseButton == LEFT) {
    // 最も近い波をマウス位置に移動
    float minDist = Float.MAX_VALUE;
    int closestWave = 0;
    
    for (int i = 0; i < numWaves; i++) {
      float d = dist(mouseX, mouseY, waves[i].x, waves[i].y);
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
void keyPressed() {
  if (key == ' ') {
    // ランダムに再配置
    for (Wave w : waves) {
      w.x = random(width);
      w.y = random(height);
    }
  } else if (key == 'r') {
    // パラメータをランダムに変更
    for (Wave w : waves) {
      w.frequency = random(0.02, 0.05);
      w.amplitude = random(50, 150);
    }
  }
}

// 波クラス
class Wave {
  float x, y;
  float amplitude;
  float frequency;
  float phase;
  
  Wave(float x, float y, float amplitude, float frequency, float phase) {
    this.x = x;
    this.y = y;
    this.amplitude = amplitude;
    this.frequency = frequency;
    this.phase = phase;
  }
}