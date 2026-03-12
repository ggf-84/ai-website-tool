import { useState } from "react";
import { CheckCircle, XCircle, EyeOff } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { FilterBar, FilterSelect } from "@/components/admin/FilterBar";
import { comments } from "@/data/mockData";

export default function Comments() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const filtered = comments.filter((c) => {
    const matchSearch = `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) || c.text.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const columns = [
    { key: "name", label: "Commenter", render: (r: typeof comments[0]) => <span className="font-medium text-sm text-foreground">{r.firstName} {r.lastName}</span> },
    { key: "text", label: "Comment", render: (r: typeof comments[0]) => <p className="text-xs text-muted-foreground max-w-xs truncate">"{r.text}"</p> },
    { key: "article", label: "Article", render: (r: typeof comments[0]) => <span className="text-xs text-foreground max-w-xs truncate block">{r.article}</span> },
    { key: "site", label: "Site", render: (r: typeof comments[0]) => <span className="text-sm text-foreground">{r.site}</span> },
    { key: "source", label: "Source", render: (r: typeof comments[0]) => <StatusBadge status={r.source} /> },
    { key: "status", label: "Status", render: (r: typeof comments[0]) => <StatusBadge status={r.status} /> },
    { key: "createdAt", label: "Date", render: (r: typeof comments[0]) => <span className="text-xs text-muted-foreground">{r.createdAt}</span> },
    { key: "actions", label: "Actions", render: () => (
      <div className="flex items-center gap-1">
        <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-status-approved/10 hover:text-status-approved transition-colors" title="Approve"><CheckCircle className="h-4 w-4" /></button>
        <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-status-rejected/10 hover:text-status-rejected transition-colors" title="Reject"><XCircle className="h-4 w-4" /></button>
        <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Hide"><EyeOff className="h-4 w-4" /></button>
      </div>
    )},
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Comments" description="Moderate blog article comments across all sites." breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Comments" }]} />
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Pending", value: comments.filter((c) => c.status === "Pending").length, cls: "text-status-pending" },
            { label: "Approved", value: comments.filter((c) => c.status === "Approved").length, cls: "text-status-approved" },
            { label: "Total", value: comments.length },
          ].map(({ label, value, cls }) => (
            <div key={label} className="card-elevated rounded-lg px-4 py-3">
              <p className={`text-xl font-bold ${cls || "text-foreground"}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
        <FilterBar searchPlaceholder="Search comments…" searchValue={search} onSearchChange={setSearch}>
          <FilterSelect label="All Statuses" options={["Pending", "Approved", "Rejected", "Hidden"]} value={filterStatus} onChange={setFilterStatus} />
          <FilterSelect label="All Sources" options={["User Submitted", "AI-generated", "Imported"]} />
        </FilterBar>
        <DataTable columns={columns as never} data={filtered as never} />
      </div>
    </AdminLayout>
  );
}
