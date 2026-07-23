# 開発環境構築ガイド
このドキュメントは**Flexible Inventory Manager**開発用のバックエンドの環境構築の手順書です。

---

## 1. 前提条件

PCに下記のツールをインストールする必要があります。
- **Node.js** (v18.0.0)
- **npm** (Node.jsに含まれています)   
  https://nodejs.org/ja/download
- **PostgreSQL** (v16.14)(ローカルまたはDocker)   
  https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

---

## 2.初期化 (`src/server`)

### Step 2.1: Node.js
ターミナルを開き、`server`フォルダに移動します。

```bash
cd ./src/server
npm init -y
```

### Step 2.2: 主要パッケージのインストール
Express・CORS・Dotenvをインストールします。

```bash
npm install express dotenv cors
```

### Step 2.3: 開発ツールとTypeScriptのインストール
TypeScript・型定義(Type definitions)・ts-node-devをインストールします。

```Bash
npm install -D typescript @types/node @types/express @types/cors ts-node-dev
```

### Step 2.4: TypeScriptの初期設定
`tsconfig.json`を生成します。

```Bash
npx tsc --init
```

---

## 3. データベースとPrisma ORMの設定

### Step 3.1: Prismaのインストール
Prisma Client・Prisma CLIをインストールします。

```Bash
npm install @prisma/client
npm install -D prisma
```

### Step 3.2: Prisma Schemaの初期化
PostgreSQLをプロバイダーとしてPrismaを初期化します。

```Bash
npx prisma init
```

このコマンドを実行すると以下が自動生成されます。
- prisma/schema.prisma (データベースモデルの定義ファイル)
- .env (DB接続URL等の環境変数)