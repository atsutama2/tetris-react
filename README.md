# 🎮 テトリスゲーム

React + TypeScriptで作られたクラシックなテトリスゲームです。

## ✨ 機能

- 🧩 7種類のテトリミノ（I, O, T, S, Z, J, L）
- 🎯 スコアシステム（ライン消去でポイント獲得）
- 📈 レベルシステム（10ライン消去でレベルアップ）
- ⏸️ 一時停止機能
- 🎮 キーボード・マウス操作対応
- 🎨 美しいUI（styled-components使用）

## 🚀 セットアップ

### 必要な環境
- Node.js 18以上（推奨：22.x）
- npm または yarn

### インストール
```bash
# リポジトリをクローン
git clone git@github.com:atsutama2/tetris-react.git
cd tetris

# 依存関係をインストール
npm install
```

### 開発サーバー起動
```bash
npm start
```
ブラウザで `http://localhost:3000` にアクセス

### ビルド
```bash
npm run build
```

### テスト実行
```bash
# 全テスト実行
npm test

# テストを監視モードで実行
npm test -- --watch

# テストを一度だけ実行
npm test -- --watchAll=false
```

## 🎮 操作方法

### キーボード操作
- **← →** : 左右移動
- **↓** : 下に移動（ソフトドロップ）
- **↑** : 回転
- **スペース** : ハードドロップ
- **P** : 一時停止/再開
- **R** : リスタート

### マウス操作
- ボタンクリックで各操作を実行

## 🏗️ プロジェクト構成

```
src/
├── components/          # Reactコンポーネント
│   ├── GameBoard.tsx   # ゲームボード表示
│   ├── GameInfo.tsx    # スコア・レベル表示
│   ├── Controls.tsx    # 操作ボタン
│   └── TetrisGame.tsx  # メインゲームコンポーネント
├── hooks/              # カスタムフック
│   └── useTetris.ts    # ゲームロジック管理
├── utils/              # ユーティリティ関数
│   └── tetrisUtils.ts  # テトリス関連の計算関数
├── constants/          # 定数定義
│   └── tetrominos.ts   # テトリミノの形状・色定義
├── types/              # TypeScript型定義
│   └── tetris.ts       # ゲーム関連の型定義
└── __tests__/          # テストファイル
```

## 🧪 テスト

### テストカバレッジ
- **ユーティリティ関数**: テトリミノの移動、回転、衝突判定など
- **Reactコンポーネント**: UI表示、ユーザー操作、状態管理
- **カスタムフック**: ゲームロジック、状態更新

### テスト実行例
```bash
# 特定のテストファイルのみ実行
npm test -- GameBoard.test.tsx

# テストカバレッジを表示
npm test -- --coverage
```

## 🎯 ゲームルール

1. **テトリミノの落下**: 自動的に下に落下
2. **ライン消去**: 横一列が埋まると消去
3. **スコア計算**: 
   - 1ライン: 100 × レベル
   - 2ライン: 300 × レベル
   - 3ライン: 500 × レベル
   - 4ライン: 800 × レベル
4. **レベルアップ**: 10ライン消去でレベルアップ
5. **ゲームオーバー**: 一番上の行にブロックが到達

## 🛠️ 技術スタック

- **フロントエンド**: React 18
- **言語**: TypeScript
- **スタイリング**: styled-components
- **テスト**: Jest + React Testing Library
- **ビルドツール**: Create React App

## 📝 開発メモ

### 主要な設計ポイント
- **カスタムフック**: ゲームロジックを`useTetris`で分離
- **型安全性**: TypeScriptでゲーム状態を型定義
- **テスト駆動**: 各機能にテストを実装
- **コンポーネント分離**: 責務を明確に分離

### 今後の改善案
- [ ] 音効追加
- [ ] ハイスコア保存機能
- [ ] 難易度設定
- [ ] モバイル対応
- [ ] アニメーション強化

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

MIT License

## 👨‍💻 作者

テトリスゲーム開発チーム

---

**楽しいテトリスライフを！** 🎮✨
