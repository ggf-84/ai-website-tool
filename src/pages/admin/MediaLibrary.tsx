import { Upload, Copy, Trash2, Image as ImageIcon } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";

const mockImages = [
  { name: "magnesium-hero.jpg", site: "MagnesiumGuide", date: "2025-03-08", tag: "Hero", w: 1200, h: 630 },
  { name: "vitamin-d-banner.jpg", site: "VitaminHQ", date: "2025-03-07", tag: "Banner", w: 800, h: 400 },
  { name: "dr-claire-avatar.jpg", site: "MagnesiumGuide", date: "2025-03-05", tag: "Author", w: 400, h: 400 },
  { name: "omega3-capsules.jpg", site: "OmegaBest", date: "2025-03-04", tag: "Product", w: 1000, h: 800 },
  { name: "sleep-article-featured.jpg", site: "MagnesiumGuide", date: "2025-03-03", tag: "Article", w: 1200, h: 630 },
  { name: "review-user-sarah.jpg", site: "MagnesiumGuide", date: "2025-03-02", tag: "Review", w: 200, h: 200 },
  { name: "vitaminhq-logo.png", site: "VitaminHQ", date: "2025-02-28", tag: "Logo", w: 300, h: 100 },
  { name: "supplement-overview.jpg", site: "MagnesiumGuide", date: "2025-02-25", tag: "Page", w: 800, h: 500 },
];

const gradients = [
  "from-emerald-400/20 to-teal-400/20", "from-sky-400/20 to-blue-400/20", "from-violet-400/20 to-purple-400/20",
  "from-orange-400/20 to-red-400/20", "from-indigo-400/20 to-blue-400/20", "from-pink-400/20 to-rose-400/20",
  "from-amber-400/20 to-yellow-400/20", "from-slate-400/20 to-gray-400/20",
];

export default function MediaLibrary() {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Media Library"
          description="Manage images and assets used across all your sites."
          breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Media Library" }]}
          actions={
            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-primary transition-all">
              <Upload className="h-4 w-4" />Upload
            </button>
          }
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {mockImages.map((img, i) => (
            <div key={img.name} className="group card-elevated rounded-lg overflow-hidden card-hover">
              <div className={`relative h-32 bg-gradient-to-br ${gradients[i]} flex items-center justify-center`}>
                <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
                <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">
                  <button className="flex h-6 w-6 items-center justify-center rounded bg-card text-muted-foreground hover:text-foreground transition-colors shadow-sm"><Copy className="h-3 w-3" /></button>
                  <button className="flex h-6 w-6 items-center justify-center rounded bg-card text-muted-foreground hover:text-destructive transition-colors shadow-sm"><Trash2 className="h-3 w-3" /></button>
                </div>
                <span className="absolute top-2 left-2 rounded-md bg-card/80 px-1.5 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm">{img.tag}</span>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-foreground truncate">{img.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{img.site} · {img.w}×{img.h}</p>
                <p className="text-xs text-muted-foreground">{img.date}</p>
              </div>
            </div>
          ))}
          <button className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border p-5 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all min-h-[180px]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"><Upload className="h-5 w-5" /></div>
            <p className="text-xs font-medium text-center">Upload Image</p>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
