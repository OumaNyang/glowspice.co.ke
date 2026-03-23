"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { deleteImage } from "./upload";

export async function createCategory(values: {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  color?: string;
  parentId?: string | null;
  level?: string;
  tags?: string[];
  isPublished?: boolean;
}) {
  try {
    const category = await prisma.category.create({
      data: {
        name: values.name,
        slug: values.slug || values.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        description: values.description,
        image: values.image,
        color: values.color,
        parentId: values.parentId || null,
        level: values.level || "main",
        tags: values.tags || [],
        isPublished: values.isPublished ?? true,
      },
    });

    revalidatePath("/admin/categories");
    return { success: true, category };
  } catch (error: any) {
    console.error("CREATE_CATEGORY_ERROR:", error);
    if (error.code === 'P2002') return { error: "Category slug already exists." };
    return { error: "Failed to create category." };
  }
}

export async function updateCategory(id: string, values: {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  color?: string;
  parentId?: string | null;
  level?: string;
  tags?: string[];
  isPublished?: boolean;
}) {
  try {
    const currentCategory = await prisma.category.findUnique({
      where: { id },
      select: { image: true }
    });

    if (currentCategory?.image && currentCategory.image !== values.image) {
      await deleteImage(currentCategory.image);
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: values.name,
        slug: values.slug,
        description: values.description,
        image: values.image,
        color: values.color,
        parentId: values.parentId || null,
        level: values.level || "main",
        tags: values.tags || [],
        isPublished: values.isPublished ?? true,
      },
    });

    revalidatePath("/admin/categories");
    return { success: true, category };
  } catch (error: any) {
    console.error("UPDATE_CATEGORY_ERROR:", error);
    if (error.code === 'P2002') return { error: "Category slug already exists." };
    return { error: "Failed to update category." };
  }
}

export async function deleteCategory(id: string) {
  try {
    // Check if there are children
    const childrenCount = await prisma.category.count({
      where: { parentId: id }
    });

    if (childrenCount > 0) {
      return { error: "Cannot delete category with sub-categories. Delete sub-categories first." };
    }

    // Check if there are products
    const productsCount = await prisma.product.count({
      where: {
        OR: [
          { mainCategoryId: id },
          { subCategoryId: id }
        ]
      }
    });

    if (productsCount > 0) {
      return { error: "Cannot delete category with associated products. Reassign products first." };
    }

    const category = await prisma.category.findUnique({
      where: { id },
      select: { image: true }
    });

    if (category?.image) {
      await deleteImage(category.image);
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("DELETE_CATEGORY_ERROR:", error);
    return { error: "Failed to delete category." };
  }
}

export async function getRootCategories() {
  try {
    return await prisma.category.findMany({
      where: { parentId: null },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error("GET_ROOT_CATEGORIES_ERROR:", error);
    return [];
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            productsMain: true,
            productsSub: true,
          }
        }
      },
      orderBy: { name: 'asc' }
    });

    return categories.map(cat => ({
      ...cat,
      productCount: cat._count.productsMain + cat._count.productsSub,
      createdAt: cat.createdAt.toISOString(),
      updatedAt: cat.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("GET_ALL_CATEGORIES_ERROR:", error);
    return [];
  }
}
