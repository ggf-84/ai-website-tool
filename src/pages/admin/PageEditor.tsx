import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Save, Globe, Eye, ChevronDown, ChevronUp,
  Plus, Trash2, Type, AlignLeft, HelpCircle, Image,
  Quote, Zap, List, Minus, X, ExternalLink,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";

const contentBlocks = [
  { type: "heading", icon: Type, label: "Heading" },
  { type: "paragraph", icon: AlignLeft, label: "Paragraph" },
  { type: "faq", icon: HelpCircle, label: "FAQ Block" },
  { type: "image", icon: Image, label: "Image" },
  { type: "quote", icon: Quote, label: "Quote" },
  { type: "cta", icon: Zap, label: "CTA Block" },
  { type: "list", icon: List, label: "Bullet List" },
  { type: "divider", icon: Minus, label: "Divider" },
];

type Block = {
  id: string;
  type: string;
  level?: string;
  content: string;
  question?: string;
  answer?: string;
};

const demoBlocks: Block[] = [
  { id: "b1", type: "heading", level: "H1", content: "Magnesium Side Effects: What You Need to Know" },
  {
    id: "b2", type: "paragraph",
    content: "Magnesium is one of the most important minerals in the human body, involved in over 300 enzymatic reactions. While supplementation is generally considered safe, taking too much — or choosing the wrong form — can lead to unwanted side effects. This guide covers what to expect, who is most at risk, and how to use magnesium effectively.",
  },
  { id: "b3", type: "heading", level: "H2", content: "Most Common Side Effects" },
  {
    id: "b4", type: "paragraph",
    content: "The most frequently reported side effects are digestive in nature. These are more common with certain forms of magnesium, especially oxide and sulfate. Symptoms typically appear when doses exceed 350–400 mg per day or when taken on an empty stomach.",
  },
  {
    id: "b5", type: "list",
    content: "Loose stools or diarrhea (most common with magnesium oxide)\nNausea or stomach discomfort\nAbdominal cramping\nBloating, especially when first starting supplementation",
  },
  { id: "b6", type: "heading", level: "H2", content: "Who Should Be Careful" },
  {
    id: "b7", type: "paragraph",
    content: "Certain groups need to approach magnesium supplementation with extra caution. People with kidney disease are at higher risk because the kidneys are responsible for excreting excess magnesium. In individuals with impaired kidney function, magnesium can accumulate to toxic levels, causing symptoms such as low blood pressure, irregular heartbeat, and in extreme cases, cardiac arrest.",
  },
  {
    id: "b8", type: "faq",
    question: "Can I take magnesium every day?",
    answer: "Yes, for most healthy adults daily supplementation is safe. The recommended daily intake for adults is 310–420 mg, depending on age and sex. Supplemental doses up to 350 mg/day are generally tolerated well.",
    content: "",
  },
  {
    id: "b9", type: "faq",
    question: "Which form of magnesium has the fewest side effects?",
    answer: "Magnesium glycinate is widely considered the best tolerated form. It is well absorbed and rarely causes digestive issues. Magnesium citrate is also well absorbed but may have a mild laxative effect at higher doses.",
    content: "",
  },
  {
    id: "b10", type: "quote",
    content: "\"The key is choosing the right form and starting with a low dose. Most people can tolerate magnesium very well when they find what works for their body.\" — Dr. Claire Fontaine, Supplement Research",
  },
  {
    id: "b11", type: "paragraph",
    content: "✍️ Final Thought from the Author: Magnesium supplementation has helped thousands of people improve their sleep, reduce muscle cramps, and manage stress more effectively. The side effects discussed here are real but manageable. Start with a lower dose of a well-absorbed form like glycinate, take it with food, and give your body 2–3 weeks to adjust. If you have any underlying health conditions, always consult your doctor before starting.",
  },
];

