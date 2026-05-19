import Layout from "@/components/Layout";
import HeroSection from "@/components/sections/HeroSection";
import EnvironmentsSection from "@/components/sections/EnvironmentsSection";
import FromWithinBridge from "@/components/sections/FromWithinBridge";
import SystemComponentsSection from "@/components/sections/SystemComponentsSection";
import CollaborationAreasSection from "@/components/sections/CollaborationAreasSection";
import FuelLawsPreview from "@/components/sections/FuelLawsPreview";
import SelectedArtefactsSection from "@/components/sections/SelectedArtefactsSection";
import InvitationSection from "@/components/sections/InvitationSection";
import ScrollProgress from "@/components/motion/ScrollProgress";

const Index = () => {
  return (
    <Layout>
      <ScrollProgress />
      {/*
        Cinematic chapter rhythm — no hard dividers.
        01 Hero (cinematic dark) → 02 Environments (light) → 03 Bridge (light exhale)
        → 04 Selected Proof (cinematic dark) → 05 Operating System (dim)
        → 06 Collaboration (dim) → 07 Fuel Laws (cinematic dark) → 08 Invitation (light close).
      */}
      <HeroSection />
      <EnvironmentsSection />
      <FromWithinBridge />
      <SelectedArtefactsSection />
      <SystemComponentsSection />
      <CollaborationAreasSection />
      <FuelLawsPreview />
      <InvitationSection />
    </Layout>
  );
};

export default Index;