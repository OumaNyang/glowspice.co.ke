import { CategoryForm } from "@/components/admin/CategoryForm";
import { getRootCategories } from "@/app/actions/category";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [category, rootCategories] = await Promise.all([
    prisma.category.findUnique({ where: { id } }),
    getRootCategories(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-[var(--gray-50)] min-h-screen">
      <CategoryForm 
        initialData={{
          ...category,
          createdAt: category.createdAt.toISOString(),
          updatedAt: category.updatedAt.toISOString(),
        } as any} 
        rootCategories={rootCategories as any} 
      />
    </div>
  );
}
