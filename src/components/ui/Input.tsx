import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  icon,
  rightIcon,
  className,
  id,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-[var(--bark)] mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)]">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={cn(
            "w-full bg-white border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--bark)] placeholder:text-[var(--gray-400)] transition-all duration-200",
            "focus:outline-none focus:border-[var(--spice)] focus:ring-2 focus:ring-[var(--spice)]/20",
            "hover:border-[var(--gray-300)]",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
            icon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)]">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-[var(--bark)] mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "w-full bg-white border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--bark)] placeholder:text-[var(--gray-400)] transition-all duration-200 resize-none",
          "focus:outline-none focus:border-[var(--spice)] focus:ring-2 focus:ring-[var(--spice)]/20",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-[var(--bark)] mb-1.5">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "w-full bg-white border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--bark)] transition-all duration-200 appearance-none cursor-pointer",
          "focus:outline-none focus:border-[var(--spice)] focus:ring-2 focus:ring-[var(--spice)]/20",
          error && "border-red-400",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
