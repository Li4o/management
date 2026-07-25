# 🚀 Project TODO List - Flexible Inventory Manager

- [x] [ Phase 1: Database Setup ]
- [ ] [ Phase 2: Backend API ]
- [ ] [ Phase 3: Frontend UI ]
- [ ] [ Phase 4: Integration ]

---

## Phase 1: Database & Setup
- [x] Document database design in `DB_CRUD_design.md`
- [x] Install PostgreSQL and start the server
- [x] Configure Prisma v7 (`prisma.config.ts`, `.env`)
- [x] Design schema (`Item`, `AssetLog`, `Users`, `CustomFields`)
- [x] Run initial migration (`npx prisma migrate dev`)

## Phase 2: Backend Development
- [x] Document CRUD API desing in `SB_CRUD_design.md`
- [ ] Create seed data script (`prisma/seed.ts`) to insert initial test items
- [ ] Build Authentication APIs (`/api/v1/auth`)
  - [ ] `POST /auth/signup` (Register user)
  - [ ] `POST /auth/login` (User login & JWT token)
- [ ] Build Users APIs (`/api/v1/users`)
  - [ ] `GET /users` (List & filter users)
  - [ ] `GET /users/:id` (Get detailed information for user)
  - [ ] `PUT /users/:id` (Update an user's information)
  - [ ] `DELETE /users/:id` (Delete an user)
- [ ] Build User APIs (`/api/v1/users/me`)
  - [ ] `GET /users/me` (Get user information)
  - [ ] `PUT /users/me` (Update a user information)
- [ ] Build Class APIs (`/api/v1/class`)
  - [ ] `GET /classes` (List classes)
  - [ ] `POST /classes` (Create a new class)
  - [ ] `PUT /classes/:class` (Update a class information)
  - [ ] `DELETE /classes/:class` (Remove a class)
- [ ] Build Equipment APIs (`/api/v1/classes/:classId/items`)
  - [ ] `GET /classes/:classId/items` (Fetch list of equipment)
  - [ ] `POST /classes/:classId/items` (Add new equipment)
  - [ ] `GET /classes/:classId/items/:id` (Get equipment details)
  - [ ] `PUT /classes/:classId/items/:id` (Update equipment info)
  - [ ] `DELETE /classes/:classId/items/:id` (Delete equipment)
- [ ] Build Custom Fields APIs (`/api/v1/classes/:classId/custom-fields`)
  - [ ] `GET /classes/:classId/custom-fields` (Get custom-fields)
  - [ ] `POST /classes/:classId/custom-fields` (Add new custom-fields)
  - [ ] `DELETE /classes/:classId/custom-fields/:id` (Delete equipment)
- [ ] Build Setting APIs (`/api/v1/users/me/setting`)
  - [ ] `GET /users/me/setting` (Get setting information at own)
  - [ ] `PUT /users/me/setting` (Update setting information at own)
- [ ] Build Logs APIs (`/api/v1/classes/:classId/logs`)
  - [ ] `GET /classes/:classId/logs` (List logs)
  - [ ] `GET /classes/:classId/logs/:id` (Get detailed for a log)

## Phase 3: Frontend Development
- [ ] Setup UI framework & routing
- [ ] Build Login / Signup pages
- [ ] Build User Infomation & Edit page
- [ ] Build Equipment List page (Table view)
- [ ] Build Equipment Detail & Edit modal/page
- [ ] Build Custom Field Settings page

## Phase 4: Integration & Testing
- [ ] Connect Frontend with Backend APIs
- [ ] Test JSON dynamic custom fields behavior
- [ ] Final bug fixes & documentation update