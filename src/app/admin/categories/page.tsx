import { Plus, Tag } from "lucide-react";
import Link from "next/link";
import { CategoryTreeTable } from "@/components/admin/CategoryTreeTable";
import { getAllCategories } from "@/app/actions/category";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-xl text-[var(--bark)] leading-tight">Categories</h1>
           
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white px-4 py-2 rounded-md font-bold transition-transform hover:-translate-y-0.5 shadow-sm sm:w-auto text-sm justify-center"
        >
          <Plus size={16} /> Add Category
        </Link>
      </div>

      <CategoryTreeTable data={categories as any} />
    </div>
  );
}
