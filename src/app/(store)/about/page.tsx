import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | GlowSpice",
  description: "Learn about the GlowSpice journey, our sourcing philosophy, and our mission to bring premium spices to your kitchen.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-[var(--cream)] rounded-2xl shadow-sm border border-[var(--border)] p-12 md:p-20 text-center relative overflow-hidden grain">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--spice)]/5 to-[var(--cream)] z-0" />
        <div className="relative z-10">
          <h1 className="text-5xl font-heading font-black text-[var(--bark)] mb-6 text-gradient">Our Story</h1>
          <p className="text-xl text-[var(--gray-700)] max-w-2xl mx-auto leading-relaxed">
            We travel the world to source the absolute finest spices and herbs, partnering directly with farmers to ensure you get the freshest, most vibrant flavors possible. 
            <br /><br />
            <span className="font-semibold text-[var(--spice)]">Full 'About Us' experience coming soon!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
