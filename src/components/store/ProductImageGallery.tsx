"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductImageGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--cream-dark)] border border-[var(--border)] shadow-md">
        <Image
          src={images[selected]?.url ?? images[0]?.url}
          alt={images[selected]?.alt ?? productName}
          fill
          className="object-cover transition-all duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={cn(
                "relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 shrink-0",
                i === selected
                  ? "border-[var(--spice)] shadow-md"
                  : "border-transparent hover:border-[var(--gray-300)]"
              )}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
