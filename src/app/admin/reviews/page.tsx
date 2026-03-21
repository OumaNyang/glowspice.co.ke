"use client";

import { Star, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";

type Review = { id: number; user: string; product: string; rating: number; status: string; date: string; };

const dummyReviews: Review[] = [
  { id: 1, user: "Amina Ochieng", product: "Garam Masala", rating: 5, status: "published", date: "2 days ago" },
  { id: 2, user: "James Kariuki", product: "Saffron Threads", rating: 4, status: "published", date: "5 days ago" },
  { id: 3, user: "John Doe", product: "Turmeric Powder", rating: 1, status: "flagged", date: "1 week ago" },
  { id: 4, user: "Sarah W.", product: "Whole Cloves", rating: 5, status: "published", date: "2 weeks ago" },
];

const columns: ColumnDef<Review>[] = [
  {
    header: "Customer",
    accessorKey: "user",
    sortable: true,
    cell: (rev) => <span className="font-bold text-[var(--bark)]">{rev.user}</span>,
  },
  {
    header: "Product",
    accessorKey: "product",
    sortable: true,
    cell: (rev) => <span className="font-semibold text-[var(--spice)]">{rev.product}</span>,
  },
  {
    header: "Rating",
    accessorKey: "rating",
    sortable: true,
    cell: (rev) => (
      <div className="flex items-center gap-1 bg-[var(--cream-dark)] px-2 py-1 rounded inline-flex border border-[var(--border)]">
        <Star size={14} className="text-amber-500 fill-amber-500" />
        <span className="font-black text-[var(--bark)]">{rev.rating}</span>
      </div>
    ),
  },
  {
    header: "Date",
    accessorKey: "date",
    sortable: true,
    cell: (rev) => <span className="text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wider">{rev.date}</span>,
  },
  {
    header: "Status",
    accessorKey: "status",
    sortable: true,
    cell: (rev) => (
      <Badge variant={rev.status === "published" ? "success" : "error"} className="uppercase tracking-wider font-bold text-[10px] shadow-sm">
        {rev.status}
      </Badge>
    ),
  },
  {
    header: "Action",
    cell: (rev) => (
      <button className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-bold transition-all shadow-sm ${rev.status === "flagged" ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100" : "bg-white text-[var(--bark)] border-[var(--border)] hover:bg-[var(--cream-dark)]"}`}>
        {rev.status === "flagged" ? <ShieldAlert size={14} /> : null}
        Moderate
      </button>
    ),
  },
];

export default function AdminReviewsPage() {
  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)] leading-tight">Reviews</h1>
        <p className="text-sm font-medium text-[var(--gray-500)] mt-1">Manage customer feedback across all products.</p>
      </div>

      <AdminDataTable 
        data={dummyReviews} 
        columns={columns} 
        searchAccessor="product" 
        searchPlaceholder="Search reviews by product name..." 
        itemsPerPage={10}
      />
    </div>
  );
}
