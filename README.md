# Flexible Inventory Manager
> **A highly versatile app designed to manage any type of inventory.**
> **User can easily customize and define your own categories to fit your needs**

---

## 💡 Key Features

- **Dynamic Custom Fields:** Define custom text or select (dropdown) fields on the fly per workspace/organization.
- **Hybrid Data Modeling:** Combines relational data integrity with flexible JSON store (`JSONB`) for extensible item attributes.
- **Comprehensive Audit Trail:** Track item changes and user activities for enterprise compliance and audit readiness.
- **Role & Access Control:** Secure user authentication with structured organization boundary limits.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS |
| **Backend** | Node.js (Express / NestJS), TypeScript, REST API |
| **Database** | PostgreSQL (with Prisma ORM & JSONB indexing) |
| **Authentication** | JWT (JSON Web Tokens) |

---

## 🗄 System Architecture & Data Model

The application leverages a **Hybrid JSON Strategy** to handle custom dynamic attributes efficiently alongside core metadata.

### Core Entities & Relationships

- **`users`**: Manages authentication, identity, and workspace access.
- **`customField`**: Stores schema rules for dynamic fields (`text` vs. `select` options).
- **`items`**: Stores core item attributes (Name, Status) and variable JSON data (`custom_values`).
- **`assetLogs`**: Stores logs data.

---

## 🔌 API Endpoints Summary

All API endpoints are prefixed with `/api/v1`.

### Authentication
- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/login` - Authenticate and issue JWT

### Users
- `GET /users` - List & filter users
- `GET /users/:id` - Get detailed information for user
- `PUT /users/:id` - Update an user's information
- `DELETE /users/:id` - Delete an user

### User
- `GET /users/me` - Get user information
- `PUT /users/me` - Update a user information

### Class
- `GET /classes` - List classes
- `POST /classes` - Create a new class
- `PUT /classes/:class` - Update a class information
- `DELETE /classes/:class` - Remove a class

### Custom Fields
- `GET /api/v1/custom-fields` - Get dynamic field definitions
- `POST /api/v1/custom-fields` - Add a new dynamic field definition
- `DELETE /api/v1/custom-fields/:id` - Remove a dynamic field

### Inventory Items
- `GET /api/v1/items` - List & search items
- `POST /api/v1/items` - Create new inventory item
- `GET /api/v1/items/:id` - Get item details
- `PUT /api/v1/items/:id` - Update existing item
- `DELETE /api/v1/items/:id` - Delete item

### Setting
- `GET /users/me/setting` - Get setting information at own
- `PUT /users/me/setting` - Update setting information at own

### Logs
- `GET /classes/:classId/logs` - List logs
- `GET /classes/:classId/logs/:id` - Get detailed for a log

---

## 📁 Repository Structure

```text
.
├── docs/                       # Specifications & design documentation
│   ├── DB_CRUD_design.md       # Database & API design
│   ├── setup.md                # Development setup guide
│   ├── TODO.md                 # Project roadmap & remaining tasks
│   └── UI_design.md
│
├── src/                        # Application source code
│   ├── client/                 # Frontend (React + TypeScript + Vite)
│   │   ├── src/                # React source code (components, pages)
│   │   ├── public/             # Static assets (favicon, images)
│   │   ├── package.json        # Frontend dependencies & scripts
│   │   ├── tsconfig.json       # TypeScript config for React
│   │   └── vite.config.ts      # Vite bundler configuration
│   │
│   └── server/                 # Backend (Node.js + Express + TypeScript)
│       ├── prisma/             # Prisma ORM configuration & database migrations
│       │   ├── migrations/     # Database migration history
│       │   ├── schema.prisma   # PostgreSQL database schema
│       │   └── seed.ts         # Initial database seed script
│       ├── src/                # Backend Application Logic
│       │   ├── controllers/    # Request handlers (User, Class, Item, Custom Fields)
│       │   ├── routes/         # Express API endpoints
│       │   ├── middleware/     # Custom middleware (Auth, error handling)
│       │   ├── lib/            # Shared utilities & Prisma client
│       │   └── index.ts        # Express server entry point
│       │
│       ├── package.json        # Backend dependencies & scripts
│       ├── package-lock.json   # Locked dependency versions
│       ├── prisma.config.ts    # Prisma configuration
│       └── tsconfig.json       # TypeScript configuration for server
│
├── README.md                   # Primary project documentation (English)
└── README_JP.md                # Japanese project overview
```