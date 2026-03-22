import "dotenv/config";
import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  console.log('Seeding real users...');
  
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Real Admin User
  const admin = await prisma.admin.create({
    data: {
      name: 'Super Admin',
      email: 'admin@glowspice.co.ke',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      emailVerified: new Date(),
      createdAt: new Date(),
    },
  });

  // Real Customer User
  const customer = await prisma.user.create({
    data: {
      name: 'Jane Customer',
      email: 'customer@glowspice.shop',
      password: hashedPassword,
      phone: '+254711111111',
      emailVerified: new Date(),
    },
  });

  console.log('Users seeded:');
  console.log('Admin:', admin.email);
  console.log('Customer:', customer.email);
  console.log('Default Password:', 'password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
