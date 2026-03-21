"use client";

import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";

type WishlistData = { id: number; user: string; itemsCount: number; lastUpdated: string; };

const dummyWishlists: WishlistData[] = [
  { id: 1, user: "Amina Ochieng", itemsCount: 4, lastUpdated: "Today" },
  { id: 2, user: "James Kariuki", itemsCount: 12, lastUpdated: "Yesterday" },
];

const columns: ColumnDef<WishlistData>[] = [
  {
    header: "Customer",
    accessorKey: "user",
    sortable: true,
    cell: (wl) => <span className="font-bold text-[var(--bark)]">{wl.user}</span>,
  },
  {
    header: "Saved Items",
    accessorKey: "itemsCount",
    sortable: true,
    cell: (wl) => (
      <span className="flex items-center gap-2 font-black text-[var(--spice)] bg-[var(--cream)] border border-[var(--border)] px-2 py-1 rounded inline-flex">
        <Heart size={14} className="text-rose-500 fill-rose-500" /> {wl.itemsCount} products
      </span>
    ),
  },
  {
    header: "Last Updated",
    accessorKey: "lastUpdated",
    sortable: true,
    cell: (wl) => <span className="text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wider">{wl.lastUpdated}</span>,
  },
  {
    header: "Status",
    sortable: false,
    cell: () => <Badge variant="default" className="shadow-sm">Active</Badge>,
  },
];

export default function AdminWishlistsPage() {
  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)] leading-tight">Customer Wishlists</h1>
        <p className="text-sm font-medium text-[var(--gray-500)] mt-1">Discover what products customers are saving the most.</p>
      </div>

      <AdminDataTable 
        data={dummyWishlists} 
        columns={columns} 
        searchAccessor="user" 
        searchPlaceholder="Search wishlists by customer name..." 
        itemsPerPage={10}
      />
    </div>
  );
}
