# A posição

Este documento existe porque a pergunta "em que ficamos?" já foi feita mais do
que uma vez, e todas as vezes a resposta viveu numa conversa que desapareceu.
`decisions.md` regista o que foi decidido e porquê. Este regista o que estamos
a construir e porque é que achamos que funciona.

Nada aqui é definitivo. Tudo aqui é falsificável, o que é diferente de ser
verdade.

---

## 1. O que é realmente o activo

A tentação é dizer que o activo é o conhecimento de nutrição desportiva. Não é.
Há milhares de pessoas com esse conhecimento, muitas com mais anos e todas com
cédula. Se o argumento for "sei de nutrição", ele perde contra qualquer
nutricionista com dez anos de carteira, e perde sem discussão.

O activo é outro, e é estreito o suficiente para ser defensável: **ele esteve
dentro da sala.** Equipa principal do Leça, RSC Anderlecht, aos 21 anos. E,
mais raro do que isso: está a escrever o que lá se passa.

Vale a pena separar as duas populações:

- Quem entra na sala quase nunca escreve. É trabalho interno do clube, é
  cultura de não partilhar, e não há incentivo.
- Quem escreve quase nunca entrou. É académico, é criador de conteúdo, é
  formador. Escreve sobre a sala a partir de fora.

A intersecção é quase vazia. É aí que ele está, e é a única posição no mapa que
não exige cédula, não exige antiguidade e não exige que alguém o apresente.

---

## 2. O nicho

Não "nutricionista desportivo". A categoria está cheia, compete a preço, e em
Portugal está-lhe legalmente fechada até haver cédula.

**O arquivo aberto de como a alimentação funciona operacionalmente no futebol
de elite.**

Não conteúdo. Artefactos de operação: o sistema de MD-1, o banco de
equivalências, a semana de jogo, o protocolo de dia de viagem, o briefing para
o catering, a folha de teste de suor. Coisas que existem dentro dos clubes em
ficheiros que ninguém publica.

Porque é que esta posição aguenta:

- **É legal sem cédula.** Documentar e ensinar não é acto clínico. Isto não é
  um contorno, é uma categoria diferente de trabalho.
- **Compõe.** Cada artefacto torna o seguinte mais valioso, porque passam a
  referenciar-se. Conteúdo não faz isto: um post não torna o próximo melhor.
- **Viaja.** Um clube belga ou inglês pode usar o material sem ele estar
  inscrito em lado nenhum. Resolve o problema de estar preso a uma jurisdição.
- **Tem forma de bola de neve.** Praticantes partilham ferramentas com outros
  praticantes. É o comportamento natural da profissão, não é um mecanismo que
  temos de inventar.

---

## 3. O diferencial que não se copia

"Eu estive na sala" degrada-se no dia em que ele sair da sala. Precisa de uma
versão durável.

**Cada artefacto é versionado, datado, e mostra o que mudou e porquê.**

Um protocolo que diz *"v3 — mudou porque um jogador teve cãibras à semana 4, e
isto foi o que encontrámos"* é prova de prática que não se finge. Para copiar
aquilo é preciso ter feito aquilo.

Ninguém em nutrição faz isto. Publica-se a versão final, limpa, sem histórico,
como se tivesse nascido certa. O histórico é que é a prova.

Isto é também, exactamente, a ideia do `gui-os` aplicada à camada
profissional: um sistema operativo, publicado, com registo de alterações.

---

## 4. O motor de comunidade

O pedido foi: algo que as pessoas alimentem sozinhas e tragam mais pessoas. A
resposta honesta não é um fórum — fóruns morrem — é encontrar a contribuição
que já é do interesse próprio de quem contribui.

**O Banco de Equivalências do Atleta.**

É uma base de "esta porção ≈ esta porção" para alimentos reais em países reais.
Todo o praticante que o usa bate num alimento que lá não está: um pão belga, uma
broa, uma tapioca, um prato de cantina de um clube específico.

O ciclo é: submete o alimento → fica creditado → o banco melhora para todos.

- Fricção baixa. Um alimento, não um ensaio.
- Interesse próprio. Precisa dele para o atleta dele amanhã.
- Compõe de forma superlinear. O valor do banco cresce mais depressa que a
  cobertura, porque o que interessa é não ter buracos.
- Atribuível. Nome na entrada é a razão pela qual partilham.
- E torna-se progressivamente impossível de replicar, porque é um activo
  construído por uma multidão num nicho onde ninguém está a construir com
  multidão.

