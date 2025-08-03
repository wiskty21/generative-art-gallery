// Recursive Tree - 純粋p5.js版

// 競合回避の自己クリーンアップ
if (typeof window.recursiveTreeSketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// Recursive Tree variables
var angle = 25;
var lengthRatio = 0.67;
var minLength = 4;
var windForce = 0;
var maxRecursionDepth = 12;
var treeRandomSeed = 42;

// p5.js instance mode to avoid global conflicts
new p5(function(p) {
  p.setup = function() {
    console.log('Recursive Tree setup called');
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
    initializeRecursiveTree(p);
    console.log('Recursive Tree initialized');
  }

  p.draw = function() {
    drawRecursiveTree(p);
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      mousePressedRecursiveTree(p);
    }
  }

  p.mouseMoved = function() {
    mouseMovedRecursiveTree(p);
  }

  p.keyPressed = function() {
    keyPressedRecursiveTree(p);
  }
});

function initializeRecursiveTree(p) {
  p.colorMode(p.HSB, 360, 100, 100);
  p.background(220, 20, 95);
  treeRandomSeed = 42; // 固定シード
}

function drawRecursiveTree(p) {
  p.colorMode(p.HSB, 360, 100, 100);
  p.background(220, 20, 95);
  
  windForce = p.sin(p.frameCount * 0.01) * 10;
  
  // 毎フレーム同じランダムシードを使用して点滅を防ぐ
  p.randomSeed(treeRandomSeed);
  
  // メインの木
  p.push();
  p.translate(p.width/2, p.height);
  p.stroke(30, 70, 40);
  p.strokeWeight(8);
  drawBranch(p, 120, 0, 'main');
  p.pop();
  
  // 左の木
  p.push();
  p.translate(p.width/4, p.height);
  p.stroke(30, 70, 40);
  p.strokeWeight(6);
  drawBranch(p, 80, 0, 'left');
  p.pop();
  
  // 右の木
  p.push();
  p.translate(3*p.width/4, p.height);
  p.stroke(30, 70, 40);
  p.strokeWeight(6);
  drawBranch(p, 80, 0, 'right');
  p.pop();
}

function drawBranch(p, len, depth, treeId) {
  // 最大深度に達したら終了
  if (depth > maxRecursionDepth) {
    return;
  }
  
  // 幹を描画
  p.line(0, 0, 0, -len);
  
  if (len > minLength) {
    p.push(); // 現在の状態を保存
    p.translate(0, -len); // 枝の先端に移動
    
    // 枝の太さを徐々に細く
    p.strokeWeight(p.map(len, minLength, 120, 0.5, 8));
    
    // 色を徐々に変化（茶色から緑へ）
    if (len < 30) {
      p.stroke(120, 80, 60); // 緑
    } else {
      p.stroke(30, 70, 40); // 茶色
    }
    
    // 右の枝
    p.push();
    p.rotate(p.radians(angle + windForce * (1 - len/120)));
    drawBranch(p, len * lengthRatio, depth + 1, treeId);
    p.pop();
    
    // 左の枝
    p.push();
    p.rotate(p.radians(-angle + windForce * (1 - len/120)));
    drawBranch(p, len * lengthRatio, depth + 1, treeId);
    p.pop();
    
    // 固定された3つ目の枝を追加（深度が浅い時のみ）
    let branchHash = (depth * 17 + len * 23 + treeId.charCodeAt(0)) % 100;
    if (depth < 8 && branchHash < 10) {
      p.push();
      let extraAngle = ((branchHash * 13) % 60) - 30; // -30から30度の範囲
      p.rotate(p.radians(extraAngle));
      drawBranch(p, len * lengthRatio * 0.8, depth + 1, treeId);
      p.pop();
    }
    
    p.pop(); // 状態を復元
  }
}

function mousePressedRecursiveTree(p) {
  // 背景をクリア
  p.background(220, 20, 95);
}

function mouseMovedRecursiveTree(p) {
  angle = p.map(p.mouseX, 0, p.width, 10, 45);
  lengthRatio = p.map(p.mouseY, 0, p.height, 0.5, 0.7);
}

function keyPressedRecursiveTree(p) {
  if (p.key === ' ') {
    p.background(220, 20, 95);
  } else if (p.key === 's' || p.key === 'S') {
    p.save('recursive_tree_' + p.frameCount + '.png');
  }
}

// パラメータ更新関数（Next.jsから呼び出し可能）
function updateRecursiveTreeParameter(param, value) {
  switch(param) {
    case 'angle':
      angle = value;
      break;
    case 'lengthRatio':
      lengthRatio = value;
      break;
    case 'windForce':
      windForce = value;
      break;
    case 'minLength':
      minLength = value;
      break;
  }
}

// グローバルに公開
if (typeof window !== 'undefined') {
  window.updateRecursiveTreeParameter = updateRecursiveTreeParameter;
  window.recursiveTreeSketch = true;
}