import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/* ═══ Torso Mesh — geometric mannequin built from primitives ═══ */
const TorsoMesh = ({
  primaryColor,
  secondaryColor,
  accentColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const accentMatRef = useRef<THREE.MeshStandardMaterial>(null);

  // Smooth color lerp
  const targetColor = useMemo(() => new THREE.Color(primaryColor), [primaryColor]);
  const targetAccent = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Subtle idle sway
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        Math.sin(Date.now() * 0.0005) * 0.08,
        delta * 2
      );
    }
    if (materialRef.current) {
      materialRef.current.color.lerp(targetColor, delta * 3);
    }
    if (accentMatRef.current) {
      accentMatRef.current.color.lerp(targetAccent, delta * 3);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* ── Main torso body ── */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.52, 0.42, 1.6, 32, 1]} />
        <meshStandardMaterial
          ref={materialRef}
          color={primaryColor}
          roughness={0.55}
          metalness={0.05}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* ── Chest area — slight bulge ── */}
      <mesh position={[0, 0.55, 0.08]} scale={[1.05, 0.5, 0.6]}>
        <sphereGeometry args={[0.5, 32, 16]} />
        <meshStandardMaterial
          color={primaryColor}
          roughness={0.55}
          metalness={0.05}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* ── Collar / neckline ── */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.18, 0.25, 0.15, 24]} />
        <meshStandardMaterial
          ref={accentMatRef}
          color={accentColor}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* ── Neck ── */}
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.25, 16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0} />
      </mesh>

      {/* ── Left shoulder ── */}
      <mesh position={[-0.62, 0.75, 0]} rotation={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.18, 0.22, 0.55, 16]} />
        <meshStandardMaterial
          color={primaryColor}
          roughness={0.55}
          metalness={0.05}
        />
      </mesh>

      {/* ── Right shoulder ── */}
      <mesh position={[0.62, 0.75, 0]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.18, 0.22, 0.55, 16]} />
        <meshStandardMaterial
          color={primaryColor}
          roughness={0.55}
          metalness={0.05}
        />
      </mesh>

      {/* ── Left sleeve trim ── */}
      <mesh position={[-0.72, 0.52, 0]} rotation={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.19, 0.19, 0.06, 16]} />
        <meshStandardMaterial color={secondaryColor} roughness={0.4} />
      </mesh>

      {/* ── Right sleeve trim ── */}
      <mesh position={[0.72, 0.52, 0]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.19, 0.19, 0.06, 16]} />
        <meshStandardMaterial color={secondaryColor} roughness={0.4} />
      </mesh>

      {/* ── Bottom hem ── */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.06, 32]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* ── Center seam line ── */}
      <mesh position={[0, 0.2, 0.44]}>
        <boxGeometry args={[0.008, 1.2, 0.01]} />
        <meshStandardMaterial
          color={secondaryColor}
          roughness={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

/* ═══ Canvas wrapper ═══ */
const MannequinTorso = ({
  primaryColor,
  secondaryColor,
  accentColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}) => {
  return (
    <div className="w-full h-full" style={{ minHeight: 300 }}>
      <Canvas
        camera={{ position: [0, 0.4, 2.8], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 4, 2]} intensity={0.8} color="#f5f0e8" />
        <directionalLight position={[-2, 2, -1]} intensity={0.3} color="#a0b0c0" />
        <pointLight position={[0, -1, 2]} intensity={0.2} color="#fff5e6" />
        <Environment preset="studio" environmentIntensity={0.15} />
        <TorsoMesh
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          accentColor={accentColor}
        />
      </Canvas>
    </div>
  );
};

export default MannequinTorso;
