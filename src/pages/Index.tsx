import Layout from "@/components/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import EnvironmentsSection from "@/components/sections/EnvironmentsSection";
import SystemComponentsSection from "@/components/sections/SystemComponentsSection";
import CollaborationAreasSection from "@/components/sections/CollaborationAreasSection";
import FuelLawsPreview from "@/components/sections/FuelLawsPreview";
import SelectedArtefactsSection from "@/components/sections/SelectedArtefactsSection";
import InvitationSection from "@/components/sections/InvitationSection";

const Divider = () => (
  <div className="section-padding max-content">
    <div className="divider" />
  </div>
);

const Index = () => {
  return (
    <Layout>
      {/* 1 — Entry */}
      <HeroSection />

      {/* 2 — Selected Artefacts (proof first) */}
      <SelectedArtefactsSection />

      {/* 3 — Manifesto (worldview + compact identity line) */}
      <ManifestoSection />

      <Divider />

      {/* 4 — Selected Environments */}
      <EnvironmentsSection />

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