export default function PageEditor() {
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(true);
  const [blocks, setBlocks] = useState<Block[]>(demoBlocks);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2000);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Edit Page: Side Effects"
          breadcrumbs={[{ label: "Pages", href: "/pages" }, { label: "Side Effects" }]}
          actions={
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
              >
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
          {/* Main editor */}
          <div className="lg:col-span-2 space-y-4">
            {/* Page settings */}
            <div className="card-elevated rounded-lg p-5 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Page Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Page Title", value: "Side Effects" },
                  { label: "URL Slug", value: "/side-effects" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-foreground mb-1.5">{label}</label>
                    <input defaultValue={value} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Site</label>
                  <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    <option>MagnesiumGuide</option>
                    <option>VitaminHQ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Menu Placement</label>
                  <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    <option>Header</option>
                    <option>Footer</option>
                    <option>Both</option>
                    <option>Hidden</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Status</label>
                  <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Sort Order</label>
                  <input type="number" defaultValue="2" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
            </div>

            {/* Content Builder */}
            <div className="card-elevated rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Content Blocks</h3>
                <button
                  onClick={() => setAiPanelOpen(!aiPanelOpen)}
                  className="flex items-center gap-2 rounded-lg bg-ai-bg border border-ai-border px-3 py-1.5 text-xs font-medium text-ai-fg hover:bg-ai-bg/80 transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5" />Generate with AI
                </button>
              </div>

              {/* AI Panel */}
              {aiPanelOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 rounded-xl bg-ai-bg border border-ai-border p-4"
                >
                  <h4 className="text-sm font-semibold text-ai-fg flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4" />AI Page Generator
                  </h4>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">Page Topic / Theme</label>
                      <input defaultValue="Magnesium Side Effects" className="w-full rounded-md border border-ai-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ai-fg/20" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">Target Keyword</label>
                      <input defaultValue="magnesium side effects" className="w-full rounded-md border border-ai-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ai-fg/20" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">Tone of Voice</label>
                      <select className="w-full rounded-md border border-ai-border bg-card px-3 py-2 text-sm outline-none">
                        <option>Scientific & Accessible</option>
                        <option>Friendly & Educational</option>
                        <option>Authoritative</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">Desired Length</label>
                      <select className="w-full rounded-md border border-ai-border bg-card px-3 py-2 text-sm outline-none">
                        <option>1000–1500 words</option>
                        <option>1500–2500 words</option>
                        <option>2500+ words</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-foreground mb-1">Instructions</label>
                      <textarea placeholder="Include H2 sections for: overdose risks, drug interactions, who should avoid it…" rows={2} className="w-full rounded-md border border-ai-border bg-card px-3 py-2 text-sm outline-none resize-none placeholder:text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleGenerate} disabled={generating} className="flex items-center gap-2 rounded-lg bg-ai-fg px-4 py-2 text-sm font-medium text-white hover:bg-ai-fg/90 disabled:opacity-60 transition-all">
                      {generating ? <><div className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />Generating…</> : <><Sparkles className="h-3.5 w-3.5" />Generate</>}
                    </button>
                    {generated && <span className="text-xs text-status-published font-medium">✓ Content generated — review below</span>}
                  </div>
                </motion.div>
              )}

              {/* Blocks */}
              <div className="space-y-3">
                {blocks.map((block) => (
                  <div key={block.id} className="group flex gap-3 rounded-lg border border-border p-3 hover:border-primary/30 transition-all">
                    <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-muted text-muted-foreground text-xs font-medium">
                        {block.type === "heading" ? block.level : block.type.slice(0, 1).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      {block.type === "heading" && (
                        <div className="flex items-center gap-2">
                          <select defaultValue={block.level} className="rounded border border-border bg-background px-2 py-1 text-xs outline-none shrink-0">
                            <option>H1</option><option>H2</option><option>H3</option>
                          </select>
                          <input defaultValue={block.content} className={`flex-1 rounded border border-border bg-background px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary/30 ${block.level === "H1" ? "text-base font-bold" : block.level === "H2" ? "text-sm font-semibold" : "text-sm font-medium"}`} />
                        </div>
                      )}
                      {block.type === "paragraph" && (
                        <textarea defaultValue={block.content} rows={3} className="w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none leading-relaxed" />
                      )}
                      {block.type === "list" && (
                        <textarea defaultValue={block.content} rows={4} className="w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none font-mono text-xs" />
                      )}
                      {block.type === "faq" && (
                        <div className="space-y-2">
                          <input defaultValue={block.question || ""} placeholder="Question…" className="w-full rounded border border-border bg-background px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30" />
                          <textarea defaultValue={block.answer || ""} placeholder="Answer…" rows={2} className="w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                        </div>
                      )}
                      {block.type === "quote" && (
                        <textarea defaultValue={block.content} rows={2} className="w-full rounded border-l-4 border-l-primary border border-border bg-background px-3 py-2 text-sm italic outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                      )}
                      {block.type === "divider" && (
                        <div className="flex items-center gap-2 py-2">
                          <div className="flex-1 border-t border-border" />
                          <span className="text-xs text-muted-foreground">Divider</span>
                          <div className="flex-1 border-t border-border" />
                        </div>
                      )}
                      {(block.type === "cta" || block.type === "image") && (
                        <div className="rounded border border-dashed border-border bg-muted/30 px-3 py-3 text-xs text-muted-foreground text-center">
                          {block.type === "cta" ? "CTA Block — configure in settings" : "Image Block — click to upload"}
                        </div>
                      )}
                    </div>
                    <button onClick={() => setBlocks(blocks.filter((b) => b.id !== block.id))} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add block */}
              <div className="mt-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">Add Block</p>
                <div className="flex flex-wrap gap-2">
                  {contentBlocks.map(({ type, icon: Icon, label }) => (
                    <button
                      key={type}
                      onClick={() => setBlocks([...blocks, { id: `b${Date.now()}`, type, level: "H2", content: "" }])}
                      className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Icon className="h-3 w-3" />{label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Publish widget */}
            <div className="card-elevated rounded-lg p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Publish</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <StatusBadge status="Published" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Content</span>
                  <StatusBadge status="Complete" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">SEO</span>
                  <StatusBadge status="Complete" />
                </div>
              </div>
            </div>

            {/* SEO Panel — auto-prefilled */}
            <div className="card-elevated rounded-lg">
              <button
                onClick={() => setSeoExpanded(!seoExpanded)}
                className="flex w-full items-center justify-between p-4 text-sm font-semibold text-foreground"
              >
                SEO Settings
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-ai-bg text-ai-fg">Auto-filled</span>
                  {seoExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>
              {seoExpanded && (
                <div className="border-t border-border p-4 space-y-3">
                  {[
                    { label: "Meta Title", value: "Magnesium Side Effects: Complete Guide 2025" },
                    { label: "Meta Description", value: "Learn about common and rare magnesium side effects, safe dosage, and who should avoid supplementation." },
                    { label: "Focus Keyword", value: "magnesium side effects" },
                    { label: "Canonical URL", value: "", placeholder: "Leave blank to use page URL" },
                    { label: "OG Title", value: "", placeholder: "Defaults to Meta Title" },
                  ].map(({ label, value, placeholder }) => (
                    <div key={label}>
                      <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
                      <input defaultValue={value} placeholder={placeholder} className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground" />
                    </div>
                  ))}

                  {/* SEO Preview */}
                  <div className="mt-2 rounded-lg border border-border bg-muted/40 p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Search Preview</p>
                    <p className="text-sm font-medium text-primary hover:underline cursor-pointer">Magnesium Side Effects: Complete Guide 2025</p>
                    <p className="text-xs text-status-approved">magnesiumguide.com › side-effects</p>
                    <p className="text-xs text-muted-foreground mt-1">Learn about common and rare magnesium side effects, safe dosage, and who should avoid supplementation.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-card rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">Page Preview</span>
                <span className="text-xs text-muted-foreground">— magnesiumguide.com/side-effects</span>
              </div>
              <div className="flex items-center gap-2">
                <a href="#" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink className="h-3.5 w-3.5" />Open full
                </a>
                <button onClick={() => setPreviewOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-xl mx-auto space-y-5">
                {blocks.map((block) => (
                  <div key={block.id}>
                    {block.type === "heading" && (
                      block.level === "H1" ? <h1 className="text-2xl font-bold text-foreground leading-snug">{block.content}</h1>
                      : block.level === "H2" ? <h2 className="text-lg font-semibold text-foreground mt-2">{block.content}</h2>
                      : <h3 className="text-base font-semibold text-foreground">{block.content}</h3>
                    )}
                    {block.type === "paragraph" && <p className="text-sm text-foreground leading-relaxed">{block.content}</p>}
                    {block.type === "list" && (
                      <ul className="space-y-1.5 list-none">
                        {block.content.split("\n").filter(Boolean).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {block.type === "faq" && (
                      <div className="rounded-lg border border-border bg-muted/30 p-4">
                        <p className="text-sm font-semibold text-foreground mb-1.5">Q: {block.question}</p>
                        <p className="text-sm text-muted-foreground">{block.answer}</p>
                      </div>
                    )}
                    {block.type === "quote" && (
                      <blockquote className="border-l-4 border-primary pl-4 italic text-sm text-muted-foreground">{block.content}</blockquote>
                    )}
                    {block.type === "divider" && <hr className="border-border" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
