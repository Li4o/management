# 🚀 プロジェクトTODOリスト - Flexible Inventory Manager

- [x] [ フェーズ1: データベース設定 ]
- [ ] [ フェーズ2: バックエンド ]
- [ ] [ フェーズ3: フロントエンド ]
- [ ] [ フェーズ4: テスト ]

---

## フェーズ1: データベース設定
- [x] データベースデザイン設計書の作成 `DB_CRUD_design.md`
- [x] PostgreSQLの起動とサーバー起動
- [x] Prism v7の設定 (`prisma.config.ts`, `.env`)
- [x] スキーマ設計 (`Item`, `AssetLog`, `Users`, `CustomFields`)
- [x] 初回マイグレーション実行 (`npx prisma migrate dev`)

## フェーズ2: バックエンド開発
- [ ] 初回テスト備品のデータスクリプト(`prisma/seed.ts`)作成
- [ ] 認証API構築 (`/api/v1/auth`)
  - [ ] `POST /auth/signup` (ユーザー登録)
  - [ ] `POST /auth/login` (ログイン & JWTトークン)
- [ ] 備品API構築 (`/api/v1/items`)
  - [ ] `GET /items` (備品一覧取得)
  - [ ] `POST /items` (備品追加)
  - [ ] `GET /items/:id` (詳細情報取得)
  - [ ] `PUT /items/:id` (情報更新)
  - [ ] `DELETE /items/:id` (備品削除)
- [ ] カスタムフィールドAPI構築 (`/api/v1/custom-fields`)
  - [ ] `GET /custom-fields` (フィールド取得)
  - [ ] `POST /custom-fields` (フィールド登録)
  - [ ] `DELETE /custom-fields/:id` (フィールド削除)

## フェーズ3: フロントエンド開発
- [ ] UIフレームワークとルーティングの設定
- [ ] ログイン・サインアップ画面作成
- [ ] 備品一覧画面作成(テーブル)
- [ ] 備品詳細データ・編集画面作成
- [ ] カスタムフィールド設定画面作成

## フェーズ4: テスト
- [ ] フロントエンドとバックエンドの結合
- [ ] カスタムフィールドの挙動確認
- [ ] 不具合修正とドキュメントのアップデート