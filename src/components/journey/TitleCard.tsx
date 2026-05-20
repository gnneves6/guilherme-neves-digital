interface TitleCardProps {
  number: string;
  label: string;
  tone?: "dark" | "light";
  className?: string;
}

/**
 * TitleCard — chapter number + short label, set in the scene corner.
 * Keeps the journey legible without a heavy header.
 */
const TitleCard = ({ number, label, tone = "dark", className }: TitleCardProps) => {
  const fg = tone === "dark" ? "hsl(var(--ivory))" : "hsl(var(--foreground))";
  return (
    <div className={"flex items-center gap-3 " + (className ?? "")}>
      <span
        className="font-display text-[10px] md:text-xs tracking-[0.4em] uppercase"
        style={{ color: `${fg}`, opacity: 0.45 }}
      >
        {number}
      </span>
      <span className="h-px w-6" style={{ background: fg, opacity: 0.25 }} />
      <span
        className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-display"
        style={{ color: fg, opacity: 0.55 }}
      >
        {label}
      </span>
    </div>
  );
};

export default TitleCard;
