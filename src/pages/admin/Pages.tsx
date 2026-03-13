import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Eye, Copy, Sparkles } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { FilterBar, FilterSelect } from "@/components/admin/FilterBar";
import { pages } from "@/data/mockData";

export default function Pages() {
  const [search, setSearch] = useState("");
  const [filterSite, setFilterSite] = useState("");
  const [filterMenu, setFilterMenu] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = pages.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
    const matchSite = !filterSite || p.site === filterSite;
    const matchMenu = !filterMenu || p.menu === filterMenu;
    const matchStatus = !filterStatus || p.contentStatus === filterStatus;
    return matchSearch && matchSite && matchMenu && matchStatus;
  });

  const columns = [
    {
      key: "title",
      label: "Page Title",
      render: (row: typeof pages[0]) => (
        <div>
          <Link to="/pages/edit" className="font-medium text-foreground text-sm hover:text-primary transition-colors">{row.title}</Link>
          <p className="text-xs text-muted-foreground">{row.slug}</p>
        </div>
      ),
    },
    { key: "site", label: "Site", render: (row: typeof pages[0]) => <span className="text-sm text-foreground">{row.site}</span> },
    { key: "menu", label: "Menu", render: (row: typeof pages[0]) => (
      <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{row.menu}</span>
    )},
    { key: "contentStatus", label: "Status", render: (row: typeof pages[0]) => <StatusBadge status={row.contentStatus} /> },
    { key: "seoStatus", label: "SEO", render: (row: typeof pages[0]) => <StatusBadge status={row.seoStatus} /> },
    { key: "wordCount", label: "Words", render: (row: typeof pages[0]) => (
      <span className="text-sm text-muted-foreground">{row.wordCount > 0 ? row.wordCount.toLocaleString() : "—"}</span>
    )},
    { key: "updatedAt", label: "Updated", render: (row: typeof pages[0]) => <span className="text-xs text-muted-foreground">{row.updatedAt}</span> },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <div className="flex items-center gap-1">
          <Link to="/pages/edit" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Edit"><Edit className="h-3.5 w-3.5" /></Link>
          <Link to="/pages/edit" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Preview"><Eye className="h-3.5 w-3.5" /></Link>
          <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors" title="Generate with AI"><Sparkles className="h-3.5 w-3.5" /></button>
          <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Duplicate"><Copy className="h-3.5 w-3.5" /></button>
        </div>
      ),
    },
  ];

  const sitesInData = [...new Set(pages.map((p) => p.site))];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Pages"
          description="Manage all static content pages across your sites."
          breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Pages" }]}
          actions={
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
                <Sparkles className="h-4 w-4 text-primary" />Generate with AI
              </button>
              <Link to="/pages/new" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-primary transition-all">
                <Plus className="h-4 w-4" />New Page
              </Link>
            </div>
          }
        />

        {/* Summary row */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: "Total Pages", value: pages.length },
            { label: "Published", value: pages.filter((p) => p.contentStatus === "Published").length, cls: "text-status-published" },
            { label: "Draft", value: pages.filter((p) => p.contentStatus === "Draft").length },
            { label: "SEO Complete", value: pages.filter((p) => p.seoStatus === "Complete").length, cls: "text-status-approved" },
          ].map(({ label, value, cls }) => (
            <div key={label} className="card-elevated rounded-lg px-4 py-3">
              <p className={`text-xl font-bold ${cls || "text-foreground"}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <FilterBar searchPlaceholder="Search by title or slug…" searchValue={search} onSearchChange={setSearch}>
          <FilterSelect label="All Sites" options={sitesInData} value={filterSite} onChange={setFilterSite} />
          <FilterSelect label="All Menus" options={["Header", "Footer", "Hidden"]} value={filterMenu} onChange={setFilterMenu} />
          <FilterSelect label="All Statuses" options={["Published", "Draft"]} value={filterStatus} onChange={setFilterStatus} />
        </FilterBar>

        <DataTable columns={columns as never} data={filtered as never} emptyMessage="No pages found." />
      </div>
    </AdminLayout>
  );
}
