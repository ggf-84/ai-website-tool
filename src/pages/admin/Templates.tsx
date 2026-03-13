import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { templates } from "@/data/mockData";
import { LayoutTemplate } from "lucide-react";

export default function Templates() {
  const productTpls = templates.filter((t) => t.siteType === "Product Site");
  const reviewTpls = templates.filter((t) => t.siteType === "Review Site");

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Templates" description="Browse available site templates and their configurations." breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Templates" }]} />
        {[{ label: "Product Site Templates", items: productTpls }, { label: "Review Site Templates", items: reviewTpls }].map(({ label, items }) => (
          <div key={label} className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">{label}</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {items.map((tpl) => (
                <div key={tpl.id} className="card-elevated rounded-xl overflow-hidden card-hover">
                  <div className={`h-32 bg-gradient-to-br ${tpl.color} flex items-center justify-center relative`}>
                    <LayoutTemplate className="h-10 w-10 text-white/60" />
                    {tpl.usageCount > 0 && (
                      <span className="absolute top-2 right-2 rounded-md bg-black/30 px-1.5 py-0.5 text-xs text-white font-medium backdrop-blur-sm">{tpl.usageCount} sites</span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm text-foreground">{tpl.name}</p>
                      <StatusBadge status={tpl.usageCount > 0 ? "Active" : "Draft"} />
                    </div>
                    <p className="text-xs text-muted-foreground">{tpl.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
