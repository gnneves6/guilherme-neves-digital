import Layout from "@/components/Layout";
import HeroSection from "@/components/sections/HeroSection";
import EnvironmentsSection from "@/components/sections/EnvironmentsSection";
import FromWithinBridge from "@/components/sections/FromWithinBridge";
import SelectedArtefactsSection from "@/components/sections/SelectedArtefactsSection";
import TheMethodSection from "@/components/sections/TheMethodSection";
import InvitationSection from "@/components/sections/InvitationSection";
import ScrollProgress from "@/components/motion/ScrollProgress";

const Index = () => {
  return (
    <Layout>
      <ScrollProgress />
      {/*
        Cinematic 6-chapter rhythm — no hard dividers.
        01 Hero (cinematic) → 02 Environments (light) → 03 From Within Bridge (light exhale)
        → 04 Selected Proof (cinematic) → 05 The Method + GN Fuel Laws (cinematic)
        → 06 Invitation (light close).
      */}
      <HeroSection />
      <EnvironmentsSection />
      <FromWithinBridge />
      <SelectedArtefactsSection />
      <TheMethodSection />
      <InvitationSection />
    </Layout>
  );
};

export default Index;