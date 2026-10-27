/**
 * O lema, num sítio só, e é por isso que existe.
 *
 * "Nutritionist" é título protegido e depende da cédula. A etiqueta é o que
 * transforma a frase numa declaração verdadeira em vez de uma reclamada, e
 * "soon to be" é a formulação que ficou fixada em agosto.
 *
 * Isto estava duplicado: o rodapé foi corrigido a 13 de outubro e o título
 * da página de percurso ficou com a versão antiga, sem etiqueta nenhuma,
 * num h1. O mesmo erro em dois sítios independentes é de arquitectura, não
 * de distracção, portanto agora só há uma cópia.
 *
 * Dois modos, e a razão é medida. Em texto pequeno a etiqueta vai POR CIMA
 * da palavra, inclinada, como uma anotação à mão. Num título de display não
 * cabe lá: a 72px com entrelinha de 1,34 sobram oito pixels entre as linhas
 * e a etiqueta, que tem trinta e seis, aterrava em cima de "Athlete".
 * Abrir entrelinha até caber desfaz o título. Por isso aí entra ANTES da
 * palavra, inclinada na mesma, e lê-se "soon to be Nutritionist", que é
 * exactamente o que se quer dizer.
 */
type Modo = "cima" | "antes";

const Lema = ({ modo = "cima" }: { modo?: Modo }) => {
  const comum =
    "rounded-[2px] font-display font-medium tracking-[0.08em] uppercase whitespace-nowrap -rotate-[7deg]";
  const cor = { background: "hsl(var(--olive))", color: "hsl(var(--ivory))" };

  return (
    <>
      Athlete by nature.{" "}
      {modo === "antes" ? (
        <span
          aria-hidden
          className={`${comum} inline-block align-middle mr-2.5 px-2 py-[2px] text-[0.2em] origin-center translate-y-[-0.22em]`}
          style={cor}
        >
          soon to be
        </span>
      ) : null}
      <span className="relative inline-block">
        {modo === "cima" ? (
          <span
            aria-hidden
            className={`${comum} absolute -top-[15px] left-[2px] px-1 py-[0.5px] text-[7px] origin-bottom-left`}
            style={cor}
          >
            soon to be
          </span>
        ) : null}
        Nutritionist
      </span>{" "}
      by purpose.
      <span className="sr-only">
        {" "}
        Soon to be: the title is protected and depends on registration with the
        Ordem dos Nutricionistas.
      </span>
    </>
  );
};

/** A folga que cada modo exige à volta da linha. */
export const lemaFolga: Record<Modo, string> = {
  cima: "pt-3.5",
  antes: "",
};

export default Lema;
