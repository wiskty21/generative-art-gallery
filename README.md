# Generative Art Gallery

インタラクティブなジェネレーティブアート作品を展示するWebギャラリーです。p5.jsを使用した12種類の数学的・物理的アルゴリズムによる美しい視覚表現をお楽しみいただけます。

🌐 **ライブデモ**: https://wiskty21.github.io/generative-art-gallery/

## 特徴

- **12作品**: 反応拡散系、フラクタル、フローフィールド、波の干渉、Mandelbrot集合など
- **インタラクティブ**: マウス・タッチ操作で作品をリアルタイム制御
- **レスポンシブ**: デスクトップ・モバイル両対応
- **画像保存**: 'S'キーまたはボタンクリックで作品をPNG保存
- **パラメータ調整**: リアルタイムでアルゴリズムのパラメータを変更可能

## 収録作品

1. **Gray-Scott系** - 反応拡散による自己組織化パターン
2. **Flow Field Particles** - Perlinノイズによる粒子の流れ
3. **Wave Interference** - 複数波源からの干渉パターン
4. **Recursive Tree** - 風に揺れるフラクタル樹木
5. **Mandelbrot集合** - 複素数平面上のフラクタル
6. **Ornstein-Uhlenbeck過程** - 確率微分方程式による軌道
7. **Harmonic Waves** - 正弦波と余弦波の調和
8. **Polar Rose** - 極座標による薔薇曲線
9. **Noise Field Sculpture** - 地形等高線の3D表現
10. **Perlin Landscape** - 飛行視点の地形生成
11. **Boids** - 群れ行動の視覚化
12. **Lissajous Curves** - リサージュ曲線の軌跡

## 開発環境セットアップ

### 必要な環境
- Node.js 18以上
- npm または yarn

### インストール・起動

```bash
# リポジトリをクローン
git clone https://github.com/wiskty21/generative-art-gallery.git
cd generative-art-gallery

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

### ビルド・デプロイ

```bash
# プロダクションビルド
npm run build

# 静的サイト生成（GitHub Pages用）
npm run export
```

## 技術スタック

- **フロントエンド**: Next.js 15, React 18, TypeScript
- **スタイリング**: Tailwind CSS
- **ビジュアライゼーション**: p5.js
- **デプロイ**: GitHub Pages, GitHub Actions
- **開発**: ESLint, PostCSS

## 操作方法

### 基本操作
- **作品選択**: 左サイドバーから作品をクリック
- **パラメータ調整**: 右サイドバーのスライダーで調整
- **画像保存**: 'S'キーまたは「Save Image」ボタン
- **リセット**: 'R'キーまたは「Reset」ボタン

### 作品別操作
- **Gray-Scott**: クリック/タッチで反応核を追加
- **Flow Field**: クリックで新しい粒子を追加
- **Wave Interference**: クリックで波源を移動
- **Recursive Tree**: マウス移動で樹形を変更
- **Mandelbrot**: クリックでズーム
- **その他**: マウス位置でパラメータを動的制御

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルをご確認ください。

## 作者

[wiskty21](https://github.com/wiskty21)

## 貢献

プルリクエストやIssueによる貢献を歓迎します。新しい作品の追加や既存作品の改善など、お気軽にご提案ください。
