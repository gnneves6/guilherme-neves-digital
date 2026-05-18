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

const Divider = () => (
  <div className="section-padding max-content">
    <div className="divider" />
  </div>
);

const Index = () => {
  return (
    <Layout>
      <ScrollProgress />
      {/* 1 — Entry */}
      <HeroSection />

      {/* 2 — Selected Environments (interactive credibility) */}
      <EnvironmentsSection />

      {/* 3 — From Within Bridge (meaning) */}
      <FromWithinBridge />

      <Divider />

      {/* 4 — Selected Artefacts (proof of the story) */}
      <SelectedArtefactsSection />

      <Divider />

      {/* 5 — System Components */}
      <SystemComponentsSection />

      <Divider />

      {/* 6 — Collaboration Areas */}
      <CollaborationAreasSection />

      {/* 7 — GN Fuel Laws Preview */}
      <FuelLawsPreview />

      {/* 8 — Invitation */}
      <InvitationSection />
    </Layout>
  );
};

export default Index;