import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Eye, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { FilterBar, FilterSelect } from "@/components/admin/FilterBar";
import { aiContent } from "@/data/mockData";

const tabs = ["Generate Page Content", "Generate Blog Article", "Generate Review Draft", "Generate Comment Draft", "Generate SEO Metadata"];

export default function AIContent() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const filtered = aiContent.filter((a) => a.related.toLowerCase().includes(search.toLowerCase()) || a.site.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    { key: "type", label: "Type", render: (r: typeof aiContent[0]) => <span className="badge-ai text-xs font-medium px-2 py-0.5 rounded-full">{r.type}</span> },
    { key: "site", label: "Site", render: (r: typeof aiContent[0]) => <span className="text-sm text-foreground">{r.site}</span> },
    { key: "related", label: "Related Content", render: (r: typeof aiContent[0]) => <span className="text-sm text-foreground max-w-xs truncate block">{r.related}</span> },
    { key: "prompt", label: "Prompt Summary", render: (r: typeof aiContent[0]) => <p className="text-xs text-muted-foreground max-w-[200px] truncate">{r.prompt}</p> },
    { key: "persona", label: "Persona", render: (r: typeof aiContent[0]) => <span className="text-xs text-muted-foreground">{r.persona}</span> },
    { key: "status", label: "Status", render: (r: typeof aiContent[0]) => <StatusBadge status={r.status} /> },
    { key: "createdAt", label: "Created", render: (r: typeof aiContent[0]) => <span className="text-xs text-muted-foreground">{r.createdAt}</span> },
    { key: "actions", label: "Actions", render: () => (
      <div className="flex items-center gap-1">
        <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Preview"><Eye className="h-3.5 w-3.5" /></button>
        <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-status-approved/10 hover:text-status-approved transition-colors" title="Approve"><CheckCircle className="h-3.5 w-3.5" /></button>
        <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-status-rejected/10 hover:text-status-rejected transition-colors" title="Reject"><XCircle className="h-3.5 w-3.5" /></button>
        <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    )},
  ];

  const handleGenerate = () => { setGenerating(true); setTimeout(() => { setGenerating(false); setGenerated(true); }, 2000); };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="AI Content"
          description="Generate, review, and manage all AI-produced content across your sites."
          breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "AI Content" }]}
        />

        {/* AI Hub */}
        <div className="card-elevated rounded-xl mb-6 overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border bg-ai-bg p-4">
            <Sparkles className="h-5 w-5 text-ai-fg" />
            <h2 className="font-semibold text-foreground text-sm">AI Content Generation Hub</h2>
          </div>
          <div className="flex border-b border-border overflow-x-auto scrollbar-thin">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(i); setGenerated(false); }}
                className={`shrink-0 px-4 py-2.5 text-xs font-medium transition-colors border-b-2 ${
                  activeTab === i ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Site</label>
                <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  <option>MagnesiumGuide</option><option>VitaminHQ</option><option>OmegaBest</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Author Persona</label>
                <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  <option>Dr. Claire Fontaine</option><option>Marcus Webb, RD</option><option>System (no persona)</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-foreground mb-1.5">Topic / Instructions</label>
                <textarea rows={3} placeholder={`Describe what to generate for: ${tabs[activeTab]}…`} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none placeholder:text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleGenerate} disabled={generating} className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 shadow-primary transition-all">
                {generating ? <><div className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />Generating…</> : <><Sparkles className="h-4 w-4" />Generate</>}
              </button>
              {generated && (
                <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 rounded-lg border border-status-approved/30 bg-status-approved/10 px-3 py-2">
                  <CheckCircle className="h-4 w-4 text-status-approved" />
                  <span className="text-xs font-medium text-status-approved">Content generated — review in list below</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Content list */}
        <FilterBar searchPlaceholder="Search AI content…" searchValue={search} onSearchChange={setSearch}>
          <FilterSelect label="All Types" options={["Blog Article", "Static Page", "Review", "Comment", "SEO Metadata"]} />
          <FilterSelect label="All Statuses" options={["Draft", "Ready for Review", "Approved", "Published", "Rejected"]} />
        </FilterBar>
        <DataTable columns={columns as never} data={filtered as never} />
      </div>
    </AdminLayout>
  );
}
