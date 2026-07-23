# Local Development & Environment Setup Guide
This document provides step-by-step instructions to set up the backend development environment for **Flexible Inventory Manager**.

---

## 1. Prerequisites

Ensure you have the following tools installed on your PC:
- **Node.js** (v18.0.0)
- **npm** (included with Node.js)   
  https://nodejs.org/ja/download
- **PostgreSQL** (v16.14)(Installed locally or via Docker)   
  https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

---

## 2. Backend Initialization (`src/server`)

### Step 2.1: Navigate & Initialize Node.js
Open your terminal and navigate to the server folder:

```bash
cd ./src/server
npm init -y
```

### Step 2.2: Install Core Dependencies
Install Express, CORS, and Dotenv for runtime:

```bash
npm install express dotenv cors
```

### Step 2.3: Install Development Tools & TypeScript
Install TypeScript, type definitions, and ts-node-dev for live reloading:

```Bash
npm install -D typescript @types/node @types/express @types/cors ts-node-dev
```

### Step 2.4: Initialize TypeScript Configuration
Generate the tsconfig.json file:

```Bash
npx tsc --init
```

---

## 3. Database & Prisma ORM Setup

### Step 3.1: Install Prisma
Install Prisma Client and the Prisma CLI:

```Bash
npm install @prisma/client
npm install -D prisma
```

### Step 3.2: Initialize Prisma Schema
Set up PostgreSQL provider for Prisma:

```Bash
npx prisma init
```

This command will create:
- prisma/schema.prisma (Database models)
- .env (Environment variables for DB connection URL)