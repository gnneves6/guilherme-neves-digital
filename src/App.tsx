import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

const About = lazy(() => import("./pages/About.tsx"));
const Work = lazy(() => import("./pages/Work.tsx"));
const Services = lazy(() => import("./pages/Services.tsx"));
const FuelLaws = lazy(() => import("./pages/FuelLaws.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

// The artifact preview build (VITE_ARTIFACT=1) is served from a sandboxed
// path where URL-based routing can't work, so it falls back to hash routing.
const Router = import.meta.env.VITE_ARTIFACT === "1" ? HashRouter : BrowserRouter;
const routerProps = import.meta.env.VITE_ARTIFACT === "1" ? {} : { basename: import.meta.env.BASE_URL };

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router {...routerProps}>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/services" element={<Services />} />
            <Route path="/fuel-laws" element={<FuelLaws />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
