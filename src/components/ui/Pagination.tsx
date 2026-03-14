"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Logic for 1 ... 4 5 6 ... 10
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis-1");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("ellipsis-2");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className={cn("flex items-center justify-center gap-2 mt-12", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-[var(--border)] text-[var(--bark-light)] hover:bg-[var(--cream-dark)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (typeof page === "string") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-[var(--gray-400)]">
                <MoreHorizontal size={16} />
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "min-w-[40px] h-10 rounded-md text-sm font-medium transition-all duration-200",
                currentPage === page
                  ? "bg-[var(--spice)] text-white shadow-md shadow-[var(--spice)]/20"
                  : "text-[var(--bark-light)] hover:bg-[var(--cream-dark)] hover:text-[var(--spice)]"
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border border-[var(--border)] text-[var(--bark-light)] hover:bg-[var(--cream-dark)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
