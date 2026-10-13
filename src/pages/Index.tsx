import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/sections/HeroSection";
import ProofMarquee from "@/components/sections/ProofMarquee";
import EnvironmentsSection from "@/components/sections/EnvironmentsSection";
import CincoDimensoes from "@/components/sections/home/CincoDimensoes";
import Servicos from "@/components/sections/home/Servicos";
import Assinatura from "@/components/sections/home/Assinatura";
import Captura from "@/components/sections/home/Captura";
import PointerField from "@/components/journey/PointerField";

/**
 * A home mostra o valor. Não conta a história e não recita o currículo.
 *
 * Seis blocos, e a ordem é promessa, onde, prova, o problema de quem chega,
 * o que se compra, a troca:
 *
 *   1. HeroSection         Arrive fuelled, not full, e o que é em duas linhas
 *   2. ProofMarquee        onde, lido num relance e a mexer
 *   3. EnvironmentsSection o manequim com as cores de cada clube, um de cada vez
 *   4. Servicos            três colunas, uma luz e um ícone por serviço
 *   5. CincoDimensoes      as cinco frases onde alguém reconhece o próprio clube
 *   6. Assinatura          a cara e os números, no mesmo sítio
 *   7. Captura             a grelha, em troca do email
 *
 * Os serviços vêm antes do diagnóstico, e a ordem é deliberada: a página
 * mostra primeiro o que há para ter e só depois como é que eu descubro o que
 * falta. A secção das cinco dimensões passa a ser a demonstração da coluna
 * 02, e é para lá que ela aponta.
 *
 * Saíram duas coisas desta página, e as duas por um motivo só: descreviam em
 * vez de darem.
 *
 * Prova.tsx eram três números de currículo numa secção própria. Um número
 * sozinho não é valor, é crédito; encostado a uma afirmação, passa a ser a
 * razão de ela não ser opinião. Os três passaram para o pé das cinco
 * dimensões, numa linha.
 *
 * MatchdayPlanner era um planeador de dia de jogo, e era uma versão pobre de
 * um produto que ainda não foi lançado. Uma imitação do próprio produto na
 * primeira página desvaloriza os dois, e o sítio dela é a página do serviço,
 * não a fachada. Fica no repositório, por montar.
 *
 * Problema.tsx, Sobre.tsx e Prova.tsx continuam no repositório e não estão
 * montados. São o texto de /historia e de /trabalho quando essas páginas
 * existirem, e é por isso que não foram apagados.
 */
const Index = () => {
  return (
    <PointerField>
    <Layout>
      <SEO
        title="Guilherme Neves, Game Nutrition"
        description="O sistema de nutrição que uma equipa usa à volta da competição. Simples ao ponto de os jogadores o cumprirem."
        path="/"
      />

      <HeroSection />
      <ProofMarquee />
      <EnvironmentsSection />
      <Servicos />
      <CincoDimensoes />
      <Assinatura />
      <Captura />
    </Layout>
    </PointerField>
  );
};

export default Index;
