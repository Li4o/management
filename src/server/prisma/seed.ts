import { PrismaClient } from `@prisma/client`;

const prisma = new PrismaClient();

async function main() {
    console.log(`🌱 Starting seed process...`);

    // 1. Create test user
    const testUser = await prisma.users.upsert({
        where:  { id: `test-user-id-001` },
        update: {}.
        create: {
            id:             `test-user-id-001`,
            name:           `test`,
            email:          `dev@tmp.com`,
            passwordHash:   `hashed_pass_sample`,
        },
    });

    console.log(`👤 Created user: ${testUser.name}`);

    // 2. Create custom field
    const locationField = await prisma.customFieldDefinitions.create({
        data: {
            name: `Locatin`,
            type: `SELECT`,
            optins: [`Warehouse A`, `Warehouse B`, `Office 3F`],
            userId: testUser.id,
        },
    });

    const serialField = await prisma.customFieldDefinitions.create({
        data: {
            name:   `SerialNumber`,
            type:   `TEXT`,
            userId: testUser.id, 
        },
    });

    console.log('🏷️ Created custom field definitions.');

    // 3. Create test item
    const item1 = await prisma.item.create({
        data: {
            assetTag:   'NB-2026-001',
            name:       'MacBook Pro 16inc',
            category:   'PC',
            status:     'AVAILABLE',
            location:   'Office3F',
            description:'M3 Max / 32GB RAM',
            customFields: {
                Location:       'Office3F',
                SerialNumber:   'C02G1234MD6R',
            },
        },
    });

    const item2 = await prisma.item.create({
        data: {
            assetTag: 'CAM-2026-002',
            name: 'Sony a7 IV',
            category: 'Camera',
            status: 'IN_USE',
            location: 'WarehouseA',
            description: 'Main camera',
            customFields: {
                Location:       'WarehouseA',
                SerialNumber:   'S01-98765432',
            },
        },
    });

    console.log(`📦 Created items: ${item1.name}, ${item2.name}`);

    // 4. Create assetLog
    await prisma.assetLog.create({
        data: {
            itemId: item2.id,
            userId: testuser.id,
            action: `CHECH_OUT`
            reason: `Event`,
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