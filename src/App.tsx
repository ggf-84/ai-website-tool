import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/admin/Dashboard";
import Sites from "./pages/admin/Sites";
import CreateSite from "./pages/admin/CreateSite";
import Pages from "./pages/admin/Pages";
import PageEditor from "./pages/admin/PageEditor";
import BlogArticles from "./pages/admin/BlogArticles";
import ArticleEditor from "./pages/admin/ArticleEditor";
import Authors from "./pages/admin/Authors";
import Reviews from "./pages/admin/Reviews";
import Comments from "./pages/admin/Comments";
import AIContent from "./pages/admin/AIContent";
import AIBlogGeneration from "./pages/admin/AIBlogGeneration";
import AICommentsGeneration from "./pages/admin/AICommentsGeneration";
import AIReviewsGeneration from "./pages/admin/AIReviewsGeneration";
import SEO from "./pages/admin/SEO";
import MediaLibrary from "./pages/admin/MediaLibrary";
import Templates from "./pages/admin/Templates";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/sites/new" element={<CreateSite />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/pages/new" element={<PageEditor />} />
          <Route path="/pages/edit" element={<PageEditor />} />
          <Route path="/blog" element={<BlogArticles />} />
          <Route path="/blog/new" element={<ArticleEditor />} />
          <Route path="/blog/edit" element={<ArticleEditor />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/new" element={<Authors />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/ai-content" element={<AIContent />} />
          <Route path="/ai-blog" element={<AIBlogGeneration />} />
          <Route path="/ai-comments" element={<AICommentsGeneration />} />
          <Route path="/ai-reviews" element={<AIReviewsGeneration />} />
          <Route path="/seo" element={<SEO />} />
          <Route path="/media" element={<MediaLibrary />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
