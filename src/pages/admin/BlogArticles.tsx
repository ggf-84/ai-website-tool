import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Eye, Sparkles, MoreHorizontal, BookOpen } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { FilterBar, FilterSelect } from "@/components/admin/FilterBar";
import { articles } from "@/data/mockData";

export default function BlogArticles() {
  const [search, setSearch] = useState("");
  const [filterSite, setFilterSite] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = articles.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchSite = !filterSite || a.site === filterSite;
    const matchSource = !filterSource || a.source === filterSource;
    const matchStatus = !filterStatus || a.status === filterStatus;
    return matchSearch && matchSite && matchSource && matchStatus;
  });

  const columns = [
    {
      key: "title",
      label: "Article Title",
      render: (row: typeof articles[0]) => (
        <div className="max-w-[280px]">
          <p className="font-medium text-foreground text-sm leading-snug">{row.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{row.topic}</p>
        </div>
      ),
    },
    { key: "site", label: "Site", render: (row: typeof articles[0]) => <span className="text-sm text-foreground">{row.site}</span> },
    { key: "author", label: "Author", render: (row: typeof articles[0]) => (
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-semibold shrink-0">
          {row.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <span className="text-sm text-foreground truncate max-w-[120px]">{row.author}</span>
      </div>
    )},
    { key: "status", label: "Status", render: (row: typeof articles[0]) => <StatusBadge status={row.status} /> },
    { key: "source", label: "Source", render: (row: typeof articles[0]) => <StatusBadge status={row.source} /> },
    { key: "seoStatus", label: "SEO", render: (row: typeof articles[0]) => <StatusBadge status={row.seoStatus} /> },
    { key: "publishDate", label: "Publish Date", render: (row: typeof articles[0]) => (
      <span className="text-xs text-muted-foreground">{row.publishDate ?? "Not set"}</span>
    )},
    { key: "wordCount", label: "Words", render: (row: typeof articles[0]) => (
      <span className="text-sm text-muted-foreground">{row.wordCount.toLocaleString()}</span>
    )},
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <div className="flex items-center gap-1">
          <Link to="/blog/edit" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><Edit className="h-3.5 w-3.5" /></Link>
          <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><Eye className="h-3.5 w-3.5" /></button>
          <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><MoreHorizontal className="h-3.5 w-3.5" /></button>
        </div>
      ),
    },
  ];

  const sitesInData = [...new Set(articles.map((a) => a.site))];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Blog Articles"
          description="Manage and create blog content across all your sites."
          breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Blog Articles" }]}
          actions={
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
                <Sparkles className="h-4 w-4 text-primary" />Generate with AI
              </button>
              <Link to="/blog/new" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-primary transition-all">
                <Plus className="h-4 w-4" />New Article
              </Link>
            </div>
          }
        />

        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: "Total Articles", value: articles.length },
            { label: "Published", value: articles.filter((a) => a.status === "Published").length, cls: "text-status-published" },
            { label: "AI-Generated", value: articles.filter((a) => a.source === "AI-generated").length, cls: "text-ai-fg" },
            { label: "Scheduled", value: articles.filter((a) => a.status === "Scheduled").length, cls: "text-status-scheduled" },
          ].map(({ label, value, cls }) => (
            <div key={label} className="card-elevated rounded-lg px-4 py-3">
              <p className={`text-xl font-bold ${cls || "text-foreground"}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <FilterBar searchPlaceholder="Search by title…" searchValue={search} onSearchChange={setSearch}>
          <FilterSelect label="All Sites" options={sitesInData} value={filterSite} onChange={setFilterSite} />
          <FilterSelect label="All Sources" options={["Manual", "AI-generated", "Imported"]} value={filterSource} onChange={setFilterSource} />
          <FilterSelect label="All Statuses" options={["Published", "Draft", "Scheduled", "Archived"]} value={filterStatus} onChange={setFilterStatus} />
        </FilterBar>

        <DataTable columns={columns as never} data={filtered as never} emptyMessage="No articles found." />
      </div>
    </AdminLayout>
  );
}
