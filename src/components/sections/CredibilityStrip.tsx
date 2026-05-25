const CredibilityStrip = () => {
  return (
    <aside
      aria-label="Field experience"
      className="relative border-t border-b border-foreground/10 bg-foreground/[0.015] backdrop-blur-[2px]"
    >
      <div className="mx-auto max-w-6xl px-6 h-14 md:h-16 flex items-center">
        <p className="w-full text-[0.68rem] md:text-[0.72rem] tracking-[0.22em] uppercase text-foreground/55 flex flex-wrap items-center gap-x-3 gap-y-1 leading-tight">
          <span className="text-foreground/40">Field Experience</span>
          <span aria-hidden className="text-foreground/20">—</span>
          <span>Elite academy</span>
          <span aria-hidden className="text-foreground/20">·</span>
          <span>Senior football</span>
          <span aria-hidden className="text-foreground/20">·</span>
          <span>Applied performance environments</span>
          <span
            aria-hidden
            className="hidden md:inline-flex items-center gap-x-3 ml-auto text-foreground/35"
          >
            <span>RSC Anderlecht</span>
            <span className="text-foreground/20">·</span>
            <span>Leça FC</span>
            <span className="text-foreground/20">·</span>
            <span>Run4Excellence</span>
          </span>
        </p>
      </div>
    </aside>
  );
};

export default CredibilityStrip;