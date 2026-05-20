import { Link } from "react-router-dom";
import { LINKS } from "@/data/links";

const Footer = () => {
  return (
    <footer className="section-padding border-t border-border">
      <div className="max-content py-16 md:py-20">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-3 max-w-sm">
            <p className="font-display text-lg font-semibold text-foreground">
              Guilherme Neves
            </p>
            <p className="text-body text-sm">
              Practical nutrition systems, educational tools and applied resources
              for real sporting environments.
            </p>
            <p className="text-caption text-[10px] font-normal mt-4">
              From Porto, Portugal · Currently in Brussels, Belgium
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 md:gap-16">
            <div className="space-y-4">
              <p className="text-caption text-xs">Navigate</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Home", path: "/" },
                  { label: "About", path: "/about" },
                  { label: "Work", path: "/work" },
                  { label: "GN Fuel Laws", path: "/fuel-laws" },
                  { label: "Contact", path: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-body text-sm link-underline w-fit hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-caption text-xs">Connect</p>
              <div className="flex flex-col gap-2.5">
                <a
                  href={`mailto:${LINKS.EMAIL}`}
                  className="text-body text-sm link-underline w-fit hover:text-foreground transition-colors"
                >
                  Email
                </a>
                <a
                  href={LINKS.LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-sm link-underline w-fit hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={LINKS.LINKTREE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-sm link-underline w-fit hover:text-foreground transition-colors"
                >
                  Linktree
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="divider mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-body text-xs">
            © {new Date().getFullYear()} Guilherme Neves. All rights reserved.
          </p>
          <p className="text-body text-xs">
            Athlete by nature. Nutritionist by purpose.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
