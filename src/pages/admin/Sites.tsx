import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Globe, ExternalLink, Copy, Archive, Edit, Eye, MoreHorizontal } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { FilterBar, FilterSelect } from "@/components/admin/FilterBar";
import { sites } from "@/data/mockData";

export default function Sites() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = sites.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.domain.toLowerCase().includes(search.toLowerCase());
    const matchType = !filterType || s.type === filterType;
    const matchStatus = !filterStatus || s.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Sites"
          description="Manage all your product and review websites from one place."
          breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Sites" }]}
          actions={
            <Link
              to="/sites/new"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-primary transition-all"
            >
              <Plus className="h-4 w-4" />
              New Site
            </Link>
          }
        />

        <FilterBar searchPlaceholder="Search by name or domain…" searchValue={search} onSearchChange={setSearch}>
          <FilterSelect label="All Types" options={["Product Site", "Review Site"]} value={filterType} onChange={setFilterType} />
          <FilterSelect label="All Statuses" options={["Active", "Draft", "Archived"]} value={filterStatus} onChange={setFilterStatus} />
        </FilterBar>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((site, i) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-elevated rounded-lg p-5 card-hover"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary text-sm font-bold shrink-0">
                    {site.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{site.name}</p>
                    <a href={`https://${site.domain}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                      {site.domain}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <StatusBadge status={site.status} />
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  <Globe className="h-3 w-3" />{site.type}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {site.template}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-3 mb-4">
                {[
                  { label: "Pages", value: site.pages },
                  { label: "Articles", value: site.posts },
                  { label: "Reviews", value: site.reviews },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border pt-3">
                <p className="text-xs text-muted-foreground">Updated {site.updatedAt}</p>
                <div className="flex items-center gap-1">
                  <Link to={`/sites/${site.id}`} className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="View">
                    <Eye className="h-3.5 w-3.5" />
                  </Link>
                  <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Edit">
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Duplicate">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="More">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add new card */}
          <Link
            to="/sites/new"
            className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border p-5 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all min-h-[200px] card-hover"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <Plus className="h-6 w-6" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Create New Site</p>
              <p className="text-xs mt-0.5 text-muted-foreground">Choose a type & template</p>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
