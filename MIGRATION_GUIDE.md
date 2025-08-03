# p5.js + Next.js 分離アーキテクチャ移植ガイド

## 概要

Processing版の作品をNext.js + TypeScript環境で高速実行するための移植手順とベストプラクティス。

## アーキテクチャ設計

### 分離の理念
```
Next.js/TSX (UI層)          p5.js (描画層)
├── ナビゲーション           ├── 純粋p5.jsスクリプト  
├── パラメータパネル         ├── 直接DOM操作
├── レスポンシブレイアウト    └── ネイティブパフォーマンス
└── 状態管理 ←─────通信─────→ グローバル関数
```

### 性能向上の仕組み
- **元のReact統合**: React → useEffect → 動的p5.js = 30-40fps
- **新しい分離**: p5.js直接実行 = 60fps（元版レベル）

## 移植手順（作品別）

### 1. 静的スクリプトファイル作成

**場所**: `/public/sketches/{作品名}.js`

**テンプレート構造**:
```javascript
// 作品変数（varで宣言）
var variable1 = defaultValue;
var variable2 = defaultValue;

// 競合回避の自己クリーンアップ
if (typeof window.{作品名}Sketch !== 'undefined') {
  if (typeof window.remove === 'function') {
    window.remove();
  }
}

// p5.jsインスタンスモード（必須）
new p5(function(p) {
  p.setup = function() {
    console.log('{作品名} setup called');
    const canvasContainer = document.getElementById('p5-canvas-container');
    if (!canvasContainer) {
      console.error('Canvas container not found');
      return;
    }
    
    const size = Math.min(600, window.innerWidth - 100, window.innerHeight - 100);
    const canvas = p.createCanvas(size, size);
    canvas.parent('p5-canvas-container');
    
    p.pixelDensity(1);
    initialize{作品名}(p);
  }

  p.draw = function() {
    draw{作品名}(p);
  }

  p.mousePressed = function() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      mousePressed{作品名}(p);
    }
  }

  p.keyPressed = function() {
    keyPressed{作品名}(p);
  }
});

// ヘルパー関数（すべてp引数を受け取る）
function initialize{作品名}(p) {
  // p.colorMode(), p.background() など
}

function draw{作品名}(p) {
  // 描画ロジック
}

// パラメータ通信関数
function update{作品名}Parameter(param, value) {
  switch(param) {
    case 'parameter1':
      variable1 = value;
      break;
  }
}

// グローバル公開
if (typeof window !== 'undefined') {
  window.update{作品名}Parameter = update{作品名}Parameter;
  window.{作品名}Sketch = true;
}
```

### 2. 重要な変換ルール

#### ✅ 必須変換
```javascript
// 変数宣言
let variable → var variable

// p5.js関数（すべてp.プレフィックス）
createCanvas() → p.createCanvas()
background() → p.background()
colorMode() → p.colorMode()
loadPixels() → p.loadPixels()
updatePixels() → p.updatePixels()
random() → p.random()
noise() → p.noise()
floor() → p.floor()
constrain() → p.constrain()
map() → p.map()

// キャンバス属性
width → p.width
height → p.height
mouseX → p.mouseX
mouseY → p.mouseY
key → p.key
frameCount → p.frameCount

// 描画関数
stroke() → p.stroke()
fill() → p.fill()
line() → p.line()
ellipse() → p.ellipse()
rect() → p.rect()
point() → p.point()
```

#### ✅ 関数引数
```javascript
// 元の形式
function initializeSketch() {
  colorMode(HSB, 360, 100, 100);
}

// 移植後
function initializeSketch(p) {
  p.colorMode(p.HSB, 360, 100, 100);
}
```

### 3. P5Canvas.tsx への登録

**場所**: `src/components/P5Canvas.tsx`

```typescript
const getSketchPath = (mode: ArtMode) => {
  switch (mode) {
    case 'gray_scott':
      return '/sketches/gray-scott.js'
    case '{新作品名}':
      return '/sketches/{新作品名}.js'
    default:
      return null
  }
}
```

### 4. パラメータ制御の実装

