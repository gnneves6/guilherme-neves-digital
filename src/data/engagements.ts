import auditImage from "@/assets/work-previews/food-catering-operations-preview.webp";
import systemsImage from "@/assets/work-previews/hydration-sweat-testing-preview.webp";
import educationImage from "@/assets/work-previews/education-tools-preview.webp";

/**
 * The three shapes the work takes.
 *
 * These used to be a section of their own on `/services`, three large cards
 * under the heading "Three ways to make nutrition work in your environment",
 * sitting below six audience doors. That was two taxonomies describing the
 * same work on one page: a stranger had to read both and then work out how
 * they map onto each other, which is the actual reason that page felt heavy.
 *
 * One taxonomy now. The doors are the primary axis, because "which of these am
 * I" is the question people arrive with, and these are the formats the work
 * takes once the door is chosen. Each door names the ones that apply to it.
 *
 * The photographs came with them and are the whole point of keeping this as
 * data: every format shows the real thing it produces rather than describing
 * it. The crops are per image because these are dense documents shot at
 * 1536px, and shown whole in a small frame they lose every piece of detail
 * that makes them convincing.
 */

export type EngagementId = "audit" | "systems" | "education";

export interface Engagement {
  id: EngagementId;
  title: string;
  /** The commitment, in the words someone would use to plan for it. */
  shape: string;
  /** What they have at the end. One sentence, no hedging. */
  outcome: string;
  image: string;
  imageAlt: string;
  imageFocus: { scale: number; origin: string };
}

export const engagements: Record<EngagementId, Engagement> = {
  audit: {
    id: "audit",
    title: "Diagnóstico",
    shape: "4 a 6 semanas, no terreno e à distância",
    outcome:
      "Uma leitura de como a nutrição funciona de facto entre a performance, o departamento médico e a cozinha, e o que corrigir primeiro.",
    image: auditImage,
    imageAlt:
      "Uma folha de revisão de operações com os pontos de controlo do serviço de refeições, a pontuação de cumprimento e quem é responsável por cada um, ao lado de um manual de operações de catering impresso.",
    imageFocus: { scale: 1.75, origin: "34% 44%" },
  },
  systems: {
    id: "systems",
    title: "Sistema montado",
    shape: "Uma época, em avença",
    outcome:
      "Estruturas de dia de jogo, de deslocação e de semana de treino que a vossa equipa corre sem eu estar na sala.",
    /* A imagem era o painel do produto que está sob embargo de nome e de
       imagem até ao lançamento, e tinha o nome dele escrito no ecrã. Passa
       a ser o protocolo de hidratação e perdas de suor, que é trabalho
       documentado e não espera por lançamento nenhum. */
    image: systemsImage,
    imageAlt:
      "Um painel de hidratação e testes de suor com a taxa de suor por atleta, ao lado do protocolo impresso de recolha e cálculo.",
    imageFocus: { scale: 1.7, origin: "30% 46%" },
  },
  education: {
    id: "education",
    title: "Formação",
    shape: "Uma sessão, ou um programa",
    outcome:
      "Atletas, equipa técnica ou pais a partilhar uma linguagem aplicada para as decisões que tomam à volta da comida.",
    image: educationImage,
    imageAlt:
      "Seis cartões de formação em nutrição no futebol pousados numa secretária, sobre as bases, hidratação, suplementos, recuperação e intolerância à frutose.",
    imageFocus: { scale: 1.65, origin: "22% 34%" },
  },
};

export const engagementList = Object.values(engagements);
