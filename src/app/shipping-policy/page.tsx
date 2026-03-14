export default function ShippingPolicyPage() {
  return (
    <div className="bg-[var(--cream)] min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-bold text-4xl text-[var(--bark)] mb-8">Shipping Policy</h1>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--border)] prose prose-orange">
          <h3>Domestic Shipping (Kenya)</h3>
          <p>We offer nationwide delivery across Kenya. Orders within Nairobi are typically delivered within 24 hours. Deliveries outside Nairobi may take 2-4 business days.</p>
          <h3>Shipping Rates</h3>
          <ul>
            <li>Nairobi: KES 200</li>
            <li>Outside Nairobi: KES 400</li>
            <li><strong>Free shipping on all orders over KES 5,000!</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
