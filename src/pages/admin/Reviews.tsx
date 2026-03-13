import { useState } from "react";
import { CheckCircle, XCircle, Eye, Sparkles, X, Star, ChevronLeft, Save, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { FilterBar, FilterSelect } from "@/components/admin/FilterBar";
import { reviews as initialReviews } from "@/data/mockData";

type Review = typeof initialReviews[0] & { reviewText?: string; firstName?: string; lastName?: string };

const extendedReviews: Review[] = initialReviews.map((r) => ({
  ...r,
  firstName: r.reviewer.split(" ")[0],
  lastName: r.reviewer.split(" ").slice(1).join(" ") || "",
  reviewText: r.id === "rev-1"
    ? "I've been taking magnesium glycinate for three months now and the improvement in my sleep quality has been remarkable. I fall asleep faster and wake up feeling more rested. No digestive issues at all, which was a pleasant surprise. Highly recommend to anyone struggling with sleep."
    : r.id === "rev-2"
    ? "The muscle cramps I was getting during training sessions have significantly reduced since starting magnesium. It took about two weeks to notice the difference. Easy to swallow capsules, no unpleasant taste or side effects."
    : r.id === "rev-4"
    ? "As someone who trains five times a week, magnesium has become an essential part of my recovery stack. My energy levels during workouts have improved and post-workout soreness is noticeably less intense. Very happy with the results."
    : r.id === "rev-6"
    ? "I started taking Vitamin D3+K2 after my doctor mentioned my bone density could use some support. After five months I can genuinely say I feel stronger and my last checkup showed improvement. Easy to take, no side effects noticed."
    : "Product was okay. Nothing special to report.",
}));

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange?.(i)}
          onMouseEnter={() => onChange && setHover(i)}
          onMouseLeave={() => onChange && setHover(0)}
          className={`text-lg transition-colors ${(hover || value) >= i ? "text-amber-400" : "text-muted-foreground/30"} ${onChange ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [editData, setEditData] = useState<Review | null>(null);

  const filtered = extendedReviews.filter((r) => {
    const matchStatus = !filterStatus || r.status === filterStatus;
    const matchSource = !filterSource || r.source === filterSource;
    return matchStatus && matchSource;
  });

  const openReview = (r: Review) => {
    setSelectedReview(r);
    setEditData({ ...r });
    setEditMode(false);
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2200);
  };

  const columns = [
    {
      key: "reviewer", label: "Reviewer",
      render: (r: Review) => (
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0">
            {r.reviewer.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-sm text-foreground">{r.reviewer}</p>
            <p className="text-xs text-muted-foreground">{r.gender}{r.age ? `, ${r.age}` : ""}</p>
          </div>
        </div>
      ),
    },
    { key: "site", label: "Site", render: (r: Review) => <span className="text-sm text-foreground">{r.site}</span> },
    { key: "overallRating", label: "Rating", render: (r: Review) => <StarRating value={r.overallRating} /> },
    { key: "condition", label: "Use Case", render: (r: Review) => <span className="text-xs text-muted-foreground">{r.condition}</span> },
    { key: "source", label: "Source", render: (r: Review) => <StatusBadge status={r.source} /> },
    { key: "status", label: "Status", render: (r: Review) => <StatusBadge status={r.status} /> },
    {
      key: "actions", label: "Actions",
      render: (r: Review) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openReview(r)} title="View & Edit" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><Eye className="h-3.5 w-3.5" /></button>
          <button title="Approve" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-status-approved/10 hover:text-status-approved transition-colors"><CheckCircle className="h-3.5 w-3.5" /></button>
          <button title="Reject" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-status-rejected/10 hover:text-status-rejected transition-colors"><XCircle className="h-3.5 w-3.5" /></button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Reviews"
          description="Moderate and manage product reviews across your sites."
          breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Reviews" }]}
          actions={
            <button
              onClick={() => { setGenerateOpen(true); setGenerated(false); }}
              className="flex items-center gap-2 rounded-lg bg-ai-bg border border-ai-border px-4 py-2 text-sm font-medium text-ai-fg hover:bg-ai-bg/80 transition-colors"
            >
              <Sparkles className="h-4 w-4" />Generate Reviews
            </button>
          }
        />

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Total Reviews", value: extendedReviews.length },
            { label: "Pending", value: extendedReviews.filter((r) => r.status === "Pending").length, cls: "text-status-pending" },
            { label: "Approved", value: extendedReviews.filter((r) => r.status === "Approved").length, cls: "text-status-approved" },
          ].map(({ label, value, cls }) => (
            <div key={label} className="card-elevated rounded-lg px-4 py-3">
              <p className={`text-xl font-bold ${cls || "text-foreground"}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <FilterBar searchPlaceholder="" searchValue="" onSearchChange={() => {}} hideSearch>
          <FilterSelect label="All Statuses" options={["Pending", "Approved", "Rejected"]} value={filterStatus} onChange={setFilterStatus} />
          <FilterSelect label="All Sources" options={["User Submitted", "AI-generated", "Imported"]} value={filterSource} onChange={setFilterSource} />
        </FilterBar>

        <DataTable columns={columns as never} data={filtered as never} />
      </div>

      {/* Review Detail / Edit Drawer */}
      <AnimatePresence>
        {selectedReview && editData && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40" onClick={() => setSelectedReview(null)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[560px] bg-card border-l border-border z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSelectedReview(null)} className="text-muted-foreground hover:text-foreground transition-colors"><ChevronLeft className="h-5 w-5" /></button>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{selectedReview.reviewer}</p>
                    <p className="text-xs text-muted-foreground">{selectedReview.site} · {selectedReview.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!editMode ? (
                    <button onClick={() => setEditMode(true)} className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">Edit</button>
                  ) : (
                    <button onClick={() => setEditMode(false)} className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                      <Save className="h-3.5 w-3.5" />Save Changes
                    </button>
                  )}
                  <button onClick={() => setSelectedReview(null)} className="text-muted-foreground hover:text-foreground transition-colors"><X className="h-4 w-4" /></button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* Status row */}
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedReview.status} />
                  <StatusBadge status={selectedReview.source} />
                </div>

                {/* Profile */}
                <div className="card-elevated rounded-lg p-4 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Reviewer Profile</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "First Name", key: "firstName" },
                      { label: "Last Name", key: "lastName" },
                    ].map(({ label, key }) => (
                      <div key={key}>
                        <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
                        {editMode ? (
                          <input value={editData[key as keyof Review] as string || ""} onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                        ) : (
                          <p className="text-sm text-foreground">{editData[key as keyof Review] as string || "—"}</p>
                        )}
                      </div>
                    ))}
                    {[
                      { label: "Gender", key: "gender" },
                      { label: "Age", key: "age" },
                      { label: "User Type", key: "userType" },
                      { label: "Duration of Use", key: "duration" },
                    ].map(({ label, key }) => (
                      <div key={key}>
                        <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
                        {editMode ? (
                          <input value={editData[key as keyof Review] as string || ""} onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                        ) : (
                          <p className="text-sm text-foreground">{editData[key as keyof Review] as string || "—"}</p>
                        )}
                      </div>
                    ))}
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-foreground mb-1">Condition / Use Case</label>
                      {editMode ? (
                        <input value={editData.condition} onChange={(e) => setEditData({ ...editData, condition: e.target.value })}
                          className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                      ) : (
                        <p className="text-sm text-foreground">{editData.condition}</p>
                      )}
                    </div>
                  </div>

                  {/* Photo */}
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-2">Profile Photo</label>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                        {selectedReview.reviewer.slice(0, 2).toUpperCase()}
                      </div>
                      {editMode && (
                        <button className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted transition-colors">
                          <Upload className="h-3 w-3" />Replace Photo
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <div className="card-elevated rounded-lg p-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Review Text</p>
                  {editMode ? (
                    <textarea value={editData.reviewText || ""} onChange={(e) => setEditData({ ...editData, reviewText: e.target.value })}
                      rows={5} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                  ) : (
                    <p className="text-sm text-foreground leading-relaxed">{editData.reviewText || "No review text available."}</p>
                  )}
                </div>

                {/* Ratings */}
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
                      <StarRating
                        value={editData[key as keyof Review] as number}
                        onChange={editMode ? (v) => setEditData({ ...editData, [key]: v }) : undefined}
                      />
                    </div>
                  ))}
                </div>

                {/* Moderation */}
                <div className="card-elevated rounded-lg p-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Moderation</p>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 rounded-md bg-status-approved/10 border border-status-approved/20 py-2 text-xs font-medium text-status-approved hover:bg-status-approved/20 transition-colors">
                      <CheckCircle className="h-3.5 w-3.5" />Approve
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 rounded-md bg-status-rejected/10 border border-status-rejected/20 py-2 text-xs font-medium text-status-rejected hover:bg-status-rejected/20 transition-colors">
                      <XCircle className="h-3.5 w-3.5" />Reject
                    </button>
                  </div>
                  {editMode && (
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">Internal Notes</label>
                      <textarea rows={2} placeholder="Add internal moderation notes…"
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary/30 resize-none placeholder:text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Generate Reviews Panel */}
      <AnimatePresence>
        {generateOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40" onClick={() => setGenerateOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] bg-card rounded-2xl border border-border shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-ai-bg">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-ai-fg" />
                  <p className="font-semibold text-foreground text-sm">Generate AI Reviews</p>
                </div>
                <button onClick={() => setGenerateOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-foreground mb-1.5">Site</label>
                    <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                      <option>MagnesiumGuide</option>
                      <option>VitaminHQ</option>
                      <option>SupplementReviewer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Number of Reviews</label>
                    <input type="number" defaultValue={10} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">AI Reviewer Personas</label>
                    <input type="number" defaultValue={5} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Review Length</label>
                    <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none">
                      <option>Short (1–3 sentences)</option>
                      <option>Medium (1–2 paragraphs)</option>
                      <option>Long (detailed)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Language Style</label>
                    <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none">
                      <option>Natural (slight imperfections)</option>
                      <option>Polished</option>
                      <option>Casual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Rating Distribution</label>
                    <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none">
                      <option>Mostly positive (4–5 stars)</option>
                      <option>Mixed (3–5 stars)</option>
                      <option>Realistic spread</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">User Gender Mix</label>
                    <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none">
                      <option>Mixed</option>
                      <option>Mostly Female</option>
                      <option>Mostly Male</option>
                    </select>
                  </div>
                </div>

                {generated && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-status-approved/30 bg-status-approved/5 p-3">
                    <p className="text-xs font-semibold text-status-approved mb-2">✓ 10 reviews generated — saved as Pending</p>
                    <div className="space-y-1.5">
                      {["Elena M., 38 · Sleep improvement · ★★★★★", "David K., 52 · Muscle recovery · ★★★★☆", "Sophie T., 29 · Stress & anxiety · ★★★★★", "Marc B., 44 · Athletic performance · ★★★★☆"].map((r) => (
                        <div key={r} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-status-approved shrink-0" />
                          {r}
                        </div>
                      ))}
                      <p className="text-xs text-muted-foreground">+6 more…</p>
                    </div>
                  </motion.div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <button onClick={handleGenerate} disabled={generating} className="flex items-center gap-2 rounded-lg bg-ai-fg px-5 py-2.5 text-sm font-medium text-white hover:bg-ai-fg/90 disabled:opacity-60 transition-all">
                    {generating ? <><div className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />Generating…</> : <><Sparkles className="h-3.5 w-3.5" />Generate Reviews</>}
                  </button>
                  {generated && (
                    <button onClick={() => setGenerateOpen(false)} className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                      View in List
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
