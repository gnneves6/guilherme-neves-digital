/**
 * ⚠️ As duas peças `Matchday Fuel` saíram daqui a 27 de outubro, e não é
 * arrumação: o produto está sob embargo de nome, link e imagem até ao
 * lançamento, e estavam as três coisas nesta página. A `Matchday Fuel
 * Planner` dizia ainda "Live on this site · Run it" para um painel que
 * deixou de estar montado na home, portanto prometia uma coisa que já não
 * existia. Voltam quando o produto for apresentado, não antes.
 */
export type ArtefactStatus = "Public" | "Protected" | "In Development";
import abcA from "@/assets/previews/abc-a-athlete-fuel-performance.webp";
import abcB from "@/assets/previews/abc-b-build-your-base.webp";
import abcC from "@/assets/previews/abc-c-care-about-recovery.webp";
// Premium proof-object previews for the Selected Applied Work cards.
import hydrationPreview from "@/assets/work-previews/hydration-sweat-testing-preview.webp";
import bodyCompositionPreview from "@/assets/work-previews/body-composition-monitoring-preview.webp";
import foodCateringPreview from "@/assets/work-previews/food-catering-operations-preview.webp";
import educationToolsPreview from "@/assets/work-previews/education-tools-preview.webp";
import atlasPreview from "@/assets/work-previews/football-nutrition-atlas-preview.webp";

export type ArtefactCategory =
  | "Educational Series"
  | "Matchday System"
  | "Applied Tool"
  | "Interactive Tool"
  | "FuelOps Tool"
  | "Framework"
  | "Athlete Resource"
  | "Team Report"
  | "Mini-Class"
  | "Visual Guide"
  | "Monitoring Tool"
  | "Product";

export type ArtefactGroup = "public" | "systems" | "tools" | "protected";

export type CtaType =
  | "view"            // open external URL
  | "view-sample"     // open sample preview modal
  | "request-access"  // protected, request access form
  | "waitlist"        // in development, join waitlist
  | "early-access"    // future product, early access
  | "protected";      // confidential, info only modal

export interface Artefact {
  slug: string;
  title: string;
  category: ArtefactCategory;
  group: ArtefactGroup;
  type: string;             // human-readable subtype
  status: ArtefactStatus;
  description: string;
  whatItProves: string;
  ctaLabel: string;
  ctaType: CtaType;
  externalUrl?: string;
  featured?: boolean;       // shown on homepage
  previewImage?: string;
  previewImages?: string[];
  previewAlt?: string;
  previewType?: "single" | "gallery" | "blurred" | "toolMockup" | "documentMockup";
  fileUrl?: string;
  notionUrl?: string;
  isProtected?: boolean;
  isDownloadable?: boolean;
  // Extended editorial fields (used by the Applied Work homepage section and modal)
  number?: string;
  context?: string;
  problem?: string;
  whatIBuilt?: string;
  whyItMatters?: string;
  previewNote?: string;
  confidentialityNote?: string;
}

