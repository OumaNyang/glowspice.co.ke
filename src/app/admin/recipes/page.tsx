"use client";

import { Plus, Edit } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";

type Recipe = { id: number; title: string; category: string; status: string; author: string; };

const dummyRecipes: Recipe[] = [
  { id: 1, title: "Authentic Swahili Pilau", category: "Mains", status: "Published", author: "Chef Amina" },
  { id: 2, title: "Golden Turmeric Milk", category: "Beverages", status: "Draft", author: "GlowSpice Team" },
];

const columns: ColumnDef<Recipe>[] = [
  {
    header: "Recipe Title",
    accessorKey: "title",
    sortable: true,
    cell: (rec) => <span className="font-bold text-[var(--bark)]">{rec.title}</span>,
  },
  {
    header: "Category",
    accessorKey: "category",
    sortable: true,
    cell: (rec) => <span className="font-semibold text-[var(--spice)]">{rec.category}</span>,
  },
  {
    header: "Author",
    accessorKey: "author",
    sortable: true,
    cell: (rec) => <span className="text-sm font-medium text-[var(--gray-500)]">{rec.author}</span>,
  },
  {
    header: "Status",
    accessorKey: "status",
    sortable: true,
    cell: (rec) => (
      <Badge variant={rec.status === "Published" ? "default" : "warning"} className="uppercase tracking-wider font-bold text-[10px] shadow-sm">
        {rec.status}
      </Badge>
    ),
  },
  {
    header: "Action",
    cell: () => (
      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--cream)] border border-[var(--border)] text-xs font-bold text-[var(--spice)] hover:bg-white hover:border-[var(--spice)] hover:shadow-sm transition-all">
        <Edit size={12} /> Edit
      </button>
    ),
  },
];

export default function AdminRecipesPage() {
  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-[var(--bark)] leading-tight">Recipes</h1>
          <p className="text-sm font-medium text-[var(--gray-500)] mt-1">Manage culinary content and pairings.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white font-bold rounded-md shadow-[0_4px_14px_0_rgba(196,89,45,0.39)] hover:shadow-[0_6px_20px_rgba(196,89,45,0.23)] hover:-translate-y-0.5 transition-all text-sm">
          <Plus size={18} /> Add Recipe
        </button>
      </div>

      <AdminDataTable 
        data={dummyRecipes} 
        columns={columns} 
        searchAccessor="title" 
        searchPlaceholder="Search recipes by title..." 
        itemsPerPage={10}
      />
    </div>
  );
}
