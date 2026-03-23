"use client";

import React, { useState, useMemo, Fragment, useRef, useEffect } from "react";
import { Search, ChevronDown, ChevronRight, Tag, ChevronLeft, Edit, Trash2, Eye, Calendar, Hash, Layers, Globe, Palette, ShoppingBag, MoreHorizontal, MoreVertical, ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Category } from "@/lib/types";
import { deleteCategory } from "@/app/actions/category";
import { toast } from "sonner";
import { Modal } from "@/components/ui/Modal";

export function CategoryTreeTable({ data }: { data: Category[] }) {
const router = useRouter();
const [searchQuery, setSearchQuery] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [expandedParents, setExpandedParents] = useState<Set<string>>(new Set());
const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set());
const [isDeleting, setIsDeleting] = useState<string | null>(null);
const [viewingCategory, setViewingCategory] = useState<Category | null>(null);
const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
const [expandedMobileSubs, setExpandedMobileSubs] = useState<Set<string>>(new Set());
const [sortConfig, setSortConfig] = useState<{ key: keyof Category; direction: "asc" | "desc" } | null>(null);

const dropdownRef = useRef<HTMLDivElement>(null);

useEffect(() => {
const handleClickOutside = (event: MouseEvent) => {
if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
setOpenDropdownId(null);
}
};
document.addEventListener("click", handleClickOutside);
return () => document.removeEventListener("click", handleClickOutside);
}, []);

const itemsPerPage = 8;

const handleSort = (key: keyof Category) => {
setSortConfig((prev) => {
if (prev && prev.key === key) {
if (prev.direction === "asc") return { key, direction: "desc" };
return null;
}
return { key, direction: "asc" };
});
setCurrentPage(1);
};

const { filteredMainCats, subCatsByParent } = useMemo(() => {
let mainCats = data.filter(c => !c.parentId);
const subCats = data.filter(c => c.parentId);

const groupedSubs = new Map<string, Category[]>();
subCats.forEach(sub => {
const pId = sub.parentId!;
if (!groupedSubs.has(pId)) groupedSubs.set(pId, []);
groupedSubs.get(pId)!.push(sub);
});

if (searchQuery) {
const q = searchQuery.toLowerCase();
mainCats = mainCats.filter(mc => {
const matchesSelf = mc.name.toLowerCase().includes(q) || mc.slug.toLowerCase().includes(q) || mc.id.toLowerCase().includes(q);
const children = groupedSubs.get(mc.id) || [];
const matchesChild = children.some(sc => sc.name.toLowerCase().includes(q) || sc.slug.toLowerCase().includes(q) || sc.id.toLowerCase().includes(q));
return matchesSelf || matchesChild;
});
}

if (sortConfig) {
const { key, direction } = sortConfig;
mainCats.sort((a, b) => {
const valA = a[key] ?? "";
const valB = b[key] ?? "";
if (valA < valB) return direction === "asc" ? -1 : 1;
if (valA > valB) return direction === "asc" ? 1 : -1;
return 0;
});
} else {
mainCats.sort((a, b) => a.name.localeCompare(b.name));
}

subCats.forEach(sub => {
const list = groupedSubs.get(sub.parentId!) || [];
list.sort((a,b) => a.name.localeCompare(b.name));
});

return { filteredMainCats: mainCats, subCatsByParent: groupedSubs };
}, [data, searchQuery, sortConfig]);

const totalPages = Math.ceil(filteredMainCats.length / itemsPerPage) || 1;
const paginatedMainCats = useMemo(() => {
const start = (currentPage - 1) * itemsPerPage;
return filteredMainCats.slice(start, start + itemsPerPage);
}, [filteredMainCats, currentPage]);

const toggleParentExpansion = (id: string) => {
setExpandedParents(prev => {
const next = new Set(prev);
if (next.has(id)) next.delete(id);
else next.add(id);
return next;
});
};

const toggleSubExpansion = (id: string) => {
setExpandedSubs(prev => {
const next = new Set(prev);
if (next.has(id)) next.delete(id);
else next.add(id);
return next;
});
};

