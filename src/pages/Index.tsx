import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Entrada from "@/components/casa/Entrada";
import OJogador from "@/components/casa/OJogador";
import PorDentro from "@/components/casa/PorDentro";
import EnvironmentsSection from "@/components/sections/EnvironmentsSection";
import ODar from "@/components/casa/ODar";
import Aberto from "@/components/casa/Aberto";
import Fecho from "@/components/casa/Fecho";

/**
 * A casa. A forma está em gui-os/04-WEBSITE/visao-do-site.md, que ganha a
 * qualquer outro documento do site quando discordarem.
 *
 * O site foi desenhado três vezes para três clientes (atletas, clubes,
 * profissionais) e cada versão deixou peças cá dentro. Esta não se organiza
 * por cliente: organiza-se pela história dele, e cada público encontra a sua
 * porta lá dentro.
 *
 *   Entrada    a frase sozinha, depois a pessoa que lhe responde
 *   01         o jogador: o problema, nas palavras dele, sem botão
 *   02         por dentro: os equipamentos que rodam, um clube de cada vez,
 *              com o que lá fez; depois o que lá percebeu e a tese
 *   03         o que eu dou: o Radar, as cinco verificações, o Atlas
 *   04         o que está aberto agora, com o estado à frente
 *   Fecho      a imagem da parede, e a lista
 *
 * Claro e escuro alternam e querem dizer alguma coisa: escuro é o que custou,
 * claro é o trabalho e o que se dá.
 *
 * A home anterior (Game Nutrition, os três serviços, o terreno) fica no
 * repositório por montar, como sempre se fez aqui.
 */
const Index = () => (
  <Layout>
    <SEO
      title="Guilherme Neves · Performance nutrition, from inside elite football"
      description="Twelve years as a player, then RSC Anderlecht and Leça FC from the inside. I build the systems that carry the science to the athlete, and give most of them away."
      path="/"
    />
    <Entrada />
    <OJogador />
    <EnvironmentsSection />
    <PorDentro />
    <ODar />
    <Aberto />
    <Fecho />
  </Layout>
);

export default Index;
