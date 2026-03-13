import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Globe, FileText, BookOpen, Users, Star,
  MessageSquare, Sparkles, Search, Image, Layers, Settings,
  ChevronLeft, ChevronRight, Zap, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Sites", href: "/sites", icon: Globe },
  { label: "Pages", href: "/pages", icon: FileText },
  { label: "Blog Articles", href: "/blog", icon: BookOpen },
  { label: "Authors", href: "/authors", icon: Users },
  { label: "Reviews", href: "/reviews", icon: Star },
  { label: "Comments", href: "/comments", icon: MessageSquare },
  {
    label: "AI Tools",
    href: "/ai-content",
    icon: Sparkles,
    children: [
      { label: "AI Hub", href: "/ai-content" },
      { label: "Blog Generation", href: "/ai-blog" },
      { label: "Comments Generator", href: "/ai-comments" },
      { label: "Reviews Generator", href: "/ai-reviews" },
    ],
  },
  { label: "SEO", href: "/seo", icon: Search },
  { label: "Media Library", href: "/media", icon: Image },
  { label: "Templates", href: "/templates", icon: Layers },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [aiExpanded, setAiExpanded] = useState(true);
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="relative flex h-screen flex-col bg-sidebar overflow-hidden shrink-0 border-r border-sidebar-border"
    >
      {/* Logo */}
      <div className="flex h-14 items-center px-4 shrink-0 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary shrink-0">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="font-semibold text-sm text-sidebar-accent-foreground whitespace-nowrap overflow-hidden"
              >
                SiteHQ Admin
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {navItems.map((item) => {
          const active = location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href));
          const isAiTools = item.children !== undefined;

          if (isAiTools) {
            const anyChildActive = item.children!.some((c) => location.pathname === c.href);
            return (
              <div key={item.href} className="mb-0.5">
                <button
                  onClick={() => !collapsed && setAiExpanded(!aiExpanded)}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group w-full flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-all",
                    (active || anyChildActive)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className={cn("h-4 w-4 shrink-0", (active || anyChildActive) ? "text-sidebar-primary" : "text-sidebar-muted")} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        className="whitespace-nowrap overflow-hidden flex-1 text-left flex items-center justify-between"
                      >
                        {item.label}
                        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", aiExpanded ? "rotate-180" : "")} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <AnimatePresence>
                  {!collapsed && aiExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden ml-4 mt-0.5 space-y-0.5"
                    >
                      {item.children!.map((child) => {
                        const childActive = location.pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all",
                              childActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground"
                            )}
                          >
                            <div className={cn("h-1.5 w-1.5 rounded-full shrink-0", childActive ? "bg-sidebar-primary" : "bg-sidebar-muted")} />
                            {child.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              to={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "group mb-0.5 flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-all",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-sidebar-primary" : "text-sidebar-muted group-hover:text-sidebar-foreground")} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg py-2 text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : (
            <span className="flex items-center gap-2 text-xs">
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </span>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
