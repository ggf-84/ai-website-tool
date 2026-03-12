import { ReactNode } from "react";
import { Search } from "lucide-react";

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  hideSearch?: boolean;
  children?: ReactNode;
}

export function FilterBar({ searchPlaceholder = "Search…", searchValue = "", onSearchChange, hideSearch, children }: FilterBarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      {!hideSearch && (
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full rounded-md border border-border bg-card pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
          />
        </div>
      )}
      {children}
    </div>
  );
}

interface FilterSelectProps {
  label?: string;
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
}

export function FilterSelect({ label, options, value = "", onChange }: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
    >
      {label && <option value="">{label}</option>}
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}
