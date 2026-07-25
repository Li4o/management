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
- [ ] Document CRUD API desing in `SB_CRUD_design.md`
- [ ] Create seed data script (`prisma/seed.ts`) to insert initial test items
- [ ] Build Authentication APIs (`/api/v1/auth`)
  - [ ] `POST /auth/signup` (Register user)
  - [ ] `POST /auth/login` (User login & JWT token)
- [ ] Build Equipment APIs (`/api/v1/items`)
  - [ ] `GET /items` (Fetch list of equipment)
  - [ ] `POST /items` (Add new equipment)
  - [ ] `GET /items/:id` (Get equipment details)
  - [ ] `PUT /items/:id` (Update equipment info)
  - [ ] `DELETE /items/:id` (Delete equipment)
- [ ] Build Custom Fields APIs (`/api/v1/custom-fields`)
  - [ ] `GET /custom-fields` (Get custom-fields)
  - [ ] `POST /custom-fields` (Add new custom-fields)
  - [ ] `DELETE /custom-fields/:id` (Delete equipment)

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