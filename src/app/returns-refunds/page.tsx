export default function ReturnsRefundsPage() {
  return (
    <div className="bg-[var(--cream)] min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-bold text-4xl text-[var(--bark)] mb-8">Returns & Refunds</h1>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--border)] prose prose-orange">
          <p>We want you to be completely satisfied with your GlowSpice purchase.</p>
          <h3>Return Policy</h3>
          <p>Due to the nature of our products (food items), we only accept returns for items that are damaged upon arrival, or if the wrong item was sent. Please contact us within 48 hours of delivery.</p>
          <h3>Refund Process</h3>
          <p>Approved refunds are processed via M-Pesa or the original payment method within 3-5 business days.</p>
        </div>
      </div>
    </div>
  );
}
