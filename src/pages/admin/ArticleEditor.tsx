import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Save, Globe, Eye, ChevronDown, ChevronUp, Plus, Trash2, CalendarDays, Link2, ToggleLeft } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Link } from "react-router-dom";

const backlinkRows = [
  { keyword: "magnesium glycinate", url: "https://magnesiumguide.com/glycinate", type: "Internal", newTab: true },
  { keyword: "sleep quality supplement", url: "https://external-partner.com/sleep", type: "External", newTab: true },
];

export default function ArticleEditor() {
  const [aiExpanded, setAiExpanded] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [links, setLinks] = useState(backlinkRows);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2200);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Edit Article"
          breadcrumbs={[{ label: "Blog Articles", href: "/blog" }, { label: "Edit Article" }]}
          actions={
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
                <Eye className="h-4 w-4" />Preview
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
                <Save className="h-4 w-4" />Save Draft
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-primary transition-all">
                <Globe className="h-4 w-4" />Publish
              </button>
            </div>
          }
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2 space-y-4">
            {/* Basic fields */}
            <div className="card-elevated rounded-lg p-5 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Article Details</h3>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Article Title</label>
                <input defaultValue="Why Magnesium is Essential Before Sleep" className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-base font-semibold outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Site</label>
                  <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    <option>MagnesiumGuide</option>
                    <option>VitaminHQ</option>
                    <option>OmegaBest</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Author</label>
                  <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    <option>Dr. Claire Fontaine</option>
                    <option>Marcus Webb, RD</option>
                    <option>Dr. Amara Osei</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Topic / Brief</label>
                  <input defaultValue="Sleep & Recovery" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Focus Keywords</label>
                  <input defaultValue="magnesium before sleep, sleep supplement" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
            </div>

            {/* AI Generation Panel */}
            <div className="card-elevated rounded-lg">
              <button
                onClick={() => setAiExpanded(!aiExpanded)}
                className="flex w-full items-center justify-between p-4 text-sm"
              >
                <span className="flex items-center gap-2 font-semibold text-foreground">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-ai-bg border border-ai-border">
                    <Sparkles className="h-3.5 w-3.5 text-ai-fg" />
                  </span>
                  AI Article Generator
                </span>
                {aiExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </button>
              {aiExpanded && (
                <div className="border-t border-border p-5">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">Topic / Title Prompt</label>
                      <input defaultValue="Why magnesium is good before sleep" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">Target Keywords</label>
                      <input defaultValue="magnesium before sleep, magnesium for sleep quality" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">Tone Instructions</label>
                      <input defaultValue="Scientific but accessible, address reader directly" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">Desired Length</label>
                      <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                        <option>1500–2000 words</option>
                        <option>2000–3000 words</option>
                        <option>3000+ words</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-border accent-primary" />
                        Include backlink keywords in article body
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={handleGenerate} disabled={generating} className="flex items-center gap-2 rounded-lg bg-ai-fg px-4 py-2 text-sm font-medium text-white hover:bg-ai-fg/90 disabled:opacity-60 transition-all">
                      {generating ? <><div className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />Generating article…</> : <><Sparkles className="h-3.5 w-3.5" />Generate Article</>}
                    </button>
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Regenerate</button>
                    {generated && <span className="text-xs text-status-published font-medium">✓ Article generated — edit below</span>}
                  </div>
                </div>
              )}
            </div>

            {/* Main content */}
            <div className="card-elevated rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Article Content</h3>
              <textarea
                rows={16}
                defaultValue={`# Why Magnesium is Essential Before Sleep\n\nMagnesium is one of the most important minerals in the human body, playing a role in over 300 enzymatic reactions. But its relationship with sleep is particularly compelling — and backed by solid science.\n\n## How Magnesium Affects Sleep Quality\n\nMagnesium helps regulate the neurotransmitters that calm the nervous system. It activates the parasympathetic nervous system, which is responsible for getting you into "rest and digest" mode.\n\nResearch shows that magnesium deficiency is associated with:\n- Difficulty falling asleep\n- Restless sleep patterns\n- Increased cortisol levels at night\n\n## Best Forms for Sleep\n\nNot all magnesium supplements are equal when it comes to sleep. Magnesium glycinate is widely considered the most effective for sleep support...`}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-primary/30 resize-none leading-relaxed"
              />
            </div>

            {/* Backlink table */}
            <div className="card-elevated rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-primary" />Backlink / Keyword Injection
                </h3>
                <button
                  onClick={() => setLinks([...links, { keyword: "", url: "", type: "Internal", newTab: false }])}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Plus className="h-3.5 w-3.5" />Add keyword
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["Keyword", "URL", "Link Type", "New Tab", ""].map((h) => (
                        <th key={h} className="pb-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground pr-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {links.map((row, i) => (
                      <tr key={i}>
                        <td className="py-2 pr-3"><input defaultValue={row.keyword} placeholder="keyword" className="w-full rounded border border-border bg-background px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-primary/30" /></td>
                        <td className="py-2 pr-3"><input defaultValue={row.url} placeholder="https://…" className="w-full rounded border border-border bg-background px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-primary/30" /></td>
                        <td className="py-2 pr-3">
                          <select defaultValue={row.type} className="rounded border border-border bg-background px-2 py-1 text-xs outline-none">
                            <option>Internal</option><option>External</option>
                          </select>
                        </td>
                        <td className="py-2 pr-3 text-center">
                          <input type="checkbox" defaultChecked={row.newTab} className="accent-primary" />
                        </td>
                        <td className="py-2">
                          <button onClick={() => setLinks(links.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            <div className="card-elevated rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Publish Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Status</label>
                  <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    <option>Published</option><option>Draft</option><option>Scheduled</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-foreground mb-1.5 cursor-pointer">
                    <input type="checkbox" className="accent-primary" />Scheduled publishing
                  </label>
                  <input type="datetime-local" className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <button className="rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-primary transition-all">Publish Now</button>
                <button className="rounded-lg border border-border py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">Save as Draft</button>
              </div>
            </div>

            {/* SEO */}
            <div className="card-elevated rounded-lg">
              <button onClick={() => setSeoExpanded(!seoExpanded)} className="flex w-full items-center justify-between p-4 text-sm font-semibold text-foreground">
                SEO Settings
                {seoExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {seoExpanded && (
                <div className="border-t border-border p-4 space-y-3">
                  {[
                    { label: "Meta Title", value: "Why Magnesium Helps You Sleep Better (2025)" },
                    { label: "Meta Description", value: "Discover how magnesium supports deep, restful sleep. Backed by science — learn the best forms and dosages." },
                    { label: "Focus Keyword", value: "magnesium before sleep" },
                    { label: "URL Slug", value: "why-magnesium-essential-before-sleep" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
                      <input defaultValue={value} className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  ))}
                  <div className="rounded-lg border border-border bg-muted/40 p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Search Preview</p>
                    <p className="text-sm font-medium text-primary hover:underline cursor-pointer truncate">Why Magnesium Helps You Sleep Better (2025)</p>
                    <p className="text-xs text-status-approved">magnesiumguide.com › why-magnesium-essential-before-sleep</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">Discover how magnesium supports deep, restful sleep. Backed by science — learn the best forms and dosages.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="card-elevated rounded-lg p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Article Info</h3>
              {[["Word Count", "2,100"], ["Content Source", "AI-generated"], ["SEO Status", "Complete"], ["Last Updated", "2025-03-08"]].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="text-xs font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
