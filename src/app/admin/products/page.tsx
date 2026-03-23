import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminProducts } from "@/app/actions/product";
import { AdminProductsTable } from "@/components/admin/products/AdminProductsTable";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();
  
  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-[var(--bark)] leading-tight">Products Catalogue</h1>
          <p className="text-sm font-medium text-[var(--gray-500)] mt-1">{products.length} active products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white font-bold rounded-md shadow-[0_4px_14px_0_rgba(196,89,45,0.39)] hover:shadow-[0_6px_20px_rgba(196,89,45,0.23)] hover:-translate-y-0.5 transition-all text-sm"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <AdminProductsTable products={products as any} />
    </div>
  );
}
