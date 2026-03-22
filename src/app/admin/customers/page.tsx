import { prisma } from "@/lib/db";
import CustomerTable from "@/components/admin/customers/CustomerTable";

export default async function AdminCustomersPage() {
  const users = await prisma.user.findMany({
    include: {
      orders: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCustomers = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    isBlocked: user.isBlocked,
    orderCount: user.orders.length,
    totalSpent: user.orders.reduce((sum, order) => sum + order.total, 0),
    createdAt: user.createdAt.toISOString().split('T')[0],
  }));

  return (
    <div className="p-4  sm:p-4 max-w-[1600px] mx-auto">
      <div className="mb-2">
        <h1 className="font-display font-bold text-xl text-[var(--bark)] leading-tight">Customers</h1>
        {/* <p className="text-sm font-medium text-[var(--gray-500)] mt-1">{formattedCustomers.length} registered customers</p> */}
      </div>

      <CustomerTable customers={formattedCustomers} />
    </div>
  );
}
