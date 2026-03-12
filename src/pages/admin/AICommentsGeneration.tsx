import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, Check, RefreshCw, Eye, X, ChevronDown, ChevronRight } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";

const sitesData = [
  { name: "MagnesiumGuide", articles: ["Why Magnesium is Essential Before Sleep", "Magnesium Glycinate vs. Citrate", "Top 5 Signs of Magnesium Deficiency", "Magnesium for Bodybuilding"] },
  { name: "VitaminHQ", articles: ["Vitamin D3 and K2: The Perfect Pair", "How Much Vitamin D Do You Actually Need?"] },
  { name: "SupplementReviewer", articles: ["Best Omega-3 Supplements 2025", "Probiotic Comparison Guide"] },
];

type GeneratedComment = {
  id: string;
  name: string;
  text: string;
  article: string;
  site: string;
  type: "standalone" | "reply" | "thread-start";
  replyTo?: string;
  date: string;
};

const namePool = ["Emma R.", "Luca B.", "Sofia M.", "James T.", "Nora K.", "Oliver P.", "Anna F.", "Max H.", "Chloe D.", "Samuel W.", "Mia G.", "Noah C."];
const commentTemplates = {
  magnesium_sleep: [
    "This article finally explained why I sleep so much better after starting magnesium. Thank you!",
    "I've been taking it for 2 weeks and honestly haven't noticed much yet. Is that normal?",
    "Great read. I switched to glycinate after reading this and the difference is real.",
    "Does anyone know if it's safe to take with melatonin? Asking for my husband.",
    "I was skeptical at first but this actually convinced me to try it.",
  ],
  general: [
    "Very informative, bookmarking this for later.",
    "Shared this with my nutritionist, she agreed with most of it.",
    "I had no idea about this before reading here. Really helpful.",
    "Question – does the brand matter or is the form what counts most?",
    "Finally a clear explanation without all the usual marketing fluff.",
  ],
};

function generateComments(count: number, sites: string[], articles: string[], style: string): GeneratedComment[] {
  const results: GeneratedComment[] = [];
  const today = new Date("2025-03-11");
  for (let i = 0; i < count; i++) {
    const site = sites[i % sites.length] || "MagnesiumGuide";
    const article = articles[i % articles.length] || "General";
    const templates = article.toLowerCase().includes("sleep") ? commentTemplates.magnesium_sleep : commentTemplates.general;
    const type: GeneratedComment["type"] = i % 5 === 4 ? "reply" : i % 3 === 0 ? "thread-start" : "standalone";
    const d = new Date(today);
    d.setDate(today.getDate() - Math.floor(i / 2));
    results.push({
      id: `gen-cmt-${i}`,
      name: namePool[i % namePool.length],
      text: templates[i % templates.length],
      article,
      site,
      type,
      replyTo: type === "reply" && results.length > 0 ? results[results.length - 1].name : undefined,
      date: d.toISOString().split("T")[0],
    });
  }
  return results;
}

