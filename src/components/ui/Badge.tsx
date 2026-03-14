import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "spice" | "herb" | "success" | "warning" | "error" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-[var(--gray-100)] text-[var(--gray-700)]",
  spice: "bg-[var(--spice)] text-white",
  herb: "bg-[var(--herb)] text-white",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  error: "bg-red-100 text-red-800",
  outline: "border border-[var(--border)] text-[var(--bark-light)]",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
