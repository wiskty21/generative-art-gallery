# Generative Art Gallery

Beautiful generative art created with p5.js and Processing. Interactive visualizations including flow fields, wave interference patterns, and recursive trees.

[Live Demo](https://yourusername.github.io/generative-art-gallery/) <!-- GitHub Pages用 -->

## セットアップ方法

### 方法1: p5.js版（推奨）

1. **VSCodeで開く**
   ```bash
   cd /Users/fujinoyuki/Desktop/genart
   code .
   ```

2. **Live Serverをインストール**
   - VSCodeの拡張機能で「Live Server」を検索してインストール
   - または、npm経由でインストール：
     ```bash
     npm install
     ```

3. **実行**
   - `index.html`を右クリック → 「Open with Live Server」
   - または、ターミナルで：
     ```bash
     npm start
     ```

4. **ブラウザで表示**
   - http://localhost:8080 にアクセス
   - ボタンをクリックして各ジェネラティブアートを表示

### 方法2: Processing IDE拡張機能

1. **Processing Language Serverをインストール**
   - VSCodeの拡張機能で「Processing Language」を検索
   - または「Processing for Visual Studio Code」をインストール

2. **Processingのパスを設定**
   - Command + Shift + P → 「Preferences: Open Settings (JSON)」
   - 以下を追加：
     ```json
     {
       "processing.path": "/Applications/Processing.app/Contents/MacOS/Processing"
     }
     ```

3. **実行**
   - `.pde`ファイルを開く
   - Command + Shift + P → 「Processing: Run Processing Sketch」

## 作品説明

### Flow Field Particles
- ノイズベースの流れ場に沿って動くパーティクル
- マウスクリックで新しいパーティクルを追加

### Wave Interference
- 複数の波源からの干渉パターンを視覚化
- マウスクリックで波源を移動
- スペースキーで再配置、Rキーでパラメータ変更

### Recursive Tree
- フラクタル構造の木を生成
- マウスを動かして枝の角度と長さ比を調整
- 風の影響をシミュレート
- スペースキーで再描画、Sキーで画像保存

## 🚀 Features

- **Flow Field Particles**: Particles following a noise-based vector field
- **Wave Interference**: Beautiful interference patterns from multiple wave sources
- **Recursive Tree**: Fractal tree generation with wind simulation

## 🎮 Controls

### Flow Field Particles
- Click to add new particles

### Wave Interference
- Click to move wave sources
- Space: Randomize positions
- R: Randomize parameters

### Recursive Tree
- Move mouse to adjust tree shape
- Space: Redraw
- S: Save image

## 📁 File Structure

```
generative-art-gallery/
├── index.html                  # Main page
├── sketch.js                   # All p5.js sketches
├── flow_field_particles.pde    # Processing version
├── wave_interference.pde       # Processing version
├── recursive_tree.pde          # Processing version
├── package.json               # npm configuration
└── README.md                  # This file
```

## 🛠️ Technologies

- p5.js - Creative coding framework
- Processing - Original sketches
- Live Server - Development server

## 📄 License

MIT License