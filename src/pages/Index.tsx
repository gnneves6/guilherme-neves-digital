import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/sections/HeroSection";
import ProofMarquee from "@/components/sections/ProofMarquee";
import ThesisSection from "@/components/sections/ThesisSection";
import RelocationCase from "@/components/sections/RelocationCase";
import InvitationSection from "@/components/sections/InvitationSection";
import PointerField from "@/components/journey/PointerField";

/**
 * The home carries four things, and the work was subtraction.
 *
 * This page existed for eleven weeks without being published, and in that time
 * the answer to "what is missing" was always another section. It was the wrong
 * question. The person this page has to survive is a club director who has
 * just been sent a cold message and is searching the name to decide whether to
 * reply. They want four answers and they leave as soon as they have them:
 *
 *   1. who he is          HeroSection, then the band of where
 *   2. what he argues     ThesisSection, named, with its references
 *   3. has he done it     RelocationCase, one week, method only
 *   4. how to reach him   InvitationSection
 *
 * Three blocks that were here are not any more, and none of them was removed
 * for being bad:
 *
 * - EnvironmentsSection walked three environments in five hundred pixels each.
 *   It is a curriculum, not a case, and the band above already says where he
 *   has been in five seconds. /about carries the long version with the
 *   photographs.
 * - Reception carried reach figures dated 2026-09 and a set of quotes that
 *   render nothing until each person grants permission. Reach is the weakest
 *   thing a dataset can be asked to prove, and a figure that quietly stops
 *   being true is the same failure as a claim that never was.
 * - TheLadder sorted the offer by what it costs you, which is the job of
 *   /services. On the home it also put a second and a third ask between the
 *   argument and the only ask that matters here. The free thing it led with is
 *   still one click away, from the first screen.
 *
 * Those three files are still in the repository and are now mounted nowhere.
 * They are kept because two of them have a page they belong on and the third
 * becomes publishable the day the first permission arrives, not because the
 * home is undecided. If they are still unmounted next time somebody reads
 * this, they are dead code and should go.
 */
const Index = () => {
  return (
    <PointerField>
    <Layout>
      <SEO
        title="Guilherme Neves, Performance Nutrition & Systems"
        description="Nutrition fails inside clubs for reasons that are not scientific. I read the environment, translate the evidence into something that survives a congested week, and leave it running. Learned inside elite football."
        path="/"
      />

      {/* 1. Who he is, in five seconds. */}
      <HeroSection />

      {/* Where, read at a glance and moving on its own. */}
      <ProofMarquee />

      {/* 2. What he argues, and the review that argues it. This is the only
             intellectual property on the site and it is also the sales
             argument, which is why it sits before the case rather than after:
             the case is evidence for a claim, so the claim goes first. */}
      <ThesisSection />

      {/* 3. One week, step by step, with everything identifying left out. */}
      <RelocationCase />

      {/* 4. The ask. */}
      <InvitationSection />
    </Layout>
    </PointerField>
  );
};

export default Index;
