import Layout from "@/components/Layout";
import HeroSection from "@/components/sections/HeroSection";
import EnvironmentsSection from "@/components/sections/EnvironmentsSection";
import CredibilityStrip from "@/components/sections/CredibilityStrip";
import FromWithinBridge from "@/components/sections/FromWithinBridge";
import SelectedArtefactsSection from "@/components/sections/SelectedArtefactsSection";
import TheMethodSection from "@/components/sections/TheMethodSection";
import InvitationSection from "@/components/sections/InvitationSection";
import ScrollProgress from "@/components/motion/ScrollProgress";
import PointerField from "@/components/journey/PointerField";

const Index = () => {
  return (
    <PointerField>
    <Layout>
      <ScrollProgress />
      {/*
        Cinematic 6-scene journey — POV camera, no hard dividers.
        01 Tunnel/Entrance → 02 Locker/Environments → 03 From Within Thesis
        → 04 Proof Table → 05 Method Room → 06 Exit/Invitation.
      */}
      <HeroSection />
      <EnvironmentsSection />
      <CredibilityStrip />
      <FromWithinBridge />
      <SelectedArtefactsSection />
      <TheMethodSection />
      <InvitationSection />
    </Layout>
    </PointerField>
  );
};

export default Index;