É o único activo desta lista que melhora enquanto ele dorme.

---

## 5. Monetização

A instrução foi clara: não começar a cobrar caro só porque sim. Isto é a
arquitectura, e é coerente com o que ele já disse querer.

1. **O arquivo é gratuito para sempre.** É o topo da máquina e a razão pela
   qual alguém sabe o nome dele. Nunca fechar.

2. **As ferramentas são grátis; o encaixe é que se paga.** Ninguém paga pelo
   sistema de MD-1. Paga-se por "aqui está a semana de jogo do vosso clube,
   construída em cima dele". O artefacto é a prova; a adaptação é o produto.

3. **Preço por lugar, não por hora.** Um clube paga por atleta por época. Escala
   com o plantel, é legível para um orçamento, e não limita o rendimento dele ao
   número de horas que tem.

4. **A promessa de devolução, tornada específica.** "Se não acrescentar valor,
   devolvo o dinheiro" só é credível se o valor estiver definido *antes*. Cada
   trabalho abre com um resultado escrito — e a devolução é contra esse
   resultado, não contra uma sensação. Sem isto a promessa é marketing; com
   isto é um contrato.

5. **Selectividade como mecanismo, não como pose.** Um limite visível — "quatro
   clubes esta época, dois lugares" — faz três coisas ao mesmo tempo: justifica
   o preço sem arrogância, cria urgência que não é falsa, e protege o tempo dele
   enquanto não há cédula.

6. **Quem paga, e quem não paga.** Estudantes não pagam: são a distribuição e os
   futuros praticantes. Praticantes não pagam em dinheiro — pagam a contribuir
   para o banco. Só organizações com orçamento pagam. Isto é uma arquitectura de
   preço com princípio, não uma escada de descontos.

---

## 6. A máquina

O teste de uma estratégia é se cada seta é algo que se pode fazer este mês.

```
publicação (IG / LinkedIn)
        ↓
página de artefacto no site
        ↓
a ferramenta é mesmo útil
        ↓
usam-na com um atleta
        ↓
batem num buraco
        ↓
contribuem → ficam creditados
        ↓
partilham
        ↓
chegam mais praticantes
        ↓
alguns trabalham em clubes
        ↓
clubes precisam de adaptação → trabalho pago
        ↓
trabalho pago produz artefactos novos
        ↓
        volta ao topo
```

---

## 7. Notion

Duas funções diferentes que estavam a ser feitas pela mesma ferramenta.

- **Notion como cozinha dele** — rascunhar, pensar, guardar. Fica. É bom nisso
  e o site não é.
- **Notion como superfície pública de entrega** — sai. Porque: expõe o
  andaime; não se consegue medir; não recolhe um email; parece o link-in-bio de
  toda a gente; e faz o artefacto parecer um apontamento em vez de um produto.

Concretamente: cada artefacto passa a ter página própria no site, com o
documento por trás, e o Notion deixa de aparecer para fora. Já tirámos o
*fallback* que mandava sete artefactos para um directório genérico do Notion —
isto é o passo seguinte da mesma decisão.

---

## 8. O que falta

Por ordem de dano:

1. **Cinco artefactos prometidos sem documento por trás.** MD-1 Fuel System,
   Athlete Equivalent Bank, Supplementation in Elite Football, Why Players
   Cramp, Athlete's Food Pyramid. O site promete e não entrega. É o maior
   buraco e é o único que custa credibilidade em vez de custar oportunidade.
2. **The Matchday Week (€89) não existe.** Está à venda um documento que não
   está escrito.
3. **Analytics por correr.** `supabase/migrations/20260829120000_page_views.sql`
   não foi aplicada. Estamos cegos.
4. **O banco não é um banco.** Não há mecanismo de contribuição.
5. **Não há versão nem changelog nos artefactos.** O diferencial da secção 3
   ainda não existe em código.
6. **`gui-os` não está ligado a esta sessão.**

---

## 9. O passo seguinte

Não é construir a plataforma de comunidade.

**É tornar um artefacto real, de ponta a ponta, no site.**

O Banco de Equivalências, por quatro razões: ele consegue escrevê-lo a partir
do que já sabe; é legal sem cédula; é a semente do ciclo de contribuição; e é
útil às três audiências ao mesmo tempo.

Um artefacto entregue por inteiro vale mais do que cinco prometidos.
