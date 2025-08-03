// Boids - Craig Reynolds' Flocking Simulation - 純粋p5.js版

// Avoid conflicts by using cleanup
if (typeof window.boidsSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// Clear existing classes to avoid redeclaration error
if (typeof window.Boid !== 'undefined') {
  window.Boid = undefined;
}

// p5.js instance mode to avoid global conflicts
window.currentP5Instance = new p5(function(p) {
  // Boids variables - instance scope
  let flock = [];
  let numBoids = 100;
  let separationRadius = 25;
  let alignmentRadius = 50;
  let cohesionRadius = 50;
  let maxSpeed = 2;
  let maxForce = 0.03;

  // Boid class for flocking behavior
  class Boid {
    constructor(x, y) {
      this.position = p.createVector(x, y);
      this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
      this.acceleration = p.createVector(0, 0);
      this.r = 3.0;
      this.maxspeed = maxSpeed;
      this.maxforce = maxForce;
    }

    run() {
      this.flock(flock);
      this.update();
      this.borders();
      this.render();
    }

    applyForce(force) {
      this.acceleration.add(force);
    }

    flock(boids) {
      let sep = this.separate(boids);
      let ali = this.align(boids);
      let coh = this.cohesion(boids);
      
      sep.mult(1.5);
      ali.mult(1.0);
      coh.mult(1.0);
      
      this.applyForce(sep);
      this.applyForce(ali);
      this.applyForce(coh);
    }

    update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }

    seek(target) {
      let desired = p5.Vector.sub(target, this.position);
      desired.normalize();
      desired.mult(this.maxspeed);
      
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    }

    render() {
      // Simple circle rendering for debugging
      p.fill(127, 255, 212, 200);
      p.stroke(255);
      p.strokeWeight(1);
      p.ellipse(this.position.x, this.position.y, this.r * 4, this.r * 4);
      
      // Draw velocity vector for debugging
      p.stroke(255, 100, 100);
      p.line(this.position.x, this.position.y, 
             this.position.x + this.velocity.x * 10, 
             this.position.y + this.velocity.y * 10);
    }

    borders() {
      if (this.position.x < -this.r) this.position.x = p.width + this.r;
      if (this.position.y < -this.r) this.position.y = p.height + this.r;
      if (this.position.x > p.width + this.r) this.position.x = -this.r;
      if (this.position.y > p.height + this.r) this.position.y = -this.r;
    }

    separate(boids) {
      let desiredseparation = separationRadius;
      let steer = p.createVector(0, 0);
      let count = 0;
      
      for (let i = 0; i < boids.length; i++) {
        let d = p5.Vector.dist(this.position, boids[i].position);
        if (d > 0 && d < desiredseparation) {
          let diff = p5.Vector.sub(this.position, boids[i].position);
          diff.normalize();
          diff.div(d);
          steer.add(diff);
          count++;
        }
      }
      
      if (count > 0) {
        steer.div(count);
        steer.normalize();
        steer.mult(this.maxspeed);
        steer.sub(this.velocity);
        steer.limit(this.maxforce);
      }
      return steer;
    }

    align(boids) {
      let neighbordist = alignmentRadius;
      let sum = p.createVector(0, 0);
      let count = 0;
      
      for (let i = 0; i < boids.length; i++) {
        let d = p5.Vector.dist(this.position, boids[i].position);
        if (d > 0 && d < neighbordist) {
          sum.add(boids[i].velocity);
          count++;
        }
      }
      
      if (count > 0) {
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxspeed);
        let steer = p5.Vector.sub(sum, this.velocity);
        steer.limit(this.maxforce);
        return steer;
      } else {
        return p.createVector(0, 0);
      }
    }

    cohesion(boids) {
      let neighbordist = cohesionRadius;
      let sum = p.createVector(0, 0);
      let count = 0;
      
      for (let i = 0; i < boids.length; i++) {
        let d = p5.Vector.dist(this.position, boids[i].position);
        if (d > 0 && d < neighbordist) {
          sum.add(boids[i].position);
          count++;
        }
      }
      
      if (count > 0) {
        sum.div(count);
        return this.seek(sum);
      } else {
        return p.createVector(0, 0);
      }
    }
  }

  p.setup = function() {
    console.log('Boids setup called');
    const canvasContainer = document.getElementById('p5-canvas-container');
    if (!canvasContainer) {
      console.error('Canvas container not found');
      return;
    }
    
    const size = Math.min(600, window.innerWidth - 100, window.innerHeight - 100);
    console.log('Creating canvas with size:', size);
    const canvas = p.createCanvas(size, size);
    canvas.parent('p5-canvas-container');
    
    // Initialize flock
    flock = []; // Clear existing flock
    for (let i = 0; i < numBoids; i++) {
      flock.push(new Boid(p.random(p.width), p.random(p.height)));
    }
    
    console.log('Boids initialized with', numBoids, 'boids');
    console.log('Canvas size:', p.width, 'x', p.height);
    console.log('First boid position:', flock[0] ? flock[0].position.x + ',' + flock[0].position.y : 'none');
  }

  p.draw = function() {
    p.background(20, 30, 50);
    
    // Debug: Show flock count
    if (p.frameCount % 60 === 0) {
      console.log('Frame:', p.frameCount, 'Flock size:', flock.length);
    }
    
    // Run all boids
    for (let boid of flock) {
      boid.run();
    }
    
    // Debug: Draw a simple test shape to verify canvas is working
    if (flock.length === 0) {
      p.fill(255, 0, 0);
      p.ellipse(p.width/2, p.height/2, 20, 20);
      p.fill(255);
      p.textAlign(p.CENTER);
      p.text('No boids - click to add', p.width/2, p.height/2 + 40);
    }
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      // Add new boid at mouse position
      flock.push(new Boid(p.mouseX, p.mouseY));
    }
  }

  p.keyPressed = function() {
    if (p.key === 'r' || p.key === 'R') {
      // Reset flock
      flock = [];
      for (let i = 0; i < numBoids; i++) {
        flock.push(new Boid(p.random(p.width), p.random(p.height)));
      }
    } else if (p.key === 's' || p.key === 'S') {
      p.saveCanvas('boids_' + Date.now(), 'png');
    }
  }

  // パラメータ更新関数（Next.jsから呼び出し可能）
  window.updateBoidsParameter = function(param, value) {
    switch(param) {
      case 'separation':
        separationRadius = value;
        break;
      case 'alignment':
        alignmentRadius = value;
        break;
      case 'cohesion':
        cohesionRadius = value;
        break;
      case 'count':
        if (value > flock.length) {
          // Add boids
          for (let i = flock.length; i < value; i++) {
            flock.push(new Boid(p.random(p.width), p.random(p.height)));
          }
        } else if (value < flock.length) {
          // Remove boids
          flock.splice(value);
        }
        numBoids = value;
        break;
    }
  }

  window.boidsSketch = true;
});