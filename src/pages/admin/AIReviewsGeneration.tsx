import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Check, RefreshCw, Eye, X, ChevronLeft, Save, Upload } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";

type GenReview = {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  site: string;
  userType: "Patient" | "Caregiver";
  gender: string;
  age: number;
  duration: string;
  condition: string;
  reviewText: string;
  effectiveness: number;
  easeOfUse: number;
  satisfaction: number;
  overallRating: number;
};

const firstNames = ["Elena", "David", "Sophie", "Marc", "Priya", "Jake", "Nadia", "Ben", "Amelia", "Carlos", "Fiona", "Tom"];
const lastNames = ["M.", "K.", "T.", "B.", "R.", "L.", "G.", "W.", "H.", "V.", "D.", "N."];
const conditions = ["Sleep improvement", "Muscle recovery", "Stress & anxiety", "Athletic performance", "Bone density", "Energy levels", "General wellness"];
const durations = ["2 weeks", "1 month", "6 weeks", "3 months", "5 months", "Over a year"];
const reviewTexts = [
  "I started taking this three months ago and the difference in my sleep quality has been remarkable. I fall asleep faster and wake up feeling genuinely rested.",
  "Was skeptical at first but after 6 weeks I have to say the muscle cramps I was getting during training have almost completely disappeared.",
  "My nutritionist recommended this and I'm glad she did. Noticed improvements in my energy levels within a few weeks. No side effects at all.",
  "Honestly wasn't expecting much but this has become part of my daily routine. Stress levels feel more manageable and I sleep deeper.",
  "Good product. I've tried a few different brands and this one works best for me. Easy to take, no stomach issues.",
  "Been using for 5 months now for bone health support after my doctor suggested it. My last checkup showed encouraging improvements.",
  "After reading the article on this site I decided to try it. Three weeks in and I can feel the difference during my evening workouts.",
];

function generateReviews(count: number, sites: string[], ratingStyle: string, length: string): GenReview[] {
  return Array.from({ length: count }, (_, i) => {
    const eff = ratingStyle === "Mostly positive" ? Math.min(5, 3 + Math.floor(Math.random() * 3)) : Math.max(1, 1 + Math.floor(Math.random() * 5));
    const ease = ratingStyle === "Mostly positive" ? Math.min(5, 3 + Math.floor(Math.random() * 3)) : Math.max(1, 1 + Math.floor(Math.random() * 5));
    const sat = ratingStyle === "Mostly positive" ? Math.min(5, 3 + Math.floor(Math.random() * 3)) : Math.max(1, 1 + Math.floor(Math.random() * 5));
    return {
      id: `gen-rev-${i}`,
      firstName: firstNames[i % firstNames.length],
      lastName: lastNames[i % lastNames.length],
      displayName: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      site: sites[i % sites.length],
      userType: i % 4 === 0 ? "Caregiver" : "Patient",
      gender: i % 3 === 0 ? "Male" : "Female",
      age: 25 + (i * 7 % 35),
      duration: durations[i % durations.length],
      condition: conditions[i % conditions.length],
      reviewText: reviewTexts[i % reviewTexts.length],
      effectiveness: eff,
      easeOfUse: ease,
      satisfaction: sat,
      overallRating: Math.round((eff + ease + sat) / 3),
    };
  });
}

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button key={i} type="button" onClick={() => onChange?.(i)}
          onMouseEnter={() => onChange && setHover(i)} onMouseLeave={() => onChange && setHover(0)}
          className={`text-base transition-colors ${(hover || value) >= i ? "text-amber-400" : "text-muted-foreground/30"} ${onChange ? "cursor-pointer" : "cursor-default"}`}>
          ★
        </button>
      ))}
    </div>
  );
}

