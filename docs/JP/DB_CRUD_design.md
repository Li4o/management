# Data Model & CRUD API Design

**Flexible Inventory Manager**アプリのためのデータベーススキーマ・エンティティの関係・REST APIエンドポイント詳細設計です。

---

## 1. 概要とアーキテクチャ

パフォーマンスを保ったまま、高い拡張性を提供するために、**Hybrid JSON Approach**を使用する。
- **Standard Columns**: 高頻度でクエリ(検索・取得)されるメタデータ(`id`, `name`, `status`, `created_at` 等).
- **Dynamic Fields (`JSONB`)**: ユーザーまたは組織によって設定された自由入力データ`custom_field_definitions`.

---

## 2. データベーススキーマ (PostgreSQL DDL)

### 2.1 `users` Table
認証情報とプロフィールを保存する。

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 `custom_field_definitions` Table
登録された自由入力("Storage Location", "Serial Number" 等)とその設定(`text` or `select`)を保存する。

```sql
CREATE TABLE custom_field_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    field_name VARCHAR(100) NOT NULL,
    field_type VARCHAR(20) NOT NULL CHECK (field_type IN ('text', 'select')),
    select_options JSONB DEFAULT '[]'::jsonb, -- e.g., ["Warehouse A", "Warehouse B"]
    is_required BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2.3 `items` Table
基本項目とその詳細を`custom_values`に保存する。

```sql
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    item_number VARCHAR(100),
    status VARCHAR(50) DEFAULT 'In Stock',
    custom_values JSONB DEFAULT '{}'::jsonb, -- e.g., {"Location": "Warehouse A", "Serial": "SN-1234"}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for searching dynamic attributes inside JSONB
CREATE INDEX idx_items_custom_values ON items USING gin (custom_values);
```

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

## 4. Sample JSON Payloads

### カスタムフィールドの作成 (`POST /api/v1/custom-fields`)
```json
{
  "field_name": "Location",
  "field_type": "select",
  "select_options": ["Warehouse A", "Warehouse B", "Office 3F"],
  "is_required": false
}
```

### 項目追加 (`POST /api/v1/items`)
```json
{
  "name": "MacBook Pro 16",
  "item_number": "NB-2026-001",
  "status": "In Stock",
  "custom_values": {
    "Location": "Office 3F",
    "Serial Number": "C02G1234MD6R"
  }
}
```