import { CategoryForm } from "@/components/admin/CategoryForm";
import { categories } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((cat) => ({
    id: cat.id,
  }));
}

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const category = categories.find((c) => c.id === params.id);
  
  if (!category) {
    return <div className="p-8 text-center font-bold text-[var(--bark)]">Category not found.</div>;
  }

  return <CategoryForm initialData={category} />;
}
