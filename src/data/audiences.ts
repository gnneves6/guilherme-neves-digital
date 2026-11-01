/**
 * Who the practice serves.
 *
 * The site used to open with what is sold. It now opens with who is arriving,
 * because traffic comes from social video where the viewer already knows why
 * they clicked. A club director and a second-year student need different first
 * screens, and sending both to the same page loses one of them.
 *
 * Each entry has its own anchor, so a video can point straight at it
 * (/services#students) instead of at the top of a page the viewer then has to
 * search through.
 *
 * There are two axes here and they are not the same question.
 *
 * `state` is time: can this happen now, does it wait on professional
 * registration, or is it something that follows later. Six doors that look
 * identical make a visitor knock on the wrong one and then read a paragraph
 * explaining why the door does not open. The state is shown before the copy,
 * so nobody spends attention on a door that is not theirs yet.
 *
 * Work that amounts to individual dietary prescription is a regulated act in
 * Portugal and sits behind registration. That is the whole of the `waiting`
 * state, and it is stated rather than implied.
 *
 * `waiting` is a Portuguese fact, not a universal one, and the copy used to
 * read as though the door were shut everywhere. Several countries let a
 * graduate practise without a separate professional registration, so a reader
 * abroad was being turned away from work that could start immediately. The
 * lines now say where the block applies and invite the rest to ask. They do
 * not state what any other country's rules are, because that has to be checked
 * per country and a website is the wrong place to guess.
 */

import type { EngagementId } from "./engagements";
import { entryOf } from "./work-graph";

export type AudienceState = "now" | "waiting" | "later";

export interface Audience {
  id: string;
  /** Anchor used in URLs, kept short enough to say out loud in a video. */
  anchor: string;
  label: string;
  /** A qualifier printed next to the label, where the door covers more than its name. */
  labelNote?: string;
  /**
   * A word in the list, where the door differs from the ones around it.
   *
   * Three doors sit under "Open now" and one of them does not sell anything.
   * Without a mark they scan as three equivalent offers, and a student decides
   * whether to click based on whether they think they can afford it, which is
   * the exact hesitation this door exists to remove.
   */
  badge?: string;
  /** Who this is, in their own words rather than a market segment. */
  who: string;
  /**
   * The problem they arrive with.
   *
   * Kept, not rendered. The selector showed both this and the offer as
   * paragraphs above the gains list, which restated the line above them and
   * the list below them, and a person choosing between six options needs only
   * "is this me" and "what do I get". The copy stays here because it is worth
   * having if the panel ever needs to say more, but nothing prints it today.
   */
  problem: string;
  /** What I actually do for them. */
  offer: string;
  /** What they leave with. */
  gains: string[];
  /**
   * The shapes the work takes for this door, in the order they are offered.
   *
   * Replaces a separate section of three engagement cards that sat under these
   * six and described the same work a second way. A door that names its own
   * formats needs no cross-reference.
   */
  formats: EngagementId[];
  /**
   * Where a format means something different behind this door.
   *
   * The three formats were written for a club, because that is where they were
   * built. Printed unchanged under "Professional athletes", "System installed"
   * promised structures "your staff run without me in the room", to somebody
   * who has no staff. One shared set of formats is still right; a line per door
   * where the shared one would lie is the price of keeping it.
   */
  formatNotes?: Partial<Record<EngagementId, string>>;
  /**
   * One real piece of work, and why it belongs to this door.
   *
   * Every door claims something; exactly one artefact per door is the cheapest
   * honest way to back the claim, and it costs no new writing because the
   * archive already holds what each piece proves. Named, never described in
   * the abstract.
   */
  proof: { slug: string; why: string };
  /**
   * The moments that release a budget.
   *
   * A door that names a job title is answered with "yes, that is me" and no
   * action. Chronic problems do not get funded; clubs have lived with nutrition
   * being scattered for twenty years. Events get funded. Naming the events lets
   * somebody standing in one of them recognise not just themselves but their
   * week, which is a completely different level of specificity from naming who
   * they are.
   */
  triggers?: string[];
  /** A thing with a price, for the doors where one can honestly be sold. */
  product?: string;
  state: AudienceState;
  /** Why this door is not open yet. Printed only where it exists. */
  legal?: string;
  cta: string;
  ctaMicro: string;
}

export const audienceStateMeta: Record<
  AudienceState,
  { label: string; group: string; groupNote: string; tone: "live" | "soon" | "open" }
