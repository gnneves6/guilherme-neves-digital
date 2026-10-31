import fotoBalneario from "@/assets/photos/locker-room.webp";
import artefactoBalneario from "@/assets/work-previews/education-tools-preview.webp";

/**
 * O TERRENO, os sítios onde o trabalho acontece.
 *
 * O site deixou de se organizar por serviços e passou a organizar-se por
 * contextos. Não é uma escolha de layout: o trabalho de fim de curso dele
 * conclui que é o CONTEXTO que decide se a evidência vira prática, portanto
 * um site organizado por contextos é o argumento, não uma ilustração dele.
 * Um site organizado por serviços é o de toda a gente.
 *
 * Cinco camadas por sítio, sempre as mesmas, e cada uma responde a uma coisa
 * que ele pediu: a fotografia é onde a pessoa se reconhece, a posição é a
 * intervenção, o artefacto é o que se leva, as perguntas são comunidade sem
 * fingir que já existe uma, e o `agora` é o pulso.
 *
 * ⚠️ As perguntas são PADRÕES, recolhidos do banco de conteúdo dele, e nunca
 * uma pessoa reconhecível para quem estava na sala. É a regra de 30 out, e
 * vale aqui tanto como numa tertúlia.
 */
export interface Sitio {
  id: string;
  numero: string;
  nome: string;
  /** Uma linha, dita de fora: o que se passa neste sítio. */
  tagline: string;
  foto: string;
  fotoAlt: string;
  posicao: { frase: string; corpo: string };
  artefacto: { nome: string; imagem: string; imagemAlt: string; corpo: string; fica: string };
  perguntas: { quando: string; linhas: string[] };
  agora: { data: string; linha: string };
}

export const sitios: Sitio[] = [
  {
    id: "balneario",
    numero: "01",
    nome: "O balneário",
    tagline: "Onde o plano deixa de ser um documento e passa a ser uma decisão de alguém.",
    foto: fotoBalneario,
    fotoAlt: "Guilherme Neves dentro de um balneário de futebol, antes de um jogo.",
    posicao: {
      frase: "Um plano que o jogador não cumpre não existe.",
      corpo:
        "Quase nada falha aqui por falta de ciência. Falha porque ninguém confiou em quem o trouxe. Por isso a primeira coisa que eu meço num clube não é um atleta: é em quem é que este balneário confia, e se o plano passa por essa pessoa antes de chegar ao jogador.",
    },
    artefacto: {
      nome: "Material de educação de balneário",
      imagem: artefactoBalneario,
      imagemAlt:
        "Cartões de educação em nutrição de futebol pousados numa mesa, cada um com uma decisão.",
      corpo:
        "Cartões visuais que explicam uma decisão de cada vez, em linguagem de balneário. Feitos para atletas, pais e equipa técnica, não para colegas de profissão.",
      fica: "Fica o staff a usar a mesma linguagem quando eu não estou lá.",
    },
    perguntas: {
      quando: "O que me perguntam aqui",
      linhas: [
        "Qual é o suplemento que me faz mesmo diferença?",
        "Não como hidratos antes do jogo para não ir cheio.",
        "Quero ir leve para o jogo.",
      ],
    },
    agora: {
      data: "out 2026",
      linha:
        "Foi daqui que nasceu a série semanal: uma crença de balneário, corrigida em oito segundos.",
    },
  },
];
