import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import ScrollProgress from "./motion/ScrollProgress";
import SmoothScroll from "./motion/SmoothScroll";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-body focus:text-background focus:shadow-lg"
      >
        Skip to content
      </a>
      <div className="grain-overlay" />
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <PageTransition>
        <main id="main-content" tabIndex={-1} className={`flex-1 outline-none ${isHome ? "" : "pt-16 md:pt-20"}`}>{children}</main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Layout;
