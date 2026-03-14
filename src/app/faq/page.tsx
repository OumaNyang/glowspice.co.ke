export default function FAQPage() {
  const faqs = [
    {
      q: "Are your spices organic?",
      a: "Yes! The majority of our spices are sourced from organic farms across Kenya, India, and Sri Lanka. We strictly ensure no artificial preservatives are added."
    },
    {
      q: "How long do the spices stay fresh?",
      a: "Whole spices last up to 2-3 years, while ground spices maintain peak flavor for 6-12 months when stored in a cool, dark place in their sealed containers."
    },
    {
      q: "Do you offer wholesale pricing?",
      a: "Yes, we offer bulk and wholesale pricing for restaurants and large orders. Please reach out to us via our Contact page for a custom quote."
    },
    {
      q: "Can I cancel or change my order?",
      a: "Orders are processed quickly, but if you contact us within 2 hours of placing your order, we can usually make modifications or cancellations."
    }
  ];

  return (
    <div className="bg-[var(--cream)] min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-bold text-4xl text-[var(--bark)] mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-[var(--border)]">
              <h3 className="font-bold text-lg text-[var(--bark)] mb-2">{faq.q}</h3>
              <p className="text-[var(--gray-500)] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
