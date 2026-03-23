"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { deleteImage } from "./upload";

export async function createProduct(values: any) {
  try {
    const { images, variations, ...productData } = values;

    const product = await prisma.product.create({
      data: {
        ...productData,
        slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        images: {
          create: images?.map((img: any) => ({
            url: img.url,
            alt: img.alt || productData.name,
          })),
        },
        variations: {
          create: variations?.map((v: any) => ({
            name: v.name,
            value: v.value,
            price: v.price,
            stock: v.stock,
            sku: v.sku,
          })),
        },
      },
    });

    revalidatePath("/admin/products");
    return { success: true, product };
  } catch (error: any) {
    console.error("CREATE_PRODUCT_ERROR:", error);
    if (error.code === 'P2002') return { error: "Product SKU or Slug already exists." };
    return { error: "Failed to create product." };
  }
}

export async function updateProduct(id: string, values: any) {
  try {
    const { images, variations, ...productData } = values;

    // Fetch old images to clean up files
    const oldImages = await prisma.productImage.findMany({
      where: { productId: id },
      select: { url: true }
    });

    const newImageUrls = new Set(images?.map((img: any) => img.url) || []);
    const imagesToDelete = oldImages.filter(img => !newImageUrls.has(img.url));

    for (const img of imagesToDelete) {
      await deleteImage(img.url);
    }

    // Delete old images and variations first for simplicity in this update
    // Alternatively, perform a more complex sync (upsert/delete)
    await prisma.$transaction([
      prisma.productImage.deleteMany({ where: { productId: id } }),
      prisma.productVariation.deleteMany({ where: { productId: id } }),
      prisma.product.update({
        where: { id },
        data: {
          ...productData,
          images: {
            create: images?.map((img: any) => ({
              url: img.url,
              alt: img.alt || productData.name,
            })),
          },
          variations: {
            create: variations?.map((v: any) => ({
              name: v.name,
              value: v.value,
              price: v.price,
              stock: v.stock,
              sku: v.sku,
            })),
          },
        },
      })
    ]);

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    console.error("UPDATE_PRODUCT_ERROR:", error);
    if (error.code === 'P2002') return { error: "Product SKU or Slug already exists." };
    return { error: "Failed to update product." };
  }
}

export async function deleteProduct(id: string) {
  try {
    const images = await prisma.productImage.findMany({
      where: { productId: id },
      select: { url: true }
    });

    for (const img of images) {
      await deleteImage(img.url);
    }

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("DELETE_PRODUCT_ERROR:", error);
    return { error: "Failed to delete product." };
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        variations: true,
      },
    });
    return product;
  } catch (error) {
    console.error("GET_PRODUCT_BY_ID_ERROR:", error);
    return null;
  }
}

export async function getAdminProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        mainCategory: true,
        subCategory: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    return products;
  } catch (error) {
    console.error("GET_ADMIN_PRODUCTS_ERROR:", error);
    return [];
  }
}
