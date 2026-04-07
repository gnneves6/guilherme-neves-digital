import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grain-overlay" />
      <Navbar />
      <PageTransition>
        <main className={`flex-1 ${isHome ? "" : "pt-16 md:pt-20"}`}>{children}</main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Layout;