> = {
  now: {
    label: "Aberto agora",
    group: "Aberto agora",
    groupNote: "Trabalho não clínico: sistemas, ferramentas, formação.",
    tone: "live",
  },
  waiting: {
    label: "Abre com a cédula",
    group: "Abre com a cédula",
    groupNote: "Em Portugal é acto regulado. Fora, pergunte.",
    tone: "soon",
  },
  later: {
    label: "Aberto a propostas",
    group: "Aberto a propostas",
    groupNote: "Lidas por mim e respondidas com franqueza. Nunca perseguidas.",
    tone: "open",
  },
};

export const stateOrder: AudienceState[] = ["now", "waiting", "later"];

export const audiences: Audience[] = [
  {
    id: "clubs",
    anchor: "clubs",
    label: "Clubes e departamentos de performance",
    who: "Clubes profissionais, academias e federações, e quem carrega isto lá dentro.",
    problem:
      "A nutrição raramente falta. Está espalhada pela performance, pelo departamento médico, pela cozinha e pelos próprios jogadores, e ninguém é dono do quadro inteiro. Resulta quando alguém a empurra, e deixa de resultar na semana em que toda a gente está ocupada. Depois passa a ser culpa de alguém.",
    offer:
      "Leio como é que o vosso ambiente funciona de facto, não como o manual diz que devia, e construo as peças que aguentam uma semana real. Protocolos de avaliação, estrutura de dia de jogo e de deslocação, padrões de catering, monitorização que a vossa equipa consegue correr e ler. Depois entrego, e aquilo continua a andar sem eu estar na sala.",
    gains: [
      "Uma pessoa dona do quadro inteiro, em vez de quatro departamentos donos de metade",
      "Sistemas que a vossa equipa corre sem mim, não um documento que morre numa drive",
      "A camada de performance que a maioria dos clubes perde em silêncio, fechada",
      "A nutrição tratada a sério sem aumentar o quadro de pessoal",
    ],
    formats: ["audit", "systems", "education"],
    triggers: [
      "Um diretor desportivo ou um responsável de performance novo, e de repente a nutrição é problema de alguém",
      "Uma série de lesões de tecidos moles, e a pergunta sobre o que mais estará a contribuir",
      "Um reforço que chegou numa condição de que ninguém quer falar",
      "Um centro de treinos novo ou uma empresa de catering nova, e uma hipótese de pôr o padrão antes de os hábitos se formarem",
      "Um jogador, ou um pai, que disse qualquer coisa ao treinador",
    ],
    proof: {
      slug: "food-environment-catering",
      why: "Padrões escritos para uma semana real de catering e hotel, não para um manual.",
    },
    state: "now",
    cta: "Falar comigo",
    ctaMicro: "Começa por como é que a vossa semana corre de facto.",
  },
  {
    id: "staff",
    anchor: "professionals",
    label: "Treinadores e equipa de performance",
    who: "Preparadores físicos, fisioterapeutas, analistas e nutricionistas que trabalham no desporto.",
    problem:
      "A ciência já a sabem. O que é difícil encontrar é a versão específica do futebol: o que é que o MD-1 precisa mesmo, para que serve o intervalo, como é que nada disso sobrevive a um autocarro à meia-noite. Por isso, quando um jogador pergunta, improvisa-se ou desvia-se, e nenhuma das duas é a resposta que se quer dar.",
    offer:
      "Entrego os sistemas aplicados em vez da teoria. Estruturas de dia de jogo, protocolos de hidratação, os modelos que uso dentro de ambientes de elite, com o raciocínio junto para poderem defender cada decisão que tomarem com eles. Ficam vossos.",
    gains: [
      "A versão específica do futebol, não a versão do manual",
      "Respostas que se defendem se um especialista olhar para o vosso trabalho",
      "Estruturas que sobrevivem a calendários apertados, deslocações e chegadas tardias",
      "Os vossos atletas melhor preparados, e o crédito é vosso",
    ],
    formats: ["systems", "education"],
    triggers: [
      "Um jogador perguntou-vos alguma coisa no relvado e a resposta foi improvisada",
      "Uma série de jogos seguidos, e o plano que resultava em agosto deixou de resultar",
      "Deslocações, jogos tardios e chegadas à meia-noite, e o manual não cobre nada disso",
      "Está um especialista prestes a olhar para o que têm andado a fazer",
    ],
    product: "matchday-week",
    proof: {
      slug: "md-1-fuel-system",
      why: "A versão do dia de jogo específica do futebol, na forma em que se corre mesmo.",
    },
    state: "now",
    cta: "Falar do vosso ambiente",
    ctaMicro: "Para departamentos e para profissionais a título individual.",
  },
  {
    id: "students",
    anchor: "students",
    label: "Estudantes e início de carreira",
    badge: "Grátis",
    who: "Estudantes de nutrição e recém-licenciados que querem trabalhar no futebol.",
    /*
     * This door does not sell anything, on purpose.
     *
     * It was written as a paid one-to-one session, and an earlier note called
     * it the first offer that could take money this week. That was wrong about
     * this market: students do not pay. What they do is decide, over years,
     * who the reference is, and a good number of them become the practitioners
     * and the staff who can buy. Charging them fifty euros today to lose that
     * is a bad trade.
     *
     * So it gives, and it says out loud where the paid work lives: the door
     * above this one, for when they are the person inside the building. The
     * position is earned by being useful now and by the career being worth
     * following, not by monetising people who have no money.
     */
    problem:
      "O curso ensina a ciência e nada da parte que decide: como é que se entra num ambiente de elite, qual é o trabalho de facto depois de lá estar, e o que faz um clube dizer que sim a alguém que ainda não tem título.",
    offer:
      "Tudo o que eu teria querido nessa fase, de graça. O caminho que fiz, com franqueza, incluindo o que correu mal. As ferramentas que construo, à medida que as construo. E uma resposta quando me perguntares, porque nessa fase a resposta costuma ser uma frase e ninguém ta dá.",
    gains: [
      "O caminho contado por quem o fez há pouco tempo, não por quem o fez em 2005",
      "As ferramentas à medida que são construídas, não uma versão cortada para estudantes",
      "Uma resposta direta à pergunta que não se faz ao professor",
      "As partes que ninguém conta, erros incluídos",
    ],
    formats: ["education"],
    formatNotes: {
      education:
        "Aberto e grátis. No dia em que fores o profissional dentro do clube, a porta acima desta é onde trabalhamos juntos.",
    },
    proof: {
      slug: "evidence-radar",
      why: "Construído para um problema meu, e dado quando outros profissionais o pediram.",
    },
    state: "now",
    cta: "Pergunta-me o que ninguém responde",
    ctaMicro: "Não se paga e não há venda no fim.",
  },
  {
    id: "athletes",
    anchor: "athletes",
    label: "Atletas profissionais",
    labelNote: "incluindo uma mudança de clube ou de país",
    who: "Profissionais séniores cujo rendimento depende de um corpo sobre o qual não podem andar a adivinhar, incluindo quem muda de clube ou de país.",
    problem:
      "Já tem quem trate da nutrição no clube. Essa pessoa não sabe que salta o pequeno-almoço quando está nervoso, que é a companheira que cozinha ao domingo, ou que detesta metade da comida que lhe foi atribuída em silêncio. Um plano feito sem a vida real lá dentro não sobrevive à vida real, e é na vida real que a carreira se decide. Mude de país e piora: a comida que resultava deixa simplesmente de existir.",
    offer:
      "Se acabou de mudar, vou ter consigo. Primeira semana no terreno: avaliação, mapear o que se compra e se come onde passou a viver, e pôr o padrão com que a época corre. Depois fico do seu lado. Escreva-me quando o sono se desregular, quando o intestino estiver mal, quando a semana correu mal, e não na próxima chamada marcada. Reavaliamos e ajustamos à medida que a época anda, porque um número de agosto não diz nada em fevereiro.",
    gains: [
      "Um especialista que o conhece a si, os seus hábitos, a sua família, a sua vida real, e não só os seus números",
      "Uma linha direta. Fala comigo quando algo está mal, não na próxima consulta",
      "Um padrão construído à volta de comida que se arranja mesmo, onde quer que esteja a jogar",
      "Reavaliado e ajustado ao longo da época, em vez de ficar velho à terceira semana",
      "Uma pessoa responsável pelo quadro inteiro, em casa ou fora",
    ],
    formats: ["systems"],
    formatNotes: {
      systems:
        "Primeira semana no terreno, depois uma linha aberta e um padrão que se relê à medida que a época anda.",
    },
    proof: {
      slug: "athlete-orientation",
      why: "O contexto de um atleta transformado em comportamento, que é o trabalho todo.",
    },
    state: "waiting",
    legal:
      "Em Portugal isto é acto regulado e a minha cédula está a caminho, por isso aqui estou a recolher nomes desde já. Fora de Portugal as regras não são as mesmas: se estiver no estrangeiro, pergunte e vemos.",
    cta: "Registar interesse",
    ctaMicro: "Respondo-lhe eu quando isto abrir.",
  },
  {
    id: "youth",
    anchor: "young-athletes",
    label: "Jovens atletas e famílias",
    who: "Pais que veem que o talento é real e não querem a base entregue ao acaso.",
    problem:
      "Quase tudo o que existe foi escrito para profissionais adultos atrás de ganhos marginais. Quase nada disso é seguro ou sensato para um corpo que ainda está a crescer, e o que está em jogo é outro: o que ele come agora decide como cresce, como se concentra na escola, e se o corpo aguenta o tempo suficiente para o talento chegar a contar.",
    offer:
      "Acompanhamento de horizonte longo, que põe a saúde e o desenvolvimento à frente da performance, porque nesta idade são a mesma coisa. Trabalho convosco e com o vosso filho, não à vossa volta. Hábitos feitos para caber na vida da família, explicados para ele perceber o porquê e não só o quê, ajustados à medida que cresce.",
    gains: [
      "Hábitos que cabem na vida da família, não a rotina de um profissional imposta a um miúdo em crescimento",
      "Uma base que protege o crescimento, a escola e a saúde a longo prazo ao mesmo tempo",
      "Explicado numa linguagem que ele vai usar, não em regras contra as quais se revolta",
      "Alguém a olhar para o jogo longo enquanto os outros otimizam esta semana",
    ],
    formats: ["education"],
    formatNotes: {
      education:
        "Hábitos construídos à volta de como a vossa família come de facto, explicados para ele perceber o porquê.",
    },
    proof: {
      slug: "abc-of-football-nutrition",
      why: "A base primeiro, numa linguagem que um jovem atleta vai mesmo usar.",
    },
    state: "waiting",
    legal:
      "Também é acto regulado em Portugal, por isso aqui abre ao mesmo tempo que o acompanhamento individual. Fora de Portugal, pergunte. Famílias e academias são bem-vindas de qualquer forma.",
    cta: "Registar interesse",
    ctaMicro: "Famílias e academias podem perguntar.",
  },
  {
    id: "brands",
    anchor: "partnerships",
    label: "Marcas e parcerias",
    who: "Empresas a construir alguma coisa no desporto, na performance ou na nutrição.",
    problem:
      "A maior parte das parcerias nesta área troca credibilidade por alcance, e o profissional acaba a dizer coisas que não consegue defender. Toda a gente percebe. Custa à marca mais do que lhe compra.",
    offer:
      "Trabalho com produtos que usaria e com afirmações que consigo sustentar. Se a evidência não estiver lá, digo-o, e é exatamente por isso que o aval vale alguma coisa. O que recebem é um profissional a trabalhar dentro de ambientes de elite a sério, não uma conta de redes com um rótulo de nutrição.",
    gains: [
      "Um aval que aguenta escrutínio, porque foi filtrado antes de ser dado",
      "Alguém dentro de ambientes reais, a testar o que estão a construir onde isso conta",
      "Conteúdo e formação que não esticam a ciência",
      "Um não quando tem de ser não, que é o que faz o sim valer alguma coisa",
    ],
    formats: ["education"],
    formatNotes: {
      education:
        "Conteúdo e formação que dizem o que a evidência sustenta, e param aí.",
    },
    proof: {
      slug: "supplementation-elite-football",
      why: "Evidência filtrada antes de se dizer seja o que for, que é o que faz um sim valer alguma coisa.",
    },
    state: "later",
    cta: "Enviar uma proposta",
    ctaMicro: "Leio todas, e digo que não muitas vezes.",
  },
];

export const audienceByAnchor = (anchor: string) =>
  audiences.find((a) => a.anchor === anchor);

/** The six doors, grouped by when they open. Empty groups are dropped. */
export const audiencesByState = stateOrder
  .map((state) => ({
    state,
    meta: audienceStateMeta[state],
    items: audiences.filter((a) => a.state === state),
  }))
  .filter((g) => g.items.length > 0);

/**
 * The named piece of work behind a door, resolved from the archive.
 *
 * Through the graph rather than through `artefacts`, because the archive is
 * two lists: `artefacts` holds the resources, `appliedWorkObjects` holds the
 * pieces built inside clubs, and the graph is the only place that has both.
 * Resolving from `artefacts` alone silently dropped the clubs door's proof,
 * which is the one door most likely to be read by somebody who can buy.
 */
export const proofFor = (a: Audience) => {
  const artefact = entryOf(a.proof.slug);
  return artefact ? { artefact, why: a.proof.why } : null;
};
