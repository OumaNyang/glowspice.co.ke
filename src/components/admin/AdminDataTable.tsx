"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  sortable?: boolean;
  cell?: (item: T) => React.ReactNode;
}

interface AdminDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchAccessor?: keyof T;
  searchPlaceholder?: string;
  itemsPerPage?: number;
}

export function AdminDataTable<T>({
  data,
  columns,
  searchAccessor,
  searchPlaceholder = "Search...",
  itemsPerPage = 10,
}: AdminDataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  // 1. Search Filtering
  const filteredData = useMemo(() => {
    if (!searchQuery || !searchAccessor) return data;
    const query = searchQuery.toLowerCase();
    
    return data.filter((item) => {
      const val = item[searchAccessor];
      if (typeof val === "string") {
        return val.toLowerCase().includes(query);
      }
      return false;
    });
  }, [data, searchQuery, searchAccessor]);

  // 2. Sorting
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  // 3. Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (prev && prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        return null; // toggle off
      }
      return { key, direction: "asc" };
    });
    setCurrentPage(1); // reset to page 1 on sort
    setExpandedRows(new Set()); // reset expanded rows
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // reset to page 1 on search
    setExpandedRows(new Set()); // reset expanded rows
  };

  return (
    <div className="bg-white rounded-md border border-[var(--border)] shadow-sm overflow-hidden flex flex-col">
      {/* Table Toolbar (Search) */}
      {searchAccessor && (
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between gap-4 bg-[var(--gray-50)]">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)]" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-9 pr-4 py-2 text-sm border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] transition-colors bg-white"
            />
          </div>
          <div className="text-sm text-[var(--gray-500)] shrink-0">
            {sortedData.length} records
          </div>
        </div>
      )}

      {/* Desktop Table Container */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-sm text-left">
          <thead className="bg-[var(--gray-50)] border-b border-[var(--border)]">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col.header + i}
                  className={`px-5 py-3 text-xs font-semibold text-[var(--gray-500)] uppercase tracking-wider ${col.sortable ? "cursor-pointer hover:bg-[var(--cream-dark)] hover:text-[var(--bark)] transition-colors select-none" : ""}`}
                  onClick={() => col.sortable && col.accessorKey && handleSort(col.accessorKey)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && col.accessorKey && (
                      <div className="flex flex-col opacity-50">
                        <ChevronUp size={10} className={sortConfig?.key === col.accessorKey && sortConfig.direction === "asc" ? "text-[var(--spice)] opacity-100" : "-mb-1"} />
                        <ChevronDown size={10} className={sortConfig?.key === col.accessorKey && sortConfig.direction === "desc" ? "text-[var(--spice)] opacity-100" : ""} />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-8 text-center text-[var(--gray-500)]">
                  No records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-[var(--gray-50)] transition-colors group">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-5 py-4 whitespace-nowrap">
                      {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey]) : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="block md:hidden border-t border-[var(--border)] divide-y divide-[var(--border)]">
        {paginatedData.length === 0 ? (
          <div className="p-8 text-center text-[var(--gray-500)] text-sm">
            No records found.
          </div>
        ) : (
          paginatedData.map((item, rowIndex) => {
            const isExpanded = expandedRows.has(rowIndex);
            const visibleCols = columns.slice(0, 3);
            const hiddenCols = columns.slice(3);

            const toggleRow = () => {
              setExpandedRows(prev => {
                const next = new Set(prev);
                if (next.has(rowIndex)) next.delete(rowIndex);
                else next.add(rowIndex);
                return next;
              });
            };

            return (
              <div key={rowIndex} className="p-4 bg-white hover:bg-[var(--gray-50)] transition-colors">
                <div className="space-y-3">
                  {visibleCols.map(col => (
                    <div key={col.header} className="flex justify-between items-center gap-4">
                      <span className="text-xs text-[var(--gray-500)] font-semibold uppercase tracking-wider">{col.header}</span>
                      <div className="text-sm text-right">
                        {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey]) : null}
                      </div>
                    </div>
                  ))}
                </div>
                
                {hiddenCols.length > 0 && (
                  <>
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        {hiddenCols.map(col => (
                          <div key={col.header} className="flex justify-between items-center gap-4">
                            <span className="text-xs text-[var(--gray-500)] font-semibold uppercase tracking-wider">{col.header}</span>
                            <div className="text-sm text-right">
                              {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey]) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <button 
                      onClick={toggleRow}
                      className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-[var(--spice)] bg-[var(--cream)] hover:bg-[var(--cream-dark)] rounded-md border border-[var(--border)] transition-colors"
                    >
                      {isExpanded ? (
                        <>Show Less <ChevronUp size={14}/></>
                      ) : (
                        <>Show More <ChevronDown size={14}/></>
                      )}
                    </button>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Footer */}
      <div className="px-4 py-2 border-t border-[var(--border)] flex items-center justify-between bg-[var(--gray-50)]">
        <div className="text-xs text-[var(--gray-500)]">
          Showing <span className="font-semibold text-[var(--bark)]">{paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-semibold text-[var(--bark)]">{Math.min(currentPage * itemsPerPage, sortedData.length)}</span> of <span className="font-semibold text-[var(--bark)]">{sortedData.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1));
              setExpandedRows(new Set());
            }}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--border)] bg-white text-[var(--gray-500)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--cream-dark)] transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          
          <span className="text-xs font-medium text-[var(--bark)] px-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => {
              setCurrentPage((p) => Math.min(totalPages, p + 1));
              setExpandedRows(new Set());
            }}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--border)] bg-white text-[var(--gray-500)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--cream-dark)] transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
