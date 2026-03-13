import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { FilterBar, FilterSelect } from "@/components/admin/FilterBar";
import { Search, AlertCircle, CheckCircle, FileText } from "lucide-react";
import { pages, articles } from "@/data/mockData";

const seoData = [
  ...pages.map((p) => ({ title: p.title, site: p.site, type: "Page", metaTitle: p.seoStatus === "Complete" ? "✓" : "Missing", metaDesc: p.seoStatus === "Complete" ? "✓" : "Missing", keyword: p.seoStatus === "Complete" ? "Set" : "Missing", slug: p.slug, score: p.seoStatus === "Complete" ? 87 : 40 })),
  ...articles.map((a) => ({ title: a.title, site: a.site, type: "Article", metaTitle: a.seoStatus === "Complete" ? "✓" : "Missing", metaDesc: a.seoStatus === "Complete" ? "✓" : "Missing", keyword: a.seoStatus === "Complete" ? "Set" : "Missing", slug: "/blog/" + a.title.toLowerCase().replace(/ /g, "-").slice(0, 30), score: a.seoStatus === "Complete" ? 82 : 45 })),
];

export default function SEO() {
  const columns = [
    { key: "title", label: "Content Title", render: (r: typeof seoData[0]) => <span className="text-sm font-medium text-foreground">{r.title}</span> },
    { key: "site", label: "Site", render: (r: typeof seoData[0]) => <span className="text-sm text-foreground">{r.site}</span> },
    { key: "type", label: "Type", render: (r: typeof seoData[0]) => <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{r.type}</span> },
    { key: "metaTitle", label: "Meta Title", render: (r: typeof seoData[0]) => <StatusBadge status={r.metaTitle === "✓" ? "Complete" : "Missing Meta"} /> },
    { key: "metaDesc", label: "Meta Desc", render: (r: typeof seoData[0]) => <StatusBadge status={r.metaDesc === "✓" ? "Complete" : "Missing Meta"} /> },
    { key: "keyword", label: "Keyword", render: (r: typeof seoData[0]) => <StatusBadge status={r.keyword === "Set" ? "Active" : "Missing Keywords"} /> },
    { key: "score", label: "SEO Score", render: (r: typeof seoData[0]) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary" style={{ width: `${r.score}%` }} />
        </div>
        <span className="text-xs font-medium text-foreground">{r.score}</span>
      </div>
    )},
  ];

  const missingMeta = seoData.filter((s) => s.metaTitle === "Missing").length;
  const missingDesc = seoData.filter((s) => s.metaDesc === "Missing").length;
  const missingKw = seoData.filter((s) => s.keyword === "Missing").length;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader title="SEO" description="Monitor and optimize SEO across all your content." breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "SEO" }]} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
          <StatCard title="Indexed-Ready" value={seoData.filter((s) => s.score > 70).length} icon={<CheckCircle className="h-5 w-5" />} delay={0} />
          <StatCard title="Missing Meta Title" value={missingMeta} icon={<AlertCircle className="h-5 w-5" />} delay={0.04} />
          <StatCard title="Missing Meta Desc" value={missingDesc} icon={<AlertCircle className="h-5 w-5" />} delay={0.08} />
          <StatCard title="Missing Keywords" value={missingKw} icon={<Search className="h-5 w-5" />} delay={0.12} />
        </div>
        <FilterBar searchPlaceholder="Search content…">
          <FilterSelect label="All Types" options={["Page", "Article"]} />
          <FilterSelect label="All Sites" options={[...new Set(seoData.map((s) => s.site))]} />
        </FilterBar>
        <DataTable columns={columns as never} data={seoData as never} />
      </div>
    </AdminLayout>
  );
}
