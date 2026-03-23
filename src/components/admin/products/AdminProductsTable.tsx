"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit, Star, Eye } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";
import { Product } from "@/lib/types";

interface AdminProductsTableProps {
  products: Product[];
}

const columns: ColumnDef<Product>[] = [
  {
    header: "Product",
    accessorKey: "name",
    sortable: true,
    cell: (product) => (
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-[var(--cream-dark)] shrink-0 border border-[var(--border)]">
          {product.images?.[0] ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill className="object-cover"
              sizes="40px"
            />
          ) : (
             <div className="bg-[var(--gray-100)] w-full h-full" />
          )}
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
    accessorKey: "mainCategory" as any, 
    sortable: true,
    cell: (product) => <span className="font-medium text-[var(--gray-500)]">{product.mainCategory?.name || "Uncategorized"}</span>,
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
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/admin/products/${product.id}/edit`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-[var(--spice)] bg-white border border-[var(--border)] hover:border-[var(--spice)] hover:bg-[var(--spice)]/5 rounded transition-colors shadow-sm"
        >
          <Edit size={12} /> Edit
        </Link>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-[var(--gray-600)] bg-white border border-[var(--border)] hover:bg-[var(--gray-50)] rounded transition-colors shadow-sm">
          <Eye size={12} /> View
        </button>
      </div>
    ),
  },
];

export function AdminProductsTable({ products }: AdminProductsTableProps) {
  return (
    <AdminDataTable 
      data={products} 
      columns={columns} 
      searchAccessor="name" 
      searchPlaceholder="Search products by name..." 
      itemsPerPage={8}
    />
  );
}
