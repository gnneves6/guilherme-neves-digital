import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/sections/HeroSection";
import ProofMarquee from "@/components/sections/ProofMarquee";
import ScrollStatement from "@/components/sections/ScrollStatement";
import EnvironmentsSection from "@/components/sections/EnvironmentsSection";
import FromWithinBridge from "@/components/sections/FromWithinBridge";
import MatchdayPlanner from "@/components/sections/MatchdayPlanner";
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
 * only then the tool. Nobody knows him yet when they land, so the work has to
 * earn the right to sell.
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

      {/* Proof handed over rather than described. The one chapter driven by
          the pointer instead of the scroll. */}
      <MatchdayPlanner />

      <InvitationSection />
    </Layout>
    </PointerField>
  );
};

export default Index;
