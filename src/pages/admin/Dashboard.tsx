import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe, FileText, BookOpen, Star, MessageSquare, Sparkles, CalendarClock,
  Clock, Plus, ArrowRight, TrendingUp, AlertCircle,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { dashboardStats, sites, articles, reviews, comments, aiContent } from "@/data/mockData";

const quickActions = [
  { label: "Create New Site", icon: Globe, href: "/sites/new", accent: true },
  { label: "Create Static Page", icon: FileText, href: "/pages/new", accent: false },
  { label: "Generate Blog Article with AI", icon: Sparkles, href: "/blog/new", accent: false },
  { label: "Add Author", icon: BookOpen, href: "/authors/new", accent: false },
  { label: "Review Pending Content", icon: AlertCircle, href: "/reviews", accent: false },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Welcome back. Here's what's happening across your sites.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
          <StatCard title="Total Sites" value={dashboardStats.totalSites} icon={<Globe className="h-5 w-5" />} trend={{ value: 25, positive: true }} delay={0} />
          <StatCard title="Published Pages" value={dashboardStats.publishedPages} icon={<FileText className="h-5 w-5" />} trend={{ value: 8, positive: true }} delay={0.04} />
          <StatCard title="Published Articles" value={dashboardStats.publishedArticles} icon={<BookOpen className="h-5 w-5" />} trend={{ value: 12, positive: true }} delay={0.08} />
          <StatCard title="Total Reviews" value={dashboardStats.totalReviews} icon={<Star className="h-5 w-5" />} trend={{ value: 5, positive: true }} delay={0.12} />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
          <StatCard title="Pending Reviews" value={dashboardStats.pendingReviews} icon={<AlertCircle className="h-5 w-5" />} description="Awaiting moderation" delay={0.14} />
          <StatCard title="Pending Comments" value={dashboardStats.pendingComments} icon={<MessageSquare className="h-5 w-5" />} description="Awaiting approval" delay={0.16} />
          <StatCard title="AI Drafts" value={dashboardStats.aiDrafts} icon={<Sparkles className="h-5 w-5" />} description="Ready for review" delay={0.18} accent />
          <StatCard title="Scheduled Posts" value={dashboardStats.scheduledPosts} icon={<CalendarClock className="h-5 w-5" />} description="Upcoming publishes" delay={0.2} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="card-elevated rounded-lg p-5"
          >
            <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    action.accent
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary"
                      : "border border-border hover:bg-muted/50 text-foreground"
                  }`}
                >
                  <action.icon className="h-4 w-4 shrink-0" />
                  {action.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recently Created Sites */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="card-elevated rounded-lg p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Recent Sites</h2>
              <Link to="/sites" className="text-xs text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <div className="space-y-3">
              {sites.slice(0, 4).map((site) => (
                <div key={site.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold shrink-0">
                      {site.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground leading-tight">{site.name}</p>
                      <p className="text-xs text-muted-foreground">{site.domain}</p>
                    </div>
                  </div>
                  <StatusBadge status={site.status} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Latest Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-elevated rounded-lg p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Latest Reviews</h2>
              <Link to="/reviews" className="text-xs text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <div className="space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-foreground leading-tight">{r.reviewer}</p>
                    <p className="text-xs text-muted-foreground">{r.site} · {r.condition}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <StatusBadge status={r.status} />
                    <span className="text-xs text-muted-foreground">{"★".repeat(r.overallRating)}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent AI Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="card-elevated rounded-lg p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Recent AI Content
              </h2>
              <Link to="/ai-content" className="text-xs text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <div className="space-y-2.5">
              {aiContent.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                  <div>
                    <p className="text-xs font-medium text-foreground">{item.related}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.type} · {item.site}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Latest Comments */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="card-elevated rounded-lg p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Latest Comments</h2>
              <Link to="/comments" className="text-xs text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <div className="space-y-3">
              {comments.slice(0, 4).map((c) => (
                <div key={c.id} className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{c.firstName} {c.lastName}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">"{c.text}"</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.article}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Articles */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
          className="mt-6 card-elevated rounded-lg p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Recent Blog Articles</h2>
            <Link to="/blog" className="text-xs text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {articles.slice(0, 3).map((art) => (
              <div key={art.id} className="rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="badge-ai text-xs font-medium px-2 py-0.5 rounded-full">{art.source}</span>
                  <StatusBadge status={art.status} />
                </div>
                <p className="text-sm font-medium text-foreground leading-snug">{art.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{art.author} · {art.site}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {art.updatedAt}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
