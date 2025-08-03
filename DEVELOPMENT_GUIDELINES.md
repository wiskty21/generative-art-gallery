# 開発ガイドライン - エラー防止のためのベストプラクティス

このファイルは、Claude Codeでの開発において同じ問題を繰り返さないためのガイドラインです。

## 🚨 必須チェック項目

### デプロイ前の必須テスト
- [ ] **モバイル表示確認**: 全ての作品をスマートフォンで表示テスト
- [ ] **保存機能テスト**: 全12作品で'S'キーとSave Imageボタンの動作確認
- [ ] **レスポンシブ確認**: 画面サイズ変更時の表示確認
- [ ] **タッチ操作確認**: モバイルでのタッチ・スクロール動作確認

### GitHub Pages対応の必須確認
- [ ] **basePath設定**: production環境でのパス設定確認
- [ ] **ビルド成功**: `npm run build` でエラーなし
- [ ] **静的ファイル**: `out/` フォルダ生成確認

## ❌ 既知の問題パターンと解決法

### 1. モバイル表示問題
**問題**: 縦線や表示崩れ
```javascript
// ❌ 避けるべき書き方
let pixelDens = p.pixelDensity();
let idx = 4 * pixelDens * (py * p.width * pixelDens + px);

// ✅ 推奨する書き方
let scaleFactor = Math.floor(p.width / gsWidth);
let idx = 4 * (py * p.width + px);
```

### 2. GitHub Pages パス問題
**問題**: デプロイ後にスケッチが読み込めない
```javascript
// ❌ 避けるべき書き方
return '/sketches/gray-scott.js'

// ✅ 推奨する書き方
const basePath = process.env.NODE_ENV === 'production' ? '/generative-art-gallery' : ''
return `${basePath}/sketches/gray-scott.js`
```

### 3. 保存機能の互換性問題
**問題**: ブラウザによって保存が動作しない
```javascript
// ❌ 避けるべき書き方
p.save('filename.png');

// ✅ 推奨する書き方
p.saveCanvas('filename_' + Date.now(), 'png');
```

### 4. タッチイベントとスクロール問題
**問題**: モバイルでページスクロールができない
```javascript
// ❌ 避けるべき書き方
p.touchStarted = function() {
  // 処理
  return false; // 常にデフォルト動作を防ぐ
}

// ✅ 推奨する書き方
p.touchStarted = function() {
  if (touch.x >= 0 && touch.x <= p.width && touch.y >= 0 && touch.y <= p.height) {
    // キャンバス内の処理
    return false; // キャンバス内のみデフォルト動作を防ぐ
  }
  return true; // キャンバス外はスクロールを許可
}
```

### 5. キャンバスサイズの一貫性問題
**問題**: 一部の作品だけサイズが異なる
```javascript
// ❌ 避けるべき書き方
const size = 800; // 固定サイズ

// ✅ 推奨する書き方（全作品で統一）
const size = Math.min(600, window.innerWidth - 100, window.innerHeight - 100);
```

## 🔧 開発フロー

### 新しいスケッチを追加する際の手順
1. **テンプレート使用**: 既存の動作するスケッチをベースにする
2. **サイズ統一**: 推奨サイズ設定を使用
3. **保存機能**: `p.saveCanvas()` を使用
4. **モバイル対応**: タッチイベントを適切に実装
5. **テスト**: デスクトップ・モバイル両方で動作確認

### 修正作業の際の手順
1. **問題特定**: CLAUDE.mdで既知の問題パターンを確認
2. **ベストプラクティス適用**: このガイドラインに従って修正
3. **全体テスト**: 修正が他の作品に影響しないか確認
4. **記録更新**: CLAUDE.mdに解決内容を記録

## 📝 コード品質チェック

### JavaScript/TypeScript
- ESLintエラーゼロを維持
- `any` 型使用時は `eslint-disable-next-line` でコメント
- 関数名・変数名は英語で統一

### p5.js スケッチ
- instance modeを使用（グローバル競合回避）
- `window.currentP5Instance` でインスタンス管理
- cleanup処理を必ず実装

### CSS/スタイリング
- Tailwind CSSクラスを優先使用
- レスポンシブデザインを考慮
- ダークモード対応

## 🚀 デプロイチェックリスト

### ビルド前
- [ ] 全スケッチの動作確認
- [ ] TypeScriptエラーなし
- [ ] ESLintエラーなし
- [ ] 不要なconsole.logの削除

### ビルド後
- [ ] `out/` フォルダの生成確認
- [ ] 静的ファイルのパス確認
- [ ] GitHub Actions の成功確認

### デプロイ後
- [ ] 本番URLでの全機能テスト
- [ ] モバイルでの動作確認
- [ ] 各ブラウザでの互換性確認

## 🔄 継続的改善

このガイドラインは発見された問題に応じて随時更新します。
新しい問題パターンが見つかった場合は、CLAUDE.mdとこのファイルの両方を更新してください。

---

**最終更新**: 2025年8月3日  
**次回レビュー予定**: 新しい問題発見時