import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function AdminWishlistsPage() {
  const dummyWishlists = [
    { id: 1, user: "Amina Ochieng", itemsCount: 4, lastUpdated: "Today" },
    { id: 2, user: "James Kariuki", itemsCount: 12, lastUpdated: "Yesterday" },
  ];

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)]">Customer Wishlists</h1>
        <p className="text-[var(--gray-500)] mt-1">Discover what products customers are saving the most.</p>
      </div>

      <div className="bg-white rounded-md border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--gray-50)] border-b border-[var(--border)]">
              <tr>
                {["Customer", "Saved Items", "Last Updated", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {dummyWishlists.map((wl) => (
                <tr key={wl.id} className="hover:bg-[var(--gray-50)]">
                  <td className="px-5 py-4 font-medium text-[var(--bark)]">{wl.user}</td>
                  <td className="px-5 py-4 text-[var(--gray-500)] flex items-center gap-2">
                    <Heart size={14} className="text-rose-500" /> {wl.itemsCount} products
                  </td>
                  <td className="px-5 py-4 text-[var(--gray-500)]">{wl.lastUpdated}</td>
                  <td className="px-5 py-4"><Badge variant="default">Active</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
