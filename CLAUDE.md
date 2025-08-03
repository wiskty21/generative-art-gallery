# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a generative art gallery featuring three interactive visualizations built with p5.js and Processing. The project is designed to run in a web browser using p5.js, with Processing versions also available for desktop use.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:8080)
npm start

# Alternative with file watching
npm run dev
```

## Architecture

### Core Implementation Structure

The project uses a unified architecture where all three generative art pieces are integrated into a single `sketch.js` file:

1. **Mode Switching System**: The `currentMode` global variable controls which visualization is active
2. **Shared Canvas**: All sketches share the same 800x800 canvas element
3. **Mode-Specific Variables**: Each mode has its own set of global variables (particles, waves, tree parameters)

### Key Functions

- `changeMode(mode)`: Switches between the three visualization modes
- `initializeSketch()`: Reinitializes variables based on current mode
- `draw()`: Main p5.js loop that delegates to mode-specific draw functions

### Visualization Modes

1. **flow_field**: Particle system following Perlin noise flow field
2. **wave_interference**: Multiple wave sources creating interference patterns
3. **recursive_tree**: Fractal tree with wind simulation

### File Organization

- **Web Version (Primary)**: `index.html`, `sketch.js` - Single integrated p5.js implementation
- **Legacy Standalone Files**: `flow_field.js`, `wave_interference.js`, `recursive_tree.js` - Individual p5.js sketches (not actively used)
- **Processing Versions**: `*.pde` files - Original Processing implementations for desktop IDE

## Important Implementation Details

### Canvas Management
- Canvas is created once and attached to `#canvas-container` div
- Mode switches preserve the canvas but reinitialize all state

### Color Modes
- Flow Field uses RGB mode
- Wave Interference and Recursive Tree use HSB mode
- Color mode switches happen during `initializeSketch()`

### Performance Considerations
- Wave Interference uses a 4-pixel resolution grid for performance
- Flow Field maintains a particle limit through user interaction
- Recursive Tree depth is controlled by `minLength` parameter

## GitHub Pages Deployment

The project is designed to be deployed directly to GitHub Pages. The `index.html` file serves as the entry point with all necessary p5.js scripts loaded via CDN.

## エラー防止システム - 2025年8月3日構築

### 概要
同じ失敗を繰り返さないための包括的な自動化システムを構築しました。このシステムにより、Claude Codeでの開発において既知の問題パターンを自動的に検出・警告し、品質を保証します。

### 構築したシステム

#### 1. 自動チェックスクリプト (`scripts/pre-deploy-check.js`)
```bash
npm run check       # 完全チェック実行
npm run pre-deploy  # デプロイ前チェック
```

**検出可能な問題**:
- basePath設定の不備
- pixelDensity()による複雑な計算
- p.save()の使用（互換性問題）
- 必須ファイルの欠如
- ビルドエラー

#### 2. 開発ガイドライン (`DEVELOPMENT_GUIDELINES.md`)
- 既知の問題パターンと解決法
- ベストプラクティスの体系化
- チェックリストの提供

#### 3. VS Code設定 (`.vscode/settings.json`)
- プロジェクト固有の制約事項
- エラーパターンの記録

#### 4. Pull Requestテンプレート
- 必須チェック項目の自動化
- テスト確認フロー

### 主要な問題パターンと解決法

#### モバイル表示問題
```javascript
// ❌ 問題のあるコード
let pixelDens = p.pixelDensity();
let idx = 4 * pixelDens * (py * p.width * pixelDens + px);

// ✅ 解決済みコード  
let idx = 4 * (py * p.width + px);
```

#### GitHub Pagesパス問題
```javascript
// ✅ 自動検出・修正可能
const basePath = process.env.NODE_ENV === 'production' ? '/generative-art-gallery' : ''
return `${basePath}/sketches/sketch.js`
```

#### 保存機能問題
```javascript
// ❌ 互換性問題
p.save('filename.png');

// ✅ 推奨方法
p.saveCanvas('filename_' + Date.now(), 'png');
```

### 自動化レベル

**レベル1 - 自動検出**: ✅ 完了
- 問題パターンの検出
- 設定値の確認  
- ビルドテスト

**レベル2 - 自動提案**: ✅ 完了
- 解決方法の提示
- ベストプラクティス案内

**レベル3 - 自動修正**: 今後の拡張
- コードの自動修正
- 設定の自動更新

### 使用方法

新規開発時:
1. `DEVELOPMENT_GUIDELINES.md` でベストプラクティス確認
2. 開発中に `npm run check` で問題検出
3. デプロイ前に `npm run pre-deploy` で最終確認

問題発生時:
1. ガイドラインで既知パターン確認
2. 解決後にドキュメント更新

これにより、同じエラーの再発を防ぎ、開発效率と品質を大幅に向上させることができます。