export const artefacts: Artefact[] = [
  {
    slug: "abc-of-football-nutrition",
    title: "The ABC of Football Nutrition",
    category: "Série de formação",
    group: "public",
    type: "Formação para atletas",
    status: "Public",
    description:
      "Dá-se ao atleta a resposta técnica antes de ele ter as bases, por isso nunca pega. Três lições, por ordem, que têm de estar postas antes de valer a pena ensinar o que quer que seja de específico.",
    whatItProves: "Pôr a base primeiro, para o trabalho específico de depois pegar mesmo.",
    ctaLabel: "Ver pré-visualização",
    ctaType: "view-sample",
    notionUrl: "https://www.notion.so/Guilherme-Neves-Performance-Nutrition-23575c57c50d80928e62c585039bd8fa",
    featured: true,
    previewType: "gallery",
    previewImages: [abcA, abcB, abcC],
  },
  {
    slug: "md-1-fuel-system",
    title: "MD-1 Fuel System",
    category: "Sistema de dia de jogo",
    group: "systems",
    type: "Protocolo de dia de jogo",
    status: "Public",
    description:
      "Uma estrutura prática para o dia antes do jogo: carga de hidratos, hidratação e comida conhecida, feita para sobreviver a semanas de jogo a sério.",
    whatItProves: "Evidência de dia de jogo traduzida num protocolo que a equipa técnica e os atletas conseguem correr.",
    ctaLabel: "O que cobre",
    ctaType: "view-sample",
    featured: false,
    previewType: "documentMockup",
  },
  {
    slug: "athlete-equivalent-bank",
    title: "Athlete Equivalent Bank",
    category: "Ferramenta aplicada",
    group: "systems",
    type: "Sistema alimentar prático",
    status: "Public",
    description:
      "Um sistema de substituições que deixa o atleta adaptar as refeições em deslocação ou em casa sem perder a estrutura nutricional.",
    whatItProves: "Flexibilidade desenhada para a vida real, sem partir o plano.",
    ctaLabel: "O que cobre",
    ctaType: "view-sample",
    featured: true,
    previewType: "single",
  },
  {
    slug: "supplementation-elite-football",
    title: "Supplementation in Elite Football",
    category: "Guia visual",
    group: "public",
    type: "Guia visual aplicado",
    status: "Public",
    description:
      "Um guia visual, assente na evidência, sobre o que conta mesmo na suplementação no futebol e o que não conta.",
    whatItProves: "Filtragem de evidência e comunicação clara com equipa técnica e atletas.",
    ctaLabel: "O que cobre",
    ctaType: "view-sample",
    featured: false,
    previewType: "documentMockup",
  },
  {
    slug: "why-players-cramp",
    title: "Why Players Cramp at 80 Minutes?",
    category: "Mini-aula",
    group: "public",
    type: "Mini-aula",
    status: "Public",
    description:
      "Uma lição visual curta sobre o que causa mesmo as cãibras no fim do jogo, para lá do lugar-comum da hidratação.",
    whatItProves: "Pensamento pedagógico afiado sobre um problema de performance real e recorrente.",
    ctaLabel: "O que cobre",
    ctaType: "view-sample",
    featured: false,
    previewType: "documentMockup",
  },
  {
    slug: "athletes-food-pyramid",
    title: "Athlete's Food Pyramid",
    category: "Guia visual",
    group: "public",
    type: "Guia visual de base",
    status: "Public",
    description:
      "Uma pirâmide alimentar reescrita à volta da carga de treino, da recuperação e das exigências de cada atleta.",
    whatItProves: "Formação de base adaptada ao atleta, não à média.",
    ctaLabel: "O que cobre",
    ctaType: "view-sample",
    featured: false,
    previewType: "documentMockup",
  },
  {
    slug: "fuelops-ai",
    title: "FuelOps AI",
    category: "Produto",
    group: "tools",
    type: "Produto de nutrição de performance · beta privado",
    status: "In Development",
    description:
      "A camada seguinte deste trabalho: um sistema operativo com AI para quem trata de nutrição de performance. Em desenvolvimento privado.",
    whatItProves: "Onde os recursos, os sistemas e as ferramentas convergem num produto.",
    ctaLabel: "Entrar no acesso antecipado",
    ctaType: "early-access",
    featured: true,
  },
  {
    slug: "evidence-radar",
    title: "The Evidence Radar",
    category: "Ferramenta aplicada",
    group: "tools",
    type: "Rotina de pesquisa com AI · construída e dada",
    status: "Public",
    description:
      "Uma rotina semanal de pesquisa, corrida por um assistente de AI contra regras que escrevi, para um profissional se manter a par da literatura de uma assentada em vez de perder uma hora por dia que não tem.",
    whatItProves:
      "Construído para um problema meu e depois entregue: outros profissionais pediram o prompt e os passos, e levaram os dois.",
    ctaLabel: "Como funciona",
    ctaType: "view-sample",
    featured: true,
  },
  {
    slug: "athlete-orientation",
    title: "Individual Athlete Nutrition Orientation",
    category: "Recurso para atleta",
    group: "protected",
    type: "Trabalho de caso protegido",
    status: "Protected",
    description:
      "Trabalho real com um atleta, a traduzir objetivos de composição corporal, exigências de treino e hábitos diários em ação. Confidencial, pré-visualização mostrada a pedido.",
    whatItProves: "Tradução individual do contexto em comportamento, em ambientes reais.",
    ctaLabel: "Pedir acesso",
    ctaType: "request-access",
    featured: false,
  },
  {
    slug: "team-monitoring-report",
    title: "Protected Team Monitoring Report",
    category: "Relatório de equipa",
    group: "protected",
    type: "Trabalho de caso de equipa, protegido",
    status: "Protected",
    description:
      "Monitorização e relatório de equipa, feitos para a decisão da equipa técnica. Confidencial, o documento completo não se mostra publicamente.",
    whatItProves: "Relatório para a equipa técnica e comunicação de performance ao nível da equipa.",
    ctaLabel: "Saber mais",
    ctaType: "protected",
    featured: true,
  },
];

