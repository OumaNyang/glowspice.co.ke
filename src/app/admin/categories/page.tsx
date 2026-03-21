import { Plus } from "lucide-react";
import Link from "next/link";
import { categories } from "@/lib/data";
import { CategoryTreeTable } from "@/components/admin/CategoryTreeTable";

export default function AdminCategoriesPage() {
  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-[var(--bark)] leading-tight">Categories</h1>
          <p className="text-sm font-medium text-[var(--gray-500)] mt-1">{categories.length} active categories</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white px-4 py-2 rounded-md font-bold transition-transform hover:-translate-y-0.5 shadow-sm sm:w-auto text-sm justify-center"
        >
          <Plus size={16} /> Add Category
        </Link>
      </div>

      <CategoryTreeTable data={categories} />
    </div>
  );
}
