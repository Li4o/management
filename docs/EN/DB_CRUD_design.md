# Data Model & CRUD API Design

This document details the database schema, entity relationships, and RESTful API endpoints for the **Flexible Inventory Manager** application.

---

## 1. Overview & Architecture Strategy

To deliver high flexibility without sacrificing performance, the application uses a **Hybrid JSON Approach**:
- **Standard Columns**: Frequently queried metadata (e.g., `id`, `name`, `status`, `created_at`).
- **Dynamic Fields (`JSONB`)**: Dynamic key-value pairs configured per user or organization via `custom_field_definitions`.

---

## 2. Database Schema (Prisma Models)

### 2.1 `items` Table (Equipment / Asset)
Stores standard item details alongside dynamic custom fiels values.

| Field Name | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | Unique Primary Key |
| `assetTag` | String? | `@unique` | Asset Tag Number (e.g. EQ-2026-001) |
| `name` | String | - | Equipment Name |
| `category` | String? | - | Category (e.g. Camera, Lens) |
| `status` | AssetStatus | `@default(AVAILABLE)` | Current Status (AVAILABLE / IN_USE / etc.) |
| `location` | String? | - | Storage Location |
| `customFields` | Json? | - | Dynamic JSON fields |
| `description` | String? | - | Notes / Specs |
| `createdAt` | DateTime | `@default(now())` | Record Creation Timestamp |
| `updatedAt` | DateTime | `@updatedAt` | Record Update Timestamp |

### 2.2 `asset_logs` Model (History)
Tracks check-outs, check-ins, and maintenance history for each equipment item.

| Field Name | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | Unique Primary Key |
| `itemId` | String | Foreign Key | References `Item.id` |
| `action` | ActionType | - | Action (CHECK_OUT / CHECK_IN / MAINTENANCE) |
| `reason` | String? | - | Purpose or Note |
| `createdBy` | String | Foreign Key | References `Users.name` |
| `createdAt` | DateTime | `@default(now())` | Timestamp of the log |

### 2.3 `users` Table
Stores authentication details and user profile data.

| Field Name | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | Unique Primary Key |
| `name` | String | - | User name |
| `email` | String? | - | User email address |
| `passwordHash` | String | - | Password |
| `createdAt` | DateTime | `@default(now())` | Timestamp of the log |

### 2.4 `custom_field_definitions` Table
Defines dynamic input fields (e.g., "Storage Location", "Serial Number") and their configuration (`text` or `select`).

| Field Name | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | Unique Primary Key |
| `name` | String | - | Field name |
| `type` | FieldType | - | Input type (TEXT / SELECT) |
| `options` | Json | - | Options of SELECT |
| `createdBy` | String | Foreign Key | References `Users.name` |
| `createdAt` | DateTime | `@default(now())` | Timestamp of the log |

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
  "fieldName": "Location",
  "fieldType": "SELECT",
  "selectOptions": ["Warehouse A", "Warehouse B", "Office 3F"],
  "isRequired": false
}
```

### Creating an Item (`POST /api/v1/items`)
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