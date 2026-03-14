"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface ProductVariationModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductVariationModal({ product, isOpen, onClose }: ProductVariationModalProps) {
  const addItem = useCartStore((s) => s.addItem);
  
  // Track quantities for each variation ID
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  if (!isOpen || !product.variations || product.variations.length === 0) return null;

  const handleUpdateQty = (variationId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[variationId] || 0;
      const newQty = Math.max(0, current + delta);
      
      const newQuantities = { ...prev };
      if (newQty === 0) {
        delete newQuantities[variationId];
      } else {
        newQuantities[variationId] = newQty;
      }
      return newQuantities;
    });
  };

  const handleAddToCart = () => {
    Object.entries(quantities).forEach(([variationId, quantity]) => {
      const variation = product.variations!.find((v) => v.id === variationId);
      if (variation) {
        addItem(product, quantity, variation);
      }
    });
    
    // Reset and close
    setQuantities({});
    onClose();
  };

  const totalSelected = Object.values(quantities).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <div>
            <h2 className="font-display font-bold text-xl text-[var(--bark)]">{product.name}</h2>
            <p className="text-sm text-[var(--gray-500)] mt-0.5">Select variations to add to cart</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[var(--gray-400)] hover:text-[var(--bark)] hover:bg-[var(--gray-100)] rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="flex gap-4 mb-6">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-[var(--border)] bg-[var(--cream-dark)]">
              <Image
                src={product.images[0]?.url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <p className="text-sm text-[var(--bark-light)] line-clamp-3">
              {product.shortDescription}
            </p>
          </div>

          <div className="space-y-3">
            {product.variations.map((variation) => {
              const qty = quantities[variation.id] || 0;
              const inStock = variation.stock > 0;
              
              return (
                <div 
                  key={variation.id} 
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${qty > 0 ? 'border-[var(--spice)] bg-[var(--spice)]/5' : 'border-[var(--border)] bg-white'}`}
                >
                  <div>
                    <p className="font-semibold text-[var(--bark)]">{variation.name}</p>
                    <p className="text-sm font-medium text-[var(--spice)]">
                      {formatPrice(variation.price)}
                    </p>
                    {!inStock && <p className="text-xs text-red-500 mt-0.5">Out of stock</p>}
                  </div>
                  
                  {inStock && (
                    <div className="flex items-center bg-[var(--cream)] rounded-md border border-[var(--border)]">
                      <button
                        onClick={() => handleUpdateQty(variation.id, -1)}
                        disabled={qty === 0}
                        className="w-10 h-10 flex items-center justify-center text-[var(--bark)] hover:text-[var(--spice)] hover:bg-[var(--cream-dark)] disabled:opacity-50 disabled:hover:bg-transparent rounded-l-md transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-[var(--bark)]">
                        {qty}
                      </span>
                      <button
                        onClick={() => handleUpdateQty(variation.id, 1)}
                        disabled={qty >= variation.stock}
                        className="w-10 h-10 flex items-center justify-center text-[var(--bark)] hover:text-[var(--spice)] hover:bg-[var(--cream-dark)] disabled:opacity-50 disabled:hover:bg-transparent rounded-r-md transition-colors"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[var(--border)] bg-[var(--gray-50)] flex items-center justify-between">
          <p className="text-sm font-medium text-[var(--gray-600)]">
            {totalSelected} {totalSelected === 1 ? 'item' : 'items'} selected
          </p>
          <Button 
            onClick={handleAddToCart}
            disabled={totalSelected === 0}
            className="flex items-center gap-2"
          >
            <Check size={16} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
