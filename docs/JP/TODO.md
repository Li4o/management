# 🚀 プロジェクトTODOリスト - Flexible Inventory Manager

- [x] [ フェーズ1: データベース設定 ]
- [ ] [ フェーズ2: バックエンド ]
- [ ] [ フェーズ3: フロントエンド ]
- [ ] [ フェーズ4: テスト ]
- [ ] [ フェーズ5: インフラのリファクタリング ]

---

## フェーズ1: データベース設定
- [x] データベースデザイン設計書の作成 `DB_CRUD_design.md`
- [x] PostgreSQLの起動とサーバー起動
- [x] Prism v7の設定 (`prisma.config.ts`, `.env`)
- [x] スキーマ設計 (`Item`, `AssetLog`, `Users`, `CustomFields`)
- [x] 初回マイグレーション実行 (`npx prisma migrate dev`)

## フェーズ2: バックエンド開発
- [x] CRUD API設計書(`SB_CRUD_design.md`)作成
- [x] 初回テスト備品のデータスクリプト(`prisma/seed.ts`)作成
- [ ] 認証API構築 (`/api/v1/auth`)
  - [ ] `POST /auth/signup` (ユーザー登録)
  - [ ] `POST /auth/login` (ログイン & JWTトークン)
- [ ] ユーザー情報API構築 (`/api/v1/users`)
  - [ ] `GET /users` (ユーザー一覧)
  - [ ] `GET /users/:id` (ユーザー毎の詳細情報取得)
  - [ ] `PUT /users/:id` (ユーザー情報更新)
  - [ ] `DELETE /users/:id` (ユーザー削除)
- [ ] ユーザー情報(自身)API構築 (`/api/v1/users/me`)
  - [ ] `GET /users/me` (ユーザー情報取得)
  - [ ] `PUT /users/me` (ユーザー情報更新)
- [ ] クラスAPI構築 (`/api/v1/class`)
  - [ ] `GET /classes` (クラス一覧)
  - [ ] `POST /classes` (新規クラス作成)
  - [ ] `PUT /classes/:class` (クラス情報更新)
  - [ ] `DELETE /classes/:class` (クラス削除)
- [ ] 備品API構築 (`/api/v1/classes/:classId/items`)
  - [ ] `GET /classes/:classId/items` (備品一覧取得)
  - [ ] `POST /classes/:classId/items` (備品追加)
  - [ ] `GET /classes/:classId/items/:id` (詳細情報取得)
  - [ ] `PUT /classes/:classId/items/:id` (情報更新)
  - [ ] `DELETE /classes/:classId/items/:id` (備品削除)
- [ ] カスタムフィールドAPI構築 (`/api/v1/classes/:classId/custom-fields`)
  - [ ] `GET /classes/:classId/custom-fields` (フィールド取得)
  - [ ] `POST /classes/:classId/custom-fields` (フィールド登録)
  - [ ] `DELETE /classes/:classId/custom-fields/:id` (フィールド削除)
- [ ] 設定API構築 (`/api/v1/users/me/setting`)
  - [ ] `GET /users/me/setting` (自身の設定情報取得)
  - [ ] `PUT /users/me/setting` (設定情報更新)
- [ ] 履歴API構築 (`/api/v1/classes/:classId/logs`)
  - [ ] `GET /classes/:classId/logs` (履歴取得)
  - [ ] `GET /classes/:classId/logs/:id` (履歴詳細取得)

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

## Phase 5: インフラのリファクタリング
- [ ] データベース環境をDockerに移行する(`docker-compose.yml`を使用)