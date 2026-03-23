import { CategoryForm } from "@/components/admin/CategoryForm";
import { getRootCategories } from "@/app/actions/category";

export default async function NewCategoryPage() {
  const rootCategories = await getRootCategories();

  return (
    <div className="bg-[var(--gray-50)] min-h-screen">
      <CategoryForm rootCategories={rootCategories as any} />
    </div>
  );
}
