import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { FilterBar, FilterSelect } from "@/components/admin/FilterBar";
import { authors } from "@/data/mockData";

export default function Authors() {
  const [search, setSearch] = useState("");
  const filtered = authors.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.site.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Authors"
          description="Manage author personas used for AI-assisted content publishing."
          breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Authors" }]}
          actions={
            <Link to="/authors/new" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-primary transition-all">
              <Plus className="h-4 w-4" />New Author
            </Link>
          }
        />
        <FilterBar searchPlaceholder="Search authors…" searchValue={search} onSearchChange={setSearch}>
          <FilterSelect label="All Sites" options={[...new Set(authors.map((a) => a.site))]} />
          <FilterSelect label="All Statuses" options={["Active", "Draft"]} />
        </FilterBar>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((author) => (
            <div key={author.id} className="card-elevated rounded-lg p-5 card-hover">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary text-sm font-bold shrink-0">
                  {author.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{author.name}</p>
                  <p className="text-xs text-muted-foreground">{author.site}</p>
                  <p className="text-xs text-muted-foreground">{author.specialty}</p>
                </div>
                <StatusBadge status={author.status} />
              </div>
              <p className="text-xs text-muted-foreground italic mb-3">"{author.bio}"</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {author.style.map((s) => (
                  <span key={s} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-xs text-muted-foreground">{author.articles} articles</span>
                <div className="flex items-center gap-1">
                  <Link to={`/authors/edit`} className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><Edit className="h-3.5 w-3.5" /></Link>
                  <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
          <Link to="/authors/new" className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border p-5 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all min-h-[200px]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted"><Plus className="h-6 w-6" /></div>
            <p className="text-sm font-medium">Add Author</p>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
