import { Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function AdminReviewsPage() {
  const dummyReviews = [
    { id: 1, user: "Amina Ochieng", product: "Garam Masala", rating: 5, status: "published", date: "2 days ago" },
    { id: 2, user: "James Kariuki", product: "Saffron Threads", rating: 4, status: "published", date: "5 days ago" },
    { id: 3, user: "John Doe", product: "Turmeric Powder", rating: 1, status: "flagged", date: "1 week ago" },
  ];

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)]">Reviews</h1>
        <p className="text-[var(--gray-500)] mt-1">Manage customer feedback across all products.</p>
      </div>

      <div className="bg-white rounded-md border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--gray-50)] border-b border-[var(--border)]">
              <tr>
                {["Customer", "Product", "Rating", "Status", "Date", "Action"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {dummyReviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-[var(--gray-50)]">
                  <td className="px-5 py-4 font-medium text-[var(--bark)]">{rev.user}</td>
                  <td className="px-5 py-4 text-[var(--gray-500)]">{rev.product}</td>
                  <td className="px-5 py-4 flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <span className="font-bold">{rev.rating}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={rev.status === "published" ? "success" : "error"} className="uppercase">
                      {rev.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-[var(--gray-400)]">{rev.date}</td>
                  <td className="px-5 py-4">
                    <button className="text-[var(--spice)] font-semibold text-xs hover:underline">Moderate</button>
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
