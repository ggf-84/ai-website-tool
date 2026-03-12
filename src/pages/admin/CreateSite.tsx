import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Globe, Star, ArrowLeft, Zap, LayoutTemplate, Users, Sparkles, X } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { templates, authors } from "@/data/mockData";

const steps = ["Site Type", "Template", "Details", "Authors", "Preview", "Confirm"];

const productTemplates = templates.filter((t) => t.siteType === "Product Site");
const reviewTemplates = templates.filter((t) => t.siteType === "Review Site");

const defaultPages = {
  "Product Site": {
    header: ["Overview", "Side Effects", "Cycle", "Bodybuilding", "Overdose", "Images", "Reviews"],
    footer: ["Terms of Use", "Privacy Policy", "Help Center", "Company", "Where to Buy"],
  },
  "Review Site": {
    header: ["All Reviews", "By Category", "Top Rated", "Recent", "Expert Picks"],
    footer: ["Terms of Use", "Privacy Policy", "About Us", "Contact", "Advertising"],
  },
};

const authorTemplates = [
  { id: "at-1", name: "Medical Doctor", avatar: "MD", specialty: "General Medicine", tone: "Scientific & Accessible", style: "Short sentences, scientific references, addresses reader directly" },
  { id: "at-2", name: "Registered Dietitian", avatar: "RD", specialty: "Clinical Nutrition", tone: "Friendly, Evidence-based", style: "Uses bullet points, concise conclusions, practical advice" },
  { id: "at-3", name: "Health Journalist", avatar: "HJ", specialty: "Consumer Health", tone: "Engaging, Educational", style: "Clear storytelling, reader-first, relatable language" },
  { id: "at-4", name: "Sports Nutritionist", avatar: "SN", specialty: "Athletic Performance", tone: "Authoritative, Precise", style: "Data-driven, performance-focused, concise" },
];