export default function AICommentsGeneration() {
  const [selectedSites, setSelectedSites] = useState<string[]>(["MagnesiumGuide"]);
  const [selectedArticles, setSelectedArticles] = useState<string[]>(["All Pages"]);
  const [count, setCount] = useState(12);
  const [personas, setPersonas] = useState(6);
  const [styleType, setStyleType] = useState("Mixed");
  const [length, setLength] = useState("Short & Medium");
  const [grammarErrors, setGrammarErrors] = useState("Minimal imperfections");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [generatedComments, setGeneratedComments] = useState<GeneratedComment[]>([]);
  const [expandedThread, setExpandedThread] = useState<string | null>(null);
  const [previewComment, setPreviewComment] = useState<GeneratedComment | null>(null);

  const availableArticles = ["All Pages", ...selectedSites.flatMap((s) => sitesData.find((sd) => sd.name === s)?.articles || [])];

  const toggleSite = (s: string) => setSelectedSites((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const articles = selectedArticles.includes("All Pages") ? availableArticles.filter((a) => a !== "All Pages") : selectedArticles;
      setGeneratedComments(generateComments(count, selectedSites, articles, styleType));
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="AI Comments Generation"
          description="Generate realistic AI comments for blog articles across your sites."
          breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "AI Comments" }]}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Settings */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card-elevated rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ai-bg">
                  <Sparkles className="h-4 w-4 text-ai-fg" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Generator Settings</h3>
              </div>

              {/* Site selector */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-2">Target Sites</label>
                <div className="space-y-1.5">
                  {sitesData.map((s) => (
                    <label key={s.name} className="flex items-center gap-2.5 cursor-pointer">
                      <div onClick={() => toggleSite(s.name)}
                        className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-colors ${selectedSites.includes(s.name) ? "border-primary bg-primary" : "border-border"}`}>
                        {selectedSites.includes(s.name) && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                      </div>
                      <span className="text-sm text-foreground">{s.name}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <div onClick={() => setSelectedSites(sitesData.map((s) => s.name))}
                      className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-colors ${selectedSites.length === sitesData.length ? "border-primary bg-primary" : "border-border"}`}>
                      {selectedSites.length === sitesData.length && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                    </div>
                    <span className="text-sm text-muted-foreground">All Sites</span>
                  </label>
                </div>
              </div>

              {/* Articles */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Target Pages / Articles</label>
                <select value={selectedArticles[0]} onChange={(e) => setSelectedArticles([e.target.value])}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  {availableArticles.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Number of Comments</label>
                  <input type="number" value={count} onChange={(e) => setCount(Math.max(1, +e.target.value))} min={1} max={100}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">AI Personas</label>
                  <input type="number" value={personas} onChange={(e) => setPersonas(Math.max(1, +e.target.value))} min={1} max={20}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Comment Style</label>
                <select value={styleType} onChange={(e) => setStyleType(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  <option>Mixed</option>
                  <option>Simple</option>
                  <option>Complex & Detailed</option>
                  <option>Questions Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Comment Length</label>
                <select value={length} onChange={(e) => setLength(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  <option>Short & Medium</option>
                  <option>Short only</option>
                  <option>Long & Detailed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Grammar Style</label>
                <select value={grammarErrors} onChange={(e) => setGrammarErrors(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  <option>Minimal imperfections</option>
                  <option>Polished / Perfect</option>
                  <option>Casual with typos</option>
                </select>
              </div>

              <div className="rounded-lg bg-muted/50 border border-border p-3">
                <p className="text-xs font-medium text-foreground mb-1.5">Comment Distribution</p>
                <div className="space-y-1">
                  {[["Standalone comments", "~60%"], ["Reply comments", "~25%"], ["Thread discussions", "~15%"]].map(([l, v]) => (
                    <div key={l} className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{l}</span><span className="font-medium text-foreground">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleGenerate} disabled={generating || selectedSites.length === 0}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-ai-fg py-2.5 text-sm font-semibold text-white hover:bg-ai-fg/90 disabled:opacity-60 transition-all shadow-md">
                {generating
                  ? <><div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Generating…</>
                  : <><Sparkles className="h-4 w-4" />Generate {count} Comments</>}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="card-elevated rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />Generated Comments
                </p>
                {generated && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-ai-fg flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" />{generatedComments.length} AI-generated
                    </span>
                    <StatusBadge status="Pending" />
                  </div>
                )}
              </div>

              <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                {!generated && !generating && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-3">
                      <MessageSquare className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">No comments generated yet</p>
                    <p className="text-xs text-muted-foreground max-w-[220px]">Configure settings and click Generate to create a batch of realistic comments.</p>
                  </div>
                )}
                {generating && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <div className="h-8 w-8 rounded-full border-2 border-ai-fg/20 border-t-ai-fg animate-spin" />
                    <p className="text-sm text-muted-foreground">Generating {count} comments…</p>
                  </div>
                )}
                <AnimatePresence>
                  {generated && generatedComments.map((c, i) => (
                    <motion.div key={c.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                      className={`flex items-start gap-3 px-5 py-3 hover:bg-muted/30 transition-colors ${c.type === "reply" ? "pl-10 bg-muted/10" : ""}`}>
                      {c.type === "reply" && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1" />}
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ai-bg text-ai-fg text-xs font-semibold shrink-0">
                        {c.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-xs font-semibold text-foreground">{c.name}</p>
                          {c.type === "reply" && c.replyTo && (
                            <span className="text-xs text-muted-foreground">↩ replying to {c.replyTo}</span>
                          )}
                          <span className="text-xs text-muted-foreground ml-auto">{c.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{c.text}</p>
                        <p className="text-xs text-muted-foreground/60 mt-0.5">{c.article} · {c.site}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <div className="flex items-center gap-0.5 rounded bg-ai-bg px-1.5 py-0.5">
                          <Sparkles className="h-2.5 w-2.5 text-ai-fg" />
                          <span className="text-[10px] text-ai-fg font-medium">AI</span>
                        </div>
                        <button onClick={() => setPreviewComment(c)} className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {generated && (
                <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20">
                  <p className="text-xs text-muted-foreground">All marked as AI-generated · Pending moderation</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setGenerated(false)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      <RefreshCw className="h-3 w-3" />Regenerate
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-all shadow-primary">
                      <Check className="h-3 w-3" />Save All as Pending
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comment Preview Modal */}
      <AnimatePresence>
        {previewComment && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40" onClick={() => setPreviewComment(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] bg-card rounded-2xl border border-border shadow-2xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded bg-ai-bg px-2 py-0.5">
                    <Sparkles className="h-3 w-3 text-ai-fg" /><span className="text-xs text-ai-fg font-medium">AI-generated</span>
                  </div>
                  <StatusBadge status="Pending" />
                </div>
                <button onClick={() => setPreviewComment(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ai-bg text-ai-fg text-sm font-semibold shrink-0">
                    {previewComment.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{previewComment.name}</p>
                    <p className="text-xs text-muted-foreground">{previewComment.date}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{previewComment.text}</p>
                <div className="rounded-lg bg-muted/50 p-3 space-y-1 text-xs text-muted-foreground">
                  <p><span className="font-medium text-foreground">Article:</span> {previewComment.article}</p>
                  <p><span className="font-medium text-foreground">Site:</span> {previewComment.site}</p>
                  <p><span className="font-medium text-foreground">Type:</span> {previewComment.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 rounded-md bg-status-approved/10 border border-status-approved/20 py-2 text-xs font-medium text-status-approved hover:bg-status-approved/20 transition-colors">Approve</button>
                  <button className="flex-1 rounded-md bg-status-rejected/10 border border-status-rejected/20 py-2 text-xs font-medium text-status-rejected hover:bg-status-rejected/20 transition-colors">Reject</button>
                  <button className="flex-1 rounded-md border border-border py-2 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors">Edit</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
