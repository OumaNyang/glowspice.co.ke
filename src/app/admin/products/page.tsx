import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Star } from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export default function AdminProductsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-[var(--bark)]">Products</h1>
          <p className="text-[var(--gray-500)] mt-1">{products.length} products in catalogue</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white font-semibold rounded-md text-sm transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-md border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--gray-50)] border-b border-[var(--border)]">
              <tr>
                {["Product", "Category", "Price", "Stock", "Rating", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-[var(--gray-50)] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-md overflow-hidden bg-[var(--cream-dark)] shrink-0">
                        <Image
                          src={product.images[0]?.url}
                          alt={product.name}
                          fill className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-[var(--bark)] line-clamp-1">{product.name}</p>
                        <p className="text-xs text-[var(--gray-400)]">{product.origin}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[var(--gray-500)]">{product.category.name}</td>
                  <td className="px-5 py-4 font-bold text-[var(--bark)]">
                    {formatPrice(product.price)}
                    <span className="text-xs text-[var(--gray-400)] font-normal ml-1">/{product.unit}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`font-semibold ${product.stock < 30 ? "text-amber-600" : "text-[var(--herb)]"}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Star size={13} className="text-amber-400 fill-amber-400" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-[var(--gray-400)]">({product.reviewCount})</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      {product.isBestSeller && <Badge variant="spice">Best Seller</Badge>}
                      {product.isNew && <Badge variant="herb">New</Badge>}
                      {product.isFeatured && <Badge variant="default">Featured</Badge>}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[var(--spice)] hover:underline"
                    >
                      <Edit size={12} />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
