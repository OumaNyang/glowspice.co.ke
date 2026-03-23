import { ProductForm } from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";
import { getProductById } from "@/app/actions/product";
import { getAllCategories } from "@/app/actions/category";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const [productData, categories] = await Promise.all([
    getProductById(id),
    getAllCategories()
  ]);
  
  if (!productData) {
    notFound();
  }

  return <ProductForm initialData={productData as any} categories={categories as any} />;
}
