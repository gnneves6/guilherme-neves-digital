import { Link } from "react-router-dom";

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
              Practical performance systems for sport. Building educational tools,
              applied resources and athlete-centered systems.
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
                  href="mailto:hello@guilhermeneves.com"
                  className="text-body text-sm link-underline w-fit hover:text-foreground transition-colors"
                >
                  Email
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-sm link-underline w-fit hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-sm link-underline w-fit hover:text-foreground transition-colors"
                >
                  Instagram
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
            Porto, Portugal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
