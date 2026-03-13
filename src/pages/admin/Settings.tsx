import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";

const tabs = ["General", "Site Defaults", "SEO Defaults", "AI Defaults", "Review Moderation", "Comment Moderation"];

const settingGroups: Record<string, { label: string; type: string; value: string | boolean; desc?: string }[]> = {
  General: [
    { label: "Platform Name", type: "text", value: "SiteHQ" },
    { label: "Admin Email", type: "email", value: "admin@sitehq.com" },
    { label: "Default Language", type: "select", value: "EN" },
    { label: "Timezone", type: "select", value: "UTC" },
  ],
  "Site Defaults": [
    { label: "Default Publish Status for New Pages", type: "select", value: "Draft" },
    { label: "Auto-generate Header Pages on Site Creation", type: "toggle", value: true, desc: "Automatically create the default header page set when a new site is initialized." },
    { label: "Auto-generate Footer Pages on Site Creation", type: "toggle", value: true },
    { label: "Default Blog Article Status", type: "select", value: "Draft" },
  ],
  "SEO Defaults": [
    { label: "Default Meta Title Pattern", type: "text", value: "{page_title} | {site_name}" },
    { label: "Default Meta Description Length", type: "select", value: "155 characters" },
    { label: "Auto-generate OG Tags", type: "toggle", value: true, desc: "Generate Open Graph tags from meta title and description automatically." },
    { label: "Include Schema.org Markup", type: "toggle", value: true },
  ],
  "AI Defaults": [
    { label: "Default Tone of Voice", type: "select", value: "Scientific & Accessible" },
    { label: "Default Article Length", type: "select", value: "1500–2500 words" },
    { label: "Auto-save AI drafts", type: "toggle", value: true, desc: "Automatically save AI-generated content as drafts before review." },
    { label: "Require human approval before publishing AI content", type: "toggle", value: true },
  ],
  "Review Moderation": [
    { label: "Auto-approve reviews from verified users", type: "toggle", value: false },
    { label: "Auto-flag reviews with reports threshold", type: "select", value: "3 reports" },
    { label: "Minimum review length (characters)", type: "text", value: "50" },
    { label: "Allow anonymous reviews", type: "toggle", value: true },
  ],
  "Comment Moderation": [
    { label: "Auto-approve comments from repeat commenters", type: "toggle", value: false },
    { label: "Hold comments with links for review", type: "toggle", value: true, desc: "Comments containing URLs will be held for manual review." },
    { label: "Maximum comment length", type: "text", value: "1000" },
    { label: "Email notification on new comment", type: "toggle", value: true },
  ],
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState("General");
  const fields = settingGroups[activeTab] || [];

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <PageHeader title="Settings" description="Configure platform-wide defaults and behavior." breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Settings" }]} />
        <div className="flex gap-6">
          <div className="w-44 shrink-0 space-y-0.5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeTab === tab ? "bg-primary-light text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1 card-elevated rounded-xl p-6 space-y-5">
            <h2 className="text-base font-semibold text-foreground">{activeTab}</h2>
            {fields.map((field) => (
              <div key={field.label} className="flex items-start justify-between gap-4 pb-5 border-b border-border last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{field.label}</p>
                  {field.desc && <p className="text-xs text-muted-foreground mt-0.5">{field.desc}</p>}
                </div>
                {field.type === "toggle" ? (
                  <div className={`relative h-5 w-9 rounded-full transition-colors cursor-pointer shrink-0 ${field.value ? "bg-primary" : "bg-muted"}`}>
                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-card shadow-sm transition-transform ${field.value ? "translate-x-4" : "translate-x-0.5"}`} />
                  </div>
                ) : field.type === "select" ? (
                  <select defaultValue={String(field.value)} className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 w-48 shrink-0">
                    <option>{field.value}</option>
                  </select>
                ) : (
                  <input type={field.type} defaultValue={String(field.value)} className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 w-48 shrink-0" />
                )}
              </div>
            ))}
            <div className="pt-2">
              <button className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-primary transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
