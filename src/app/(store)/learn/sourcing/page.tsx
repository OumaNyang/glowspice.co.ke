import { Metadata } from "next";
import Image from "next/image";
import { Link2, Leaf, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Sourcing | GlowSpice",
  description: "Trace your spices back to the farmers. Ethical, direct-trade sourcing.",
  openGraph: {
    title: "Our Sourcing | GlowSpice",
    description: "Trace your spices back to the farmers. Ethical, direct-trade sourcing.",
    url: "https://glowspice.shop/learn/sourcing",
    siteName: "GlowSpice",
    type: "website",
  },
  alternates: {
    canonical: "https://glowspice.shop/learn/sourcing",
  },
};

const pillars = [
  {
    icon: Globe,
    title: "Direct Trade",
    description: "We bypass the complex, dusty supply chains to work directly with cooperative farmers in India, Madagascar, and Sri Lanka. This means fresher spices for you and fairer wages for them.",
  },
  {
    icon: Leaf,
    title: "Regenerative Farming",
    description: "Our partners utilize ancient polyculture farming techniques that restore soil health, increase biodiversity, and capture carbon, ensuring the land remains viable for generations.",
  },
  {
    icon: Link2,
    title: "100% Traceable",
    description: "Every jar tells a story. We thoroughly document the harvest date, origin region, and farming cooperative for every single batch of spices we sell.",
  },
];

export default function SourcingPage() {
  return (
    <div className="bg-[var(--cream)] min-h-screen pb-20">
      <div className="bg-[var(--bark)] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=2000')] bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-black mb-6">Ethical Sourcing</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
            We are building a more equitable spice trade. From the soil to your skillet, transparency is our promise.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-16 text-[var(--bark)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 cursor-default">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="bg-white p-10 rounded-2xl shadow-sm border border-[var(--border)] text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="inline-flex items-center justify-center p-4 bg-[var(--spice)] text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <pillar.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
              <p className="text-[var(--gray-700)] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[var(--border)] flex flex-col md:flex-row">
          <div className="md:w-1/2 relative min-h-[400px]">
            <Image 
              src="https://images.unsplash.com/photo-1605333139886-c3cc1ef2be2a?q=80&w=800" 
              alt="Farmer sorting spices" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-4xl font-heading font-bold mb-6">The Current Spice Crisis</h2>
            <p className="text-lg text-[var(--gray-700)] leading-relaxed mb-6">
              The conventional spice industry is broken. Spices are often harvested, bleached, stored in warehouses for years, and passed through up to 8 different middlemen before reaching your local grocery store. By the time you buy them, they have lost their essential oils, their vibrant color, and their purpose.
            </p>
            <p className="text-lg text-[var(--gray-700)] leading-relaxed font-medium text-[var(--spice)]">
              GlowSpice changes the equation by shipping freshly harvested, single-origin spices directly to our facilities immediately after curing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
