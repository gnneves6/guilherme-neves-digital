import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChapterProps {
  number: string;
  title: string;
  tone?: "light" | "dark";
  align?: "left" | "between";
  meta?: ReactNode;
  className?: string;
}

/**
 * Editorial chapter marker: "02, Real environments."
 * Numeral + title + thin animated rule. Pairs with each homepage section.
 */
const Chapter = ({
  number,
  title,
  tone = "light",
  align = "between",
  meta,
  className,
}: ChapterProps) => {
  const reduce = useReducedMotion();
  const numberColor =
    tone === "dark" ? "hsl(var(--ivory) / 0.55)" : "hsl(var(--olive))";
  const titleColor =
    tone === "dark" ? "hsl(var(--ivory) / 0.78)" : "hsl(var(--foreground) / 0.78)";
  const ruleColor =
    tone === "dark" ? "hsl(var(--ivory) / 0.18)" : "hsl(var(--olive) / 0.45)";

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex items-baseline gap-4 mb-3",
          align === "between" && "justify-between"
        )}
      >
        <div className="flex items-baseline gap-3 md:gap-4">
          <span
            className="font-display text-[10px] md:text-[11px] tracking-[0.4em] uppercase"
            style={{ color: numberColor }}
          >
            {number}
          </span>
          <span
            className="font-display text-[10px] md:text-[11px] tracking-[0.3em] uppercase"
            style={{ color: titleColor }}
          >, {title}
          </span>
        </div>
        {meta && <div className="hidden md:block">{meta}</div>}
      </div>
      <motion.div
        className="h-px origin-left"
        style={{ background: ruleColor, maxWidth: "5rem" }}
        initial={{ scaleX: reduce ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};

export default Chapter;