// Lissajous Curves - 純粋p5.js版

// Avoid conflicts by using cleanup
if (typeof window.lissajousSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// p5.js instance mode to avoid global conflicts
window.currentP5Instance = new p5(function(p) {
  // Lissajous variables - instance scope
  let points = [];
  let maxPoints = 1000;
  let t = 0;
  let freqX = 3;
  let freqY = 2;
  let phaseShift = 0;
  let amplitude = 150;
  let speed = 0.02;
  let trailLength = 500;
  let colorShift = 0;

  p.setup = function() {
    console.log('Lissajous setup called');
    const canvasContainer = document.getElementById('p5-canvas-container');
    if (!canvasContainer) {
      console.error('Canvas container not found');
      return;
    }
    
    const size = Math.min(600, window.innerWidth - 100, window.innerHeight - 100);
    console.log('Creating canvas with size:', size);
    const canvas = p.createCanvas(size, size);
    canvas.parent('p5-canvas-container');
    
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.background(0, 0, 10);
    console.log('Lissajous initialized');
  }

  p.draw = function() {
    // Fade background for trail effect
    p.fill(0, 0, 10, 8);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);
    
    // Calculate new point
    let x = amplitude * p.sin(freqX * t + phaseShift) + p.width / 2;
    let y = amplitude * p.sin(freqY * t) + p.height / 2;
    
    // Add point to array
    points.push({x: x, y: y, t: t});
    
    // Remove old points to maintain trail length
    if (points.length > trailLength) {
      points.shift();
    }
    
    // Draw the curve
    p.strokeWeight(2);
    for (let i = 0; i < points.length - 1; i++) {
      let alpha = p.map(i, 0, points.length - 1, 10, 100);
      let hue = (colorShift + i * 2) % 360;
      p.stroke(hue, 80, 90, alpha);
      
      if (i > 0) {
        p.line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
      }
    }
    
    // Draw current point
    p.fill(colorShift % 360, 100, 100, 80);
    p.noStroke();
    p.ellipse(x, y, 8, 8);
    
    // Update time and color
    t += speed;
    colorShift += 0.5;
    
    // Reset after full cycle to prevent memory growth
    if (t > p.TWO_PI * 10) {
      t = 0;
      points = [];
    }
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      // Randomize frequencies
      freqX = p.random(1, 6);
      freqY = p.random(1, 6);
      phaseShift = p.random(0, p.TWO_PI);
      points = [];
      t = 0;
      p.background(0, 0, 10);
    }
  }

  p.keyPressed = function() {
    if (p.key === ' ') {
      // Reset with new random parameters
      freqX = p.random(1, 8);
      freqY = p.random(1, 8);
      phaseShift = p.random(0, p.TWO_PI);
      amplitude = p.random(100, 200);
      points = [];
      t = 0;
      p.background(0, 0, 10);
    } else if (p.key === 'c' || p.key === 'C') {
      // Clear screen
      p.background(0, 0, 10);
      points = [];
      t = 0;
    } else if (p.key === 's' || p.key === 'S') {
      p.saveCanvas('lissajous_' + Date.now(), 'png');
    }
  }

  // Preset patterns
  function setPattern(pattern) {
    switch(pattern) {
      case 'circle':
        freqX = 1;
        freqY = 1;
        phaseShift = p.PI / 2;
        break;
      case 'figure8':
        freqX = 1;
        freqY = 2;
        phaseShift = 0;
        break;
      case 'trefoil':
        freqX = 3;
        freqY = 2;
        phaseShift = 0;
        break;
      case 'rose':
        freqX = 5;
        freqY = 4;
        phaseShift = 0;
        break;
      case 'complex':
        freqX = 7;
        freqY = 5;
        phaseShift = p.PI / 4;
        break;
    }
    points = [];
    t = 0;
    p.background(0, 0, 10);
  }

  // パラメータ更新関数（Next.jsから呼び出し可能）
  window.updateLissajousParameter = function(param, value) {
    switch(param) {
      case 'freqX':
        freqX = value;
        points = [];
        t = 0;
        break;
      case 'freqY':
        freqY = value;
        points = [];
        t = 0;
        break;
      case 'phase':
        phaseShift = value;
        points = [];
        t = 0;
        break;
      case 'amplitude':
        amplitude = value;
        break;
      case 'speed':
        speed = value;
        break;
      case 'trailLength':
        trailLength = value;
        break;
      case 'pattern':
        setPattern(value);
        break;
    }
  }

  window.lissajousSketch = true;
});