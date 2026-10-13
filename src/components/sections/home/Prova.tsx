import Reveal from "@/components/Reveal";

/**
 * A prova, em números, e cada um diz onde foi feito.
 *
 * Um número sem dono é uma alegação. Estes três são do estágio no RSC
 * Anderlecht e a secção diz isso, em vez de os deixar a pairar sobre a
 * carreira toda.
 *
 * Sem parágrafos: a faixa de escudos logo acima já diz onde, e esta secção
 * só tem de dizer quanto. Explicar o que cada número significa é trabalho de
 * outra página.
 */
const numeros = [
  { figura: "630", unidade: "horas", label: "dentro do departamento de performance" },
  { figura: "+100", unidade: "atletas", label: "da equipa principal aos sub-16" },
  { figura: "22", unidade: "protocolos", label: "do teste de suor ao catering de deslocação" },
];

const Prova = () => (
  <section className="section-padding section-spacing-sm">
    <div className="max-content">
      <Reveal>
        <div className="flex items-baseline justify-between gap-6 flex-wrap mb-10">
          <p className="text-caption">RSC Anderlecht, 2026</p>
          <p className="text-caption text-[10px] opacity-55">
            Antes, equipa principal do Leça FC
          </p>
        </div>
      </Reveal>

      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
        {numeros.map((n, i) => (
          <Reveal key={n.figura} delay={0.08 + i * 0.08}>
            <div>
              <dt className="font-display text-5xl md:text-6xl font-medium tracking-tight text-foreground">
                {n.figura}
                <span className="block font-sans text-[11px] tracking-[0.22em] uppercase mt-2" style={{ color: "hsl(var(--olive))" }}>
                  {n.unidade}
                </span>
              </dt>
              <dd className="text-body text-sm leading-relaxed mt-3 max-w-[28ch]">
                {n.label}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>

      {/* O passo seguinte, dito como facto e não como promessa. É também o
          que explica porque é que o título ainda leva a etiqueta no rodapé:
          o estágio profissional é a via de acesso e começa agora. */}
      <Reveal delay={0.32}>
        <div
          className="mt-12 md:mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 border-l-2 pl-5 py-1"
          style={{ borderColor: "hsl(var(--olive))" }}
        >
          <span
            className="font-display text-[10px] tracking-[0.24em] uppercase px-2 py-[3px] rounded-[2px]"
            style={{ background: "hsl(var(--olive))", color: "hsl(var(--ivory))" }}
          >
            Agora
          </span>
          <p className="font-display text-base md:text-lg text-foreground">
            Run4Excellence, estágio profissional de acesso à profissão, a
            construir o serviço de nutrição de raiz.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Prova;
