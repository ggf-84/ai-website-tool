import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, BookOpen, Check, RefreshCw, Eye, X } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { authors } from "@/data/mockData";

const siteAuthors: Record<string, string[]> = {
  MagnesiumGuide: ["Dr. Claire Fontaine", "Marcus Webb, RD"],
  VitaminHQ: ["Dr. Amara Osei"],
  OmegaBest: ["Dr. Nathan Pierce"],
  SupplementReviewer: ["Sophie Laurent"],
  ProBioticReviews: ["Random Author"],
};

function addDays(base: string, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

const TODAY = "2025-03-11";

const topicSuggestions = {
  MagnesiumGuide: [
    "Magnesium and Heart Health: What the Science Says",
    "Best Time to Take Magnesium for Maximum Benefit",
    "Magnesium Deficiency: Hidden Signs You're Missing",
    "Magnesium for Migraines: A Complete Overview",
    "How Magnesium Affects Blood Sugar Levels",
    "Magnesium and Stress: The Cortisol Connection",
    "Top 7 Foods Rich in Magnesium",
  ],
  VitaminHQ: [
    "Vitamin D3 and Immunity: A Full Review",
    "Signs Your Vitamin D Levels Are Too Low",
    "Vitamin K2: Why Most People Don't Get Enough",
    "Best Vitamin D3 Supplements Reviewed 2025",
    "How to Test Your Vitamin D at Home",
    "Vitamin D and Depression: What Research Shows",
    "Vitamin D Toxicity: Is It Possible?",
  ],
};

export default function AIBlogGeneration() {
  const [site, setSite] = useState("MagnesiumGuide");
  const [author, setAuthor] = useState("Dr. Claire Fontaine");
  const [bulkCount, setBulkCount] = useState(7);
  const [length, setLength] = useState("1500–2500 words");
  const [startDate, setStartDate] = useState(TODAY);
  const [tone, setTone] = useState("Scientific & Accessible");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [previewPost, setPreviewPost] = useState<null | { title: string; date: string; index: number }>(null);

  const availableAuthors = ["Random Author", ...(siteAuthors[site] || [])];
  const topics = (topicSuggestions as Record<string, string[]>)[site] || [];

  const generatedPosts = generated
    ? Array.from({ length: bulkCount }, (_, i) => ({
        title: topics[i % topics.length] || `Blog Post ${i + 1}`,
        date: addDays(startDate, i),
        author: author === "Random Author" ? (siteAuthors[site]?.[i % (siteAuthors[site]?.length || 1)] || "Auto Author") : author,
        wordCount: Math.floor(Math.random() * 600 + 1400),
        index: i,
      }))
    : [];

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2500);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <PageHeader
          title="AI Blog Generation"
          description="Generate and schedule multiple blog posts for your sites using AI."
          breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "AI Blog Generation" }]}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card-elevated rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ai-bg">
                  <Sparkles className="h-4 w-4 text-ai-fg" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Generation Settings</h3>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Site</label>
                <select value={site} onChange={(e) => { setSite(e.target.value); setAuthor("Random Author"); setGenerated(false); }}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  {["MagnesiumGuide", "VitaminHQ", "OmegaBest", "SupplementReviewer", "ProBioticReviews"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Author</label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  {availableAuthors.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Topic / Content Brief</label>
                <textarea rows={3} placeholder="e.g. Cover different forms of magnesium supplements, their benefits, and which to choose for specific health goals…"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none placeholder:text-muted-foreground" />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Tone of Voice</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  <option>Scientific & Accessible</option>
                  <option>Friendly & Educational</option>
                  <option>Authoritative</option>
                  <option>Conversational</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Article Length</label>
                <select value={length} onChange={(e) => setLength(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  <option>1000–1500 words</option>
                  <option>1500–2500 words</option>
                  <option>2500+ words</option>
                </select>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />Bulk Schedule
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Number of Posts</label>
                    <input type="number" value={bulkCount} onChange={(e) => setBulkCount(Math.max(1, Math.min(30, +e.target.value)))} min={1} max={30}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Publish Start Date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Posts will be distributed 1 per day, starting {startDate}.
                </p>
              </div>

              <button onClick={handleGenerate} disabled={generating}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-ai-fg py-2.5 text-sm font-semibold text-white hover:bg-ai-fg/90 disabled:opacity-60 transition-all shadow-md">
                {generating
                  ? <><div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Generating {bulkCount} posts…</>
                  : <><Sparkles className="h-4 w-4" />Generate {bulkCount} Blog Posts</>}
              </button>
            </div>
          </div>

          {/* Schedule Preview */}
          <div className="lg:col-span-3">
            <div className="card-elevated rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />Schedule Preview
                </p>
                {generated && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-status-published">
                    <Check className="h-3.5 w-3.5" />{bulkCount} posts ready
                  </span>
                )}
              </div>

              <div className="divide-y divide-border">
                {!generated && !generating && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-3">
                      <BookOpen className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">No posts generated yet</p>
                    <p className="text-xs text-muted-foreground max-w-[220px]">Configure your settings and click Generate to create a batch of scheduled blog posts.</p>
                  </div>
                )}

                {generating && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <div className="h-8 w-8 rounded-full border-2 border-ai-fg/20 border-t-ai-fg animate-spin" />
                    <p className="text-sm text-muted-foreground">Generating {bulkCount} articles for {site}…</p>
                  </div>
                )}

                <AnimatePresence>
                  {generated && generatedPosts.map((post, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-muted/40 transition-colors">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ai-bg shrink-0">
                        <Sparkles className="h-3.5 w-3.5 text-ai-fg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                        <p className="text-xs text-muted-foreground">{post.author} · ~{post.wordCount.toLocaleString()} words</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />{post.date}
                        </div>
                        <StatusBadge status="Scheduled" />
                        <button onClick={() => setPreviewPost(post)} className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {generated && (
                <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20">
                  <p className="text-xs text-muted-foreground">{bulkCount} posts scheduled from {startDate} to {addDays(startDate, bulkCount - 1)}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setGenerated(false)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      <RefreshCw className="h-3 w-3" />Regenerate
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-all shadow-primary">
                      <Check className="h-3 w-3" />Save All as Scheduled
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewPost && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40" onClick={() => setPreviewPost(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] max-h-[80vh] bg-card rounded-2xl border border-border shadow-2xl z-50 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <p className="font-semibold text-foreground text-sm">Article Preview</p>
                <button onClick={() => setPreviewPost(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex items-center gap-2 mb-4">
                  <StatusBadge status="Scheduled" />
                  <StatusBadge status="AI-generated" />
                  <span className="text-xs text-muted-foreground">Publish: {previewPost.date}</span>
                </div>
                <h1 className="text-xl font-bold text-foreground mb-3 leading-snug">{previewPost.title}</h1>
                <p className="text-xs text-muted-foreground mb-5">By {generatedPosts[previewPost.index]?.author ?? author} · ~{generatedPosts[previewPost.index]?.wordCount?.toLocaleString()} words · {site}</p>
                <div className="prose prose-sm max-w-none space-y-4 text-foreground">
                  <p className="text-sm leading-relaxed text-muted-foreground">This is a preview of the AI-generated article. The full content will be generated and ready for review once saved. It will include a structured layout with H2/H3 sections, relevant keywords, meta title and description, and SEO-optimized formatting tailored to the site's context and audience.</p>
                  <div className="rounded-lg bg-muted/40 border border-border p-4 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Auto-generated SEO Metadata</p>
                    <div className="space-y-1">
                      <p className="text-xs"><span className="font-medium text-foreground">Meta Title:</span> <span className="text-muted-foreground">{previewPost.title} | {site}</span></p>
                      <p className="text-xs"><span className="font-medium text-foreground">Meta Description:</span> <span className="text-muted-foreground">Comprehensive guide on {previewPost.title.toLowerCase()}. Evidence-based information written by {generatedPosts[previewPost.index]?.author ?? author}.</span></p>
                      <p className="text-xs"><span className="font-medium text-foreground">Focus Keyword:</span> <span className="text-muted-foreground">{previewPost.title.split(":")[0].toLowerCase()}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
