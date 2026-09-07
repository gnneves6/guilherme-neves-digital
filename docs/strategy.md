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

### Revisão: a audiência foi escolhida pela procura, não pela análise

A proposta de mesa era apontar às academias, com base em lacunas documentadas
no futebol inglês: 15% das academias de Categoria 1 sem nutricionista, só 64%
das restantes a tempo inteiro, e as horas de apoio a desabar nos escalões mais
novos. Continua a ser verdade e continua a ser um mercado real.

Mas ele trouxe dados melhores: o que as pessoas já lhe pedem sem ele oferecer.

- **Ferramentas** para nutricionistas, profissionais de desporto e clubes. O
  Radar de Evidência e a ferramenta de hidratação e teste de suor foram as que
  pegaram.
- **O caminho.** Estudantes a perguntar-lhe sobre o estágio porque viram o
  percurso dele. Outros a perguntar como foi para fora, como arranjou, qual foi
  o processo.

Procura não solicitada é o sinal mais forte que existe — vale mais do que uma
lacuna documentada num país que não é este. Por isso a audiência é essa.

**São a mesma pessoa em dois momentos: quem quer fazer o que ele faz.** Um quer
a ferramenta para hoje; o outro quer o mapa para lá chegar. A promessa única:

> Mostro-te o que está mesmo dentro do futebol de elite, e como lá entrar.

Há imensa gente a ensinar nutrição desportiva. Não há quase ninguém a mostrar
como se entra, pela mesma razão da secção 1: quem entrou não escreve.

Duas notas que não se devem perder:

**A IA é vantagem dentro deste nicho, não um tema à parte.** Ferramentas
assistidas por IA é uma coisa que os pares dele não têm. FuelOps AI e o Atlas
deixam de ser curiosidades em desenvolvimento e passam a ser a linha de
produto.

**Isto não resolve o dinheiro sozinho, e é preciso dizê-lo.** Foi ele que
disse que os estudantes não pagam. Mas "como é que foste para fora e
arranjaste isso?" é a única coisa desta lista que as pessoas costumam pagar, e
está a ser respondida de graça, uma a uma, por mensagem. É o candidato mais
óbvio a primeira oferta real — e é honesto, porque ele fez mesmo aquilo.

O sinal fino sobre o que está a funcionar vive nas sessões do `gui-os`. Quando
esse repositório estiver ligado, esta secção deve ser reescrita contra ele em
vez de contra um resumo de memória.

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

---

## 10. O que adoptamos do Hormozi, e o que não

Fui às fontes em vez de trabalhar de memória. O que se segue confronta os
frameworks dele com este caso concreto, incluindo — sobretudo — onde não
servem.

### A equação de valor

    Valor = (Resultado dos sonhos × Probabilidade percebida)
            ─────────────────────────────────────────────────
                (Tempo até ao resultado × Esforço e sacrifício)

O detalhe que decide tudo aqui: **é um produto, não uma soma.** A
probabilidade percebida é um multiplicador, e alimenta-se de prova,
testemunhos, credenciais e garantias. Ele não tem cédula, não tem histórico
de trabalho pago e o site não tem **um único testemunho** — verificado, não
existe a palavra em lado nenhum do código.

Multiplicar um resultado enorme por uma probabilidade percebida perto de zero
dá perto de zero. É por isso que a conclusão "cobra caro" está errada *para
já*, e está errada segundo o próprio framework, não contra ele.

### O que aplicamos, e onde o site falha hoje

**A dor antes da solução.** "The pain is the pitch": quanto melhor
descreveres a dor de alguém, mais essa pessoa assume que tens a cura. O site
abre com o nome dele e "Built from within" — descreve-o a ele. A linguagem de
dor existe (`triggers`, em `audiences.ts`) mas vive no selector de
audiências, dentro de `/services`, e **a home não liga uma única vez para
`/services`**. A dor está enterrada a dois cliques.

**Prova.** Testemunhos no formato antes / depois / ponte. Zero no site, e ele
tem quem os dê: professores, colegas do Leça e do Anderlecht, e um
fisioterapeuta com empresa e atletas profissionais. É o item de maior
alavancagem da lista inteira e não é sequer trabalho de código.

**Tempo e esforço, para baixo.** O denominador. A Matchday Week acerta nisto
— uma semana, não uma época. Os artefactos prometidos sem documento são o
oposto: tempo de espera infinito, porque nunca chegam.

**Warm outreach primeiro.** Das quatro formas de gerar procura, ele é
explícito que se começa por quem já te conhece — e que não se vende, pergunta-
se quem mais poderia beneficiar. É exactamente a lista que o Guilherme já
descreveu ter e não está a trabalhar.

**Regra dos 100.** Cem contactos, ou cem minutos de conteúdo, ou cem euros de
anúncios, por dia. Dá dosagem concreta ao "focar nas redes sociais".

**Camadas.** Um serviço partido em níveis explícitos, com o *pitch* sempre no
nível mais alto e adaptação para baixo se o orçamento não chegar. Temos um
produto único a €89 e três formatos de trabalho que não são níveis. Isto é
construível já.

**Garantias.** Ele lista quatro tipos: incondicional, condicional (ligada a
acções do cliente), anti-garantia (venda final, por escassez), e implícita
(pagamento por desempenho). A nossa é a incondicional e vaga. A condicional é
mais forte aqui, porque obriga a escrever o resultado antes. E a implícita já
foi instinto dele — "pode haver serviços cujo pagamento é com base no valor
extra".

### O que não aplicamos, e porquê

**1. "Sê o mais caro."** A documentação do próprio framework exclui a fase
pré-validação e as indústrias reguladas. Ele é as duas coisas: sem clientes
pagantes que sirvam de prova, e sem cédula num país onde a profissão é
regulada. Preço de topo sem prova não é posicionamento premium — é um
desconhecido caro.

**2. Value stacking com preços inventados.** "Valor total €2.250, o teu
investimento €599". Funciona em ginásios e infoprodutos. Aqui destrói a
posição: o diferencial dele é ser a pessoa que documenta com honestidade, e
números de ancoragem fabricados contradizem isso à primeira leitura. Clubes e
outros profissionais — as audiências que interessam — reconhecem o truque.

**3. O teste da "multidão esfomeada" — ele falha-o, e isso é informação.**
Os três critérios são dor, poder de compra e capacidade de alcance.
Estudantes têm dor e alcance, não têm dinheiro. Praticantes têm dor e
alcance, têm pouco orçamento. Clubes têm dor e dinheiro, mas o alcance é
péssimo — é relacional e são poucos lugares. **Nenhuma audiência passa nos
três.** É precisamente por isso que a arquitectura da secção 5 separa quem
paga em dinheiro de quem paga em contribuição e de quem não paga: é a
resposta a uma falha real do teste, não uma maneira de a contornar.

**4. Anúncios pagos.** Um dos quatro canais, e errado agora. Não há para onde
converter.

**5. A lógica de volume.** O modelo dele pressupõe muitos clientes. O
Guilherme quer quatro clubes e disse que a selectividade é uma premissa. São
jogos diferentes; a selectividade aproxima-se mais da anti-garantia e da
escassez dele do que do manual de escala.

### O pré-requisito que nos falta

O framework exige, antes de se construir a oferta: mercado validado, o
resultado dos sonhos escrito **nas palavras do cliente**, validação de
orçamento, e **cinco a dez transcrições de entrevistas a clientes**.

Não temos nenhuma. Transcrever mais podcasts dele não preenche isto —
transcrever cinco a dez conversas com praticantes e com quem decide em clubes
preenche. É o mesmo esforço aplicado ao lado certo.
