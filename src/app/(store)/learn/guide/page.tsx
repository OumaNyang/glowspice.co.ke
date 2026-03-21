import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Spice Guide | GlowSpice",
  description: "Learn how to store, grind, and cook with premium spices.",
};

export default function GuidePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-[var(--cream)] rounded-2xl shadow-sm border border-[var(--border)] p-12 md:p-20 text-center relative overflow-hidden grain">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--spice)]/5 to-[var(--cream)] z-0" />
        <div className="relative z-10">
          <h1 className="text-5xl font-heading font-black text-[var(--bark)] mb-6 text-gradient">The Spice Guide</h1>
          <p className="text-xl text-[var(--gray-700)] max-w-2xl mx-auto leading-relaxed">
            Your masterclass in flavor. We're building a comprehensive encyclopedia on every spice we carry.
            <br /><br />
            <span className="font-semibold text-[var(--spice)]">Learning hub coming soon!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
