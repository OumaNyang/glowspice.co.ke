"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ImagePlus, X, Plus, Trash2, Save, 
  ArrowLeft, Eye, Star, Tag, Layers 
} from "lucide-react";
import { Product, Category } from "@/lib/types";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { categories } from "@/lib/data";

// Defining a default empty product shell for creation
const DEFAULT_PRODUCT: Partial<Product> = {
  name: "",
  description: "",
  mainCategoryId: "root_1",
  subCategoryId: "cat_1",
  origin: "Nairobi, Kenya",
  unit: "g",
  price: 0,
  stock: 0,
  sku: "",
  barcode: "",
  isFeatured: false,
  isBestSeller: false,
  isNew: true,
  isPublished: true,
  images: [],
  tags: [],
  variations: [],
  rating: 0, // Mock for preview
  reviewCount: 0, // Mock for preview
};

interface ProductFormProps {
  initialData?: Product;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const draftKey = initialData?.id ? `draft_product_${initialData.id}` : "draft_product_new";
  
  const [formData, setFormData] = useState<Partial<Product>>(initialData || DEFAULT_PRODUCT);
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

  // Handlers for basic string/number fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
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

  // Variations Handling
  const addVariation = () => {
    const newVar = { id: Date.now().toString(), name: "Size", value: "e.g., 50g", price: 0, stock: 10, sku: `${formData.sku || 'SKU'}-VAR1` };
    setFormData(prev => ({ ...prev, variations: [...(prev.variations || []), newVar] }));
  };
  
