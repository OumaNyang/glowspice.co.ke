import { Plus, Edit } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function AdminRecipesPage() {
  const dummyRecipes = [
    { id: 1, title: "Authentic Swahili Pilau", category: "Mains", status: "Published", author: "Chef Amina" },
    { id: 2, title: "Golden Turmeric Milk", category: "Beverages", status: "Draft", author: "GlowSpice Team" },
  ];

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-[var(--bark)]">Recipes</h1>
          <p className="text-[var(--gray-500)] mt-1">Manage culinary content and pairings.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white font-semibold rounded-md text-sm transition-colors shadow-sm">
          <Plus size={16} /> Add Recipe
        </button>
      </div>

      <div className="bg-white rounded-md border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--gray-50)] border-b border-[var(--border)]">
              <tr>
                {["Recipe Title", "Category", "Author", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {dummyRecipes.map((rec) => (
                <tr key={rec.id} className="hover:bg-[var(--gray-50)]">
                  <td className="px-5 py-4 font-medium text-[var(--bark)]">{rec.title}</td>
                  <td className="px-5 py-4 text-[var(--gray-500)]">{rec.category}</td>
                  <td className="px-5 py-4 text-[var(--gray-500)]">{rec.author}</td>
                  <td className="px-5 py-4">
                    <Badge variant={rec.status === "Published" ? "default" : "warning"}>{rec.status}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-[var(--spice)] font-semibold text-xs flex items-center gap-1 hover:underline"><Edit size={12}/> Edit</button>
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
