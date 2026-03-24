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
    cell: (product) => {
      const prices = product.variations?.map(v => v.price) || [product.price];
      const minPrice = Math.min(...prices);
      const hasMultiplePrices = new Set(prices).size > 1;

      return (
        <div>
          {hasMultiplePrices && <span className="text-[10px] text-[var(--gray-400)] font-bold uppercase mr-1">From</span>}
          <span className="font-extrabold text-[var(--spice)]">{formatPrice(minPrice)}</span>
          <span className="text-[10px] text-[var(--gray-400)] font-semibold ml-1">/{product.unit}</span>
        </div>
      );
    },
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
      renderExpansion={(product) => (
        <div className="pl-6 md:pl-12 pr-4 py-3 space-y-3 relative">
          {/* Vertical Tree Connector line */}
          <div className="absolute left-[21px] md:left-[45px] top-0 bottom-6 w-0.5 bg-[var(--border)] rounded-full opacity-60" />

          {product.variations && product.variations.length > 0 ? (
            <div className="space-y-2.5">
              {product.variations.map((v, idx) => (
                <div key={v.id} className="relative flex items-start gap-4 animate-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${idx * 50}ms` }}>
                  {/* Horizontal Tree Branch */}
                  <div className="absolute -left-[14px] md:-left-[24px] top-4 w-4 md:w-6 h-0.5 bg-[var(--border)] rounded-full opacity-60" />
                  
                  <div className="flex-1 bg-white border border-[var(--border)] hover:border-[var(--spice)]/40 rounded-lg p-3 shadow-sm hover:shadow transition-all group overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Variant Identity */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[var(--cream)] flex items-center justify-center text-[10px] font-bold text-[var(--spice)] shrink-0 border border-[var(--spice)]/10">
                          {(v.type || "G").charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[var(--bark)]">{v.name}: <span className="text-[var(--spice)]">{v.value}</span></p>
                          <p className="text-[9px] font-mono text-[var(--gray-400)] uppercase mt-0.5 tracking-wider">{v.sku}</p>
                        </div>
                      </div>

                      {/* Pricing Focus */}
                      <div className="flex flex-col justify-center border-l sm:border-l-0 lg:border-l border-[var(--border)] sm:pl-0 lg:pl-4">
                        <p className="text-[9px] font-bold text-[var(--gray-400)] uppercase tracking-widest mb-0.5">Price & Promo</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-[var(--bark)]">KES {(v.price ?? 0).toLocaleString()}</span>
                          {v.discountPrice && v.discountPrice > 0 && (
                            <span className="text-xs font-bold text-[var(--spice)] px-1.5 py-0.5 bg-[var(--spice)]/5 rounded">
                              Disc: KES {(v.discountPrice ?? 0).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Dates & Barcode */}
                      <div className="flex flex-col justify-center border-l border-[var(--border)] pl-4">
                        {v.discountStartDate ? (
                          <div className="flex flex-col gap-0.5">
                             <p className="text-[9px] font-bold text-[var(--gray-500)] flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-green-500" /> Start: {new Date(v.discountStartDate).toLocaleDateString()}
                             </p>
                             <p className="text-[9px] font-bold text-[var(--gray-500)] flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-red-500" /> Ends: {new Date(v.discountEndDate!).toLocaleDateString()}
                             </p>
                          </div>
                        ) : (
                          <p className="text-[10px] text-[var(--gray-400)] italic">No active promotion</p>
                        )}
                        <p className="text-[9px] text-[var(--gray-500)] mt-1 truncate">GTIN: {v.barcode || "N/A"}</p>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center justify-between border-l border-[var(--border)] pl-4">
                        <div className="flex flex-col">
                           <p className="text-[9px] font-bold text-[var(--gray-400)] uppercase mb-0.5">Inventory</p>
                           <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${v.stock < 10 ? 'bg-red-500 animate-pulse' : 'bg-[var(--herb)]'}`} />
                              <span className="text-sm font-black text-[var(--bark)]">{v.stock} <span className="text-[10px] font-normal text-[var(--gray-400)]">units</span></span>
                           </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                           <Badge variant="outline" className="text-[8px] uppercase tracking-tighter cursor-help">Variant Node</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-[var(--gray-50)] rounded-lg border border-dashed border-[var(--border)]">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--gray-300)]" />
               <p className="text-xs text-[var(--gray-500)] font-medium">This product operates as a standalone variant without additional configurations.</p>
            </div>
          )}
        </div>
      )}
    />
  );
}