export default function AIReviewsGeneration() {
  const [selectedSites, setSelectedSites] = useState<string[]>(["MagnesiumGuide"]);
  const [count, setCount] = useState(10);
  const [personas, setPersonas] = useState(5);
  const [ratingStyle, setRatingStyle] = useState("Mostly positive");
  const [reviewLength, setReviewLength] = useState("Medium");
  const [languageStyle, setLanguageStyle] = useState("Natural (slight imperfections)");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [generatedReviews, setGeneratedReviews] = useState<GenReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<GenReview | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<GenReview | null>(null);

  const sites = ["MagnesiumGuide", "VitaminHQ", "OmegaBest", "SupplementReviewer"];
  const toggleSite = (s: string) => setSelectedSites((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGeneratedReviews(generateReviews(count, selectedSites, ratingStyle, reviewLength));
      setGenerating(false);
      setGenerated(true);
    }, 2200);
  };

  const openReview = (r: GenReview) => { setSelectedReview(r); setEditData({ ...r }); setEditMode(false); };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="AI Reviews Generation"
          description="Generate realistic AI reviewer profiles and reviews for your product sites."
          breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "AI Reviews" }]}
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

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">Target Sites</label>
                <div className="space-y-1.5">
                  {sites.map((s) => (
                    <label key={s} className="flex items-center gap-2.5 cursor-pointer">
                      <div onClick={() => toggleSite(s)} className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-colors ${selectedSites.includes(s) ? "border-primary bg-primary" : "border-border"}`}>
                        {selectedSites.includes(s) && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                      </div>
                      <span className="text-sm text-foreground">{s}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <div onClick={() => setSelectedSites(sites)} className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-colors ${selectedSites.length === sites.length ? "border-primary bg-primary" : "border-border"}`}>
                      {selectedSites.length === sites.length && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                    </div>
                    <span className="text-sm text-muted-foreground">All Sites</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Number of Reviews</label>
                  <input type="number" value={count} onChange={(e) => setCount(Math.max(1, +e.target.value))} min={1} max={50}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">AI Personas</label>
                  <input type="number" value={personas} onChange={(e) => setPersonas(Math.max(1, +e.target.value))} min={1} max={20}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Rating Distribution</label>
                <select value={ratingStyle} onChange={(e) => setRatingStyle(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  <option>Mostly positive (4–5 stars)</option>
                  <option>Mixed (3–5 stars)</option>
                  <option>Realistic spread</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Review Length</label>
                <select value={reviewLength} onChange={(e) => setReviewLength(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  <option>Short (1–2 sentences)</option>
                  <option>Medium</option>
                  <option>Long & Detailed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Language Style</label>
                <select value={languageStyle} onChange={(e) => setLanguageStyle(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  <option>Natural (slight imperfections)</option>
                  <option>Polished</option>
                  <option>Casual & Informal</option>
                </select>
              </div>

              <div className="rounded-lg bg-muted/50 border border-border p-3 text-xs space-y-1">
                <p className="font-medium text-foreground">Each review will include:</p>
                {["First & last name + display identity", "User type, gender, age", "Duration of use + condition", "Review text", "Effectiveness / Ease / Satisfaction ratings", "Optional profile photo placeholder"].map((f) => (
                  <p key={f} className="flex items-center gap-1.5 text-muted-foreground"><Check className="h-3 w-3 text-status-approved shrink-0" />{f}</p>
                ))}
              </div>

              <button onClick={handleGenerate} disabled={generating || selectedSites.length === 0}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-ai-fg py-2.5 text-sm font-semibold text-white hover:bg-ai-fg/90 disabled:opacity-60 transition-all shadow-md">
                {generating
                  ? <><div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Generating…</>
                  : <><Sparkles className="h-4 w-4" />Generate {count} Reviews</>}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="card-elevated rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />Generated Reviews
                </p>
                {generated && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-ai-fg flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />{generatedReviews.length} AI-generated
                    </span>
                    <StatusBadge status="Pending" />
                  </div>
                )}
              </div>

              <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                {!generated && !generating && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-3">
                      <Star className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">No reviews generated yet</p>
                    <p className="text-xs text-muted-foreground max-w-[220px]">Configure settings and click Generate to create a batch of AI reviewer profiles and reviews.</p>
                  </div>
                )}
                {generating && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <div className="h-8 w-8 rounded-full border-2 border-ai-fg/20 border-t-ai-fg animate-spin" />
                    <p className="text-sm text-muted-foreground">Creating {count} reviewer profiles…</p>
                  </div>
                )}
                <AnimatePresence>
                  {generated && generatedReviews.map((r, i) => (
                    <motion.div key={r.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => openReview(r)}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ai-bg text-ai-fg text-xs font-semibold shrink-0">
                        {r.firstName.slice(0, 1)}{r.lastName.slice(0, 1)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-medium text-foreground">{r.displayName}</p>
                          <span className="text-xs text-muted-foreground">{r.gender}, {r.age}</span>
                          <span className="ml-auto text-xs text-muted-foreground">{r.site}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <StarRating value={r.overallRating} />
                          <span className="text-xs text-muted-foreground">{r.condition}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{r.reviewText}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <div className="flex items-center gap-0.5 rounded bg-ai-bg px-1.5 py-0.5">
                          <Sparkles className="h-2.5 w-2.5 text-ai-fg" />
                          <span className="text-[10px] text-ai-fg font-medium">AI</span>
                        </div>
                        <button className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
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

      {/* Review Detail Drawer */}
      <AnimatePresence>
        {selectedReview && editData && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40" onClick={() => setSelectedReview(null)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[520px] bg-card border-l border-border z-50 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSelectedReview(null)} className="text-muted-foreground hover:text-foreground"><ChevronLeft className="h-5 w-5" /></button>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{selectedReview.displayName}</p>
                    <p className="text-xs text-muted-foreground">{selectedReview.site} · AI-generated</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!editMode
                    ? <button onClick={() => setEditMode(true)} className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">Edit</button>
                    : <button onClick={() => setEditMode(false)} className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                        <Save className="h-3.5 w-3.5" />Save
                      </button>
                  }
                  <button onClick={() => setSelectedReview(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded bg-ai-bg px-2 py-0.5">
                    <Sparkles className="h-3 w-3 text-ai-fg" /><span className="text-xs text-ai-fg font-medium">AI-generated</span>
                  </div>
                  <StatusBadge status="Pending" />
                </div>

                <div className="card-elevated rounded-lg p-4 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Reviewer Profile</p>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ai-bg text-ai-fg text-sm font-bold">
                      {editData.firstName.slice(0, 1)}{editData.lastName.slice(0, 1)}
                    </div>
                    {editMode && <button className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted transition-colors"><Upload className="h-3 w-3" />Add Photo</button>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "First Name", key: "firstName" }, { label: "Last Name", key: "lastName" },
                      { label: "Gender", key: "gender" }, { label: "Age", key: "age" },
                      { label: "User Type", key: "userType" }, { label: "Duration of Use", key: "duration" },
                    ].map(({ label, key }) => (
                      <div key={key}>
                        <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
                        {editMode
                          ? <input value={String(editData[key as keyof GenReview] || "")} onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                              className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                          : <p className="text-sm text-foreground">{String(editData[key as keyof GenReview] || "—")}</p>
                        }
                      </div>
                    ))}
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-foreground mb-1">Condition / Use Case</label>
                      {editMode
                        ? <input value={editData.condition} onChange={(e) => setEditData({ ...editData, condition: e.target.value })}
                            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                        : <p className="text-sm text-foreground">{editData.condition}</p>
                      }
                    </div>
                  </div>
                </div>

                <div className="card-elevated rounded-lg p-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Review Text</p>
                  {editMode
                    ? <textarea value={editData.reviewText} onChange={(e) => setEditData({ ...editData, reviewText: e.target.value })}
                        rows={4} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                    : <p className="text-sm text-foreground leading-relaxed">{editData.reviewText}</p>
                  }
                </div>

                <div className="card-elevated rounded-lg p-4 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ratings</p>
                  {[
                    { label: "Effectiveness", key: "effectiveness" },
                    { label: "Ease of Use", key: "easeOfUse" },
                    { label: "Satisfaction", key: "satisfaction" },
                    { label: "Overall Rating", key: "overallRating" },
                  ].map(({ label, key }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <StarRating value={editData[key as keyof GenReview] as number}
                        onChange={editMode ? (v) => setEditData({ ...editData, [key]: v }) : undefined} />
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 rounded-md bg-status-approved/10 border border-status-approved/20 py-2 text-xs font-medium text-status-approved hover:bg-status-approved/20 transition-colors">
                    <Check className="h-3.5 w-3.5" />Approve & Publish
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 rounded-md bg-status-rejected/10 border border-status-rejected/20 py-2 text-xs font-medium text-status-rejected hover:bg-status-rejected/20 transition-colors">
                    <X className="h-3.5 w-3.5" />Reject
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
