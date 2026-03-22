import { prisma } from "../src/lib/db";

async function main() {
  console.log('Clearing existing users...');
  await prisma.user.deleteMany();

  console.log('Seeding real users...');
  
  // Real Admin User
  const admin = await prisma.user.create({
    data: {
      name: 'GlowSpice Admin',
      email: 'admin@glowspice.shop',
      role: 'ADMIN',
      phone: '+254700000000',
    },
  });

  // Real Customer User
  const customer = await prisma.user.create({
    data: {
      name: 'Jane Customer',
      email: 'customer@glowspice.shop',
      role: 'CUSTOMER',
      phone: '+254711111111',
    },
  });

  console.log('Users seeded:');
  console.log('Admin:', admin.email);
  console.log('Customer:', customer.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
