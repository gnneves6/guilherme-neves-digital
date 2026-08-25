import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/sections/HeroSection";
import ProofMarquee from "@/components/sections/ProofMarquee";
import ScrollStatement from "@/components/sections/ScrollStatement";
import EnvironmentsSection from "@/components/sections/EnvironmentsSection";
import FromWithinBridge from "@/components/sections/FromWithinBridge";
import InvitationSection from "@/components/sections/InvitationSection";
import PointerField from "@/components/journey/PointerField";

/**
 * The home carries the whole pitch, and nothing else.
 *
 * A visitor arriving from a video gives this page seconds, not minutes, so
 * every block has to earn its place against one of two jobs: convert the few
 * who are ready, or capture the many who are not. Four sections that served
 * neither (two text bridges, the method walkthrough and the architecture
 * diagram) were removed rather than reordered, along with the applied-work
 * teaser, which had grown into a second catalogue beside /work.
 *
 * The order is deliberate and it puts the person before the product: who he
 * is, then where he has been and what he did there, then why he does it, and
 * then the invitation. Nobody knows him yet when they land, so the work has to
 * earn the right to sell.
 *
 * The matchday planner used to close this page and now lives on /services,
 * where someone has already decided they want something. A live tool is a
 * strong answer to "what is this actually like", but it is a weak answer to
 * "who are you", which is the only question being asked here.
 */
const Index = () => {
  return (
    <PointerField>
    <Layout>
      <SEO title="Guilherme Neves, Performance Nutrition & Systems" description="Performance nutrition learned inside elite football. Applied systems for athletes, practitioners and clubs, and the tools built along the way." path="/" />

      {/* Who he is, in five seconds. */}
      <HeroSection />

      {/* Where, read at a glance and moving on its own. */}
      <ProofMarquee />

      {/* The premise, stated with weight before any evidence. */}
      <ScrollStatement
        caption="The premise"
        lines={[
          "Most nutrition advice is correct and useless.",
          "It survives the meeting and dies in the week.",
        ]}
      />

      {/* The evidence, walked through as the environments it was earned in.
          Each kit now carries what was actually done at that club. */}
      <EnvironmentsSection />

      {/* Why he does this, in his own voice. */}
      <FromWithinBridge />

      <InvitationSection />
    </Layout>
    </PointerField>
  );
};

export default Index;
