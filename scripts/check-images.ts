import { prisma } from "../src/lib/db";

async function check() {
  const images = ["0efec0eb7c61702020aaf5d2a16de3a9.jpeg", "6a9f9f8b461a7e8846b195248aa8afe3.jpg"];
  
  for (const img of images) {
    const url = `/images/uploads/${img}`;
    console.log(`Checking ${url}...`);
    
    const [cat, prod, admin, user, rec, banner] = await Promise.all([
      prisma.category.findFirst({ where: { image: url } }),
      prisma.productImage.findFirst({ where: { url } }),
      prisma.admin.findFirst({ where: { avatar: url } }),
      prisma.user.findFirst({ where: { avatar: url } }),
      prisma.recipe.findFirst({ where: { image: url } }),
      prisma.banner.findFirst({ where: { image: url } }),
    ]);
    
    if (cat) console.log(`  Found in Category: ${cat.name}`);
    if (prod) console.log(`  Found in ProductImage: ${prod.id}`);
    if (admin) console.log(`  Found in Admin avatar: ${admin.email}`);
    if (user) console.log(`  Found in User avatar: ${user.email}`);
    if (rec) console.log(`  Found in Recipe: ${rec.title}`);
    if (banner) console.log(`  Found in Banner: ${banner.id}`);
    
    if (!cat && !prod && !admin && !user && !rec && !banner) {
      console.log(`  NOT FOUND IN DB.`);
    }
  }
}

check().catch(console.error).finally(() => prisma.$disconnect());
