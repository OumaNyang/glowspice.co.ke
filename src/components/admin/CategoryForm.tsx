"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImagePlus, X, Trash2, Save, ArrowLeft, Tag, Plus } from "lucide-react";
import { Category } from "@/lib/types";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { categories } from "@/lib/data";

const DEFAULT_CATEGORY: Partial<Category> = {
  name: "",
  slug: "",
  description: "",
  image: "",
  color: "#8B4513",
  parentId: "",
  level: "main",
  tags: [],
  isPublished: true,
};

interface CategoryFormProps {
  initialData?: Category;
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const draftKey = initialData?.id ? `draft_category_${initialData.id}` : "draft_category_new";
  
  const [formData, setFormData] = useState<Partial<Category>>(initialData || DEFAULT_CATEGORY);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        try {
          setFormData(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse draft", e);
        }
      }
      setIsHydrated(true);
    }
  }, [draftKey]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(draftKey, JSON.stringify(formData));
    }
  }, [formData, draftKey, isHydrated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updates = { ...prev, [name]: value };
      if (name === "name" && !initialData) {
        updates.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      }
      if (name === "parentId") {
        updates.level = value ? "sub" : "main";
      }
      return updates;
    });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Tag Handling
  const [tagInput, setTagInput] = useState("");
  const addTag = () => {
    if (tagInput.trim() && !(formData.tags || []).includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), tagInput.trim()] }));
      setTagInput("");
    }
  };
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags?.filter(t => t !== tagToRemove) }));
  };

  // Media Handling (Mocking uploads with local URL blob previews)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const localUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: localUrl }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: "" }));
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 sm:p-5 space-y-4 lg:space-y-5 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="w-8 h-8 bg-white border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--gray-500)] hover:text-[var(--bark)] hover:bg-[var(--gray-50)] transition-colors shadow-sm">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="font-display font-bold text-2xl text-[var(--bark)] mb-0.5">
              {initialData ? "Edit Category" : "Create Category"}
            </h1>
            <p className="text-xs text-[var(--gray-500)] font-medium">Auto-saved to your local draft.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { localStorage.removeItem(draftKey); router.back(); }} className="px-4 py-2 rounded-md text-sm font-semibold text-[var(--bark)] bg-white border border-[var(--border)] hover:bg-[var(--gray-50)] shadow-sm">
            Discard
          </button>
          <button onClick={() => { localStorage.removeItem(draftKey); alert("Category data saved successfully!"); router.back(); }} className="flex items-center gap-2 px-5 py-2 bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white font-bold rounded-md shadow-sm transition-all hover:-translate-y-0.5 transform text-sm">
            <Save size={16} /> Save Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-start">
        {/* Left Column (Core Details & Media) */}
        <div className="xl:col-span-2 space-y-4 lg:space-y-5">
          {/* General Information Card */}
          <section className="bg-white rounded-md border border-[var(--border)] shadow-sm p-4 sm:p-5">
            <h2 className="text-base font-bold text-[var(--bark)] mb-4">General Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--bark)] mb-1">Category Name <span className="text-red-500">*</span></label>
                  <input name="name" value={formData.name || ""} onChange={handleChange} type="text" placeholder="e.g. Rare Blends" className="w-full px-3 py-2 text-sm bg-white border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] font-bold text-[var(--bark)]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--bark)] mb-1">URL Slug</label>
                  <input name="slug" value={formData.slug || ""} onChange={handleChange} type="text" placeholder="rare-blends" className="w-full px-3 py-2 text-sm bg-[var(--gray-50)] border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] font-mono text-[var(--gray-600)]" />
                  <p className="text-[10px] text-[var(--gray-400)] mt-1">Leave blank to auto-generate based on name.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--bark)] mb-1">Hierarchy Lineage (Optional)</label>
                <select name="parentId" value={formData.parentId || ""} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-white border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] lg:w-1/2">
                  <option value="">-- None (Creates a Root/Main Category) --</option>
                  {categories.filter(c => c.level === "main").map(cat => (
                    <option key={cat.id} value={cat.id}>Attach to: {cat.name} (Root)</option>
                  ))}
                </select>
                <p className="text-[10px] text-amber-600 font-medium mt-1">If attached to a root category, this becomes a Sub Category.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--bark)] mb-1">Description</label>
                <RichTextEditor value={formData.description || ""} onChange={val => setFormData(p => ({...p, description: val}))} placeholder="Describe the aromatic profile or dietary uses of this entire classification..." />
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-semibold text-[var(--bark)] mb-1 flex items-center gap-1.5"><Tag size={12}/> Semantic Meta Tags</label>
                <div className="flex items-center gap-2 mb-2">
                  <input 
                    value={tagInput} 
                    onChange={e => setTagInput(e.target.value)} 
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    type="text" 
                    placeholder="Type a tag & press enter" 
                    className="w-full sm:w-1/2 px-3 py-2 bg-white border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] text-sm" 
                  />
                  <button type="button" onClick={addTag} className="px-3 py-2 bg-[var(--cream-dark)] hover:bg-[var(--bark)] hover:text-white border border-[var(--border)] font-semibold text-[var(--bark)] rounded-md text-sm transition-colors cursor-pointer">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[24px]">
                  {formData.tags?.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[var(--spice)]/10 text-[var(--spice-dark)] font-bold text-xs rounded-full border border-[var(--spice)]/20">
                      {tag} 
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 rounded-full bg-white ml-1 p-0.5"><X size={10}/></button>
                    </span>
                  ))}
                  {(!formData.tags || formData.tags.length === 0) && <p className="text-[10px] text-[var(--gray-400)] italic mt-1">No tags associated. Used for storefront filtering.</p>}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (Sidebar Settings & Media) */}
        <div className="space-y-4 lg:space-y-5 sticky top-20">
          
          {/* Status & Visibility */}
          <section className="bg-white rounded-md border border-[var(--border)] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[var(--border)] bg-gradient-to-r from-[var(--spice)]/5 to-[var(--cream)]">
              <h2 className="text-xs font-bold text-[var(--bark)] uppercase tracking-wider">Visibility & Status</h2>
            </div>
            
            <div className="p-3">
              <label className="flex items-center justify-between p-2 hover:bg-[var(--gray-50)] rounded-md cursor-pointer transition-colors group">
                <div>
                  <p className="font-bold text-[var(--bark)] text-xs">Published Online</p>
                  <p className="text-[10px] font-medium text-[var(--gray-400)] mt-0.5">Allow users to browse this category.</p>
                </div>
                <div className="relative inline-block w-9 ml-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="isPublished" checked={!!formData.isPublished} onChange={handleCheckbox} className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-[3px] border-[var(--gray-200)] appearance-none cursor-pointer outline-none checked:right-0 checked:border-[var(--spice)] z-10 transition-all checked:bg-[var(--spice)] mt-0.5" />
                  <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[var(--gray-200)] cursor-pointer"></label>
                </div>
              </label>
            </div>
          </section>

          {/* Primary Media Card */}
          <section className="bg-white rounded-md border border-[var(--border)] shadow-sm p-4">
            <h2 className="text-xs font-bold text-[var(--bark)] uppercase tracking-wider mb-3">Feature Card Image</h2>
            <div className="space-y-2">
              {formData.image ? (
                <div className="relative aspect-video w-full rounded-md overflow-hidden border-2 border-[var(--spice)] group bg-[var(--gray-50)]">
                  <Image src={formData.image} alt="Feature" fill className="object-cover" />
                  <button type="button" onClick={removeImage} className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                    <Trash2 size={14} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] font-bold text-center py-1 uppercase tracking-widest backdrop-blur-sm">Thumbnail Banner</div>
                </div>
              ) : (
                <label className="relative aspect-video w-full rounded-md border-2 border-dashed border-[var(--border)] hover:border-[var(--spice)] flex flex-col items-center justify-center gap-2 bg-[var(--gray-50)] hover:bg-[var(--spice)]/5 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[var(--gray-400)] group-hover:text-[var(--spice)] group-hover:scale-110 transition-all">
                    <ImagePlus size={18} />
                  </div>
                  <div className="text-center px-4">
                    <p className="text-xs font-bold text-[var(--bark)] flex items-center justify-center gap-1"><Plus size={12}/> Click to Upload</p>
                    <p className="text-[10px] text-[var(--gray-400)] mt-0.5">1200x600 px or Video Component</p>
                  </div>
                  <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                </label>
              )}
            </div>
          </section>

          {/* Identity Decorator */}
          <section className="bg-white rounded-md border border-[var(--border)] shadow-sm p-4">
            <h2 className="text-xs font-bold text-[var(--bark)] uppercase tracking-wider mb-2">Interface Color</h2>
            <p className="text-[10px] text-[var(--gray-500)] mb-3 leading-tight">Pick a hex color to be utilized as this category's primary highlight tint on the frontend cards.</p>
            <div className="flex items-center gap-3">
              <input type="color" name="color" value={formData.color || "#8B4513"} onChange={handleChange} className="w-8 h-8 rounded shrink-0 cursor-pointer border-0 p-0" />
              <input type="text" name="color" value={formData.color || "#8B4513"} onChange={handleChange} className="flex-1 px-3 py-1.5 text-xs font-mono uppercase bg-white border border-[var(--border)] rounded focus:outline-none focus:border-[var(--spice)]" />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
