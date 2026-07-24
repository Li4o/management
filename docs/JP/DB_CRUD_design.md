# Data Model & CRUD API Design

**Flexible Inventory Manager**アプリのためのデータベーススキーマ・エンティティの関係・REST APIエンドポイント詳細設計です。

---

## 1. 概要とアーキテクチャ

パフォーマンスを保ったまま、高い拡張性を提供するために、**Hybrid JSON Approach**を使用する。
- **Standard Columns**: 高頻度でクエリ(検索・取得)されるメタデータ(`id`, `name`, `status`, `created_at` 等).
- **Dynamic Fields (`JSONB`)**: ユーザーまたは組織によって設定された自由入力データ`custom_field_definitions`.

---

## 2. データベーススキーマ (Prisma Models)

### 2.1 `items` Table
基本項目とその詳細を`custom_values`に保存する。

| Field Name | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | ユニーク主キー |
| `assetTag` | String? | `@unique` | 管理番号 |
| `name` | String | - | 備品名 |
| `category` | String? | - | カテゴリー |
| `status` | AssetStatus | `@default(AVAILABLE)` | 現在のステータス(使用可能/使用中 等)|
| `location` | String? | - | 使用/管理場所 |
| `customFields` | Json? | - | JSONフィールド |
| `description` | String? | - | 詳細説明 |
| `createdAt` | DateTime | `@default(now())` | 作成日時記録 |
| `updatedAt` | DateTime | `@updatedAt` | 更新日時記録 |

### 2.2 `asset_logs` Model (History)
備品の移動を追跡し、記録を保存する。

| Field Name | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | ユニーク主キー |
| `itemId` | String | Foreign Key | `Item.id`参照 |
| `action` | ActionType | - | 状態変更(貸出/返却/修理/廃棄) |
| `reason` | String? | - | 変更理由 |
| `createdBy` | String | Foreign Key | `Users.name`参照 |
| `createdAt` | DateTime | `@default(now())` | 作成日時記録 |

### 2.3 `users` Table
認証情報とプロフィールを保存する。

| Field Name | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | ユニーク主キー |
| `name` | String | - | ユーザー名 |
| `email` | String? | - | ユーザーメールアドレス |
| `passwordHash` | String | - | パスワード |
| `createdAt` | DateTime | `@default(now())` | 作成日時記録 |

### 2.4 `custom_field_definitions` Table
登録された自由入力("Storage Location", "Serial Number" 等)とその設定(`text` or `select`)を保存する。

| Field Name | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | ユニーク主キー |
| `name` | String | - | フィールド名 |
| `type` | FieldType | - | 入力タイプ(TEXT/SELECT) |
| `options` | Json | - | ??? |
| `createdBy` | String | Foreign Key | `Users.name`参照 |
| `createdAt` | DateTime | `@default(now())` | 作成日時記録 |


---

## 3. エンドポイント

すべてのAPIエンドポイントは`/api/v1`をベースパスとする。

### 3.1 認証 (`/auth`)
| HTTPメソッド | エンドポイント | 説明 |
| :--- | :--- | :--- |
| `POST` | `/auth/signup` | 新しいアカウントを登録する |
| `POST` | `/auth/login` | ユーザー認証とJWTトークンを発行する |

### 3.2 カスタムフィールド設定 (`/custom-fields`)
| HTTPメソッド | エンドポイント | 説明 |
| :--- | :--- | :--- |
| `GET` | `/custom-fields` | ログインユーザーのカスタムフィールド一覧を取得する |
| `POST` | `/custom-fields` | カスタムフィールド(Text or Select)を作成する |
| `DELETE` | `/custom-fields/:id` | カスタムフィールドを削除する |

### 3.3 備品管理 (`/items`)
| HTTPメソッド | エンドポイント | 説明 |
| :--- | :--- | :--- |
| `GET` | `/items` | 管理項目の一覧表示と絞り込み |
| `POST` | `/items` | 新規管理項目の追加 |
| `GET` | `/items/:id` | 単一項目の詳細情報の取得 |
| `PUT` | `/items/:id` | 項目の詳細情報の更新 |
| `DELETE` | `/items/:id` | 項目の削除 |

---

## 4. サンプルデータ

### カスタムフィールドの作成 (`POST /api/v1/custom-fields`)
```json
{
  "fieldName": "Location",
  "fieldType": "select",
  "selectOptions": ["Warehouse A", "Warehouse B", "Office 3F"],
  "isRequired": false
}
```

### 項目追加 (`POST /api/v1/items`)
```json
{
  "name": "MacBook Pro 16",
  "itemNumber": "NB-2026-001",
  "status": "In Stock",
  "customValues": {
    "Location": "Office 3F",
    "Serial Number": "C02G1234MD6R"
  }
}
```