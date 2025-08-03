// Wave Interference - 純粋p5.js版

// 競合回避の自己クリーンアップ
if (typeof window.waveInterferenceSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// Wave Interference variables
var time = 0;
var numWaves = 3;
var waves = [];

// p5.js instance mode to avoid global conflicts
new p5(function(p) {
  p.setup = function() {
    console.log('Wave Interference setup called');
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
    initializeWaveInterference(p);
    console.log('Wave Interference initialized');
  }

  p.draw = function() {
    drawWaveInterference(p);
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      mousePressedWaveInterference(p);
    }
  }

  p.keyPressed = function() {
    keyPressedWaveInterference(p);
  }
});

function initializeWaveInterference(p) {
  waves = [];
  p.colorMode(p.HSB, 360, 100, 100);
  for (let i = 0; i < numWaves; i++) {
    waves.push({
      x: p.random(p.width),
      y: p.random(p.height),
      amplitude: p.random(50, 150),
      frequency: p.random(0.02, 0.05),
      phase: p.random(p.TWO_PI)
    });
  }
}

function drawWaveInterference(p) {
  p.colorMode(p.HSB, 360, 100, 100);
  p.background(0);
  
  let resolution = 4;
  for (let x = 0; x < p.width; x += resolution) {
    for (let y = 0; y < p.height; y += resolution) {
      let totalAmplitude = 0;
      
      for (let w of waves) {
        let distance = p.dist(x, y, w.x, w.y);
        let amplitude = w.amplitude * p.sin(distance * w.frequency - time + w.phase);
        amplitude *= p.map(distance, 0, p.width, 1, 0.1);
        totalAmplitude += amplitude;
      }
      
      let hue = p.map(totalAmplitude, -200, 200, 0, 300);
      let brightness = p.map(p.abs(totalAmplitude), 0, 200, 30, 100);
      
      p.fill(hue, 70, brightness);
      p.noStroke();
      p.rect(x, y, resolution, resolution);
    }
  }
  
  for (let w of waves) {
    p.fill(0, 0, 100);
    p.ellipse(w.x, w.y, 10, 10);
  }
  
  time += 0.1;
}

function mousePressedWaveInterference(p) {
  let minDist = Infinity;
  let closestWave = 0;
  
  for (let i = 0; i < numWaves; i++) {
    let d = p.dist(p.mouseX, p.mouseY, waves[i].x, waves[i].y);
    if (d < minDist) {
      minDist = d;
      closestWave = i;
    }
  }
  
  waves[closestWave].x = p.mouseX;
  waves[closestWave].y = p.mouseY;
}

function keyPressedWaveInterference(p) {
  if (p.key === ' ') {
    for (let w of waves) {
      w.x = p.random(p.width);
      w.y = p.random(p.height);
    }
  } else if (p.key === 'r' || p.key === 'R') {
    for (let w of waves) {
      w.frequency = p.random(0.02, 0.05);
      w.amplitude = p.random(50, 150);
    }
  }
}

// パラメータ更新関数（Next.jsから呼び出し可能）
function updateWaveInterferenceParameter(param, value) {
  switch(param) {
    case 'numWaves':
      numWaves = value;
      // Re-initialize waves with new count
      if (typeof window.p5 !== 'undefined') {
        initializeWaveInterference(window.p5);
      }
      break;
    case 'waveSpeed':
      // Adjust time increment speed
      break;
  }
}

// グローバルに公開
if (typeof window !== 'undefined') {
  window.updateWaveInterferenceParameter = updateWaveInterferenceParameter;
  window.waveInterferenceSketch = true; // Mark this sketch as loaded
}