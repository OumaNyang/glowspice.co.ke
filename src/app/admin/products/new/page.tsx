import { ProductForm } from "@/components/admin/ProductForm";
import { getAllCategories } from "@/app/actions/category";

export default async function CreateProductPage() {
  const categories = await getAllCategories();
  
  return <ProductForm categories={categories as any} />;
}
