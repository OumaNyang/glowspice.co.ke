import { prisma } from "../src/lib/db";
import { rename, mkdir, access } from "fs/promises";
import path from "path";

async function migrate() {
  const publicDir = path.join(process.cwd(), "public");
  const uploadsDir = path.join(publicDir, "images", "uploads");

  // Ensure target dirs exist
  await mkdir(path.join(uploadsDir, "category"), { recursive: true });
  await mkdir(path.join(uploadsDir, "products"), { recursive: true });

  console.log("Migrating Categories...");
  const categories = await prisma.category.findMany({
    where: { image: { startsWith: "/images/uploads/", not: { startsWith: "/images/uploads/category/" } } },
  });

  for (const cat of categories) {
    if (!cat.image) continue;

    const oldFilename = path.basename(cat.image);
    const newFilename = oldFilename.startsWith("cat_") ? oldFilename : `cat_${oldFilename}`;
    const oldPath = path.join(publicDir, cat.image);
    const newRelativePath = `/images/uploads/category/${newFilename}`;
    const newPath = path.join(publicDir, newRelativePath);

    try {
      await access(oldPath);
      await rename(oldPath, newPath);
      await prisma.category.update({
        where: { id: cat.id },
        data: { image: newRelativePath },
      });
      console.log(`Migrated category image: ${oldFilename} -> ${newRelativePath}`);
    } catch (e: any) {
      console.warn(`Skipping category image ${cat.image}: ${e.message}`);
    }
  }

  console.log("Migrating Product Images...");
  const productImages = await prisma.productImage.findMany({
    where: { url: { startsWith: "/images/uploads/", not: { startsWith: "/images/uploads/products/" } } },
  });

  for (const img of productImages) {
    const oldFilename = path.basename(img.url);
    const newFilename = oldFilename.startsWith("prod_") ? oldFilename : `prod_${oldFilename}`;
    const oldPath = path.join(publicDir, img.url);
    const newRelativePath = `/images/uploads/products/${newFilename}`;
    const newPath = path.join(publicDir, newRelativePath);

    try {
      await access(oldPath);
      await rename(oldPath, newPath);
      await prisma.productImage.update({
        where: { id: img.id },
        data: { url: newRelativePath },
      });
      console.log(`Migrated product image: ${oldFilename} -> ${newRelativePath}`);
    } catch (e: any) {
      console.warn(`Skipping product image ${img.url}: ${e.message}`);
    }
  }

  console.log("Migration finished.");
}

migrate()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
