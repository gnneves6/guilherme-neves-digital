/**
 * A semana, e os quatro imprevistos que a partem.
 *
 * Isto não é um calendário: é a tese dele jogável. O trabalho de fim de
 * curso conclui que a evidência não vira prática sozinha, e dizer isso por
 * escrito é o que toda a gente faz. Aqui a pessoa carrega, vê o plano
 * perfeito desfazer-se em quatro acontecimentos banais, e volta a carregar
 * com as regras postas. O argumento chega pelas mãos, não pelo parágrafo.
 *
 * Os quatro imprevistos são os que aparecem em qualquer época e nenhum deles
 * é culpa de ninguém, que é precisamente o ponto: não falha por falta de
 * ciência. As regras da segunda passagem são trabalho documentado dele, da
 * caixa de deslocação ao menu assinado pelo chef.
 */
export type Linha = "manha" | "clube" | "volta";

export const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] as const;

export const linhas: { id: Linha; nome: string }[] = [
  { id: "manha", nome: "Manhã" },
  { id: "clube", nome: "No clube" },
  { id: "volta", nome: "À volta do treino" },
];

/** Cada célula do plano. `d` é o índice do dia. */
export interface Celula {
  d: number;
  linha: Linha;
  texto: string;
}

export const plano: Celula[] = dias.flatMap((_, d) => [
  { d, linha: "manha" as Linha, texto: d === 5 ? "Pequeno-almoço de jogo" : "Pequeno-almoço" },
  {
    d,
    linha: "clube" as Linha,
    texto: d === 5 ? "Refeição pré-jogo" : d === 6 ? "Livre" : "Refeição no clube",
  },
  {
    d,
    linha: "volta" as Linha,
    texto: d === 5 ? "Recuperação no balneário" : d === 6 ? "Descanso" : "Reforço antes e depois",
  },
]);

export interface Imprevisto {
  /** Dia em que acontece. */
  d: number;
  texto: string;
  /** As células que deixam de acontecer, por `dia:linha`. */
  parte: string[];
  /** A regra que a faz aguentar, e o que a célula passa a dizer. */
  regra: string;
  viraEm: string;
}

export const imprevistos: Imprevisto[] = [
  {
    d: 1,
    texto: "O autocarro da deslocação atrasa noventa minutos.",
    parte: ["1:volta", "1:clube"],
    regra: "Caixa de deslocação, montada na véspera",
    viraEm: "Come-se no autocarro",
  },
  {
    d: 3,
    texto: "O hotel não tinha o que estava combinado.",
    parte: ["3:clube", "3:manha"],
    regra: "Menu de alternativas assinado pelo chef",
    viraEm: "Opção B, já acordada",
  },
  {
    d: 4,
    texto: "O jogo muda para vinte e quatro horas depois.",
    parte: ["4:volta", "5:manha", "5:clube"],
    regra: "O dia está ancorado ao apito, não à hora",
    viraEm: "Tudo desliza com o apito",
  },
  {
    d: 5,
    texto: "Um jogador recusa a refeição pré-jogo.",
    parte: ["5:volta"],
    regra: "Duas opções, escolhidas por ele na segunda-feira",
    viraEm: "Come a que escolheu",
  },
];

export const chave = (d: number, l: Linha) => `${d}:${l}`;
