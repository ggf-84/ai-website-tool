import { cn } from "@/lib/utils";

type Status =
  | "Published" | "Draft" | "Scheduled" | "Archived"
  | "Pending" | "Approved" | "Rejected" | "Flagged" | "Hidden"
  | "Active" | "Complete" | "N/A" | "Missing Keywords" | "Needs Review"
  | "Missing Meta" | "Ready for Review" | "AI-generated" | "Manual" | "Imported"
  | "User Submitted";

const statusMap: Record<string, string> = {
  Published: "badge-published",
  Draft: "badge-draft",
  Scheduled: "badge-scheduled",
  Archived: "badge-archived",
  Pending: "badge-pending",
  Approved: "badge-approved",
  Rejected: "badge-rejected",
  Flagged: "badge-flagged",
  Hidden: "badge-archived",
  Active: "badge-active",
  Complete: "badge-approved",
  "N/A": "badge-archived",
  "Missing Keywords": "badge-pending",
  "Needs Review": "badge-pending",
  "Missing Meta": "badge-pending",
  "Ready for Review": "badge-scheduled",
  "AI-generated": "badge-ai",
  Manual: "badge-draft",
  Imported: "badge-draft",
  "User Submitted": "badge-draft",
};

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const cls = statusMap[status] ?? "badge-draft";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        cls,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      {status}
    </span>
  );
}