export default function CreateSite() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [siteType, setSiteType] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [formData, setFormData] = useState({
    name: "", domain: "", description: "", aiContext: "", product: "", language: "EN", status: "Draft",
  });
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [generatingAuthors, setGeneratingAuthors] = useState(false);
  const [authorsGenerated, setAuthorsGenerated] = useState(false);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const availableTemplates = siteType === "Product Site" ? productTemplates : reviewTemplates;
  const pageStruct = defaultPages[siteType as keyof typeof defaultPages] || defaultPages["Product Site"];

  const toggleAuthor = (id: string) => setSelectedAuthors((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleGenerateAuthors = () => {
    setGeneratingAuthors(true);
    setTimeout(() => {
      setGeneratingAuthors(false);
      setAuthorsGenerated(true);
      setSelectedAuthors(authorTemplates.slice(0, 2).map((a) => a.id));
    }, 1500);
  };

  const handleCreate = () => {
    setCreating(true);
    setTimeout(() => { setCreating(false); setCreated(true); }, 1800);
  };

  if (created) {
    return (
      <AdminLayout>
        <div className="max-w-lg mx-auto mt-20 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-status-published/10">
              <Check className="h-10 w-10 text-status-published" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Site Created!</h2>
            <p className="text-muted-foreground">
              <strong>{formData.name || "Your new site"}</strong> has been initialized with a full base structure.
            </p>
            <div className="rounded-xl border border-border bg-card p-5 text-left w-full">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Auto-generated Structure</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-medium text-foreground mb-1">Header Pages</p>
                  {pageStruct.header.map((p) => (
                    <p key={p} className="text-muted-foreground text-xs flex items-center gap-1"><Check className="h-3 w-3 text-status-published" />{p}</p>
                  ))}
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Footer Pages</p>
                  {pageStruct.footer.map((p) => (
                    <p key={p} className="text-muted-foreground text-xs flex items-center gap-1"><Check className="h-3 w-3 text-status-published" />{p}</p>
                  ))}
                </div>
              </div>
              {selectedAuthors.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="font-medium text-foreground mb-1 text-sm">Assigned Authors</p>
                  {authorTemplates.filter((a) => selectedAuthors.includes(a.id)).map((a) => (
                    <p key={a.id} className="text-xs text-muted-foreground flex items-center gap-1"><Check className="h-3 w-3 text-status-published" />{a.name} — {a.specialty}</p>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => navigate("/sites")} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-primary transition-all">
              View All Sites
            </button>
          </motion.div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <PageHeader
          title="Create New Site"
          breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Sites", href: "/sites" }, { label: "New Site" }]}
        />

        {/* Progress steps */}
        <div className="flex items-center gap-0 mb-8 overflow-x-auto">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center shrink-0">
              <div className={`flex items-center gap-2 ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold border-2 transition-all ${
                  i < step ? "bg-primary border-primary text-primary-foreground"
                  : i === step ? "border-primary text-primary bg-primary-light"
                  : "border-border text-muted-foreground"
                }`}>
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-primary" : ""}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-6 sm:w-12 h-0.5 mx-1 transition-all ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="card-elevated rounded-xl p-6">
          <AnimatePresence mode="wait">
            {/* Step 0: Site Type */}
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <h2 className="text-lg font-semibold mb-1">Choose Site Type</h2>
                <p className="text-sm text-muted-foreground mb-6">Select the kind of website you want to build.</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { type: "Product Site", icon: Globe, desc: "Showcase and promote a specific supplement or health product. Includes product pages, blog, and reviews." },
                    { type: "Review Site", icon: Star, desc: "A reviews-focused platform aggregating user and expert reviews across multiple products." },
                  ].map(({ type, icon: Icon, desc }) => (
                    <button
                      key={type}
                      onClick={() => setSiteType(type)}
                      className={`rounded-xl border-2 p-5 text-left transition-all hover:border-primary/50 ${siteType === type ? "border-primary bg-primary-light" : "border-border"}`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg mb-3 ${siteType === type ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="font-semibold text-foreground">{type}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Template */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <h2 className="text-lg font-semibold mb-1">Choose a Template</h2>
                <p className="text-sm text-muted-foreground mb-6">Select a visual template for your {siteType}.</p>
                <div className="grid grid-cols-2 gap-4">
                  {availableTemplates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => setSelectedTemplate(tpl.id)}
                      className={`rounded-xl border-2 overflow-hidden text-left transition-all hover:border-primary/50 ${selectedTemplate === tpl.id ? "border-primary" : "border-border"}`}
                    >
                      <div className={`h-28 bg-gradient-to-br ${tpl.color} flex items-center justify-center relative`}>
                        <LayoutTemplate className="h-10 w-10 text-white/70" />
                        {selectedTemplate === tpl.id && (
                          <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-sm text-foreground">{tpl.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{tpl.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <h2 className="text-lg font-semibold mb-1">Site Details</h2>
                <p className="text-sm text-muted-foreground mb-6">Fill in the basic information for your new site.</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Site Name", key: "name", placeholder: "e.g. MagnesiumGuide" },
                    { label: "Domain", key: "domain", placeholder: "e.g. magnesiumguide.com" },
                    { label: "Primary Product", key: "product", placeholder: "e.g. Magnesium Glycinate" },
                    { label: "Language", key: "language", placeholder: "EN" },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-foreground mb-1.5">{label}</label>
                      <input
                        type="text"
                        placeholder={placeholder}
                        value={formData[key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
                      />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-foreground mb-1.5">Site Description</label>
                    <textarea
                      placeholder="Short description of this site's purpose…"
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground resize-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-foreground mb-1">
                      AI Context <span className="text-ai-fg font-normal">(influences all AI-generated content)</span>
                    </label>
                    <textarea
                      placeholder="e.g. This site is about magnesium supplements for health-conscious adults aged 30–60. Focus on sleep, stress relief, and muscle recovery. Avoid overly clinical language. Target audience is informed but not medical professionals."
                      rows={3}
                      value={formData.aiContext}
                      onChange={(e) => setFormData({ ...formData, aiContext: e.target.value })}
                      className="w-full rounded-md border border-ai-border bg-ai-bg/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ai-fg/20 placeholder:text-muted-foreground resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">This context will be automatically used when generating blog posts, pages, reviews, and comments for this site.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Initial Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Authors */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <h2 className="text-lg font-semibold mb-1">Assign Authors</h2>
                <p className="text-sm text-muted-foreground mb-6">Each site should have its own set of content authors used for publishing and AI generation.</p>

                <div className="flex items-center gap-3 mb-5">
                  <button
                    onClick={handleGenerateAuthors}
                    disabled={generatingAuthors}
                    className="flex items-center gap-2 rounded-lg bg-ai-bg border border-ai-border px-4 py-2 text-sm font-medium text-ai-fg hover:bg-ai-bg/80 disabled:opacity-60 transition-colors"
                  >
                    {generatingAuthors ? <><div className="h-3.5 w-3.5 rounded-full border-2 border-ai-fg/30 border-t-ai-fg animate-spin" />Generating…</> : <><Sparkles className="h-3.5 w-3.5" />Generate Default Authors</>}
                  </button>
                  <span className="text-xs text-muted-foreground">or select manually below</span>
                </div>

                {authorsGenerated && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-4 rounded-lg bg-status-published/5 border border-status-published/20 px-3 py-2 text-xs text-status-published font-medium">
                    ✓ 2 default authors generated and pre-selected for this site
                  </motion.div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {authorTemplates.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => toggleAuthor(a.id)}
                      className={`rounded-xl border-2 p-4 text-left transition-all ${selectedAuthors.includes(a.id) ? "border-primary bg-primary-light" : "border-border hover:border-primary/40"}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                          {a.avatar}
                        </div>
                        {selectedAuthors.includes(a.id) && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      <p className="font-semibold text-foreground text-sm">{a.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.specialty}</p>
                      <p className="text-xs text-muted-foreground/70 mt-1 leading-tight">{a.style}</p>
                    </button>
                  ))}
                </div>

                {selectedAuthors.length === 0 && (
                  <p className="text-xs text-muted-foreground mt-3 text-center">You can skip this step and add authors later from the Authors section.</p>
                )}
              </motion.div>
            )}

            {/* Step 4: Preview */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <h2 className="text-lg font-semibold mb-1">Auto-Generated Structure Preview</h2>
                <p className="text-sm text-muted-foreground mb-6">When your site is created, the following structure will be automatically initialized.</p>
                <div className="rounded-xl bg-muted/50 border border-border p-5 mb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                      {(formData.name || "S").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{formData.name || "Your Site"}</p>
                      <p className="text-xs text-muted-foreground">{formData.domain || "yourdomain.com"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[{ title: "Header Pages", pages: pageStruct.header }, { title: "Footer Pages", pages: pageStruct.footer }].map(({ title, pages: pg }) => (
                      <div key={title}>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">{title}</p>
                        <div className="space-y-1">
                          {pg.map((p) => (
                            <div key={p} className="flex items-center gap-2 text-sm text-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />{p}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[{ l: "Blog Section", desc: "Ready for articles" }, { l: "Reviews Section", desc: "Rating + submission form" }, { l: "SEO Structure", desc: "Meta, OG, schema.org" }].map(({ l, desc }) => (
                      <div key={l} className="rounded-lg bg-card border border-border p-3">
                        <p className="text-xs font-medium text-foreground">{l}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Confirm */}
            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <h2 className="text-lg font-semibold mb-1">Confirm & Create</h2>
                <p className="text-sm text-muted-foreground mb-6">Review your configuration before creating the site.</p>
                <div className="space-y-3 mb-6">
                  {[
                    ["Site Type", siteType],
                    ["Template", templates.find((t) => t.id === selectedTemplate)?.name ?? "—"],
                    ["Site Name", formData.name || "—"],
                    ["Domain", formData.domain || "—"],
                    ["Primary Product", formData.product || "—"],
                    ["Language", formData.language || "EN"],
                    ["Initial Status", formData.status],
                    ["Authors Assigned", selectedAuthors.length > 0 ? `${selectedAuthors.length} author(s)` : "None (add later)"],
                    ["AI Context", formData.aiContext ? "Configured ✓" : "Not set"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <span className="text-sm font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleCreate}
                  disabled={creating}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-primary transition-all disabled:opacity-70"
                >
                  {creating
                    ? <span className="flex items-center gap-2"><div className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" /> Initializing site…</span>
                    : <span className="flex items-center gap-2"><Zap className="h-4 w-4" />Create Site</span>
                  }
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step < 5 && (
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />Back
              </button>
              <div className="flex items-center gap-2">
                {step === 3 && (
                  <button onClick={() => setStep(step + 1)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Skip for now
                  </button>
                )}
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={(step === 0 && !siteType) || (step === 1 && !selectedTemplate)}
                  className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40 shadow-primary transition-all"
                >
                  Continue <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
