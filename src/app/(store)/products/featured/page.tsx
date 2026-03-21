import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Picks & Featured | GlowSpice",
  description: "Shop the absolute favorites hand-picked by the GlowSpice team.",
};

export default function FeaturedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-[var(--cream)] rounded-2xl shadow-sm border border-[var(--border)] p-12 md:p-20 text-center relative overflow-hidden grain">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--spice)]/5 to-[var(--cream)] z-0" />
        <div className="relative z-10">
          <h1 className="text-5xl font-heading font-black text-[var(--bark)] mb-6 text-gradient">Staff Picks</h1>
          <p className="text-xl text-[var(--gray-700)] max-w-2xl mx-auto leading-relaxed">
            Our absolute favorite ingredients that we use in our own kitchens every single day.
            <br /><br />
            <span className="font-semibold text-[var(--spice)]">Featured collection dropping soon!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
