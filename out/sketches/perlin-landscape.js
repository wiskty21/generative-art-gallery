// Perlin Noise Landscape - 純粋p5.js版

// Avoid conflicts by using cleanup
if (typeof window.perlinLandscapeSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// p5.js instance mode to avoid global conflicts
window.currentP5Instance = new p5(function(p) {
  // Perlin Landscape variables - instance scope
  let cols, rows;
  let scl = 20;
  let w = 1200;
  let h = 900;
  let terrain = [];
  let flying = 0;

  p.setup = function() {
    console.log('Perlin Landscape setup called');
    const canvasContainer = document.getElementById('p5-canvas-container');
    if (!canvasContainer) {
      console.error('Canvas container not found');
      return;
    }
    
    const size = Math.min(600, window.innerWidth - 100, window.innerHeight - 100);
    console.log('Creating canvas with size:', size);
    const canvas = p.createCanvas(size, size, p.WEBGL);
    canvas.parent('p5-canvas-container');
    
    cols = w / scl;
    rows = h / scl;
    console.log('Perlin Landscape initialized');
  }

  p.draw = function() {
    flying -= 0.01;
    let yoff = flying;
    
    // Generate terrain using Perlin noise
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      terrain[y] = [];
      for (let x = 0; x < cols; x++) {
        terrain[y][x] = p.map(p.noise(xoff, yoff), 0, 1, -100, 100);
        xoff += 0.2;
      }
      yoff += 0.2;
    }

    p.background(0);
    p.translate(0, 50);
    p.rotateX(p.PI/3);
    
    p.fill(100, 255, 100, 50);
    p.stroke(255);
    p.strokeWeight(1);
    
    p.translate(-w/2, -h/2);
    
    // Draw terrain mesh
    for (let y = 0; y < rows - 1; y++) {
      p.beginShape(p.TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        p.vertex(x * scl, y * scl, terrain[y][x]);
        p.vertex(x * scl, (y + 1) * scl, terrain[y + 1][x]);
      }
      p.endShape();
    }
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      // Reset terrain parameters
      flying = p.random(-100, 0);
    }
  }

  p.keyPressed = function() {
    if (p.key === ' ') {
      flying = p.random(-100, 0);
    }
  }

  // パラメータ更新関数（Next.jsから呼び出し可能）
  window.updatePerlinLandscapeParameter = function(param, value) {
    switch(param) {
      case 'scale':
        scl = value;
        cols = w / scl;
        rows = h / scl;
        break;
      case 'speed':
        // Speed is controlled by the flying increment in draw()
        break;
    }
  }

  window.perlinLandscapeSketch = true;
});