export const featuredArtefacts = artefacts.filter((a) => a.featured);

export const statusMeta: Record<
  ArtefactStatus,
  { dot: string; label: string }
> = {
  Public: { dot: "hsl(var(--olive-light))", label: "Público" },
  Protected: { dot: "hsl(35, 28%, 62%)", label: "Protegido" },
  "In Development": { dot: "hsl(40, 55%, 60%)", label: "Em construção" },
};

export const groupMeta: Record<
  ArtefactGroup,
  { label: string; short: string; anchor: string; dot: string; description: string }
> = {
  public: {
    label: "Recursos públicos",
    short: "Public",
    anchor: "public-resources",
    dot: "hsl(155, 14%, 42%)",
    description: "Guias, mini-aulas e recursos de aprendizagem abertos.",
  },
  systems: {
    label: "Sistemas práticos",
    short: "Systems",
    anchor: "practical-systems",
    dot: "hsl(35, 24%, 52%)",
    description: "Modelos e sistemas aplicados, feitos para ambientes de performance reais.",
  },
  tools: {
    label: "Ferramentas e laboratório de produto",
    short: "Tools",
    anchor: "tools-product-lab",
    dot: "hsl(40, 38%, 58%)",
    description: "A camada de produto para onde este trabalho caminha, a começar no FuelOps.",
  },
  protected: {
    label: "Trabalho de caso protegido",
    short: "Protected",
    anchor: "protected-casework",
    dot: "hsl(45, 8%, 52%)",
    description: "Trabalho confidencial com atletas, equipas e equipas técnicas, mostrado como prova.",
  },
};

export const groupOrder: ArtefactGroup[] = ["public", "systems", "tools", "protected"];

/* ============================================================
   Applied Work, homepage section ("Selected Applied Work")
   Six curated proof objects, edited for the cinematic archive.
   ============================================================ */
export type AppliedPreviewKind =
  | "matchdayFuel"
  | "hydrationDashboard"
  | "redactedReport"
  | "operationsManual"
  | "educationGrid"
  | "atlasBook";

export type AppliedAccessType =
  | "public"
  | "internal"
  | "protected"
  | "in-development";

export interface AppliedWorkObject extends Artefact {
  number: string;
  context: string;
  problem: string;
  whatIBuilt: string;
  whyItMatters: string;
  appliedPreview: AppliedPreviewKind;
  statusBadge: string; // visible badge label inside the card header
  previewImage?: string;
  previewAlt?: string;
  previewObjectPosition?: string;
  accessType?: AppliedAccessType;
  positioningLine?: string;
}

export const accessMeta: Record<
  AppliedAccessType,
  {
    label: string;
    accent: string;            // primary accent hex (icon / text accent)
    background: string;        // tinted background
    border: string;            // muted border
    ctaLabel: string;
    accessNote: string;
    panelTitle: string;
    panelBody: string;
    icon: "globe" | "layers" | "lock" | "sparkle";
  }
