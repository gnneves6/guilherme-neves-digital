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
            {/* Era a frase da versão "clubes" (diagnóstico, tradução e
                sistemas), em português, a vender o que ainda não se pode
                vender e a contradizer a capa a dois palmos dela. Passou a
                dizer o que ele é, como a capa (visao-do-site.md). */}
            <p className="text-body text-sm">
              Performance nutrition, from inside elite football. I build the
              systems that carry the science to the athlete.
            </p>
            <p className="text-caption text-[10px] font-normal mt-4">
              Porto
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 md:gap-16">
            <div className="space-y-4">
              <p className="text-caption text-xs">Navigate</p>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "Home", path: "/" },
                  { label: "Story", path: "/sobre" },
                  { label: "Work", path: "/trabalho" },
                  { label: "The five checks", path: "/cinco-verificacoes" },
                  { label: "Contact", path: "/contacto" },
                  { label: "Privacy", path: "/privacidade" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-body text-sm link-underline w-fit py-1 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-caption text-xs">Connect</p>
              <div className="flex flex-col gap-1.5">
                <a
                  href={`mailto:${LINKS.EMAIL}`}
                  className="text-body text-sm link-underline w-fit py-1 hover:text-foreground transition-colors"
                >
                  Email
                </a>
                <a
                  href={LINKS.LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-sm link-underline w-fit py-1 hover:text-foreground transition-colors"
                >
                  LinkedIn
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
