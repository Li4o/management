# Data Model & CRUD API Design

This document details the database schema, entity relationships, and RESTful API endpoints for the **Flexible Inventory Manager** application.

---

## 1. Overview & Architecture Strategy

To deliver high flexibility without sacrificing performance, the application uses a **Hybrid JSON Approach**:
- **Standard Columns**: Frequently queried metadata (e.g., `id`, `name`, `status`, `created_at`).
- **Dynamic Fields (`JSONB`)**: Dynamic key-value pairs configured per user or organization via `custom_field_definitions`.

---

## 2. Database Schema (PostgreSQL DDL)

### 2.1 `users` Table
Stores authentication details and user profile data.

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
Defines dynamic input fields (e.g., "Storage Location", "Serial Number") and their configuration (`text` or `select`).

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
Stores standard item details alongside dynamically defined values inside the `custom_values` column.

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

## 3. CRUD API Endpoints

All endpoints are prefixed with `/api/v1`.

### 3.1 Authentication (`/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/signup` | Register a new user account |
| `POST` | `/auth/login` | Authenticate user & issue JWT token |

### 3.2 Custom Field Settings (`/custom-fields`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/custom-fields` | Retrieve all custom field definitions for the logged-in user |
| `POST` | `/custom-fields` | Create a new custom field (Text or Select type) |
| `DELETE` | `/custom-fields/:id` | Remove a custom field definition |

### 3.3 Inventory Management (`/items`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/items` | List & filter inventory items |
| `POST` | `/items` | Create a new inventory item |
| `GET` | `/items/:id` | Get detailed information for a single item |
| `PUT` | `/items/:id` | Update an existing item's core or dynamic data |
| `DELETE` | `/items/:id` | Delete an inventory item |

---

## 4. Sample JSON Payloads

### Creating a Custom Field Definition (`POST /api/v1/custom-fields`)
```json
{
  "field_name": "Location",
  "field_type": "select",
  "select_options": ["Warehouse A", "Warehouse B", "Office 3F"],
  "is_required": false
}
```

### Creating an Item (`POST /api/v1/items`)
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