**ControlPanel.tsx**:
```typescript
const handleParameterChange = (param: string, value: number) => {
  if (mode === '{作品名}' && typeof window.update{作品名}Parameter === 'function') {
    window.update{作品名}Parameter(param, value)
  }
}
```

**型定義** (`src/types/global.d.ts`):
```typescript
declare global {
  interface Window {
    update{作品名}Parameter?: (param: string, value: number) => void
  }
}
```

## よくある問題と解決策

### 問題1: 変数重複エラー
```
Identifier 'variable' has already been declared
```

**解決策**: 
- `let` → `var` に変更
- 自己クリーンアップコードを追加
- インスタンスモードの使用

### 問題2: createCanvas undefined
```
createCanvas is not a function
```

**解決策**:
- グローバルモードではなくインスタンスモード使用
- `new p5(function(p) { ... })` パターン
- すべての関数に`p.`プレフィックス

### 問題3: Canvas container not found
```
Canvas container not found
```

**解決策**:
- DOM生成のタイミング確認
- `setTimeout`での遅延読み込み（100ms）
- エラーハンドリングの追加

### 問題4: パフォーマンス低下

**解決策**:
- ピクセル操作の最適化
- ループ回数の調整
- 不要な再描画の削除

## 作品別移植のポイント

### Flow Field
- **重要**: Particle クラスの変換
- **注意**: p5.Vector → p.createVector
- **最適化**: パーティクル数の動的調整

### Wave Interference  
- **重要**: HSBカラーモードの設定
- **注意**: 解像度グリッドの最適化
- **最適化**: レンダリング範囲の制限

### Recursive Tree
- **重要**: 再帰関数の引数渡し
- **注意**: randomSeedの管理
- **最適化**: 最大深度の制限

### Mandelbrot Set
- **重要**: ピクセル操作の最適化
- **注意**: ズーム機能の座標変換
- **最適化**: 計算精度と速度のバランス

## デバッグ方法

### 1. コンソールログの活用
```javascript
console.log('{作品名} setup called');
console.log('Creating canvas with size:', size);
console.log('{作品名} initialized');
```

### 2. 段階的確認
1. p5.js読み込み確認
2. DOM要素存在確認  
3. setup関数実行確認
4. draw関数実行確認

### 3. エラーパターン
- **スクリプト読み込み失敗**: ネットワークタブで確認
- **関数未定義**: p.プレフィックス確認
- **変数重複**: 既存インスタンスのクリーンアップ

## ベストプラクティス

### ✅ 推奨事項
- インスタンスモードの必須使用
- 一意な関数名（作品名プレフィックス）
- 適切なエラーハンドリング
- パフォーマンス最適化
- デバッグログの追加

### ❌ 避けるべき事項
- グローバルモードの使用
- let/const での変数宣言（競合リスク）
- p.プレフィックスの省略
- DOM操作のタイミングエラー
- メモリリークの放置

## 移植チェックリスト

### 前準備
- [ ] 元のsketch.jsから対象作品のコードを特定
- [ ] 必要な変数と関数をリストアップ
- [ ] パラメータ一覧を作成

### 移植作業
- [ ] `/public/sketches/{作品名}.js` ファイル作成
- [ ] インスタンスモード形式で実装
- [ ] すべての関数にp引数追加
- [ ] p.プレフィックス変換完了
- [ ] パラメータ通信関数実装

### 統合作業
- [ ] P5Canvas.tsx にパス登録
- [ ] ControlPanel.tsx にパラメータUI追加
- [ ] global.d.ts に型定義追加
- [ ] ArtGallery.tsx の作品リスト更新

### テスト
- [ ] 作品が正常に表示される
- [ ] パラメータ調整が機能する
- [ ] マウス/キーボード操作が動作する
- [ ] 作品切り替えでエラーが出ない
- [ ] パフォーマンスが十分である

## 次回移植時の注意事項

1. **必ずこのガイドを参照**して一貫性を保つ
2. **テンプレート構造を守る**ことでデバッグを簡素化
3. **段階的テスト**で問題を早期発見
4. **パフォーマンス確認**を忘れずに

---

**作成日**: 2025-08-03  
**作成者**: Claude Code  
**対象**: Next.js + p5.js 分離アーキテクチャ