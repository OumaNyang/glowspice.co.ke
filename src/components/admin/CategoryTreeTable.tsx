"use client";

import React, { useState, useMemo, Fragment } from "react";
import { Search, ChevronDown, ChevronRight, Tag, ChevronLeft, Edit, Eye } from "lucide-react";
import Link from "next/link";
import { Category } from "@/lib/types";

export function CategoryTreeTable({ data }: { data: Category[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedParents, setExpandedParents] = useState<Set<string>>(new Set());
  
  const itemsPerPage = 10;
  
  // Search & Tree Construction
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
        const matchesSelf = mc.name.toLowerCase().includes(q) || mc.slug.toLowerCase().includes(q);
        const children = groupedSubs.get(mc.id) || [];
        const matchesChild = children.some(sc => sc.name.toLowerCase().includes(q) || sc.slug.toLowerCase().includes(q));
        return matchesSelf || matchesChild;
      });
    }
    
    mainCats.sort((a,b) => a.name.localeCompare(b.name));
    subCats.forEach(sub => {
        const list = groupedSubs.get(sub.parentId!) || [];
        list.sort((a,b) => a.name.localeCompare(b.name));
    });
    
    return { filteredMainCats: mainCats, subCatsByParent: groupedSubs };
  }, [data, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredMainCats.length / itemsPerPage) || 1;
  const paginatedMainCats = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMainCats.slice(start, start + itemsPerPage);
  }, [filteredMainCats, currentPage]);

  const toggleRow = (id: string) => {
    setExpandedParents(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded border border-[var(--border)] shadow-sm overflow-hidden flex flex-col form-compact">
      <div className="p-3 border-b border-[var(--border)] flex items-center justify-between gap-3 bg-[var(--gray-50)]">
        <div className="relative w-full max-w-[300px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)]" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-9 pr-4 py-2 text-sm border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] transition-colors bg-white shadow-sm"
          />
        </div>
        <div className="text-xs font-bold uppercase tracking-wider text-[var(--gray-500)] shrink-0">
          {filteredMainCats.length} Root Categories
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[var(--gray-50)] border-b border-[var(--border)]">
            <tr>
              <th className="w-10 px-3 py-3"></th>
              <th className="px-4 py-3 text-xs font-bold text-[var(--gray-500)] uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-xs font-bold text-[var(--gray-500)] uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-xs font-bold text-[var(--gray-500)] uppercase tracking-wider text-right">Products</th>
              <th className="px-4 py-3 text-xs font-bold text-[var(--gray-500)] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {paginatedMainCats.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-xs text-[var(--gray-500)]">
                  No match found.
                </td>
              </tr>
            ) : (
              paginatedMainCats.map(mainCat => {
                const children = subCatsByParent.get(mainCat.id) || [];
                const hasChildren = children.length > 0;
                // Auto-expand if searching and there's a child match
                const isExpanded = expandedParents.has(mainCat.id) || !!searchQuery;

                return (
                  <Fragment key={mainCat.id}>
                    <tr className="hover:bg-[var(--gray-50)] transition-colors group">
                      <td className="px-3 py-3 text-center">
                        {hasChildren && (
                          <button 
                            onClick={() => toggleRow(mainCat.id)}
                            className="p-1.5 rounded-md hover:bg-[var(--border)] text-[var(--gray-500)] transition-colors"
                          >
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-md shrink-0 border border-[var(--border)] shadow-sm" style={{ backgroundColor: mainCat.color || "#ccc" }} />
                          <div>
                            <p className="font-bold text-sm text-[var(--bark)] truncate">{mainCat.name}</p>
                            <p className="text-[10px] text-[var(--gray-500)] truncate uppercase font-mono mt-0.5">{mainCat.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${mainCat.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {mainCat.isPublished ? "Online" : "Offline"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-sm text-[var(--gray-600)]">
                        {mainCat.productCount || 0}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2 shrink-0">
                          <Link href={`/admin/categories/${mainCat.id}/edit`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-[var(--spice)] bg-white border border-[var(--border)] hover:border-[var(--spice)] hover:bg-[var(--spice)]/5 rounded transition-colors shadow-sm">
                            <Edit size={12} /> Edit
                          </Link>
                          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-[var(--gray-600)] bg-white border border-[var(--border)] hover:bg-[var(--gray-50)] rounded transition-colors shadow-sm">
                            <Eye size={12} /> View
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* render children if expanded */}
                    {hasChildren && isExpanded && (
                      children.map(child => (
                        <tr key={child.id} className="bg-[var(--cream)]/30 border-t border-[var(--border)]/50">
                          <td className="px-3 py-2 relative">
                            {/* Visual tree branch connector */}
                            <div className="absolute top-0 bottom-1/2 left-1/2 w-px bg-[var(--border)]" />
                            <div className="absolute top-1/2 right-0 left-1/2 h-px bg-[var(--border)]" />
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2 pl-2">
                              <Tag size={14} className="text-[var(--gray-400)] shrink-0" />
                              <div>
                                <p className="font-semibold text-sm text-[var(--bark)]">{child.name}</p>
                                <p className="text-[10px] text-[var(--gray-500)] uppercase font-mono mt-0.5">{child.slug}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest ${child.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                              {child.isPublished ? "On" : "Off"}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-right font-medium text-sm text-[var(--gray-600)]">
                            {child.productCount || 0}
                          </td>
                          <td className="px-4 py-2 text-right">
                            <div className="flex items-center justify-end gap-2 shrink-0">
                              <Link href={`/admin/categories/${child.id}/edit`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-[var(--spice)] bg-white border border-[var(--border)] hover:border-[var(--spice)] hover:bg-[var(--spice)]/5 rounded transition-colors shadow-sm">
                                <Edit size={12} /> Edit
                              </Link>
                              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-[var(--gray-600)] bg-white border border-[var(--border)] hover:bg-[var(--gray-50)] rounded transition-colors shadow-sm">
                                <Eye size={12} /> View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t border-[var(--border)] flex items-center justify-between bg-[var(--gray-50)]">
        <div className="text-xs text-[var(--gray-500)] font-medium">
          Showing {paginatedMainCats.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredMainCats.length)} of {filteredMainCats.length} roots
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--border)] bg-white text-[var(--gray-500)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--cream-dark)]"
          >
            <ChevronLeft size={16} />
          </button>
          
          <span className="text-xs font-bold text-[var(--bark)] px-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--border)] bg-white text-[var(--gray-500)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--cream-dark)]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