  const updateVariation = (id: string, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      variations: prev.variations?.map(v => v.id === id ? { ...v, [field]: value } : v),
    }));
  };
  const removeVariation = (id: string) => {
    setFormData(prev => ({ ...prev, variations: prev.variations?.filter(v => v.id !== id) }));
  };

  // Media Handling (Mocking uploads with local URL blob previews)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const localUrl = URL.createObjectURL(file);
      const newImg = { id: Date.now().toString(), url: localUrl, alt: file.name };
      
      setFormData(prev => {
        const currentImgs = prev.images || [];
        if (currentImgs.length >= 4) return prev; // Max 4 images
        return { ...prev, images: [...currentImgs, newImg] };
      });
    }
  };

  const removeImage = (id: string) => {
    setFormData(prev => ({ ...prev, images: prev.images?.filter(img => img.id !== id) }));
  };

  const currentImgs = formData.images || [];
  const primaryImg = currentImgs[0];
  const secondaryImgs = currentImgs.slice(1);

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-5 space-y-4 lg:space-y-5 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="w-8 h-8 bg-white border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--gray-500)] hover:text-[var(--bark)] hover:bg-[var(--gray-50)] transition-colors shadow-sm">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="font-display font-bold text-2xl text-[var(--bark)]">
              {initialData ? "Edit Product" : "Create Product"}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { localStorage.removeItem(draftKey); router.back(); }} className="px-4 py-2 rounded-md text-sm font-semibold text-[var(--bark)] bg-white border border-[var(--border)] hover:bg-[var(--gray-50)] shadow-sm">
            Discard
          </button>
          <button onClick={() => { localStorage.removeItem(draftKey); alert("Product data saved successfully!"); router.back(); }} className="flex items-center gap-2 px-5 py-2 bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white font-bold rounded-md shadow-sm transition-all hover:-translate-y-0.5 transform text-sm">
            <Save size={16} /> Save Product
          </button>
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-start">
        
        {/* Left Column (Core Details & Media & Vars) */}
        <div className="xl:col-span-2 space-y-4 lg:space-y-5">
          
          {/* General Information Card */}
          <section className="bg-white rounded-md border border-[var(--border)] shadow-sm p-4 sm:p-5">
            <h2 className="text-base font-bold text-[var(--bark)] mb-4 flex items-center gap-2">
              General Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--bark)] mb-1">Product Name <span className="text-red-500">*</span></label>
                <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="e.g. Authentic Garam Masala" className="w-full px-3 py-2 text-sm bg-[var(--gray-50)] border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] focus:bg-white transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--bark)] mb-1">Description</label>
                <RichTextEditor value={formData.description || ""} onChange={val => setFormData(p => ({...p, description: val}))} placeholder="Write a compelling description outlining origin, aroma, and best culinary uses..." />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--bark)] mb-1">Main Category</label>
                  <select name="mainCategoryId" value={formData.mainCategoryId || ""} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-[var(--gray-50)] border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] focus:bg-white">
                    <option value="" disabled>Select Root...</option>
                    {categories.filter(c => c.level === "main").map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--bark)] mb-1">Sub Category</label>
                  <select name="subCategoryId" value={formData.subCategoryId || ""} onChange={handleChange} disabled={!formData.mainCategoryId} className="w-full px-3 py-2 text-sm bg-[var(--gray-50)] border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] focus:bg-white disabled:opacity-50">
                    <option value="" disabled>Select Sub...</option>
                    {categories.filter(c => c.parentId === formData.mainCategoryId).map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--bark)] mb-1">Origin</label>
                  <input name="origin" value={formData.origin} onChange={handleChange} type="text" placeholder="e.g. Zanzibar" className="w-full px-3 py-2 text-sm bg-[var(--gray-50)] border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--bark)] mb-1">Unit</label>
                  <input name="unit" value={formData.unit} onChange={handleChange} type="text" placeholder="e.g. g, ml, packets" className="w-full px-3 py-2 text-sm bg-[var(--gray-50)] border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] focus:bg-white" />
                </div>
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-semibold text-[var(--bark)] mb-1 flex items-center gap-1.5"><Tag size={12}/> Semantic Tags</label>
                <div className="flex items-center gap-2 mb-2">
                  <input 
                    value={tagInput} 
                    onChange={e => setTagInput(e.target.value)} 
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    type="text" 
                    placeholder="Type a tag & press enter" 
                    className="flex-1 px-3 py-2 bg-[var(--gray-50)] border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] text-sm" 
                  />
                  <button type="button" onClick={addTag} className="px-3 py-2 bg-[var(--cream-dark)] hover:bg-[var(--bark)] hover:text-white border border-[var(--border)] font-semibold text-[var(--bark)] rounded-md text-sm transition-colors cursor-pointer">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.tags?.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[var(--spice)]/10 text-[var(--spice-dark)] font-bold text-xs rounded-full border border-[var(--spice)]/20">
                      {tag} 
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 rounded-full bg-white ml-1 p-0.5"><X size={10}/></button>
                    </span>
                  ))}
                  {!formData.tags?.length && <p className="text-[10px] text-[var(--gray-400)] italic">No tags associated.</p>}
                </div>
              </div>
            </div>
          </section>

          {/* Media Manager */}
          <section className="bg-white rounded-md border border-[var(--border)] shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[var(--bark)] flex items-center gap-2">
                Product Media
              </h2>
              <span className="text-xs font-semibold text-[var(--gray-500)]">{currentImgs.length}/4 Uploaded</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Image Zone */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-[var(--gray-600)]">Primary Image</p>
                {primaryImg ? (
                  <div className="relative aspect-square w-full rounded-md overflow-hidden border-2 border-[var(--spice)] group bg-[var(--gray-50)]">
                    <Image src={primaryImg.url} alt="Primary" fill className="object-cover" />
                    <button type="button" onClick={() => removeImage(primaryImg.id)} className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                      <Trash2 size={14} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] font-bold text-center py-1 uppercase tracking-widest backdrop-blur-sm">Thumbnail / Primary</div>
                  </div>
                ) : (
                  <label className="relative aspect-square w-full rounded-md border-2 border-dashed border-[var(--border)] hover:border-[var(--spice)] flex flex-col items-center justify-center gap-2 bg-[var(--gray-50)] hover:bg-[var(--spice)]/5 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[var(--gray-400)] group-hover:text-[var(--spice)] group-hover:scale-110 transition-all">
                      <ImagePlus size={18} />
                    </div>
                    <div className="text-center px-4">
                      <p className="text-xs font-bold text-[var(--bark)]">Click to Upload</p>
                      <p className="text-[10px] text-[var(--gray-400)] mt-0.5">1080x1080 JPEG/PNG</p>
                    </div>
                    <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                  </label>
                )}
              </div>

              {/* Secondary Images Zone */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-[var(--gray-600)]">Secondary Angles</p>
                <div className="grid grid-cols-2 gap-3">
                  {secondaryImgs.map(img => (
                    <div key={img.id} className="relative aspect-square rounded-md overflow-hidden border border-[var(--border)] group bg-[var(--gray-50)]">
                      <Image src={img.url} alt="Secondary" fill className="object-cover" />
                      <button type="button" onClick={() => removeImage(img.id)} className="absolute top-1.5 right-1.5 w-6 h-6 bg-white rounded-full flex items-center justify-center text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                  
                  {currentImgs.length > 0 && currentImgs.length < 4 && (
                    <label className="aspect-square rounded-md border-2 border-dashed border-[var(--border)] hover:border-[var(--spice)] flex flex-col items-center justify-center gap-1.5 bg-[var(--gray-50)] hover:bg-[var(--spice)]/5 transition-colors cursor-pointer text-[var(--gray-400)] hover:text-[var(--spice)]">
                      <Plus size={18} />
                      <span className="text-[9px] uppercase font-bold tracking-wider">Add</span>
                      <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                    </label>
                  )}
                  {currentImgs.length === 0 && (
                     <div className="col-span-2 aspect-[2/1] rounded-md border-2 border-dashed border-[var(--border)] flex items-center justify-center bg-[var(--gray-50)] text-[var(--gray-400)] text-xs font-medium">
                       Upload primary image first.
                     </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Pricing, Inventory & Variations */}
          <section className="bg-white rounded-md border border-[var(--border)] shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-[var(--border)] flex items-center justify-between">
              <h2 className="text-base font-bold text-[var(--bark)] flex items-center gap-2">
                 <Layers size={16} /> Pricing, Logistics & Inventory
              </h2>
            </div>
            
            <div className="p-4 sm:p-5 border-b border-[var(--border)] bg-[var(--gray-50)]/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--bark)] mb-1">Base Price (KES) <span className="text-red-500">*</span></label>
                  <input name="price" value={formData.price} onChange={handleChange} type="number" min="0" placeholder="0.00" className="w-full px-3 py-2 bg-white border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] font-bold text-sm text-[var(--spice-dark)]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--bark)] mb-1">Base Stock <span className="text-red-500">*</span></label>
                  <input name="stock" value={formData.stock} onChange={handleChange} type="number" min="0" placeholder="0" className="w-full px-3 py-2 bg-white border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--bark)] mb-1">SKU <span className="text-red-500">*</span></label>
                  <input name="sku" value={formData.sku} onChange={handleChange} type="text" placeholder="e.g. SP-GARAM-01" className="w-full px-3 py-2 bg-white border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] text-sm font-medium uppercase" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--bark)] mb-1">Barcode / GTIN</label>
                  <input name="barcode" value={formData.barcode} onChange={handleChange} type="text" placeholder="e.g. 0123456789012" className="w-full px-3 py-2 bg-white border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] text-sm" />
                </div>
              </div>
            </div>

            {/* Dynamic Variations Builder */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-[var(--bark)]">Product Variations (Optional)</p>
                <button type="button" onClick={addVariation} className="text-xs font-bold text-[var(--spice)] hover:bg-[var(--cream-dark)] px-2.5 py-1 rounded-md border border-transparent hover:border-[var(--spice)] transition-all flex items-center gap-1">
                  <Plus size={12}/> Add Option
                </button>
              </div>

              {formData.variations?.length === 0 ? (
                <div className="p-4 rounded-md bg-[var(--gray-50)] border border-dashed border-[var(--border)] text-center text-xs font-medium text-[var(--gray-500)]">
                  Standard product without multiple options. <br/> Clicking "Add Option" will override Base Stock and assign variations.
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.variations?.map((v) => (
                    <div key={v.id} className="grid grid-cols-[1fr_1fr_1.5fr_1fr_1fr_auto] gap-2 items-end p-3 rounded-md bg-[var(--gray-50)] border border-[var(--border)] group animate-in slide-in-from-left-2 duration-300">
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider font-bold text-[var(--gray-500)] mb-1">Type</label>
                        <input value={v.name} onChange={(e) => updateVariation(v.id, "name", e.target.value)} type="text" placeholder="Size" className="w-full px-2 py-1.5 text-xs bg-white border border-[var(--border)] rounded focus:outline-none focus:border-[var(--spice)]" />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider font-bold text-[var(--gray-500)] mb-1">Value</label>
                        <input value={v.value} onChange={(e) => updateVariation(v.id, "value", e.target.value)} type="text" placeholder="500g" className="w-full px-2 py-1.5 text-xs bg-white border border-[var(--border)] rounded focus:outline-none focus:border-[var(--spice)] font-semibold text-[var(--bark)]" />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider font-bold text-[var(--gray-500)] mb-1">Variation SKU <span className="text-red-500">*</span></label>
                        <input value={v.sku} onChange={(e) => updateVariation(v.id, "sku", e.target.value)} type="text" placeholder="SKU-VAR" className="w-full px-2 py-1.5 text-xs bg-white border border-[var(--border)] rounded focus:outline-none focus:border-[var(--spice)] uppercase font-medium" />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider font-bold text-[var(--gray-500)] mb-1">Abs. Price</label>
                        <input value={v.price} onChange={(e) => updateVariation(v.id, "price", Number(e.target.value))} type="number" min="0" className="w-full px-2 py-1.5 text-xs bg-white border border-[var(--border)] rounded focus:outline-none focus:border-[var(--spice)] text-emerald-600 font-bold" />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider font-bold text-[var(--gray-500)] mb-1">Stock</label>
                        <input value={v.stock} onChange={(e) => updateVariation(v.id, "stock", Number(e.target.value))} type="number" min="0" className="w-full px-2 py-1.5 text-xs bg-white border border-[var(--border)] rounded focus:outline-none focus:border-[var(--spice)]" />
                      </div>
                      <button type="button" onClick={() => removeVariation(v.id)} className="w-7 h-7 flex items-center justify-center rounded bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors border border-red-100">
                        <Trash2 size={12}/>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column (Sidebar Settings & Preview) */}
        <div className="space-y-4 lg:space-y-5 sticky top-20">
          
          {/* Status & Visibility */}
          <section className="bg-white rounded-md border border-[var(--border)] shadow-sm space-y-1">
            <div className="p-4 border-b border-[var(--border)] bg-gradient-to-r from-[var(--spice)]/5 to-[var(--cream)] rounded-t-md">
              <h2 className="text-xs font-bold text-[var(--bark)] uppercase tracking-wider">Visibility & Status</h2>
            </div>
            
            <div className="p-2">
              <label className="flex items-center justify-between p-2.5 hover:bg-[var(--gray-50)] rounded-md cursor-pointer transition-colors group">
                <div>
                  <p className="font-bold text-[var(--bark)] text-xs">Published Online</p>
                  <p className="text-[10px] font-medium text-[var(--gray-400)] mt-0.5">Allow checkout globally.</p>
                </div>
                <div className="relative inline-block w-9 ml-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="isPublished" checked={!!formData.isPublished} onChange={handleCheckbox} className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-[3px] border-[var(--gray-200)] appearance-none cursor-pointer outline-none checked:right-0 checked:border-[var(--spice)] z-10 transition-all checked:bg-[var(--spice)] mt-0.5" />
                  <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[var(--gray-200)] cursor-pointer"></label>
                </div>
              </label>

              <hr className="border-[var(--border)] my-1 border-dashed mx-1" />

              <label className="flex items-center justify-between p-2.5 hover:bg-[var(--gray-50)] rounded-md cursor-pointer transition-colors group">
                <div>
                  <p className="font-bold text-[var(--bark)] text-xs">Featured Badge</p>
                  <p className="text-[10px] font-medium text-[var(--gray-400)] mt-0.5">Highlight on homepage.</p>
                </div>
                <div className="relative inline-block w-9 ml-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="isFeatured" checked={!!formData.isFeatured} onChange={handleCheckbox} className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-[3px] border-[var(--gray-200)] appearance-none cursor-pointer outline-none checked:right-0 checked:border-[var(--spice)] z-10 transition-all checked:bg-[var(--spice)] mt-0.5" />
                  <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[var(--gray-200)] cursor-pointer"></label>
                </div>
              </label>

              <label className="flex items-center justify-between p-2.5 hover:bg-[var(--gray-50)] rounded-md cursor-pointer transition-colors group">
                <div>
                  <p className="font-bold text-[var(--bark)] text-xs">Best Seller Badge</p>
                  <p className="text-[10px] font-medium text-[var(--gray-400)] mt-0.5">Display flame graphic.</p>
                </div>
                <div className="relative inline-block w-9 ml-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="isBestSeller" checked={!!formData.isBestSeller} onChange={handleCheckbox} className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-[3px] border-[var(--gray-200)] appearance-none cursor-pointer outline-none checked:right-0 checked:border-[var(--spice)] z-10 transition-all checked:bg-[var(--spice)] mt-0.5" />
                  <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[var(--gray-200)] cursor-pointer"></label>
                </div>
              </label>
            </div>
          </section>

          {/* Live Storefront Preview */}
          <section className="bg-white rounded-md border border-[var(--border)] shadow-xl overflow-hidden hidden sm:block pointer-events-none sticky top-20">
            <div className="p-3 border-b border-[var(--border)] bg-[#111827] flex items-center justify-between">
              <h2 className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                <Eye size={10}/> Live Display Preview
              </h2>
            </div>
            
            <div className="p-4 bg-[var(--gray-50)] flex justify-center">
              {/* Mini Replica of ProductCard.tsx */}
              <div className="w-[260px] bg-white rounded-md border border-[var(--border)] shadow-sm overflow-hidden flex flex-col scale-[0.95] origin-top">
                <div className="relative aspect-[4/5] bg-[var(--cream)] w-full">
                  {primaryImg ? (
                    <Image src={primaryImg.url} alt="Preview" fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--gray-400)]">
                      <ImagePlus size={28} className="opacity-20" />
                    </div>
                  )}
                  {/* Badges Overlay */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                    {formData.isBestSeller && (
                      <span className="bg-[var(--spice)] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        Best Seller
                      </span>
                    )}
                    {formData.isNew && (
                      <span className="bg-[var(--bark)] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        New
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 flex flex-col flex-grow">
                  <div className="mb-auto">
                    <p className="text-[9px] font-bold text-[var(--gray-400)] uppercase tracking-wider mb-0.5">
                      {formData.origin || "Origin Unknown"}
                    </p>
                    <h3 className="font-display font-bold text-base text-[var(--bark)] leading-tight line-clamp-2">
                      {formData.name || "Untitled Product"}
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={8} className="text-amber-400 fill-amber-400" />
                        ))}
                        <span className="text-[9px] font-bold text-[var(--gray-500)] ml-1">(0)</span>
                      </div>
                      <div className="font-bold text-[var(--spice)] text-lg flex items-baseline">
                        <span className="text-[10px] font-semibold mr-0.5">KES</span> 
                        {formData.price?.toLocaleString() || "0"}
                        <span className="text-[9px] text-[var(--gray-400)] font-medium ml-1">
                          /{formData.unit || "unit"}
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[var(--bark)] text-white flex items-center justify-center shadow-md">
                      <Plus size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-2 text-center text-[9px] font-bold text-[var(--gray-400)] uppercase tracking-widest border-t border-[var(--border)]">
              Storefront Replica Card
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
