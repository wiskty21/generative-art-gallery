// Harmonic Waves - 純粋p5.js版

// 競合回避の自己クリーンアップ
if (typeof window.harmonicWavesSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// Harmonic Waves variables
var hwTime = 0;
var hwFreqX = 0.02;
var hwFreqY = 0.015;
var hwPhaseX = 0;
var hwPhaseY = 0;
var hwAmplitude = 80;

// p5.js instance mode to avoid global conflicts
new p5(function(p) {
  p.setup = function() {
    console.log('Harmonic Waves setup called');
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
    initializeHarmonicWaves(p);
    console.log('Harmonic Waves initialized');
  }

  p.draw = function() {
    drawHarmonicWaves(p);
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      mousePressedHarmonicWaves(p);
    }
  }

  p.mouseMoved = function() {
    mouseMovedHarmonicWaves(p);
  }

  p.keyPressed = function() {
    keyPressedHarmonicWaves(p);
  }
});

function initializeHarmonicWaves(p) {
  p.colorMode(p.HSB, 360, 100, 100);
  p.background(0);
  hwTime = 0;
}

function drawHarmonicWaves(p) {
  // 背景を少しずつフェード
  p.fill(0, 20);
  p.noStroke();
  p.rect(0, 0, p.width, p.height);
  
  // 波の描画
  for (let layer = 0; layer < 3; layer++) {
    let freq1 = hwFreqX * (layer + 1);
    let freq2 = hwFreqY * (layer + 1);
    let phase1 = hwPhaseX + layer * p.PI / 3;
    let phase2 = hwPhaseY + layer * p.PI / 4;
    
    p.stroke((120 + layer * 60) % 360, 80, 90, 60);
    p.strokeWeight(2);
    p.noFill();
    
    p.beginShape();
    for (let x = 0; x < p.width; x += 4) {
      let wave1 = p.sin(x * freq1 + hwTime + phase1) * hwAmplitude;
      let wave2 = p.cos(x * freq2 + hwTime * 1.3 + phase2) * hwAmplitude * 0.7;
      let y = p.height / 2 + wave1 + wave2;
      p.vertex(x, y);
    }
    p.endShape();
    
    // 垂直方向の波も追加
    p.beginShape();
    for (let y = 0; y < p.height; y += 4) {
      let wave1 = p.sin(y * freq2 + hwTime * 1.1 + phase1) * hwAmplitude;
      let wave2 = p.cos(y * freq1 + hwTime * 0.9 + phase2) * hwAmplitude * 0.5;
      let x = p.width / 2 + wave1 + wave2;
      p.vertex(x, y);
    }
    p.endShape();
  }
  
  hwTime += 0.02;
}

function mousePressedHarmonicWaves(p) {
  // 波をリセット
  hwTime = 0;
  hwPhaseX = p.random(p.TWO_PI);
  hwPhaseY = p.random(p.TWO_PI);
}

function mouseMovedHarmonicWaves(p) {
  hwFreqX = p.map(p.mouseX, 0, p.width, 0.005, 0.05);
  hwFreqY = p.map(p.mouseY, 0, p.height, 0.005, 0.05);
}

function keyPressedHarmonicWaves(p) {
  if (p.key === 'r' || p.key === 'R') {
    hwTime = 0;
    hwPhaseX = 0;
    hwPhaseY = 0;
    p.background(0);
  } else if (p.key === 's' || p.key === 'S') {
    p.save('harmonic_waves_' + p.frameCount + '.png');
  }
}

// パラメータ更新関数（Next.jsから呼び出し可能）
function updateHarmonicWavesParameter(param, value) {
  switch(param) {
    case 'freqX':
      hwFreqX = value;
      break;
    case 'freqY':
      hwFreqY = value;
      break;
    case 'amplitude':
      hwAmplitude = value;
      break;
  }
}

// グローバルに公開
if (typeof window !== 'undefined') {
  window.updateHarmonicWavesParameter = updateHarmonicWavesParameter;
  window.harmonicWavesSketch = true;
}