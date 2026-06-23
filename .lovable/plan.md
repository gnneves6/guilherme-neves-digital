
# Plano Final — 30 créditos para fechar GN Performance Systems

Objectivo: chegar a **publicado, sólido e coerente** sem desperdiçar um único crédito em redesenhos. Cada dia = 1 entrega fechada. Margem de segurança no fim para imprevistos.

---

## Princípios

- **Não tocar** no que já está aprovado: Hero, Environments, Applied Work (grid, imagens, modais, status labels), Systems Bridge, Systems Architecture, Services, tipografia, paleta.
- Cada mensagem = 1 entrega objectiva. Sem explorações abertas, sem "audits" adicionais.
- Mobile e desktop verificados na mesma mensagem da mudança.
- Publicar só no dia 6, depois de tudo consolidado e do security scan limpo.

---

## Dia 1 — Fechar a migração de segurança pendente (1 crédito)

Submeter a migração já preparada (`SUPA_rls_policy_always_true`, `contact_messages_missing_select_policy`, `resource_interest_missing_select_policy`) assim que o backend voltar a estar healthy, e marcar os 3 findings como resolvidos. Sem isto, o publish fica bloqueado.

---

## Dia 2 — About: "The Practice / The Principal" (2–3 créditos)

A página About é hoje o maior leak de posicionamento (ainda soa a estudante de 21 anos). Reescrita em duas camadas:

- **The Practice** — POV da consultoria (diagnóstico, tradução, sistemas embebidos).
- **The Principal** — Guilherme, em terceira pessoa, curto, com a nota biográfica ("21, Porto · Brussels") como rodapé discreto.

Sem novos componentes visuais — reutiliza `Scene`, `Reveal`, tipografia existente.

---

## Dia 3 — Nav + Footer + Renomear "Resource Vault" (2–3 créditos)

Uma única mensagem para limpar a casca da marca:

- Nav: 6 → 5 itens. Demote **GN Fuel Laws** (passa a viver dentro de Method / Work).
- Renomear **Resource Vault → Work** em todo o site (label, rotas internas mantêm-se).
- Footer: remover Linktree, substituir por uma linha única *"GN Performance Systems — Porto · Brussels"*.
- Hero subtitle revisto se ainda ancorar em "I am Guilherme".

---

## Dia 4 — Contact → Engagement Enquiry (3–4 créditos)

Transformar a página Contact numa **Engagement Enquiry** discreta:

- Campos reduzidos e qualificantes (organização, contexto, tipo de envolvimento, mensagem curta).
- Sem telefone, sem Linktree, sem redes sociais.
- Copy alinhado com tom da Services page.
- Confirmar que continua a escrever em `contact_messages` com as novas RLS policies (sem mudança de schema).

---

## Dia 5 — Coerência visual das subpáginas (3–4 créditos)

Uma única passagem cirúrgica para alinhar Work, Services, About, Fuel Laws ao standard cinematográfico da homepage:

- Substituir `<divider>` duros pelas transições suaves usadas na home.
- Modernizar o hero da página Work para tom Services (sem mexer no grid nem nas imagens).
- Verificar espaçamentos verticais e respiração entre secções.

Sem novos componentes, sem novas ilustrações, sem novas imagens.

---

## Dia 6 — Pré-publish + Publish (3–5 créditos)

Última mensagem técnica + publish:

1. SEO/meta por rota: `<title>` < 60 chars, meta description < 160, OG + Twitter tags, favicon, canonical, JSON-LD `Organization` + `Person` para GN Performance Systems.
2. Verificação rápida: console limpo, network sem 404s, mobile (375px) e desktop (1440px) sem regressões nos blocos protegidos.
3. `security--run_security_scan` → confirmar zero criticals.
4. `preview_ui--publish` com `website_info_status: added_or_updated`.

---

## Orçamento por dia

```text
Dia 1  Segurança ............... 1
Dia 2  About ................... 2–3
Dia 3  Nav + Footer + rename ... 2–3
Dia 4  Engagement Enquiry ...... 3–4
Dia 5  Coerência subpáginas .... 3–4
Dia 6  SEO + Publish ........... 3–5
                       Total: ~14–20
                     Margem:   ~10–16
```

A margem é deliberada: cobre uma "try to fix" se algo partir, e deixa espaço para 1 refinamento que aparecer ao ver o resultado.

---

## O que fica deliberadamente fora deste plano

- Ecosystem chapter na homepage — **já implementado** como Systems Architecture, não repetir.
- Nova Research / Technology / Resources pages — placeholders já chegam para publicar.
- Pricing, booking, dashboards, blog, case studies extra.
- Qualquer redesign de Hero, Environments, Applied Work, Services, Systems Bridge, Systems Architecture.
- Adição de "external authority signal" — fica para pós-launch, quando existir realmente.

---

## Critério de "pronto para publicar"

- Visitante novo, em 30 segundos, percebe que é **uma consultoria** (não um portfólio).
- Nenhuma página subpágina parece visualmente de outro site.
- Zero criticals no security scan.
- Nada do que está aprovado foi tocado.

Se aprovares, no Dia 1 entro em build mode e submeto a migração de segurança.
