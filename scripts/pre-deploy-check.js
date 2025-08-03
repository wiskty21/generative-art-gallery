#!/usr/bin/env node

/**
 * Pre-deployment check script
 * Claude CodeでのデプロイメEchoント前に自動的に問題をチェックします
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 デプロイメント前チェックを開始します...\n');

let hasErrors = false;
const warnings = [];
const errors = [];

// 1. 必須ファイルの存在確認
const requiredFiles = [
  'next.config.ts',
  'package.json',
  '.github/workflows/deploy.yml',
  'DEVELOPMENT_GUIDELINES.md'
];

console.log('📁 必須ファイルの確認...');
requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    errors.push(`❌ 必須ファイルが見つかりません: ${file}`);
    hasErrors = true;
  } else {
    console.log(`✅ ${file}`);
  }
});

// 2. next.config.tsのbasePath設定確認
console.log('\n🔧 Next.js設定の確認...');
try {
  const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
  if (nextConfig.includes("basePath: isProd ? '/generative-art-gallery' : ''")) {
    console.log('✅ basePath設定が正しく設定されています');
  } else {
    errors.push('❌ next.config.tsにbasePath設定が見つかりません');
    hasErrors = true;
  }
  
  if (nextConfig.includes("output: 'export'")) {
    console.log('✅ static export設定が有効です');
  } else {
    errors.push('❌ static export設定が見つかりません');
    hasErrors = true;
  }
} catch (error) {
  errors.push('❌ next.config.tsの読み込みに失敗しました');
  hasErrors = true;
}

// 3. スケッチファイルのbasePath確認
console.log('\n🎨 スケッチファイルの確認...');
const sketchDir = 'public/sketches';
if (fs.existsSync(sketchDir)) {
  const sketchFiles = fs.readdirSync(sketchDir).filter(file => file.endsWith('.js'));
  
  sketchFiles.forEach(file => {
    const content = fs.readFileSync(path.join(sketchDir, file), 'utf8');
    
    // basePath設定の確認
    if (content.includes('process.env.NODE_ENV === \'production\'') && 
        content.includes('/generative-art-gallery')) {
      console.log(`✅ ${file}: basePath設定OK`);
    } else {
      warnings.push(`⚠️ ${file}: basePath設定を確認してください`);
    }
    
    // 保存機能の確認
    if (content.includes('p.save(')) {
      warnings.push(`⚠️ ${file}: p.save()の代わりにp.saveCanvas()の使用を推奨`);
    }
    
    // pixelDensity使用の確認
    if (content.includes('pixelDensity()') && content.includes('* pixelDens')) {
      warnings.push(`⚠️ ${file}: pixelDensity()を使った複雑な計算は避けてください`);
    }
  });
} else {
  errors.push('❌ public/sketchesディレクトリが見つかりません');
  hasErrors = true;
}

// 4. package.json のスクリプト確認
console.log('\n📦 package.jsonの確認...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (packageJson.scripts && packageJson.scripts.build) {
    console.log('✅ buildスクリプトが設定されています');
  } else {
    errors.push('❌ package.jsonにbuildスクリプトが見つかりません');
    hasErrors = true;
  }
  
  if (packageJson.scripts && packageJson.scripts.export) {
    console.log('✅ exportスクリプトが設定されています');
  } else {
    warnings.push('⚠️ exportスクリプトの設定を推奨します');
  }
} catch (error) {
  errors.push('❌ package.jsonの読み込みに失敗しました');
  hasErrors = true;
}

// 5. ビルドテスト
console.log('\n🔨 ビルドテストの実行...');
const { execSync } = require('child_process');
try {
  execSync('npm run build', { stdio: 'pipe' });
  console.log('✅ ビルドが成功しました');
  
  // out ディレクトリの確認
  if (fs.existsSync('out')) {
    console.log('✅ outディレクトリが生成されました');
    
    // 重要なファイルの存在確認
    const importantFiles = ['out/index.html', 'out/sketches'];
    importantFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`✅ ${file} が生成されました`);
      } else {
        warnings.push(`⚠️ ${file} が見つかりません`);
      }
    });
  } else {
    errors.push('❌ outディレクトリが生成されませんでした');
    hasErrors = true;
  }
} catch (error) {
  errors.push('❌ ビルドに失敗しました');
  hasErrors = true;
}

// 結果表示
console.log('\n' + '='.repeat(50));
console.log('📊 チェック結果');
console.log('='.repeat(50));

if (errors.length > 0) {
  console.log('\n🚨 エラー:');
  errors.forEach(error => console.log(error));
}

if (warnings.length > 0) {
  console.log('\n⚠️ 警告:');
  warnings.forEach(warning => console.log(warning));
}

if (!hasErrors && warnings.length === 0) {
  console.log('\n🎉 全てのチェックに合格しました！');
  console.log('デプロイメントの準備が完了しています。');
} else if (!hasErrors) {
  console.log('\n✅ 基本的なチェックに合格しました');
  console.log('警告を確認してからデプロイすることを推奨します。');
} else {
  console.log('\n❌ エラーがあります');
  console.log('エラーを修正してから再度チェックしてください。');
  process.exit(1);
}

console.log('\n💡 ヒント:');
console.log('- モバイルでの動作確認を忘れずに');
console.log('- DEVELOPMENT_GUIDELINES.mdを参照してください');
console.log('- デプロイ後は実際のURLで動作確認してください');