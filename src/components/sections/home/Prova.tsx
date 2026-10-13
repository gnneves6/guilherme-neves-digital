import Reveal from "@/components/Reveal";

/**
 * A prova, em números que são todos verificáveis e todos atribuídos.
 *
 * Os três números são do estágio no RSC Anderlecht e dizem-no, porque um
 * número sem dono é uma alegação. A faixa de clubes logo acima já diz onde,
 * portanto esta secção só tem de dizer quanto.
 *
 * O que não está aqui é deliberado: nada do conteúdo dos materiais, que foram
 * feitos para o clube. Diz-se que existem e o que são.
 */
const numeros = [
  { figura: "630", label: "horas dentro do departamento de performance, RSC Anderlecht" },
  { figura: "+100", label: "atletas acompanhados, da equipa principal aos sub-16" },
  { figura: "22", label: "protocolos e materiais construídos, do sweat testing ao catering de deslocação" },
];

const Prova = () => (
  <section className="section-padding section-spacing-sm">
    <div className="max-content">
      <Reveal>
        <p className="text-caption mb-10">Onde é que isto foi aprendido</p>
      </Reveal>

      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
        {numeros.map((n, i) => (
          <Reveal key={n.figura} delay={0.08 + i * 0.08}>
            <div>
              <dt className="font-display text-5xl md:text-6xl font-medium tracking-tight text-foreground">
                {n.figura}
              </dt>
              <dd className="text-body text-sm leading-relaxed mt-4 max-w-[30ch]">
                {n.label}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <Reveal delay={0.32}>
        <p className="text-body text-sm mt-12 max-w-2xl leading-relaxed">
          Antes disso, equipa principal do Leça FC, no ano em que subiram à
          Liga 3.
        </p>
      </Reveal>
    </div>
  </section>
);

export default Prova;
