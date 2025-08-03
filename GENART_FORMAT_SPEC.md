# .genart ファイル形式仕様書

**Version**: 1.0  
**Date**: 2025-01-15  
**Status**: Draft

## 概要

`.genart`は生成的アート作品をパッケージ化するための統一ファイル形式です。作品のコード、メタデータ、アセット、ドキュメントを単一ファイルにまとめ、プラットフォーム間での共有と実行を可能にします。

## 基本仕様

### ファイル構造
```
artwork.genart (ZIP Archive - DEFLATE compression)
│
├── manifest.json           # 必須 - 作品メタデータ
├── sketch.js              # 必須 - メインプログラムファイル
├── preview.png            # 必須 - サムネイル画像 (500x400px)
├── README.md              # 推奨 - 作品説明・操作方法
├── LICENSE                # 推奨 - ライセンス情報
│
├── assets/                # オプション - リソースファイル
│   ├── images/
│   │   ├── texture001.jpg
│   │   └── background.png
│   ├── sounds/
│   │   ├── ambient.mp3
│   │   └── click.wav
│   ├── data/
│   │   ├── coordinates.json
│   │   └── config.xml
│   └── fonts/
│       └── custom.ttf
│
├── styles/                # オプション - カスタムCSS
│   └── artwork.css
│
├── docs/                  # オプション - 詳細ドキュメント
│   ├── theory.md
│   ├── tutorial.md
│   └── references.md
│
└── examples/              # オプション - 使用例・バリエーション
    ├── variation1.js
    └── variation2.js
```

## manifest.json 詳細仕様

### 基本構造
```json
{
  "formatVersion": "1.0",
  "metadata": { /* 作品情報 */ },
  "technical": { /* 技術仕様 */ },
  "interaction": { /* インタラクション仕様 */ },
  "educational": { /* 教育情報 */ },
  "assets": { /* アセット管理 */ },
  "build": { /* ビルド設定 */ }
}
```

### metadata セクション
```json
{
  "metadata": {
    "title": "作品タイトル",
    "artist": {
      "name": "アーティスト名",
      "email": "artist@example.com",
      "website": "https://artist-website.com",
      "social": {
        "twitter": "@artist",
        "github": "artist",
        "instagram": "@artist"
      }
    },
    "description": {
      "short": "一行での作品説明",
      "long": "詳細な作品説明...",
      "technical": "技術的な実装詳細..."
    },
    "version": "1.0.0",
    "created": "2025-01-15T10:00:00Z",
    "modified": "2025-01-20T15:30:00Z",
    "tags": ["fractal", "mathematics", "interactive"],
    "category": "mathematical",
    "subcategory": "fractal-geometry",
    "difficulty": "intermediate",
    "estimatedTime": "5-10 minutes",
    "license": "MIT",
    "language": "ja",
    "translations": {
      "en": {
        "title": "English Title",
        "description": {
          "short": "English short description",
          "long": "English long description..."
        }
      }
    }
  }
}
```

### technical セクション
```json
{
  "technical": {
    "framework": "p5.js",
    "frameworkVersion": "1.7.0",
    "entryPoint": "sketch.js",
    "dependencies": [
      {
        "name": "p5.sound",
        "version": "1.1.0",
        "source": "cdn",
        "url": "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/addons/p5.sound.min.js"
      }
    ],
    "canvasSize": {
      "width": 800,
      "height": 600,
      "resizable": true,
      "aspectRatio": "4:3",
      "fullscreenSupported": true
    },
    "features": [
      "mouse-interaction",
      "keyboard-controls",
      "audio-reactive",
      "real-time",
      "generative",
      "deterministic"
    ],
    "performance": {
      "complexity": "medium",
      "memoryUsage": "low",
      "cpuIntensive": false,
      "gpuAccelerated": false,
      "frameRate": 60,
      "approximateLoadTime": "2-3 seconds"
    },
    "compatibility": {
      "mobile": true,
      "touch": true,
      "webgl": false,
      "audio": true,
      "minScreenSize": {
        "width": 320,
        "height": 240
      }
    }
  }
}
```