> = {
  public: {
    label: "Recurso público",
    accent: "#7EA885",
    background: "rgba(73, 115, 88, 0.12)",
    border: "rgba(126, 168, 133, 0.28)",
    ctaLabel: "Abrir a coleção",
    accessNote:
      "Shared openly as part of the GN education library.",
    panelTitle: "Want to use this type of education?",
    panelBody:
      "Open resources are shared to make performance nutrition easier to understand and apply.",
    icon: "globe",
  },
  internal: {
    label: "Sistema interno",
    accent: "#7E91AA",
    background: "rgba(76, 96, 120, 0.12)",
    border: "rgba(120, 145, 170, 0.25)",
    ctaLabel: "Falar comigo",
    accessNote:
      "Built for applied performance environments and adaptable by context.",
    panelTitle: "Interested in applying this type of system?",
    panelBody:
      "This can be discussed for teams, athletes, academies or performance environments.",
    icon: "layers",
  },
  protected: {
    label: "Trabalho de caso protegido",
    accent: "#C9A45C",
    background: "rgba(162, 123, 55, 0.12)",
    border: "rgba(206, 164, 83, 0.30)",
    ctaLabel: "Pedir uma visita privada",
    accessNote:
      "This is protected casework. Details remain confidential. A private walkthrough can be requested when relevant.",
    panelTitle: "Private walkthrough available by request.",
    panelBody:
      "This object represents confidential applied work. Details stay protected, but the structure can be discussed privately when relevant.",
    icon: "lock",
  },
  "in-development": {
    label: "Em construção",
    accent: "#D1A85A",
    background: "rgba(187, 143, 67, 0.10)",
    border: "rgba(210, 170, 90, 0.25)",
    ctaLabel: "Registar interesse",
    accessNote:
      "Being built now. Register interest and you hear first when it opens.",
    panelTitle: "Being built right now.",
    panelBody:
      "The structure is there. Register interest and you get it the week it opens.",
    icon: "sparkle",
  },
};

