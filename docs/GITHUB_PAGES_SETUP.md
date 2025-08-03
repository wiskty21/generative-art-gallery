# GitHub Pages セットアップガイド

このプロジェクトをGitHub Pagesで公開する手順を説明します。

## 🚀 GitHub Pages 有効化手順

### 1. リポジトリの Settings にアクセス
- GitHubリポジトリページ: https://github.com/wiskty21/generative-art-gallery
- 上部メニューの「Settings」タブをクリック

### 2. Pages 設定を開く
- 左サイドバーの「Code and automation」セクション
- 「Pages」をクリック

### 3. Source を設定
- **Source**: `Deploy from a branch` を選択
- **Branch**: `main` を選択
- **Folder**: `/ (root)` を選択
- 「Save」ボタンをクリック

### 4. デプロイ完了を待つ
- 設定保存後、数分待つ（通常2-5分）
- ページ上部に緑色のチェックマークと共にURLが表示される

### 5. 公開URLにアクセス
- 公開URL: https://wiskty21.github.io/generative-art-gallery/
- ブラウザでアクセスして動作確認

## ✅ 確認事項

### デプロイ状況の確認
1. リポジトリのメインページで「Actions」タブを確認
2. 「pages build and deployment」のワークフローが成功していることを確認
3. 緑色のチェックマークが表示されていればデプロイ成功

### トラブルシューティング

#### ページが表示されない場合
- キャッシュをクリアして再読み込み（Ctrl/Cmd + Shift + R）
- デプロイに最大10分かかる場合がある
- Settings > Pages でURLが正しく表示されているか確認

#### 404エラーが表示される場合
- `index.html`がリポジトリのルートに存在することを確認
- ファイル名の大文字小文字が正しいか確認
- `.nojekyll`ファイルを追加（node_modulesなどを含む場合）

## 🔄 更新方法

コードを更新した場合：
```bash
git add .
git commit -m "Update message"
git push origin main
```

プッシュ後、自動的にGitHub Pagesも更新される（数分かかる）。

## 📊 アクセス解析

GitHub Pagesの基本的なアクセス情報：
- リポジトリの「Insights」→「Traffic」で確認可能
- 訪問者数、ページビュー数などの基本メトリクス
- より詳細な解析にはGoogle Analyticsなどの導入を推奨

## 🌐 カスタムドメイン（オプション）

独自ドメインを使用する場合：
1. Settings > Pages > Custom domain
2. ドメイン名を入力（例: art.yourdomain.com）
3. DNSプロバイダーでCNAMEレコードを設定
4. 「Enforce HTTPS」を有効化（推奨）

## 📝 注意事項

- GitHub Pagesは静的サイトホスティングのみ対応
- サーバーサイドの処理は実行できない
- リポジトリがパブリックである必要がある（無料プランの場合）
- ファイルサイズ制限: 100MB以下
- サイト全体のサイズ制限: 1GB以下