const toggleCardExpansion = (id: string) => {
setExpandedCards(prev => {
const next = new Set(prev);
if (next.has(id)) next.delete(id);
else next.add(id);
return next;
});
};

const toggleMobileSubExpansion = (id: string) => {
setExpandedMobileSubs(prev => {
const next = new Set(prev);
if (next.has(id)) next.delete(id);
else next.add(id);
return next;
});
};

const handleDelete = async (id: string) => {
if (!confirm("Are you sure you want to delete this category?")) return;

setIsDeleting(id);
try {
const res = await deleteCategory(id);
if (res.error) {
toast.error(res.error);
} else {
toast.success("Category deleted successfully");
router.refresh();
}
} catch (err) {
toast.error("An unexpected error occurred");
} finally {
setIsDeleting(null);
setOpenDropdownId(null);
}
};

const renderActions = (category: Category) => {
const isOpen = openDropdownId === category.id;
return (
<div className="relative flex justify-end overflow-visible">
<button 
onClick={(e) => {
e.stopPropagation();
e.nativeEvent.stopImmediatePropagation();
setOpenDropdownId(isOpen ? null : category.id);
}}
className="p-1.5 rounded-md hover:bg-[var(--gray-100)] text-[var(--gray-500)] hover:text-[var(--bark)] transition-all"
>
<MoreVertical size={16} />
</button>

{isOpen && (
<div 
ref={dropdownRef}
className="absolute right-0 top-full mt-1 w-44 bg-white rounded-md border border-[var(--border)] shadow-xl z-[999] overflow-hidden animate-in fade-in zoom-in-95"
>
<button 
  onClick={() => {
    setViewingCategory(category);
    setOpenDropdownId(null);
  }}
  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-[var(--gray-600)] hover:bg-[var(--gray-50)] hover:text-[var(--spice)] transition-colors border-b border-[var(--border)]/50 text-left"
>
  <Eye size={14} /> View Details
</button>
<Link 
  href={`/admin/categories/${category.id}/edit`}
  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-[var(--gray-600)] hover:bg-[var(--gray-50)] hover:text-blue-600 transition-colors border-b border-[var(--border)]/50"
>
  <Edit size={14} /> Edit Category
</Link>
<button 
  onClick={() => handleDelete(category.id)}
  disabled={isDeleting === category.id}
  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 text-left"
>
  <Trash2 size={14} /> {isDeleting === category.id ? "Deleting..." : "Delete Category"}
</button>
</div>
)}
</div>
);
};

const renderSortIcon = (key: keyof Category) => {
if (sortConfig?.key !== key) return <div className="flex flex-col opacity-20 group-hover:opacity-50"><ChevronUp size={10} /><ChevronDown size={10} className="-mt-1"/></div>;
return (
<div className="flex flex-col text-[var(--spice)]">
{sortConfig.direction === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
</div>
);
};

return (
<div className="flex flex-col gap-4">
<div className="bg-white rounded-md border border-[var(--border)] shadow-sm overflow-visible flex flex-col">
{/* Search Header */}
<div className="p-4 border-b border-[var(--border)] flex items-center justify-between gap-4 bg-[var(--gray-50)]">
<div className="relative w-full max-w-sm">
<Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-500)]" />
<input
  type="text"
  placeholder="Search categories..."
  value={searchQuery}
  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
  className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] transition-colors bg-white shadow-sm font-medium"
/>
</div>
<div className="text-xs font-black uppercase tracking-[0.2em] text-[var(--gray-500)] shrink-0 hidden sm:block">
{filteredMainCats.length} Categories Found
</div>
</div>

