import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { Palco, usePalco } from "@/components/palco/palco";
import { supabase } from "@/integrations/supabase/client";

/**
 * 04 · A lista, feita do que ele pediu a 7 nov: "criar sentimento, vontade
 * de pertencer, comunidade".
 *
 * A comunidade que existe é medida e é dele: mais de 80 pessoas pediram o
 * Radar quando saiu, em agosto de 2026 (radar-evidencia-cientifica.md). Cada
 * uma é um ponto. Começam espalhadas pelo ecrã e, com o scroll, juntam-se num
 * só sítio, que é onde se deixa o email. É um número agregado e anónimo, que
 * é a forma de dizer "muita gente respondeu" sem fingir um testemunho.
 *
 * São 81 pontos e não um número redondo: a afirmação é "mais de 80".
 */
const PONTOS = 81;

// Espalhados com uma semente fixa, para o desenho ser sempre o mesmo.
const semente = (i: number) => {
  const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
};
const inicio = Array.from({ length: PONTOS }, (_, i) => ({ x: semente(i), y: semente(i + 500) }));
// Destino em girassol (ângulo de ouro): denso no centro, como um grupo.
const destino = Array.from({ length: PONTOS }, (_, i) => {
  const r = Math.sqrt((i + 0.5) / PONTOS);
  const a = i * 2.39996323;
  return { r, a };
});

const suavizar = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

const FormLista = () => {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"parado" | "a-enviar" | "feito" | "erro">("parado");
  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const limpo = email.trim();
    if (!limpo) return;
    setEstado("a-enviar");
    try {
      const { error } = await supabase.from("resource_interest").insert({
        created_at: new Date().toISOString(),
        name: "Not given",
        email: limpo.slice(0, 255),
        resource_slug: "the-list",
        resource_title: "The list",
        interest_type: "list",
        message_optional: null,
        consent: true,
        source_page: "/",
      });
      if (error) throw error;
      setEstado("feito");
    } catch {
      setEstado("erro");
    }
  };
  if (estado === "feito")
    return (
      <p className="text-body-lg" style={{ color: "hsl(var(--ivory))" }}>
        You’re in. The next thing I finish goes to you first.
      </p>
    );
  return (
    <>
      <form onSubmit={enviar} className="flex flex-col sm:flex-row gap-3 max-w-md">
        <label htmlFor="lista-email" className="sr-only">
          Email
        </label>
        <input
          id="lista-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 bg-transparent border-b py-3 font-body text-base focus:outline-none placeholder:opacity-40"
          style={{ borderColor: "hsl(var(--ivory) / 0.35)", color: "hsl(var(--ivory))" }}
        />
        <button
          type="submit"
          disabled={estado === "a-enviar"}
          className="font-body text-sm font-semibold px-7 py-4 disabled:opacity-60"
          style={{ background: "hsl(var(--ivory))", color: "hsl(var(--charcoal-deep))" }}
        >
          {estado === "a-enviar" ? "Joining" : "Join"}
        </button>
      </form>
      {estado === "erro" && (
        <p className="text-body mt-3" style={{ color: "hsl(var(--ivory) / 0.7)" }}>
          That didn’t go through. Try again in a moment.
        </p>
      )}
      <p className="text-body mt-4" style={{ fontSize: "0.8rem", color: "hsl(var(--ivory) / 0.5)" }}>
        One email when something new is finished. Nothing else.{" "}
        <Link to="/privacidade" className="underline">
          How this is kept
        </Link>
        .
      </p>
    </>
  );
};

const Pertencer = () => {
  const palco = usePalco(2);
  const tela = useRef<HTMLCanvasElement>(null);
  const suave = useSpring(palco.progresso, { stiffness: 70, damping: 22 });
  const formaOpacidade = useTransform(palco.progresso, [0.45, 0.7], [0, 1]);
  const formaY = useTransform(palco.progresso, [0.45, 0.7], [30, 0]);

  const desenhar = (p: number) => {
    const c = tela.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.clientWidth;
    const h = c.clientHeight;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const largo = w >= 768;
    const cx = largo ? w * 0.7 : w * 0.5;
    const cy = largo ? h * 0.52 : h * 0.3;
    const raio = Math.min(w, h) * (largo ? 0.27 : 0.22);
    for (let i = 0; i < PONTOS; i++) {
      // Cada ponto parte num momento ligeiramente diferente: chegam um a um.
      const t = suavizar((p - (i / PONTOS) * 0.25) / 0.55);
      const a = inicio[i];
      const d = destino[i];
      const x0 = a.x * w;
      const y0 = a.y * h;
      const x1 = cx + Math.cos(d.a) * d.r * raio;
      const y1 = cy + Math.sin(d.a) * d.r * raio;
      const x = x0 + (x1 - x0) * t;
      const y = y0 + (y1 - y0) * t;
      ctx.beginPath();
      ctx.arc(x, y, 2.2 + t * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = t > 0.98 ? "hsla(110, 30%, 70%, 0.95)" : `hsla(41, 45%, 94%, ${0.25 + t * 0.5})`;
      ctx.fill();
    }
  };

  useMotionValueEvent(suave, "change", (v) => desenhar(v));
  useEffect(() => {
    desenhar(palco.estatico ? 1 : suave.get());
    const r = () => desenhar(palco.estatico ? 1 : suave.get());
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palco.estatico]);

  return (
    <Palco palco={palco} altura={230} style={{ background: "hsl(var(--charcoal-deep))" }}>
      <div className="relative w-full" style={{ height: palco.estatico ? 760 : "100%" }}>
        <canvas ref={tela} aria-hidden className="absolute inset-0 w-full h-full z-0" />
        <div className="relative z-10 h-full flex items-end md:items-center pb-16 md:pb-0">
          <div className="section-padding max-content w-full">
            <div className="max-w-xl">
              <p className="t-kicker" style={{ color: "hsl(var(--ivory) / 0.45)" }}>
                04 · The list
              </p>
              <p className="t-title mt-5" style={{ color: "hsl(var(--ivory))" }}>
                More than 80 people asked for the Radar.
              </p>
              <p className="text-body-lg mt-5" style={{ color: "hsl(var(--ivory) / 0.6)" }}>
                August 2026. One dot for each of them.
              </p>
              <motion.div
                className="mt-10"
                style={{ opacity: palco.estatico ? 1 : formaOpacidade, y: palco.estatico ? 0 : formaY }}
              >
                <p className="font-display font-bold text-xl md:text-2xl tracking-tight mb-5" style={{ color: "hsl(var(--ivory))" }}>
                  This is where they hear first.
                </p>
                <FormLista />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Palco>
  );
};

export default Pertencer;
