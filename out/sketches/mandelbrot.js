// Mandelbrot Set - 純粋p5.js版

// 競合回避の自己クリーンアップ
if (typeof window.mandelbrotSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// Mandelbrot variables
var mandelbrotZoom = 1;
var mandelbrotCenterX = -0.7;
var mandelbrotCenterY = 0.0;
var maxIterations = 100;
var mandelbrotPalette = [];

// p5.js instance mode to avoid global conflicts
window.currentP5Instance = new p5(function(p) {
  p.setup = function() {
    console.log('Mandelbrot setup called');
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
    initializeMandelbrot(p);
    console.log('Mandelbrot initialized');
  }

  p.draw = function() {
    // Static image, no animation needed
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      mousePressedMandelbrot(p);
    }
  }

  p.keyPressed = function() {
    keyPressedMandelbrot(p);
  }
});

function initializeMandelbrot(p) {
  p.colorMode(p.RGB, 255);
  p.background(0);
  initializeMandelbrotPalette(p);
  drawMandelbrot(p);
}

function initializeMandelbrotPalette(p) {
  mandelbrotPalette = [];
  for (let i = 0; i < maxIterations; i++) {
    let t = i / maxIterations;
    mandelbrotPalette.push({
      r: Math.floor(9 * (1-t) * t * t * t * 255),
      g: Math.floor(15 * (1-t) * (1-t) * t * t * 255),
      b: Math.floor(8.5 * (1-t) * (1-t) * (1-t) * t * 255)
    });
  }
}

function mandelbrotIterations(p, x, y) {
  let cx = (x - p.width/2) / (p.width/4 * mandelbrotZoom) + mandelbrotCenterX;
  let cy = (y - p.height/2) / (p.height/4 * mandelbrotZoom) + mandelbrotCenterY;
  
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

function drawMandelbrot(p) {
  p.loadPixels();
  for (let x = 0; x < p.width; x++) {
    for (let y = 0; y < p.height; y++) {
      let iterations = mandelbrotIterations(p, x, y);
      let colorIndex = iterations % mandelbrotPalette.length;
      let col = mandelbrotPalette[colorIndex];
      
      let index = (x + y * p.width) * 4;
      p.pixels[index] = col.r;
      p.pixels[index + 1] = col.g;
      p.pixels[index + 2] = col.b;
      p.pixels[index + 3] = 255;
    }
  }
  p.updatePixels();
}

function mousePressedMandelbrot(p) {
  // マンデルブロ集合をズーム
  mandelbrotZoom *= 2;
  mandelbrotCenterX += (p.mouseX - p.width/2) / (p.width/4 * mandelbrotZoom);
  mandelbrotCenterY += (p.mouseY - p.height/2) / (p.height/4 * mandelbrotZoom);
  p.background(0); // 描画前に背景をクリア
  drawMandelbrot(p);
}

function keyPressedMandelbrot(p) {
  if (p.key === 'r' || p.key === 'R') {
    mandelbrotZoom = 1;
    mandelbrotCenterX = -0.7;
    mandelbrotCenterY = 0.0;
    p.background(0);
    drawMandelbrot(p);
  } else if (p.key === 's' || p.key === 'S') {
    p.saveCanvas('mandelbrot_' + Date.now(), 'png');
  }
}

// パラメータ更新関数（Next.jsから呼び出し可能）
function updateMandelbrotParameter(param, value) {
  switch(param) {
    case 'maxIterations':
      maxIterations = value;
      initializeMandelbrotPalette();
      // Re-draw if p5 instance exists
      break;
    case 'zoom':
      mandelbrotZoom = value;
      // Re-draw if p5 instance exists
      break;
  }
}

// グローバルに公開
if (typeof window !== 'undefined') {
  window.updateMandelbrotParameter = updateMandelbrotParameter;
  window.mandelbrotSketch = true;
}