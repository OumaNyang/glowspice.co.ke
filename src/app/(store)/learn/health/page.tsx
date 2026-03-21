import { Metadata } from "next";
import Image from "next/image";
import { HeartPulse, Sparkles, Brain, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Health Benefits | GlowSpice",
  description: "Explore the ancient natural health benefits of premium spices and herbs.",
  openGraph: {
    title: "Health Benefits | GlowSpice",
    description: "Explore the ancient natural health benefits of premium spices and herbs.",
    url: "https://glowspice.shop/learn/health",
    siteName: "GlowSpice",
    type: "website",
  },
  alternates: {
    canonical: "https://glowspice.shop/learn/health",
  },
};

const benefits = [
  {
    name: "Turmeric",
    icon: HeartPulse,
    color: "bg-yellow-500",
    description: "Contains Curcumin, a powerful natural anti-inflammatory compound. Paired with black pepper, its absorption increases by 2000%.",
  },
  {
    name: "Ginger",
    icon: Sparkles,
    color: "bg-orange-400",
    description: "Revered for centuries as a digestive aid. Gingerol, its main bioactive compound, helps reduce nausea, bloating, and indigestion.",
  },
  {
    name: "Cinnamon",
    icon: Brain,
    color: "bg-amber-700",
    description: "Loaded with highly potent polyphenol antioxidants. Cinnamon has been shown to significantly lower blood sugar levels and improve insulin sensitivity.",
  },
  {
    name: "Cayenne Pepper",
    icon: Flame,
    color: "bg-red-600",
    description: "Packed with Capsaicin, which can boost your metabolism by increasing the amount of heat your body produces, aiding in calorie burn.",
  },
];

export default function HealthPage() {
  return (
    <div className="bg-[var(--cream)] min-h-screen pb-20">
      <div className="bg-[var(--bark)] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000')] bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-black mb-6">Healing with Spices</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
            Spices are nature's medicine cabinet. Discover the ancient, scientifically-backed health benefits hiding in your pantry.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-16 text-[var(--bark)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((spice, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 flex gap-6 items-start shadow-sm border border-[var(--border)] hover:border-[var(--spice)]/30 transition-colors">
              <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white ${spice.color} shadow-lg`}>
                <spice.icon size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{spice.name}</h3>
                <p className="text-[var(--gray-700)] leading-relaxed">{spice.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[var(--bark)] text-[var(--cream)] p-10 rounded-3xl text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-[var(--spice)]">Medical Disclaimer</h2>
          <p className="opacity-80 leading-relaxed font-light">
            The information provided on this page is for educational purposes only and is not intended as a substitute for advice from your physician or other health care professional. You should not use the information on this site for diagnosis or treatment of any health problem.
          </p>
        </div>
      </div>
    </div>
  );
}
