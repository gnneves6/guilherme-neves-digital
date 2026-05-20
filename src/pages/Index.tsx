import Layout from "@/components/Layout";
import HeroSection from "@/components/sections/HeroSection";
import EnvironmentsSection from "@/components/sections/EnvironmentsSection";
import FromWithinBridge from "@/components/sections/FromWithinBridge";
import SelectedArtefactsSection from "@/components/sections/SelectedArtefactsSection";
import TheMethodSection from "@/components/sections/TheMethodSection";
import InvitationSection from "@/components/sections/InvitationSection";
import ScrollProgress from "@/components/motion/ScrollProgress";
import PointerField from "@/components/journey/PointerField";
import JourneyStage from "@/components/journey/JourneyStage";
import SceneTunnel from "@/components/journey/scenes/SceneTunnel";
import SceneLocker from "@/components/journey/scenes/SceneLocker";
import SceneBridge from "@/components/journey/scenes/SceneBridge";
import SceneArchive from "@/components/journey/scenes/SceneArchive";
import SceneMethod from "@/components/journey/scenes/SceneMethod";
import SceneExit from "@/components/journey/scenes/SceneExit";

const Index = () => {
  return (
    <PointerField>
    <Layout>
      <ScrollProgress />
      {/*
        Desktop (md+): POV cinematic camera rig — one continuous world,
        six scenes mapped to scroll progress. No stacked sections.
        Mobile: same six chapters, but rendered as the existing
        mobile-optimized stack (closer framing, native vertical scroll).
      */}
      <div className="hidden md:block">
        <JourneyStage scenePitch={140}>
          <SceneTunnel index={0} />
          <SceneLocker index={1} />
          <SceneBridge index={2} />
          <SceneArchive index={3} />
          <SceneMethod index={4} />
          <SceneExit index={5} />
        </JourneyStage>
      </div>
      <div className="md:hidden">
        <HeroSection />
        <EnvironmentsSection />
        <FromWithinBridge />
        <SelectedArtefactsSection />
        <TheMethodSection />
        <InvitationSection />
      </div>
    </Layout>
    </PointerField>
  );
};

export default Index;