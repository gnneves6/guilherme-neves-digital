import { Link } from "react-router-dom";
import laws from "@/data/fuel-laws.json";
import {
  nodeOf,
  grewFrom,
  ledTo,
  maturityMeta,
  environmentMeta,
} from "@/data/work-graph";
import type { Artefact } from "@/data/artefacts";

/**
 * WorkConnections, the panel that makes a piece of work legible as part of
 * a practice rather than a standalone file.
 *
 * It answers four questions in the order a stranger actually asks them:
 * what principle does this serve, where did it come from, what did it grow
 * out of, and what came after it. Every answer is a link, so the visitor
 * can keep pulling the thread instead of hitting a dead end.
 */

interface Props {
  artefact: Artefact;
  accent: string;
  onNavigate?: () => void;
}

const Caption = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-[9px] tracking-[0.28em] uppercase font-display mb-2.5"
    style={{ color: "hsl(var(--ivory) / 0.35)" }}
  >
    {children}
  </p>
);

const Chip = ({
  to,
  label,
  meta,
  onNavigate,
}: {
  to: string;
  label: string;
  meta?: string;
  onNavigate?: () => void;
}) => (
  <Link
    to={to}
    onClick={onNavigate}
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors duration-300 hover:bg-[hsl(var(--ivory)/0.08)]"
    style={{
      background: "hsl(var(--ivory) / 0.04)",
      border: "1px solid hsl(var(--ivory) / 0.1)",
    }}
  >
    <span className="text-[12px] font-display" style={{ color: "hsl(var(--ivory) / 0.8)" }}>
      {label}
    </span>
    {meta && (
      <span className="text-[9px] tracking-[0.18em] uppercase" style={{ color: "hsl(var(--ivory) / 0.32)" }}>
        {meta}
      </span>
    )}
  </Link>
);

const WorkConnections = ({ artefact, accent, onNavigate }: Props) => {
  const node = nodeOf(artefact.slug);
  if (!node) return null;

  const parents = grewFrom(artefact.slug);
  const children = ledTo(artefact.slug);
  const mat = maturityMeta[node.maturity];
  const env = environmentMeta[node.environment];
  const servedLaws = laws.filter((l) => node.laws.includes(Number(l.number)));

  return (
    <div className="px-5 md:px-10 pt-2">
      <div
        className="rounded-sm p-6 md:p-7"
        style={{
          background: "hsl(var(--ivory) / 0.02)",
          border: "1px solid hsl(var(--ivory) / 0.08)",
        }}
      >
        {/* Where it sits on the making ladder, and where it came from */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-5 mb-5" style={{ borderBottom: "1px solid hsl(var(--ivory) / 0.07)" }}>
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
            <span className="text-[12px] font-display" style={{ color: "hsl(var(--ivory) / 0.85)" }}>
              {mat.label}
            </span>
            <span className="text-[11px]" style={{ color: "hsl(var(--ivory) / 0.4)" }}>
              {mat.note}
            </span>
          </div>
          {node.environment !== "independent" && (
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.24em] uppercase" style={{ color: "hsl(var(--ivory) / 0.3)" }}>
                From
              </span>
              <span className="text-[12px] font-display" style={{ color: "hsl(var(--ivory) / 0.75)" }}>
                {env.label}
              </span>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {servedLaws.length > 0 && (
            <div>
              <Caption>Proves</Caption>
              <div className="flex flex-wrap gap-2">
                {servedLaws.map((l) => (
                  <Chip
                    key={l.number}
                    to="/fuel-laws"
                    label={l.title}
                    meta={`Law ${l.number}`}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          )}

          {parents.length > 0 && (
            <div>
              <Caption>Grew out of</Caption>
              <div className="flex flex-wrap gap-2">
                {parents.map((p) => (
                  <Chip
                    key={p.slug}
                    to={`/work?a=${p.slug}`}
                    label={p.title}
                    meta={maturityMeta[nodeOf(p.slug)!.maturity].label}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          )}

          {children.length > 0 && (
            <div>
              <Caption>Led to</Caption>
              <div className="flex flex-wrap gap-2">
                {children.map((c) => (
                  <Chip
                    key={c.slug}
                    to={`/work?a=${c.slug}`}
                    label={c.title}
                    meta={maturityMeta[nodeOf(c.slug)!.maturity].label}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkConnections;
