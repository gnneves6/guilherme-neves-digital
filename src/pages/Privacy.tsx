import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import PlanGrid from "@/components/motion/PlanGrid";
import { LINKS } from "@/data/links";

/**
 * What happens to what people type into this site.
 *
 * Two forms here collect personal data: the enquiry on `/contact` and the
 * reference card request at the end of the five checks. Both write to a
 * database, and the second one is the beginning of a mailing list. Under GDPR
 * that needs to be stated somewhere a person can find before they type, and
 * until now it was stated nowhere at all.
 *
 * Written as a description of what the code actually does rather than as a
 * template. Every claim below is checkable against `Contact.tsx`, `LawKeep.tsx`
 * and the Supabase tables they write to, which is the only way a notice like
 * this stays true: if the behaviour changes and this page does not, the page
 * becomes a lie rather than merely out of date.
 *
 * It is a plain notice, not legal advice, and it is deliberately short. It
 * should be read by someone who knows Portuguese and EU data law before it is
 * relied on, and the retention period below is a stated intention rather than
 * an enforced deletion job.
 */
const Privacy = () => (
  <Layout>
    <SEO
      title="Privacidade, Guilherme Neves"
      description="O que este site recolhe, porquê, onde fica guardado, e como pedir que seja apagado."
      path="/privacidade"
    />

    <section className="section-padding section-spacing relative">
      <PlanGrid />
      <div className="max-content relative">
        <Reveal>
          <p className="text-caption mb-6">Privacidade</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="text-display max-w-3xl">
            O que acontece ao que aqui escreve.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-body-lg max-w-2xl mt-8">
            Curto, porque não há muito que dizer. Este site é feito por uma
            pessoa, não tem publicidade, e não vende nada sobre si a ninguém.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="section-padding pb-24">
      <div className="max-content max-w-2xl space-y-10">
        <Reveal>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Quem é o responsável
            </h2>
            <p className="text-body mt-3">
              Guilherme Neves, no Porto, Portugal. Tudo o que está abaixo é
              tratado por mim. Se quiser perguntar alguma coisa sobre isto,
              escreva para{" "}
              <a href={`mailto:${LINKS.EMAIL}`} className="link-underline">
                {LINKS.EMAIL}
              </a>{" "}
              e sou eu que respondo.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              O que é recolhido, e só quando o envia
            </h2>
            <p className="text-body mt-3">
              Nada é recolhido por navegar. Há dois formulários neste site, e
              os dois são opcionais.
            </p>
            <ul className="mt-4 space-y-3">
              <li className="text-body">
                <span className="font-medium text-foreground">O formulário de contacto.</span>{" "}
                O seu nome, o email, a organização se a indicar, o tipo de
                trabalho sobre o qual pergunta, e o que escreveu. Uso isso para
                lhe responder.
              </li>
              <li className="text-body">
                <span className="font-medium text-foreground">O cartão de referência.</span>{" "}
                O seu nome e o email. O cartão descarrega-se de graça e não
                precisa de formulário nenhum, por isso se preencher este é
                porque quer ter notícias minhas quando houver coisa nova. Isso é
                uma lista de contactos, e esta linha é eu a dizê-lo sem rodeios.
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Onde fica guardado
            </h2>
            <p className="text-body mt-3">
              Numa base de dados alojada pela Supabase, dentro da União
              Europeia. Só eu tenho acesso. Não é partilhada com ninguém, não é
              usada para publicidade, e não é vendida.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Durante quanto tempo
            </h2>
            <p className="text-body mt-3">
              Os contactos ficam guardados enquanto a conversa estiver viva e
              por um período razoável depois, para eu me lembrar do que falámos.
              Os registos da lista ficam até pedir para sair, e basta um email
              seu para isso.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              O que pode pedir
            </h2>
            <p className="text-body mt-3">
              Uma cópia do que tenho sobre si, uma correção, ou que seja
              apagado. Também sair da lista a qualquer momento, sem dar motivo e
              sem que isso afete seja o que for. Escreva para{" "}
              <a href={`mailto:${LINKS.EMAIL}`} className="link-underline">
                {LINKS.EMAIL}
              </a>
              . Se achar que tratei mal os seus dados, pode apresentar queixa à
              Comissão Nacional de Proteção de Dados.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Cookies, e o que eu conto
            </h2>
            <p className="text-body mt-3">
              Sem cookies, sem publicidade, e sem nada que o siga para outro
              site. Conto páginas, porque senão estou a reconstruir isto às
              cegas. Cada visita regista quatro coisas: que página, que site o
              mandou cá se algum, se o ecrã é de telemóvel, de tablet ou de
              computador, e um número aleatório que vive no separador e
              desaparece quando o fecha. Esse número existe só para eu
              distinguir uma pessoa a ler cinco páginas de cinco pessoas a ler
              uma. Sem morada, sem nome, sem nada que sobreviva à visita, e sem
              terceiros pelo meio: vai para a mesma base de dados dos
              formulários acima e mais nenhum sítio.
            </p>
            <p className="text-body mt-3">
              Os tipos de letra vêm do Google Fonts, o que quer dizer que o seu
              navegador faz um pedido à Google para os ir buscar.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="pt-2">
            <Link to="/contacto" className="text-sm font-display link-underline">
              Voltar ao contacto &rarr;
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </Layout>
);

export default Privacy;
