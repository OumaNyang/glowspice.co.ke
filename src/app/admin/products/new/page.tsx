"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { categories } from "@/lib/data";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    compareAtPrice: "",
    unit: "",
    origin: "",
    stock: "",
    shortDescription: "",
    description: "",
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
  });

  const update = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/admin/products");
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 rounded-md hover:bg-[var(--gray-100)] transition-colors">
          <ArrowLeft size={20} className="text-[var(--bark-light)]" />
        </Link>
        <div>
          <h1 className="font-display font-bold text-3xl text-[var(--bark)]">Add New Product</h1>
          <p className="text-[var(--gray-500)] mt-0.5">Fill in the details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div className="bg-white rounded-md p-6 border border-[var(--border)]">
          <h2 className="font-semibold text-[var(--bark)] mb-4">Product Images</h2>
          <div className="border-2 border-dashed border-[var(--border)] rounded-md p-10 text-center cursor-pointer hover:border-[var(--spice)] transition-colors group">
            <Upload size={32} className="text-[var(--gray-300)] group-hover:text-[var(--spice)] mx-auto mb-3 transition-colors" />
            <p className="text-sm text-[var(--gray-400)]">Click to upload or drag & drop images</p>
            <p className="text-xs text-[var(--gray-300)] mt-1">PNG, JPG up to 10MB</p>
          </div>
        </div>

        {/* Basic details */}
        <div className="bg-white rounded-md p-6 border border-[var(--border)] space-y-4">
          <h2 className="font-semibold text-[var(--bark)] mb-2">Product Details</h2>
          <Input
            id="name"
            label="Product Name"
            placeholder="Premium Cinnamon Sticks"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
          <Textarea
            id="short"
            label="Short Description"
            placeholder="One-line product summary shown in product cards"
            rows={2}
            value={form.shortDescription}
            onChange={(e) => update("shortDescription", e.target.value)}
          />
          <Textarea
            id="description"
            label="Full Description"
            placeholder="Detailed product description..."
            rows={5}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>

        {/* Pricing & Inventory */}
        <div className="bg-white rounded-md p-6 border border-[var(--border)]">
          <h2 className="font-semibold text-[var(--bark)] mb-4">Pricing & Inventory</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              id="category"
              label="Category"
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              options={[
                { value: "", label: "Select category..." },
                ...categories.map((c) => ({ value: c.id, label: c.name })),
              ]}
            />
            <Input
              id="origin"
              label="Origin Country"
              placeholder="India, Sri Lanka..."
              value={form.origin}
              onChange={(e) => update("origin", e.target.value)}
            />
            <Input
              id="price"
              label="Price (KES)"
              type="number"
              placeholder="450"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              required
            />
            <Input
              id="compareAtPrice"
              label="Compare At Price (KES)"
              type="number"
              placeholder="600 (optional)"
              value={form.compareAtPrice}
              onChange={(e) => update("compareAtPrice", e.target.value)}
            />
            <Input
              id="unit"
              label="Unit / Pack Size"
              placeholder="100g, 250ml, 2 pods..."
              value={form.unit}
              onChange={(e) => update("unit", e.target.value)}
              required
            />
            <Input
              id="stock"
              label="Stock Quantity"
              type="number"
              placeholder="100"
              value={form.stock}
              onChange={(e) => update("stock", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Labels */}
        <div className="bg-white rounded-md p-6 border border-[var(--border)]">
          <h2 className="font-semibold text-[var(--bark)] mb-4">Labels</h2>
          <div className="flex flex-wrap gap-4">
            {(["isFeatured", "isBestSeller", "isNew"] as const).map((field) => (
              <label key={field} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[field]}
                  onChange={(e) => update(field, e.target.checked)}
                  className="w-4 h-4 accent-[var(--spice)]"
                />
                <span className="text-sm font-medium text-[var(--bark)] capitalize">
                  {field.replace("is", "")}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/products">
            <Button variant="outline" size="lg">Cancel</Button>
          </Link>
          <Button size="lg" type="submit" loading={loading} fullWidth>
            Create Product
          </Button>
        </div>
      </form>
    </div>
  );
}