### interaction セクション
```json
{
  "interaction": {
    "controls": {
      "mouse": {
        "click": "Add new particle",
        "drag": "Move camera",
        "wheel": "Zoom in/out"
      },
      "keyboard": {
        "R": "Reset simulation",
        "S": "Save screenshot",
        "SPACE": "Pause/resume",
        "ARROW_KEYS": "Navigate view"
      },
      "touch": {
        "tap": "Add particle",
        "pinch": "Zoom",
        "swipe": "Pan view"
      }
    },
    "parameters": [
      {
        "id": "particleCount",
        "name": "Particle Count",
        "type": "slider",
        "min": 10,
        "max": 1000,
        "default": 100,
        "step": 10,
        "description": "Number of particles in simulation",
        "category": "simulation"
      },
      {
        "id": "colorScheme",
        "name": "Color Scheme",
        "type": "select",
        "options": [
          {"value": "rainbow", "label": "Rainbow"},
          {"value": "monochrome", "label": "Monochrome"},
          {"value": "sunset", "label": "Sunset"}
        ],
        "default": "rainbow",
        "description": "Visual color palette",
        "category": "appearance"
      },
      {
        "id": "enableSound",
        "name": "Enable Sound",
        "type": "boolean",
        "default": false,
        "description": "Audio-reactive features",
        "category": "audio"
      }
    ],
    "presets": [
      {
        "name": "Calm Mode",
        "description": "Slow, peaceful animation",
        "parameters": {
          "particleCount": 50,
          "colorScheme": "monochrome",
          "speed": 0.5
        }
      },
      {
        "name": "Chaos Mode",
        "description": "Fast, energetic animation",
        "parameters": {
          "particleCount": 500,
          "colorScheme": "rainbow",
          "speed": 2.0
        }
      }
    ]
  }
}
```

### educational セクション
```json
{
  "educational": {
    "concepts": [
      {
        "name": "Complex Numbers",
        "description": "Mathematical representation of 2D coordinates",
        "difficulty": "advanced",
        "resources": [
          "https://wikipedia.org/complex-numbers",
          "docs/complex-numbers.md"
        ]
      },
      {
        "name": "Iteration",
        "description": "Repetitive mathematical processes",
        "difficulty": "intermediate"
      }
    ],
    "difficulty": "advanced",
    "suggestedAge": "16+",
    "prerequisiteSkills": [
      "Basic trigonometry",
      "Programming fundamentals"
    ],
    "learningObjectives": [
      "Understanding fractal mathematics",
      "Visualization of complex number operations",
      "Interactive parameter exploration"
    ],
    "curriculum": {
      "subject": ["Mathematics", "Computer Science", "Art"],
      "level": "High School / University",
      "duration": "45-60 minutes",
      "activities": [
        "Explore parameter effects",
        "Create variations",
        "Mathematical analysis"
      ]
    }
  }
}
```

### assets セクション
```json
{
  "assets": {
    "images": [
      {
        "path": "assets/images/texture001.jpg",
        "type": "texture",
        "description": "Main texture for particles",
        "size": 15420,
        "dimensions": {
          "width": 256,
          "height": 256
        }
      }
    ],
    "sounds": [
      {
        "path": "assets/sounds/ambient.mp3",
        "type": "background",
        "description": "Ambient background music",
        "duration": 180,
        "size": 2048000,
        "format": "mp3",
        "bitrate": 128
      }
    ],
    "data": [
      {
        "path": "assets/data/coordinates.json",
        "type": "configuration",
        "description": "Predefined coordinate sets",
        "format": "json"
      }
    ],
    "totalSize": 2063420,
    "checksum": "sha256:a1b2c3d4e5f6..."
  }
}
```

### build セクション
```json
{
  "build": {
    "buildTools": {
      "bundler": "webpack",
      "version": "5.0.0",
      "config": "webpack.config.js"
    },
    "optimization": {
      "minify": true,
      "compress": true,
      "treeshaking": true
    },
    "output": {
      "format": "iife",
      "target": "es2018"
    },
    "development": {
      "watchMode": true,
      "hotReload": true,
      "sourceMap": true
    }
  }
}
```

