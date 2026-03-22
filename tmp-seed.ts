import { prisma } from './src/lib/db';
import bcrypt from 'bcryptjs';

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const superAdmin = await prisma.admin.upsert({
    where: { email: "admin@glowspice.co.ke" },
    update: {
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
    create: {
      name: "Super Admin",
      email: "admin@glowspice.co.ke",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      emailVerified: new Date(),
    },
  });

  console.log("Upserted Super Admin:", superAdmin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
