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
              A practice for high-performance environments. Diagnosis, translation
              and embedded nutrition systems.
            </p>
            <p className="text-caption text-[10px] font-normal mt-4">
              Porto · Brussels
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 md:gap-16">
            <div className="space-y-4">
              <p className="text-caption text-xs">Navigate</p>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "Home", path: "/" },
                  { label: "About", path: "/about" },
                  { label: "Work", path: "/work" },
                  { label: "The five checks", path: "/fuel-laws" },
                  { label: "Services", path: "/services" },
                  { label: "Contact", path: "/contact" },
                  { label: "Privacy", path: "/privacy" },
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
          {/* O lema fica inteiro. "Nutritionist" é título protegido e
              depende da cédula, e a etiqueta por cima é o que o torna uma
              declaração verdadeira em vez de uma reclamada: é a formulação
              que ficou fixada em agosto, "soon to be", e que se mantém até a
              cédula existir. Inclinada e pequena de propósito, para se ler
              como uma anotação à mão por cima da palavra, não como parte da
              frase. O pt-3 existe para a etiqueta ter onde caber sem tocar
              no que está acima. */}
          <p className="text-body text-xs pt-3.5">
            Athlete by nature.{" "}
            <span className="relative inline-block">
              <span
                aria-hidden
                className="absolute -top-[15px] left-[2px] px-1 py-[0.5px] rounded-[2px] font-display text-[7px] font-medium tracking-[0.08em] uppercase whitespace-nowrap -rotate-[7deg] origin-bottom-left"
                style={{ background: "hsl(var(--olive))", color: "hsl(var(--ivory))" }}
              >
                soon to be
              </span>
              Nutritionist
            </span>{" "}
            by purpose.
            <span className="sr-only"> Soon to be: the title is protected and depends on registration with the Ordem dos Nutricionistas.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
