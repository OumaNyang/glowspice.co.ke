"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  children?: React.ReactNode;
}

export function HeroCarousel({ children }: HeroCarouselProps) {
  const allBanners = useAdminStore((s) => s.banners);
  const banners = allBanners.filter((b) => b.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isHovering]);

  if (!banners.length) return null;

  return (
    <div 
      className="relative w-full h-[85vh] sm:h-[90vh] overflow-hidden bg-[var(--bark)]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {banners.map((banner, i) => (
          <div
            key={banner.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <Image
              src={banner.image}
              alt={banner.title || "GlowSpice Banner"}
              fill
              className="object-cover"
              priority={i === 0}
            />
            {/* Darker Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bark)] via-[var(--bark)]/40 to-black/20 z-10" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {children}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={next}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              i === currentIndex ? "bg-[var(--spice)] w-10" : "bg-white/30 hover:bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
