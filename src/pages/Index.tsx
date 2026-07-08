import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/sections/HeroSection";
import EnvironmentsSection from "@/components/sections/EnvironmentsSection";
import FromWithinBridge from "@/components/sections/FromWithinBridge";
import SelectedArtefactsSection from "@/components/sections/SelectedArtefactsSection";
import SystemsBridgeSection from "@/components/sections/SystemsBridgeSection";
import TheMethodSection from "@/components/sections/TheMethodSection";
import SystemsArchitectureSection from "@/components/sections/SystemsArchitectureSection";
import InvitationSection from "@/components/sections/InvitationSection";
import PointerField from "@/components/journey/PointerField";

const Index = () => {
  return (
    <PointerField>
    <Layout>
      <SEO title="Guilherme Neves — GN Performance Systems" description="Embedded performance nutrition for clubs, federations and athletes. Diagnosis, translation and applied systems." path="/" />
      {/*
        Cinematic 6-scene journey — POV camera, no hard dividers.
        01 Tunnel/Entrance → 02 Locker/Environments → 03 From Within Thesis
        → 04 Proof Table → 05 Method Room → 06 Exit/Invitation.
      */}
      <HeroSection />
      <EnvironmentsSection />
      <FromWithinBridge />
      <SelectedArtefactsSection />
      <SystemsBridgeSection />
      <TheMethodSection />
      <SystemsArchitectureSection />
      <InvitationSection />
    </Layout>
    </PointerField>
  );
};

export default Index;