{/* Desktop Table View */}
<div className="overflow-x-auto overflow-y-visible hidden md:block">
<table className="w-full text-left border-collapse table-fixed">
<thead className="bg-[var(--gray-50)] border-b border-[var(--border)]">
  <tr>
    <th className="w-14 px-4 py-3.5">#</th>
    <th 
      className="w-[110px] px-4 py-3.5 text-[10px] font-black text-[var(--gray-500)] uppercase tracking-wider cursor-pointer group hover:bg-[var(--cream)] transition-colors"
      onClick={() => handleSort("id")}
    >
      <div className="flex items-center gap-1.5">ID {renderSortIcon("id")}</div>
    </th>
    <th className="w-[80px] px-4 py-3.5 text-[10px] font-black text-[var(--gray-500)] uppercase tracking-wider text-center">Asset</th>
    <th 
      className="px-4 py-3.5 text-[10px] font-black text-[var(--gray-500)] uppercase tracking-wider cursor-pointer group hover:bg-[var(--cream)] transition-colors"
      onClick={() => handleSort("name")}
    >
        <div className="flex items-center gap-1.5">Category {renderSortIcon("name")}</div>
    </th>
    <th className="hidden lg:table-cell px-4 py-3.5 text-[10px] font-black text-[var(--gray-500)] uppercase tracking-wider">Description</th>
    <th 
      className="w-[110px] px-4 py-3.5 text-[10px] font-black text-[var(--gray-500)] uppercase tracking-wider cursor-pointer group hover:bg-[var(--cream)] transition-colors text-center"
      onClick={() => handleSort("isPublished")}
    >
        <div className="flex items-center justify-center gap-1.5">Status {renderSortIcon("isPublished")}</div>
    </th>
    <th 
      className="w-[100px] px-4 py-3.5 text-[10px] font-black text-[var(--gray-500)] uppercase tracking-wider cursor-pointer group hover:bg-[var(--cream)] transition-colors text-right"
      onClick={() => handleSort("productCount")}
    >
        <div className="flex items-center justify-end gap-1.5">Goods {renderSortIcon("productCount")}</div>
    </th>
    <th className="w-[80px] px-4 py-3.5 text-[10px] font-black text-[var(--gray-500)] uppercase tracking-wider text-right pr-6"></th>
  </tr>
