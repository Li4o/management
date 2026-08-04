import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient( {adapter} );

async function main() {
    console.log(`🌱 Starting seed process...`);

    // 1. Create test user
    const testUser = await prisma.users.upsert({
        where:  { id: `test-user-id-001` },
        update: {},
        create: {
            id:             `test-user-id-001`,
            name:           `test`,
            email:          `dev@tmp.com`,
            passwordHash:   `hashed_pass_sample`,
        },
    });

    console.log(`👤 Created user: ${testUser.name}`);

    // 2. Create test class
    const testClass = await prisma.class.create({
        data: {
            name:       `Test Class`,
            description:`A test class for seeding`,
            createdBy:  testUser.id,
        },
    });

    console.log(`🏫 Created class: ${testClass.name}`);

    // 3. Create custom field
    const locationField = await prisma.customFields.create({
        data: {
            name:       `Location`,
            type:       `SELECT`,
            options:    [`Warehouse A`, `Warehouse B`, `Office 3F`],
            classId:    testClass.id,
            createdBy:  testUser.id,
        },
    });

    const serialField = await prisma.customFields.create({
        data: {
            name:       `SerialNumber`,
            type:       `TEXT`,
            options:    [],
            classId:    testClass.id,
            createdBy:  testUser.id, 
        },
    });

    console.log('🏷️ Created custom field definitions.');

    // 4. Create test item
    const item1 = await prisma.item.create({
        data: {
            assetTag:   'NB-2026-001',
            name:       'MacBook Pro 16inc',
            category:   'PC',
            status:     'AVAILABLE',
            location:   'Office3F',
            description:'M3 Max / 32GB RAM',
            classId:testClass.id,
            createdBy:  testUser.id,
            customFields: {
                Location:       'Office3F',
                SerialNumber:   'C02G1234MD6R',
            },
        },
    });

    const item2 = await prisma.item.create({
        data: {
            assetTag:   'CAM-2026-002',
            name:       'Sony a7 IV',
            category:   'Camera',
            status:     'IN_USE',
            location:   'WarehouseA',
            description:'Main camera',
            classId:     testClass.id,
            createdBy:   testUser.id,
            customFields: {
                Location:       'WarehouseA',
                SerialNumber:   'S01-98765432',
            },
        },
    });

    console.log(`📦 Created items: ${item1.name}, ${item2.name}`);

    // 5. Create assetLog
    await prisma.assetLog.create({
        data: {
            itemId:     item2.id,
            createdBy:  testUser.id,
            action:     `CHECK_OUT`,
            reason:     `Event`,
        },
    })

    console.log('📜 Created initial asset log.');
    console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });