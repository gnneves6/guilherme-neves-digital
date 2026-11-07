// Shared experience data, used by the home Environments section and the
// About Experience section. Pure data, no asset imports, so it stays light.

export interface Experience {
  id: string;
  name: string;
  role: string;
  location: string;
  period: string;
  chapter: string;
  context: string;
  focus: string[];
  /**
   * The breadth of the role, in one sentence.
   *
   * Without it the proofs below read as the complete inventory of what he did
   * in a whole season, which makes a serious job sound like three small tasks.
   * This says what the work covered; the proofs are then read as examples of
   * it rather than as the whole of it.
   */
  scope: string;
  /**
   * What was actually done inside this environment, in the first person.
   * These replace the generic focus tags on the home chapter: a tag says
   * the subject was touched, a proof says what came of it. Kept to the few
   * that show judgement or a decision changing, not a list of duties.
   */
  proofs: string[];
  seasonNote: string | null;
  kitColors: { primary: string; secondary: string; accent: string };
  kit: { variant: "plain" | "hoops"; symbol: "dots" | "crest" | "four" };
}

export const experiences: Experience[] = [
  {
    id: "anderlecht",
    name: "RSC Anderlecht",
    role: "Estagiário de nutrição de performance",
    location: "Bruxelas, Bélgica",
    period: "2026",
    chapter: "O futebol de elite ensinou-me que a nutrição tem de ser clara ao ponto de aguentar pressão.",
    context: "Equipa principal de futebol de elite",
    focus: ["Hidratação", "Dia de jogo", "Revisões científicas", "Formação de atletas e staff"],
    scope:
      "Dentro do departamento de performance da equipa principal: hidratação e testes de suor, dia de jogo e deslocações, a evidência por trás do que andavam a vender ao clube, e o que a cozinha punha mesmo à frente dos jogadores fora de casa.",
    proofs: [
      "Escrevi o protocolo de hidratação e o manual de catering de deslocação, feitos para uma cozinha de hotel executar.",
      "Cortei 75% de um painel de sangue proposto. Ficou só o que mudava uma decisão.",
      "O departamento mandava-me as perguntas técnicas à espera de uma recomendação, não de um resumo.",
      "Calculadora de stock de líquidos e sais para jogos fora e europeus.",
    ],
    seasonNote: "Numa época com caminho até à final da taça e luta por lugares europeus.",
    kitColors: { primary: "#5E3A8E", secondary: "#FFFFFF", accent: "#C9A84C" },
    kit: { variant: "plain", symbol: "dots" },
  },
  {
    id: "leca",
    name: "Leça FC",
    role: "Nutrição de performance, equipa principal",
    location: "Porto, Portugal",
    period: "2025",
    chapter: "O futebol sénior transformou teoria em decisões diárias, medição e responsabilidade.",
    context: "Equipa principal de futebol sénior",
    focus: ["Composição corporal", "Semana de jogo", "Formação de atletas", "Alimentação prática"],
    scope:
      "A nutrição de uma equipa principal no dia a dia, durante uma campanha de subida: a semana de jogo, o protocolo de suplementação, a composição corporal, o acompanhamento individual, e a formação que pôs os jogadores a decidir sozinhos.",
    proofs: [
      "Tratei da nutrição da equipa principal no dia a dia, ainda em licenciatura.",
      "Avaliei o plantel todo pelo ISAK de oito pregas, a ler a mudança de cada um em vez de os comparar.",
      "Acompanhamento longo com jogadores prioritários. Todos melhoraram a composição corporal sem perder performance, e sem demonizar um único alimento.",
    ],
    seasonNote: "Dentro de uma campanha de subida.",
    kitColors: { primary: "#1F7A4D", secondary: "#FFFFFF", accent: "#C4A853" },
    kit: { variant: "hoops", symbol: "crest" },
  },
  {
    id: "r4e",
    name: "Run4Excellence",
    role: "Saúde e performance",
    location: "Porto, Portugal",
    period: "2025",
    chapter: "Performance é mais larga do que o futebol: treino, recuperação, saúde e consistência.",
    context: "Performance humana fora do futebol",
    focus: ["Saúde", "Hábitos", "Resistência", "Recuperação", "Desenvolvimento a longo prazo"],
    scope:
      "Nutrição de performance fora do futebol, com gente que treina a sério à volta de uma vida normal. Resistência, recuperação, marcadores de saúde, e os hábitos que decidem se aquilo dura mais do que um mês.",
    proofs: [
      "Performance lida mais larga do que o futebol: saúde, hábitos, resistência e o prazo longo de um atleta.",
      "Gente que treina a sério à volta de um emprego, e um plano que tem de sobreviver a isso.",
    ],
    seasonNote: null,
    kitColors: { primary: "#0E0E10", secondary: "#FFFFFF", accent: "#FFFFFF" },
    kit: { variant: "plain", symbol: "four" },
  },
];

export const additionalExposure = [
  { name: "FC Porto B e sub-19", date: "Abr 2025" },
  { name: "Gil Vicente FC", date: "Ago 2025" },
  { name: "USC Paredes", date: "Nov 2025" },
];
