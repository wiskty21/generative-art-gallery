// Wave Interference - 純粋p5.js版

// 競合回避の自己クリーンアップ
if (typeof window.waveInterferenceSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// p5.js instance mode to avoid global conflicts
window.currentP5Instance = new p5(function(p) {
  // Wave Interference variables - instance scope
  let time = 0;
  let numWaves = 3;
  let waves = [];
  let waveSpeed = 0.1;

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
    initializeWaveInterference();
    console.log('Wave Interference initialized');
  }

  p.draw = function() {
    drawWaveInterference();
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      mousePressedWaveInterference();
    }
  }

  p.keyPressed = function() {
    keyPressedWaveInterference();
  }

  // Helper functions within the p5 instance scope
  function initializeWaveInterference() {
    p.colorMode(p.HSB, 360, 100, 100);
    p.background(0);
    time = 0;
    waves = [];
    
    for (let i = 0; i < numWaves; i++) {
      let x = p.random(p.width);
      let y = p.random(p.height);
      waves.push({x: x, y: y, amplitude: p.random(30, 50), frequency: p.random(0.05, 0.2)});
    }
  }

  function drawWaveInterference() {
    p.background(0);
    p.loadPixels();
    
    let pixelDens = p.pixelDensity();
    let halfWidth = p.width * pixelDens;
    let halfHeight = p.height * pixelDens;
    
    for (let x = 0; x < halfWidth; x += 4) {
      for (let y = 0; y < halfHeight; y += 4) {
        let totalAmplitude = 0;
        
        for (let wave of waves) {
          let distance = p.dist(x / pixelDens, y / pixelDens, wave.x, wave.y);
          let waveValue = wave.amplitude * p.sin(distance * wave.frequency - time * waveSpeed);
          totalAmplitude += waveValue;
        }
        
        let hue = p.map(totalAmplitude, -numWaves * 50, numWaves * 50, 0, 360);
        let brightness = p.map(p.abs(totalAmplitude), 0, numWaves * 50, 30, 100);
        let col = p.color(hue, 70, brightness);
        
        for (let dx = 0; dx < 4; dx++) {
          for (let dy = 0; dy < 4; dy++) {
            let idx = 4 * ((y + dy) * halfWidth + (x + dx));
            p.pixels[idx] = p.red(col);
            p.pixels[idx + 1] = p.green(col);
            p.pixels[idx + 2] = p.blue(col);
            p.pixels[idx + 3] = 255;
          }
        }
      }
    }
    
    p.updatePixels();
    time += 5;
  }

  function mousePressedWaveInterference() {
    waves.push({x: p.mouseX, y: p.mouseY, amplitude: p.random(30, 50), frequency: p.random(0.05, 0.2)});
  }

  function keyPressedWaveInterference() {
    if (p.key === 'r' || p.key === 'R') {
      initializeWaveInterference();
    }
  }

  // パラメータ更新関数（Next.jsから呼び出し可能）
  window.updateWaveInterferenceParameter = function(param, value) {
    switch(param) {
      case 'numWaves':
        numWaves = value;
        initializeWaveInterference();
        break;
      case 'waveSpeed':
        waveSpeed = value;
        break;
    }
  }
});

// グローバルに公開
if (typeof window !== 'undefined') {
  window.waveInterferenceSketch = true; // Mark this sketch as loaded
}