import { products } from "@/lib/data";
import { ProductForm } from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

// Since we are mocking dynamic routes with static data:
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const productData = products.find((p) => p.id === params.id);
  
  if (!productData) {
    notFound();
  }

  return <ProductForm initialData={productData} />;
}
