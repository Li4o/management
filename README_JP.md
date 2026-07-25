# Flexible Inventory Manager
> **あらゆるタイプの備品を管理するために設計された汎用性の高い管理アプリです。**
> **ユーザーは用途に合わせて自在に項目をでカスタマイズすることができます。**

## 💡 主な機能
- **動的なカスタムフィールド：** テキスト入力やドロップダウン選択などの入力タイプをかを職場・組織単位で定義可能。
- **ハイブリッドなデータモデル：** 堅牢なリレーションデータと拡張性に優れた柔軟なJSON(`JSONB`)を構造を融合。
- **包括的な操作ログ：** コンプライアンス遵守とセキュリティ監査のために、備品の変更履歴やユーザー操作の記録・追跡を行う。
- **権限とアクセスのコントロール：** 組織に基づいた権限範囲で安全なユーザー認証とアクセス管理を実現する。

## 🛠 技術選定

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS |
| **Backend** | Node.js (Express / NestJS), TypeScript, REST API |
| **Database** | PostgreSQL (with Prisma ORM & JSONB indexing) |
| **Authentication** | JWT (JSON Web Tokens) |

---

## 🗄 システム構成とデータモデル

このアプリケーションは**Hybrid JSON Strategy**を活用し、軸となるメタデータと動的なカスタムフィールドを効率的に処理・保存する。

### エンティティと関係性

- **`users`**: 認証・ID・アプリへのアクセスを管理する。
- **`customField`**: 動的な項目(`text` か `select` )の入力ルールや設定を保存する。
- **`items`**: 基本情報(名前など)と動的なJSONデータ(`custom_values`)を保存する。
- **`assetLogs`**: 履歴を保存する。

---

## 🔌 エンドポイント

すべてのAPIエンドポイントは `/api/v1` をベースパスとする。

### 認証
- `POST /api/v1/auth/signup` - 新しいアカウントを登録する
- `POST /api/v1/auth/login` - ユーザー認証とJWTトークンを発行する
  
### ユーザー情報
- `GET /users` - ユーザーリ一覧
- `GET /users/:id` - ユーザー毎の詳細情報取得
- `PUT /users/:id` - ユーザー情報更新
- `DELETE /users/:id` - ユーザー削除

### ユーザー情報(自身)
- `GET /users/me` - ユーザー情報取得
- `PUT /users/me` - ユーザー情報更新

### クラス
- `GET /classes` - クラス一覧
- `POST /classes` - 新規クラス作成
- `PUT /classes/:class` - クラス情報更新
- `DELETE /classes/:class` - クラス削除

### カスタムフィールド
- `GET /api/v1/custom-fields` - ログインユーザーのカスタムフィールド一覧を取得する
- `POST /api/v1/custom-fields` - カスタムフィールドの作成をする
- `DELETE /api/v1/custom-fields/:id` - カスタムフィールドを削除する

### 備品管理
- `GET /api/v1/items` - 管理項目の一覧表示と絞り込み
- `POST /api/v1/items` - 新規管理項目の追加
- `GET /api/v1/items/:id` - 単一項目の詳細情報の取得
- `PUT /api/v1/items/:id` - 項目の詳細情報の更新
- `DELETE /api/v1/items/:id` - 項目の削除

### 設定
- `GET /users/me/setting` - 自身の設定情報取得
- `PUT /users/me/setting` - 設定情報更新

### 履歴
- `GET /users/me/setting` - 自身の設定情報取得
- `PUT /users/me/setting` - 設定情報更新

---

## 📁 リポジトリ構成

```text
.
├── 00.doc/            # アーキテクチャ仕様・設計ドキュメント
│   ├── UI_design.md
│   └── DB_CRUD_design.md
├── 01.src/            # アプリケーションソースコード
│   ├── client/        # フロントエンド(React・TypeScript)
│   └── server/        # バックエンド(Node.js・TypeScript)
├── README.md          # 主要ドキュメント(英語)
└── README_JP.md       # 主要ドキュメント(日本語)