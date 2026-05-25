import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SplitRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "word" | "line";
  /** Render extra inline content after the split text (e.g. trailing punctuation/spans). */
  trailing?: ReactNode;
}

/**
 * Editorial headline reveal. Splits a string into words and staggers them in.
 * Respects prefers-reduced-motion (fades in as a whole block).
 */
const SplitReveal = ({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  splitBy = "word",
  trailing,
}: SplitRevealProps) => {
  const reduce = useReducedMotion();
  const parts = splitBy === "line" ? text.split("\n") : text.split(" ");

  if (reduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay }}
      >
        <Tag className={className}>
          {text}
          {trailing}
        </Tag>
      </motion.div>
    );
  }

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: { y: "110%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <Tag className={cn("flex flex-wrap", className)} style={{ overflow: "hidden" }}>
        {parts.map((part, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ paddingRight: splitBy === "word" ? "0.28em" : 0, paddingBottom: "0.08em" }}
          >
            <motion.span variants={child} className="inline-block will-change-transform">
              {part}
            </motion.span>
          </span>
        ))}
        {trailing && (
          <span className="inline-block overflow-hidden">
            <motion.span variants={child} className="inline-block will-change-transform">
              {trailing}
            </motion.span>
          </span>
        )}
      </Tag>
    </motion.div>
  );
};

export default SplitReveal;