import { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Leaf, Globe2, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | GlowSpice",
  description: "Learn about the GlowSpice journey, our sourcing philosophy, and our mission to bring premium spices to your kitchen in Kampala.",
  openGraph: {
    title: "About Us | GlowSpice",
    description: "Learn about the GlowSpice journey, our sourcing philosophy, and our mission to bring premium spices to your kitchen.",
    url: "https://glowspice.shop/about",
    siteName: "GlowSpice",
    type: "website",
  },
  alternates: {
    canonical: "https://glowspice.shop/about",
  },
};

const values = [
  {
    icon: Globe2,
    title: "Global Sourcing, Local Impact",
    description: "We work directly with farmers in over 15 countries to source the finest single-origin spices, ensuring they are paid fairly while you get the highest quality ingredients."
  },
  {
    icon: Leaf,
    title: "100% Pure & Natural",
    description: "No fillers, no anti-caking agents, and absolutely no artificial colors. Just pure, unadulterated flavor exactly as nature intended."
  },
  {
    icon: ShieldCheck,
    title: "Rigorous Quality Testing",
    description: "Every batch of our spices goes through strict quality control and lab testing for purity, volatile oil content, and freshness before it ever reaches your kitchen."
  },
  {
    icon: HeartHandshake,
    title: "Community First",
    description: "A portion of every purchase goes back into community development programs in our partner farming regions, funding education and clean water initiatives."
  }
];

export default function AboutPage() {
  return (
    <div className="bg-[var(--cream)] min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000" 
          alt="Colorful spices in bowls" 
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-10">
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 drop-shadow-xl">
            Flavor Without Compromise
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed drop-shadow-md">
            We are on a mission to completely revolutionize the way you cook by providing the freshest, most vibrant spices on the planet.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <span className="text-[var(--spice)] font-bold uppercase tracking-widest text-sm">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--bark)] leading-tight">
              Tired of dusty, tasteless supermarket spices.
            </h2>
            <div className="space-y-4 text-lg text-[var(--gray-700)] leading-relaxed">
              <p>
                GlowSpice was born out of pure frustration. After realizing that the average grocery store spice sits in a warehouse for anywhere from one to three years before being sold, we knew there had to be a better way. 
              </p>
              <p>
                Spices are agricultural products; they lose their volatile essential oils over time. Yet, the industry treats them like they last forever. We decided to build a supply chain that treats spices with the urgency of fresh produce.
              </p>
              <p className="font-medium text-[var(--bark)]">
                By partnering directly with farmers and grinding our spices in small batches just weeks before they reach your door, we've restored the true magic of these ancient ingredients.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl order-1 lg:order-2 group">
            <Image 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000" 
              alt="Cooking with spices" 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white mt-32 py-24 border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-heading font-bold text-[var(--bark)] mb-4">The GlowSpice Standard</h2>
            <p className="text-lg text-[var(--gray-700)]">
              We hold ourselves to the highest possible standards because we believe that what you put into your body, and how it gets there, matters immensely.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-[var(--cream)] p-8 rounded-2xl shadow-sm border border-[var(--border)] hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-[var(--border)] flex items-center justify-center text-[var(--spice)] mb-6">
                  <value.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-[var(--bark)] mb-3">{value.title}</h3>
                <p className="text-[var(--gray-700)] leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
