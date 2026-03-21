import { Metadata } from "next";
import Image from "next/image";
import { BookOpen, Thermometer, Clock, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "The Spice Guide | GlowSpice",
  description: "Learn how to store, grind, and cook with premium spices.",
  openGraph: {
    title: "The Spice Guide | GlowSpice",
    description: "Learn how to store, grind, and cook with premium spices.",
    url: "https://glowspice.shop/learn/guide",
    siteName: "GlowSpice",
    type: "website",
  },
  alternates: {
    canonical: "https://glowspice.shop/learn/guide",
  },
};

const tips = [
  {
    icon: ShieldAlert,
    title: "How to Store Spices",
    description: "Heat, light, and moisture are the enemies of fresh spices. Always store your spices in an airtight container in a cool, dark cupboard or drawer, away from your stove or dishwasher.",
  },
  {
    icon: BookOpen,
    title: "Whole vs. Ground",
    description: "Whole spices retain their volatile oils and flavor compounds for up to 3 years. Ground spices begin to lose their potency after 6 months. For the best flavor, buy whole and grind as needed.",
  },
  {
    icon: Thermometer,
    title: "Toasting for Depth",
    description: "Toasting whole spices in a dry skillet over medium heat for 1-2 minutes awakens their essential oils, dramatically increasing their aroma and complexity before grinding.",
  },
  {
    icon: Clock,
    title: "When to Add Them",
    description: "Add whole spices at the beginning of cooking to infuse the oil or broth. Add ground spices in the middle. Delicate herbs should be stirred in at the very end to preserve their fresh flavor.",
  },
];

export default function GuidePage() {
  return (
    <div className="bg-[var(--cream)] min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-[var(--bark)] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000')] bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-black mb-6">The Spice Guide</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
            Master the art of aromatics. Stop settling for dusty, flavorless jars and learn how to extract maximum flavor from your ingredients.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-16 text-[var(--bark)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <Image 
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800" 
              alt="Grinding Spices" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-heading font-bold">The Golden Rules of Flavor</h2>
            <p className="text-lg text-[var(--gray-700)] leading-relaxed">
              Spices are the soul of an unforgettable meal. The difference between a good dish and a great one often comes down to how you handle your aromatics. Whether you are tempering mustard seeds in hot ghee or crushing cardamom pods for tea, treating your spices correctly will elevate everything you cook.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[var(--spice)]/10 text-[var(--spice)] rounded-xl flex items-center justify-center mb-6">
                <tip.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{tip.title}</h3>
              <p className="text-[var(--gray-700)] leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