## ファイル形式ガイドライン

### 1. アーカイブ要件
- **圧縮形式**: ZIP (DEFLATE)
- **ファイル拡張子**: `.genart`
- **最大サイズ**: 50MB (推奨: 10MB以下)
- **ファイル名**: UTF-8エンコーディング

### 2. 必須ファイル
- `manifest.json`: UTF-8, 改行はLF
- `sketch.js`: メインプログラム
- `preview.png`: 500x400px, PNG形式

### 3. 推奨ファイル
- `README.md`: Markdown形式
- `LICENSE`: テキスト形式

### 4. アセット制限
- **画像**: PNG, JPG, SVG, WebP
- **音声**: MP3, WAV, OGG (ブラウザ対応形式)
- **データ**: JSON, XML, CSV, TXT
- **フォント**: TTF, WOFF, WOFF2

### 5. セキュリティ要件
- **実行可能ファイル**: 禁止
- **スクリプト**: JavaScript以外禁止
- **外部通信**: manifest.jsonで明示的宣言必要

## バージョニング

### セマンティックバージョニング
- **MAJOR**: 非互換な変更
- **MINOR**: 後方互換な機能追加
- **PATCH**: バグ修正

### 形式バージョン管理
- `formatVersion`: 形式仕様バージョン
- `version`: 作品自体のバージョン

## 実装例

### 基本的な .genart ファイル作成
```javascript
// Node.js例
const JSZip = require('jszip');
const fs = require('fs');

async function createGenArtFile(artworkData) {
  const zip = new JSZip();
  
  // manifest.json追加
  zip.file('manifest.json', JSON.stringify(artworkData.manifest, null, 2));
  
  // メインスケッチ追加
  zip.file('sketch.js', artworkData.code);
  
  // プレビュー画像追加
  zip.file('preview.png', fs.readFileSync(artworkData.previewPath));
  
  // README追加
  if (artworkData.readme) {
    zip.file('README.md', artworkData.readme);
  }
  
  // アセット追加
  if (artworkData.assets) {
    for (const asset of artworkData.assets) {
      zip.file(asset.path, fs.readFileSync(asset.filePath));
    }
  }
  
  // ZIP生成
  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });
  
  return content;
}
```

### .genart ファイル読み込み
```javascript
// ブラウザ例
async function loadGenArtFile(file) {
  const zip = await JSZip.loadAsync(file);
  
  // manifest.json読み込み
  const manifestFile = zip.file('manifest.json');
  const manifest = JSON.parse(await manifestFile.async('string'));
  
  // メインスケッチ読み込み
  const sketchFile = zip.file('sketch.js');
  const sketchCode = await sketchFile.async('string');
  
  // アセット読み込み
  const assets = {};
  for (const [path, file] of Object.entries(zip.files)) {
    if (path.startsWith('assets/')) {
      assets[path] = await file.async('blob');
    }
  }
  
  return {
    manifest,
    code: sketchCode,
    assets
  };
}
```

## 互換性・移行

### 後方互換性
- 新しいランタイムは古い形式を実行可能
- `formatVersion`による処理分岐
- 非対応フィールドは無視

### 移行ガイド
- 自動移行ツール提供
- バージョン間の差分明示
- 移行時の注意事項文書化

## 品質保証

### バリデーション
- JSON Schema によるmanifest検証
- ファイル構造整合性チェック
- アセット参照整合性確認
- セキュリティスキャン

### テストケース
- 最小限ファイル
- 全機能含有ファイル
- 破損ファイル
- 悪意のあるファイル

## 今後の拡張

### 計画中の機能
- **V1.1**: 3D作品対応 (Three.js)
- **V1.2**: リアルタイム協力機能
- **V1.3**: VR/AR対応
- **V2.0**: AIアシスト機能

### 拡張ポイント
- カスタムフレームワーク対応
- 新しいアセット形式
- ブロックチェーン統合
- クラウド実行環境

---

**次のステップ**: [実装ガイド](IMPLEMENTATION_GUIDE.md) | [サンプル作品](examples/)