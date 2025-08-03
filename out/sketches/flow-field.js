// Flow Field - 純粋p5.js版

// 競合回避の自己クリーンアップ
if (typeof window.flowFieldSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// Clear existing Particle class to avoid redeclaration error
if (typeof window.Particle !== 'undefined') {
  window.Particle = undefined;
}

// p5.js instance mode to avoid global conflicts
window.currentP5Instance = new p5(function(p) {
  // Flow Field variables - instance scope
  let particles = [];
  let noiseScale = 0.01;
  let timeOffset = 0;

  // Particle class for flow field
  class Particle {
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(0, 0);
      this.maxSpeed = 2;
      
      p.colorMode(p.HSB, 360, 100, 100);
      this.col = p.color(p.random(180, 280), 80, 90);
      this.alpha = p.random(100, 200);
      p.colorMode(p.RGB, 255);
    }
    
    update() {
      let angle = p.noise(this.pos.x * noiseScale, this.pos.y * noiseScale, timeOffset) * p.TWO_PI * 2;
      let force = p.createVector(p.cos(angle), p.sin(angle));
      force.mult(0.1);
      
      this.acc.add(force);
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
      
      if (this.pos.x < 0) this.pos.x = p.width;
      if (this.pos.x > p.width) this.pos.x = 0;
      if (this.pos.y < 0) this.pos.y = p.height;
      if (this.pos.y > p.height) this.pos.y = 0;
    }
    
    display() {
      p.stroke(p.red(this.col), p.green(this.col), p.blue(this.col), this.alpha);
      p.strokeWeight(1.5);
      p.point(this.pos.x, this.pos.y);
    }
  }
  p.setup = function() {
    console.log('Flow Field setup called');
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
    initializeFlowField();
    console.log('Flow Field initialized');
  }

  p.draw = function() {
    drawFlowField();
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      mousePressedFlowField();
    }
  }

  p.keyPressed = function() {
    keyPressedFlowField();
  }

  // Helper functions within the p5 instance scope
  function initializeFlowField() {
    particles = [];
    p.background(20);
    for (let i = 0; i < 500; i++) {
      particles.push(new Particle(p.random(p.width), p.random(p.height)));
    }
  }

  function drawFlowField() {
    p.fill(20, 10);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);
    
    for (let particle of particles) {
      particle.update();
      particle.display();
    }
    
    timeOffset += 0.01;
  }

  function mousePressedFlowField() {
    for (let i = 0; i < 10; i++) {
      particles.push(new Particle(p.mouseX + p.random(-20, 20), p.mouseY + p.random(-20, 20)));
    }
  }

  function keyPressedFlowField() {
    if (p.key === 'r' || p.key === 'R') {
      initializeFlowField();
    }
  }

  // パラメータ更新関数（Next.jsから呼び出し可能）
  window.updateFlowFieldParameter = function(param, value) {
    switch(param) {
      case 'noiseScale':
        noiseScale = value;
        break;
      case 'particleCount':
        // パーティクル数を調整
        while (particles.length > value) {
          particles.pop();
        }
        while (particles.length < value) {
          particles.push(new Particle(p.random(p.width), p.random(p.height)));
        }
        break;
    }
  }
});

// グローバルに公開
if (typeof window !== 'undefined') {
  window.flowFieldSketch = true; // Mark this sketch as loaded
}