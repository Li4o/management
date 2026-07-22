# Local Development & Environment Setup Guide

This document outlines the step-by-step instructions to set up the development environment for **Flexible Inventory Manager**.

---

## 1. Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **PostgreSQL** (Local installation or Docker)

---

## 2. Backend Setup (`01.src/server`)

### Step 2.1: Initialize Node.js Project & TypeScript
Navigate to the server directory and initialize npm and TypeScript configuration:

```bash
cd 01.src/server
npm init -y
npm install express dotenv cors
npm install -D typescript @types/node @types/express @types/cors ts-node-dev
npx tsc --init