export const appliedWorkObjects: AppliedWorkObject[] = [
  {
    slug: "hydration-sweat-testing-framework",
    number: "02",
    title: "Hydration & Sweat Testing Framework",
    statusBadge: "Internal System",
    accessType: "internal",
    positioningLine:
      "From sweat losses and sodium data to individualized hydration decisions.",
    category: "Modelo",
    group: "systems",
    type: "Testes de suor · sódio · acompanhamento de hidratação",
    status: "Protected",
    context: "Sweat testing · sodium · hydration follow-up",
    description:
      "Dos dados de testes de suor a decisões de hidratação prontas para o atleta.",
    problem:
      "Hydration advice often stays generic, while sweat losses, sodium losses and drinking behaviour vary widely between players.",
    whatIBuilt:
      "A practical field protocol and digital workflow for sweat-rate testing, sodium testing, player profiling, intervention planning and reporting.",
    whyItMatters:
      "It helps practitioners move from raw measurements to individualized hydration support.",
    whatItProves:
      "Medição traduzida em decisões de hidratação individualizadas.",
    previewNote: "Dashboard mockup + protocol page preview.",
    appliedPreview: "hydrationDashboard",
    previewImage: hydrationPreview,
    previewAlt:
      "Hydration & Sweat Testing framework preview, a dark premium dashboard with squad sweat-rate and sodium metrics, a trend chart and the Sweat Testing Protocol sheet.",
    previewObjectPosition: "center right",
    ctaLabel: "Ver o modelo",
    ctaType: "view-sample",
  },
  {
    slug: "body-composition-monitoring",
    number: "03",
    title: "Body Composition & Monitoring Support",
    statusBadge: "Protected Casework",
    accessType: "protected",
    positioningLine:
      "Assessment translated into staff decisions, not rankings.",
    category: "Relatório de equipa",
    group: "protected",
    type: "Team monitoring · staff decision support",
    status: "Protected",
    context: "Team monitoring · staff decision support",
    description:
      "Transformar a avaliação em acompanhamento prático, e não em classificações.",
    problem:
      "Body composition data can easily become isolated numbers or harmful comparisons if it is not interpreted with context.",
    whatIBuilt:
      "Team and individual monitoring reports using standardized assessment, aggregated summaries, cut-off interpretation, longitudinal tracking and practical staff notes.",
    whyItMatters:
      "It supports nutrition, training and recovery decisions while keeping the focus on individual evolution.",
    whatItProves:
      "Relatório para a equipa técnica que suporta decisões sem reduzir jogadores a classificações.",
    previewNote: "Redacted report and dashboard preview.",
    confidentialityNote:
      "Protected internal work. Names and sensitive data remain redacted.",
    appliedPreview: "redactedReport",
    previewImage: bodyCompositionPreview,
    previewAlt:
      "Body Composition & Monitoring Support preview, a confidential Team Report (Redacted) with Σ8 skinfolds season-trend chart, redacted athlete table and an individual summary sheet.",
    previewObjectPosition: "center left",
    ctaLabel: "Protected preview",
    ctaType: "protected",
  },
  {
    slug: "food-environment-catering",
    number: "04",
    title: "Food Environment & Catering Operations",
    statusBadge: "Protected Casework",
    accessType: "protected",
    positioningLine:
      "Performance nutrition standards for the real food environment athletes live inside.",
    category: "Ferramenta aplicada",
    group: "protected",
    type: "Hotels · catering · food logistics",
    status: "Protected",
    context: "Hotels · catering · food logistics",
    description:
      "Padrões de nutrição de performance para ambientes alimentares reais.",
    problem:
      "Even strong nutrition plans fail if the food environment, catering standards and logistics do not support the players.",
    whatIBuilt:
      "Operational manuals, buffet requirements, matchday food standards, shopping lists, ingredient guidance and food information databases for performance environments.",
    whyItMatters:
      "It turns nutrition into an environment athletes can actually live inside.",
    whatItProves:
      "Padrões de operação em nutrição, desenhados para ambientes reais de catering e de hotel.",
    previewNote: "Blurred operational manual + checklist-style object.",
    confidentialityNote:
      "Protected operational work. Structure and quality only, no confidential details.",
    appliedPreview: "operationsManual",
    previewImage: foodCateringPreview,
    previewAlt:
      "Food Environment & Catering Operations preview, a dark operations dashboard alongside the Catering Operations Manual, structure and quality only with no confidential details.",
    previewObjectPosition: "center",
    ctaLabel: "View structure",
    ctaType: "protected",
  },
  {
    slug: "football-nutrition-education-tools",
    number: "05",
    title: "Football Nutrition Education Tools",
    statusBadge: "Public Resource",
    accessType: "public",
    positioningLine:
      "Evidence translated into simple, memorable decisions athletes can actually use.",
    category: "Série de formação",
    group: "public",
    type: "Athletes · parents · staff",
    status: "Public",
    context: "Athletes · parents · staff",
    description:
      "Ferramentas visuais de formação que tornam a nutrição de performance mais fácil de perceber.",
    problem:
      "Athletes often receive information that is either too scientific to use or too simple to respect.",
    whatIBuilt:
      "Infographics, mini-classes, ABC-style concepts, supplement education, cramp shot explainers, hydration visuals, youth athlete snack guides and practical food education.",
    whyItMatters:
      "It turns evidence into simple, memorable decisions without losing scientific responsibility.",
    whatItProves:
      "Tradução da evidência em comportamento claro, do lado do atleta.",
    previewNote:
      "Stack of visual education pieces / infographic thumbnails.",
    appliedPreview: "educationGrid",
    previewImage: educationToolsPreview,
    previewAlt:
      "Football Nutrition Education Tools preview, a premium dark grid of six visual learning objects covering matchday nutrition, hydration, recovery and supplements.",
    previewObjectPosition: "center",
    ctaLabel: "O que tem lá dentro",
    ctaType: "view-sample",
  },
  {
    slug: "football-nutrition-atlas",
    number: "06",
    title: "Football Nutrition Atlas",
    statusBadge: "Building",
    accessType: "in-development",
    positioningLine:
      "A scalable atlas connecting matchday, training, recovery, hydration and food decisions.",
    category: "Produto",
    group: "systems",
    type: "Football food decisions · practical resource",
    status: "In Development",
    context: "Football food decisions · practical resource",
    description:
      "Um atlas prático que traduz ciência em decisões alimentares no futebol.",
    problem:
      "Football nutrition resources are often scattered across guidelines, recipes, isolated tips and context-free recommendations.",
    whatIBuilt:
      "A premium educational atlas connecting matchday, training day, recovery, hydration, plate structure, timing and practical food examples.",
    whyItMatters:
      "It creates a scalable resource that helps athletes and practitioners understand not just what to eat, but why and when.",
    whatItProves:
      "Um produto de formação escalável, construído a partir de sistemas aplicados de nutrição de performance.",
    previewNote:
      "Premium book / atlas mockup with first pages visible and remaining pages blurred.",
    appliedPreview: "atlasBook",
    previewImage: atlasPreview,
    previewAlt:
      "Football Nutrition Atlas preview, an open premium book spread showing the pre-match plate chapter, with the remaining pages held back.",
    previewObjectPosition: "top center",
    ctaLabel: "Preview atlas",
    ctaType: "early-access",
  },
];

/* Connections between these entries (laws, maturity, environment and
   lineage) live in src/data/work-graph.ts, so this file stays a plain
   catalogue and the graph stays the single place to feed. */