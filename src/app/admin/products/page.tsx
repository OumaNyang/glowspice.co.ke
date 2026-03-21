"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Star } from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";
import { Product } from "@/lib/types";

const columns: ColumnDef<Product>[] = [
  {
    header: "Product",
    accessorKey: "name",
    sortable: true,
    cell: (product) => (
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-[var(--cream-dark)] shrink-0 border border-[var(--border)]">
          <Image
            src={product.images[0]?.url}
            alt={product.name}
            fill className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <p className="font-bold text-[var(--bark)] line-clamp-1">{product.name}</p>
          <p className="text-[10px] uppercase tracking-wider text-[var(--gray-400)] font-semibold">{product.origin}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Category",
    accessorKey: "categoryId",
    sortable: true,
    cell: (product) => <span className="font-medium text-[var(--gray-500)]">{product.category.name}</span>,
  },
  {
    header: "Price",
    accessorKey: "price",
    sortable: true,
    cell: (product) => (
      <div>
        <span className="font-bold text-[var(--spice)]">{formatPrice(product.price)}</span>
        <span className="text-[10px] text-[var(--gray-400)] font-semibold ml-1">/{product.unit}</span>
      </div>
    ),
  },
  {
    header: "Stock",
    accessorKey: "stock",
    sortable: true,
    cell: (product) => (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${product.stock < 30 ? "bg-amber-500" : "bg-[var(--herb)]"}`} />
        <span className="font-bold text-[var(--bark)]">{product.stock}</span>
      </div>
    ),
  },
  {
    header: "Rating",
    accessorKey: "rating",
    sortable: true,
    cell: (product) => (
      <div className="flex items-center gap-1">
        <Star size={14} className="text-amber-400 fill-amber-400" />
        <span className="font-bold text-[var(--bark)]">{product.rating}</span>
        <span className="text-xs text-[var(--gray-400)] font-medium">({product.reviewCount})</span>
      </div>
    ),
  },
  {
    header: "Status",
    cell: (product) => (
      <div className="flex flex-col gap-1.5 items-start">
        {product.isBestSeller && <Badge variant="spice" className="text-[9px] py-0 px-1.5">Best Seller</Badge>}
        {product.isNew && <Badge variant="herb" className="text-[9px] py-0 px-1.5">New</Badge>}
        {product.isFeatured && <Badge variant="default" className="text-[9px] py-0 px-1.5 shadow-sm">Featured</Badge>}
        {!product.isBestSeller && !product.isNew && !product.isFeatured && <span className="text-xs text-[var(--gray-400)]">—</span>}
      </div>
    ),
  },
  {
    header: "Action",
    cell: (product) => (
      <Link
        href={`/admin/products/${product.id}/edit`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--cream)] border border-[var(--border)] text-xs font-bold text-[var(--spice)] hover:bg-white hover:border-[var(--spice)] hover:shadow-sm transition-all"
      >
        <Edit size={12} />
        Edit
      </Link>
    ),
  },
];

export default function AdminProductsPage() {
  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-[var(--bark)] leading-tight">Products Catalogue</h1>
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

      <AdminDataTable 
        data={products} 
        columns={columns} 
        searchAccessor="name" 
        searchPlaceholder="Search products by name..." 
        itemsPerPage={8}
      />
    </div>
  );
}