</thead>
<tbody className="divide-y divide-[var(--border)] overflow-visible">
  {paginatedMainCats.length === 0 ? (
    <tr>
      <td colSpan={8} className="px-4 py-16 text-center text-sm text-[var(--gray-400)] font-bold uppercase tracking-widest italic">
        Category list is currently empty.
      </td>
    </tr>
  ) : (
    paginatedMainCats.map(mainCat => {
      const children = subCatsByParent.get(mainCat.id) || [];
      const hasChildren = children.length > 0;
      const isParentExpanded = expandedParents.has(mainCat.id);

      return (
        <Fragment key={mainCat.id}>
          {/* Main Category Row */}
          <tr className="hover:bg-orange-50/50 transition-colors group relative overflow-visible bg-white">
            <td className="px-4 py-5 text-center">
              {hasChildren && (
                <button 
                  onClick={() => toggleParentExpansion(mainCat.id)}
                  className="p-1 rounded-md hover:bg-white text-[var(--gray-400)] hover:text-[var(--spice)] transition-all border border-transparent hover:border-[var(--border)] shadow-sm"
                >
                  {isParentExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
              )}
            </td>
            <td className="px-4 py-5">
              <span className="text-[11px] font-mono font-black text-[var(--gray-400)] tracking-tighter uppercase">#{mainCat.id.slice(-6)}</span>
            </td>
            <td className="px-4 py-5">
              <div className="w-12 h-12 mx-auto rounded-md border border-[var(--border)] overflow-hidden bg-[var(--gray-50)] relative shadow-inner transition-colors group-hover:border-[var(--spice)]/30">
                {mainCat.image ? (
                  <Image src={mainCat.image} alt={mainCat.name} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--gray-200)]"><Tag size={20} /></div>
                )}
              </div>
            </td>
            <td className="px-4 py-5">
              <div className="flex items-center gap-4">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md flex-shrink-0" style={{ backgroundColor: mainCat.color || "#e2e8f0" }} />
                <div className="min-w-0">
                    <p className="font-extrabold text-[16px] text-[var(--bark)] truncate tracking-tight">{mainCat.name}</p>
                    <p className="text-[12px] text-[var(--spice)] font-black tracking-[0.2em] mt-1 opacity-70">[/{mainCat.slug.toLowerCase()}]</p>
                </div>
              </div>
            </td>
            <td className="hidden lg:table-cell px-4 py-5">
              <div 
                className="text-sm text-[var(--gray-500)] line-clamp-2 max-w-sm font-medium leading-normal prose-compact"
                dangerouslySetInnerHTML={{ __html: mainCat.description || '<span class="italic opacity-30 text-[10px] font-black tracking-widest uppercase">No Description</span>' }}
              />
            </td>
            <td className="px-4 py-5 text-center">
                <span className={`inline-flex px-2.5 py-1 rounded font-black text-[10px] uppercase tracking-widest border ${mainCat.isPublished ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                {mainCat.isPublished ? 'Active' : 'Draft'}
                </span>
            </td>
            <td className="px-4 py-5 text-right">
              <span className="text-base font-black text-[var(--bark)]">{mainCat.productCount || 0}</span>
            </td>
            <td className="px-4 py-5 pr-6">
                {renderActions(mainCat)}
            </td>
          </tr>

          {/* Sub Category Rows */}
          {isParentExpanded && children.map(child => {
            const isChildExpanded = expandedSubs.has(child.id);
            return (
              <Fragment key={child.id}>
                <tr className="bg-[var(--gray-50)]/30 hover:bg-blue-50/50 transition-colors border-t border-[var(--border)]/30">
                  <td className="px-4 py-4 relative">
                      <button 
                        onClick={() => toggleSubExpansion(child.id)}
                        className="p-1 rounded bg-white border border-[var(--border)] shadow-sm text-[var(--gray-400)] hover:text-blue-600 transition-all ml-1 relative z-10"
                      >
                        {isChildExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </button>
                      <div className="absolute top-0 bottom-1/2 left-4 w-px bg-[var(--border)]" />
                      <div className="absolute top-1/2 right-4 left-4 h-px bg-[var(--border)]" />
                  </td>
                  <td className="px-4 py-4 pl-10">
                      <span className="text-[10px] font-mono font-bold text-[var(--gray-400)] tracking-tighter">#{child.id.slice(-6).toUpperCase()}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-10 h-10 mx-auto rounded-md border border-[var(--border)]/50 overflow-hidden bg-white relative">
                      {child.image ? (
                        <Image src={child.image} alt={child.name} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[var(--gray-200)]"><Tag size={16} /></div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                        <Layers size={14} className="text-blue-400 opacity-60" />
                        <div className="min-w-0">
                          <p className="font-bold text-[14px] text-[var(--gray-700)] truncate tracking-tight">{child.name}</p>
                          <p className="text-[9px] text-[var(--gray-400)] font-black tracking-[0.15em] uppercase mt-0.5">/{child.slug.toLowerCase()}</p>
                        </div>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-4 py-4">
                      <div 
                        className="text-sm text-[var(--gray-400)] truncate pr-4 italic font-medium" 
                        dangerouslySetInnerHTML={{ __html: child.description || "Description pending." }} 
                      />
                  </td>
                  <td className="px-4 py-4 text-center">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${child.isPublished ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-100 text-gray-400 border-gray-100'}`}>
                        {child.isPublished ? 'Live' : 'Draft'}
                      </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                      <span className="text-sm font-bold text-[var(--gray-600)]">{child.productCount || 0}</span>
                  </td>
                  <td className="px-4 py-4 pr-6">
                      {renderActions(child)}
                  </td>
                </tr>
                
                {/* In-place Expansion Block for Sub-category */}
                {isChildExpanded && (
                  <tr className="bg-white/90">
                    <td colSpan={8} className="px-16 py-8 border-b border-[var(--border)]/20 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-8">
                          <div className="md:col-span-1">
                              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-3">Sub-category Image</p>
                              <div className="aspect-square w-full rounded-md border-2 border-[var(--border)] overflow-hidden bg-[var(--gray-50)] relative shadow-sm">
                                {child.image ? (
                                  <Image src={child.image} alt={child.name} fill className="object-cover" />
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center text-[var(--gray-200)]"><Tag size={32} /></div>
                                )}
                              </div>
                          </div>
                          <div className="md:col-span-3 space-y-5">
                              <div>
                                <p className="text-[10px] font-black text-[var(--gray-400)] uppercase tracking-widest mb-2">Category Description</p>
                                <div className="text-sm text-[var(--bark)] leading-relaxed font-semibold wysiwyg-description border-l-4 border-blue-500/20 pl-5 bg-blue-50/30 p-4 rounded-r-xl" dangerouslySetInnerHTML={{ __html: child.description || "Category information is pending." }} />
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-2">
                                <div className="p-3 rounded-md border border-[var(--border)] bg-white shadow-sm">
                                    <p className="text-[9px] font-black text-[var(--gray-500)] uppercase mb-1">Status</p>
                                    <p className="font-extrabold text-[12px] text-[var(--bark)] tracking-tight">{child.isPublished ? "Active Category" : "Draft"}</p>
                                </div>
                                <div className="p-3 rounded-md border border-[var(--border)] bg-white shadow-sm">
                                    <p className="text-[9px] font-black text-[var(--gray-500)] uppercase mb-1">Products Count</p>
                                    <p className="font-extrabold text-[12px] text-[var(--bark)] tracking-tight">{child.productCount || 0} SKUs Bound</p>
                                </div>
                                <div className="p-3 rounded-md border border-[var(--border)] bg-white shadow-sm">
                                    <p className="text-[9px] font-black text-[var(--gray-500)] uppercase mb-1">URL Slug</p>
                                    <p className="font-mono font-black text-[10px] text-blue-600 uppercase tracking-widest">/{child.slug.toLowerCase()}</p>
                                </div>
                              </div>
                          </div>
                        </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </Fragment>
      );
    })
  )}
</tbody>
</table>
</div>

{/* Mobile View: High-Performance Card Layout */}
<div className="block md:hidden border-t border-[var(--border)] divide-y divide-[var(--border)] bg-white">
{paginatedMainCats.length === 0 ? (
<div className="p-16 text-center text-[10px] font-black text-[var(--gray-400)] uppercase tracking-[0.3em] italic">
Category list is currently empty.
</div>
) : (
paginatedMainCats.map(mainCat => {
const children = subCatsByParent.get(mainCat.id) || [];
const isCardExpanded = expandedCards.has(mainCat.id);

return (
<div key={mainCat.id} className="p-5 bg-white hover:bg-orange-50/30 transition-colors">
<div className="flex items-center gap-5 mb-5">
  <div className="w-16 h-16 rounded-md border-2 border-[var(--border)] overflow-hidden flex-shrink-0 relative shadow-sm">
    {mainCat.image ? (
      <Image src={mainCat.image} alt={mainCat.name} fill className="object-cover" />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center text-[var(--gray-200)]"><Tag size={24} /></div>
    )}
  </div>
  <div className="flex-1 min-w-0">
    <div className="flex items-center justify-between gap-2 mb-1.5">
      <span className="text-[11px] font-mono font-black text-[var(--gray-400)] tracking-tighter">#{mainCat.id.slice(-6)}</span>
      {renderActions(mainCat)}
    </div>
    <h3 className="font-black text-[var(--bark)] text-lg leading-tight tracking-tight">{mainCat.name}</h3>
    <p className="text-[10px] text-[var(--spice)] font-black uppercase tracking-[0.2em] mt-1 opacity-80">/{mainCat.slug.toLowerCase()}</p>
  </div>
</div>

{isCardExpanded && (
  <div className="mt-5 pt-5 border-t border-[var(--border)] space-y-6 animate-in fade-in slide-in-from-top-4 duration-400">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-[var(--gray-50)] rounded-md border border-[var(--border)]">
            <p className="text-[9px] font-black text-[var(--gray-400)] uppercase tracking-widest mb-1.5">Status</p>
            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter border ${mainCat.isPublished ? 'bg-green-100/50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
              {mainCat.isPublished ? 'Online' : 'Hidden'}
            </span>
        </div>
        <div className="p-3 bg-[var(--gray-50)] rounded-md border border-[var(--border)]">
            <p className="text-[9px] font-black text-[var(--gray-400)] uppercase tracking-widest mb-1.5">Goods</p>
            <p className="font-extrabold text-base text-[var(--bark)]">{mainCat.productCount || 0} SKUs</p>
        </div>
      </div>
      
      <div className="p-5 bg-orange-50/50 rounded-md border-2 border-orange-100/50">
        <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2">Detailed Strategic Mission</p>
        <div className="text-[14px] text-[var(--bark)] font-semibold leading-relaxed prose-compact italic" dangerouslySetInnerHTML={{ __html: mainCat.description || 'Mission data pending.' }} />
      </div>
      
      {/* Mobile Sub-categories List with expansion */}
      {children.length > 0 && (
        <div className="space-y-4 pt-2">
          <p className="text-[10px] font-black text-[var(--gray-500)] uppercase tracking-[0.3em] flex items-center gap-2 mb-2"><Layers size={14} className="text-blue-500"/> Sub-categories ({children.length})</p>
          <div className="space-y-3">
              {children.map(child => {
                const isSubExpanded = expandedMobileSubs.has(child.id);
                return (
                  <div key={child.id} className={`rounded-md border-2 transition-all overflow-hidden ${isSubExpanded ? 'border-blue-400 bg-blue-50/30 ring-4 ring-blue-100' : 'border-[var(--border)] bg-white'}`}>
                    <div 
                      className="flex items-center gap-4 p-3 cursor-pointer"
                      onClick={() => toggleMobileSubExpansion(child.id)}
                    >
                        <div className="w-12 h-12 rounded-md overflow-hidden relative border border-[var(--border)] shadow-sm">
                          {child.image ? <Image src={child.image} alt={child.name} fill className="object-cover" /> : <Tag size={18} className="m-auto text-gray-200"/>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-black text-[var(--bark)] truncate tracking-tight">{child.name}</p>
                          <p className="text-[9px] text-[var(--gray-400)] font-black uppercase mt-0.5 tracking-widest opacity-70">/{child.slug.toLowerCase()}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[var(--gray-50)] flex items-center justify-center text-[var(--gray-400)]">
                          {isSubExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                        </div>
                    </div>
                    
                    {isSubExpanded && (
                      <div className="p-4 border-t border-blue-100 bg-white animate-in slide-in-from-top-2">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.2em] border ${child.isPublished ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                    {child.isPublished ? 'Live Status' : 'Draft Category'}
                                </span>
                                <div className="flex items-center gap-2">
                                  <Link href={`/admin/categories/${child.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"><Edit size={16}/></Link>
                                  <button onClick={() => setViewingCategory(child)} className="p-2 text-[var(--gray-500)]"><Eye size={16}/></button>
                                </div>
                            </div>
                              <div className="p-4 bg-blue-50/50 rounded-md border border-blue-100 font-semibold text-[14px] text-[var(--bark)] italic leading-normal" dangerouslySetInnerHTML={{ __html: child.description || "Description pending." }} />
                              <div className="flex items-center justify-between text-[11px] font-black text-[var(--gray-500)] px-1">
                                <p className="uppercase tracking-widest">Inventory Depth</p>
                                <p className="text-[var(--bark)] uppercase">#{child.productCount || 0} SKUs</p>
                              </div>
                          </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
  </div>
)}

  <button 
  onClick={() => toggleCardExpansion(mainCat.id)}
  className="mt-6 w-full flex items-center justify-center gap-3 py-3.5 text-[10px] font-black uppercase tracking-[0.25em] text-[var(--spice)] bg-[var(--cream)] hover:bg-[var(--cream-dark)] rounded-md border-2 border-[var(--border)] transition-all shadow-sm active:scale-95"
>
  {isCardExpanded ? <>Close Category Report <ChevronUp size={16}/></> : <>View Category Details <ChevronDown size={16}/></>}
</button>
</div>
);
})
)}
</div>

{/* Pagination Footer */}
<div className="px-4 py-3 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--gray-50)] rounded-b-xl">
<div className="text-xs text-[var(--gray-500)] font-medium">
  Showing <span className="font-bold text-[var(--bark)]">{paginatedMainCats.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-bold text-[var(--bark)]">{Math.min(currentPage * itemsPerPage, filteredMainCats.length)}</span> of <span className="font-bold text-[var(--bark)]">{filteredMainCats.length}</span>
</div>
<div className="flex items-center gap-2">
  <button
    onClick={() => {
      setCurrentPage((p) => Math.max(1, p - 1));
      setExpandedParents(new Set());
      setExpandedCards(new Set());
    }}
    disabled={currentPage === 1}
    className="w-9 h-9 flex items-center justify-center rounded-md border border-[var(--border)] bg-white text-[var(--gray-500)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--cream-dark)] transition-all shadow-sm active:scale-95"
  >
    <ChevronLeft size={18} />
  </button>
  
  <div className="px-3 py-1.5 bg-white border border-[var(--border)] rounded-md shadow-inner">
    <span className="text-xs font-black text-[var(--bark)] tracking-tight">
      PAGE <span className="text-[var(--spice)]">{currentPage}</span> <span className="opacity-30">/</span> {totalPages}
    </span>
  </div>

  <button
    onClick={() => {
      setCurrentPage((p) => Math.min(totalPages, p + 1));
      setExpandedParents(new Set());
      setExpandedCards(new Set());
    }}
    disabled={currentPage === totalPages}
    className="w-9 h-9 flex items-center justify-center rounded-md border border-[var(--border)] bg-white text-[var(--gray-500)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--cream-dark)] transition-all shadow-sm active:scale-95"
  >
    <ChevronRight size={18} />
  </button>
</div>
</div>
</div>

{/* Primary Category Intelligence Portal (Mainly for detailed audits) */}
<Modal 
isOpen={!!viewingCategory} 
onClose={() => setViewingCategory(null)}
title="Category Information"
footer={viewingCategory && (
<div className="flex flex-col sm:flex-row items-center justify-end gap-3">
<button 
  onClick={() => setViewingCategory(null)}
  className="w-full sm:w-auto px-6 py-2.5 rounded-md text-[11px] font-black uppercase tracking-[0.2em] text-[var(--gray-500)] hover:text-[var(--bark)] hover:bg-[var(--gray-100)] transition-all active:scale-95"
>
  Close Portal
</button>
<Link 
  href={`/admin/categories/${viewingCategory.id}/edit`}
  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-2.5 bg-[var(--spice)] text-white rounded-md font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--spice-dark)] transition-all shadow-md hover:-translate-y-0.5 active:scale-95 relative overflow-hidden"
>
  <Edit size={14} />
  Edit Category
  <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
</Link>
</div>
)}
>
{viewingCategory && (
<div className="flex flex-col">
<div className="space-y-6">
  {/* Header: Title and Status */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h3 className="text-2xl font-black text-[var(--bark)] tracking-tight uppercase">{viewingCategory.name}</h3>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-[11px] font-black text-[var(--spice)] uppercase tracking-widest">[/{viewingCategory.slug.toLowerCase()}]</p>
        <span className="w-1 h-1 rounded-full bg-[var(--gray-300)]" />
        <span className="text-[10px] font-mono text-[var(--gray-400)] font-bold uppercase">ID: {viewingCategory.id.slice(-8).toUpperCase()}</span>
      </div>
    </div>
    <div className={`px-4 py-1.5 rounded-md border ${viewingCategory.isPublished ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'} flex items-center gap-2 shrink-0 self-start sm:self-center`}>
      <Globe size={14} />
      <span className="text-[10px] font-black uppercase tracking-widest">{viewingCategory.isPublished ? 'Live' : 'Hidden'}</span>
    </div>
  </div>

  {/* Full Width Image */}
  <div className="relative aspect-[21/9] w-full rounded-md overflow-hidden bg-[var(--gray-100)] border border-[var(--border)] shadow-sm group">
    {viewingCategory.image ? (
      <Image src={viewingCategory.image} alt={viewingCategory.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
    ) : (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--gray-200)] gap-2">
        <Tag size={40} className="opacity-20" />
        <p className="text-[9px] font-black uppercase tracking-widest opacity-40">No Image Available</p>
      </div>
    )}
    <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/95 rounded border border-[var(--border)] shadow-sm backdrop-blur-sm flex items-center gap-2">
      <div className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: viewingCategory.color || "#e2e8f0" }} />
      <span className="text-[10px] font-mono font-bold uppercase text-[var(--bark)]">{viewingCategory.color || "#N/A"}</span>
    </div>
  </div>

  {/* Full Width Description */}
  <div className="p-5 bg-[var(--gray-50)] rounded-md border border-[var(--border)] relative">
    <p className="absolute top-0 left-6 -translate-y-1/2 px-3 py-0.5 bg-white border border-[var(--border)] rounded text-[9px] font-black text-[var(--spice)] uppercase tracking-widest shadow-sm">
      Description
    </p>
    <div 
      className="text-sm text-[var(--bark)] leading-relaxed font-semibold italic prose-compact max-w-none"
      dangerouslySetInnerHTML={{ __html: viewingCategory.description || "No description provided for this category." }}
    />
  </div>

  {/* 2-Column Stats Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="p-4 bg-white border border-[var(--border)] rounded-md shadow-sm transition-all hover:border-[var(--spice)]/30 group">
      <div className="flex items-center gap-3 mb-2">
        <Layers size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
        <p className="text-[10px] font-black text-[var(--gray-400)] uppercase tracking-widest">Category level</p>
      </div>
      <p className="text-sm font-black text-[var(--bark)] uppercase tracking-tight">{viewingCategory.parentId ? 'Sub-category' : 'Main Category'}</p>
    </div>

    <div className="p-4 bg-white border border-[var(--border)] rounded-md shadow-sm transition-all hover:border-[var(--spice)]/30 group">
      <div className="flex items-center gap-3 mb-2">
        <ShoppingBag size={20} className="text-[var(--spice)] group-hover:scale-110 transition-transform" />
        <p className="text-[10px] font-black text-[var(--gray-400)] uppercase tracking-widest">Inventory</p>
      </div>
      <p className="text-sm font-black text-[var(--bark)]">{viewingCategory.productCount || 0} SKUs Linked</p>
    </div>

    <div className="p-4 bg-white border border-[var(--border)] rounded-md shadow-sm transition-all hover:border-[var(--spice)]/30 group">
      <div className="flex items-center gap-3 mb-2">
        <Calendar size={20} className="text-[var(--bark)] opacity-60 group-hover:scale-110 transition-transform" />
        <p className="text-[10px] font-black text-[var(--gray-400)] uppercase tracking-widest">Last Updated</p>
      </div>
      <p className="text-sm font-black text-[var(--bark)] uppercase">
        {viewingCategory.updatedAt 
          ? new Date(viewingCategory.updatedAt).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })
          : "System Initialized"}
      </p>
    </div>

    <div className="p-4 bg-white border border-[var(--border)] rounded-md shadow-sm transition-all hover:border-[var(--spice)]/30 group">
      <div className="flex items-center gap-3 mb-2">
        <Hash size={20} className="text-[var(--gray-400)] group-hover:rotate-12 transition-transform" />
        <p className="text-[10px] font-black text-[var(--gray-400)] uppercase tracking-widest">Reference Key</p>
      </div>
      <p className="text-sm font-mono font-black text-[var(--bark)] uppercase tracking-tighter">#{viewingCategory.id.slice(-12).toUpperCase()}</p>
    </div>
  </div>

  {/* Tags Section */}
  <div className="space-y-3 px-1">
    <p className="text-[10px] font-black text-[var(--gray-500)] uppercase tracking-[0.3em] flex items-center gap-2">
      <Palette size={16} className="text-[var(--spice)]"/> Category Tags
    </p>
    <div className="flex flex-wrap gap-2">
      {viewingCategory.tags?.map(tag => (
        <span key={tag} className="px-3 py-1.5 bg-white border border-[var(--border)] rounded text-[10px] font-black text-[var(--bark)] uppercase tracking-tight shadow-sm hover:border-[var(--spice)] transition-colors cursor-default">
          <span className="text-[var(--spice)] mr-1">#</span>{tag}
        </span>
      ))}
      {(!viewingCategory.tags || viewingCategory.tags.length === 0) && (
        <div className="w-full py-4 bg-[var(--gray-50)]/50 rounded-md border border-dashed border-[var(--border)] text-center text-[10px] font-black uppercase text-[var(--gray-400)] tracking-widest">
          No tags assigned
        </div>
      )}
    </div>
  </div>
</div>
</div>
)}
</Modal>
</div>
);
}
