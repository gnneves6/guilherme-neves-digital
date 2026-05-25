import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, ContactShadows } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { damp, damp3 } from "maath/easing";
import { usePointer } from "@/components/journey/PointerField";
import type { ShowcaseKit } from "./EnvironmentKitShowcase";

/**
 * Environment3DShowcase — WebGL cinematic display for the Environments
 * section. Renders the kit PNG alpha textures as floating planes on a dark
 * pedestal, with the active kit forward / sharp, prev+next receded / blurred.
 * Scroll-driven activeIndex changes are smoothed inside useFrame via damp.
 */

interface Props {
  kits: ShowcaseKit[];
  activeIndex: number;
}

/** Returns a slot offset relative to active for n=3 (yields -1, 0, 1). */
function slotOffset(i: number, active: number, n: number) {
  const half = Math.floor(n / 2);
  return ((i - active + n + half) % n) - half;
}

function hexToColor(hex: string) {
  return new THREE.Color(hex);
}

function dampColor(c: THREE.Color, target: THREE.Color, smooth: number, dt: number) {
  damp(c, "r", target.r, smooth, dt);
  damp(c, "g", target.g, smooth, dt);
  damp(c, "b", target.b, smooth, dt);
}

function KitPlane({
  texture,
  offset,
  reduce,
}: {
  texture: THREE.Texture;
  offset: number;
  reduce: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const pointer = usePointer();

  // Targets driven by slot offset
  useFrame((_, dt) => {
    if (!group.current || !mat.current) return;
    const isActive = offset === 0;
    const side = Math.sign(offset);
    const absOff = Math.min(Math.abs(offset), 2);

    const targetPos: [number, number, number] = isActive
      ? [0, 0.05, 0.6]
      : [side * 1.85, -0.08, -0.45 - (absOff - 1) * 0.6];
    const targetScale = isActive ? 1 : Math.max(0, 0.58 - (absOff - 1) * 0.25);
    const targetRotY = isActive
      ? (reduce ? 0 : pointer.x * 0.12)
      : -side * 0.35;
    const targetRotX = isActive ? (reduce ? 0 : pointer.y * -0.06) : 0;
    const targetOpacity = isActive ? 1 : absOff <= 1 ? 0.42 : 0;

    const lambda = reduce ? 30 : 4.5;
    damp3(group.current.position, targetPos, 1 / lambda, dt);
    damp3(group.current.scale, [targetScale, targetScale, targetScale], 1 / lambda, dt);
    damp(group.current.rotation, "y", targetRotY, 1 / lambda, dt);
    damp(group.current.rotation, "x", targetRotX, 1 / lambda, dt);
    damp(mat.current, "opacity", targetOpacity, 1 / lambda, dt);
  });

  // Plane sized to jersey aspect ~3:4
  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[1.5, 1.9]} />
        <meshBasicMaterial
          ref={mat}
          map={texture}
          transparent
          alphaTest={0.04}
          depthWrite={false}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Pedestal({ accent }: { accent: string }) {
  const ringMat = useRef<THREE.MeshBasicMaterial>(null);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null);
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    const target = hexToColor(accent);
    if (ringMat.current) dampColor(ringMat.current.color, target, 0.4, dt);
    if (glowMat.current) dampColor(glowMat.current.color, target, 0.4, dt);
    if (group.current) group.current.rotation.y += dt * 0.06;
  });

  return (
    <group ref={group} position={[0, -1.1, 0]}>
      {/* Pedestal disc */}
      <mesh>
        <cylinderGeometry args={[1.55, 1.7, 0.12, 64]} />
        <meshStandardMaterial color="#0b0b0d" metalness={0.6} roughness={0.5} />
      </mesh>
      {/* Top rim accent */}
      <mesh position={[0, 0.062, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.56, 96]} />
        <meshBasicMaterial ref={ringMat} transparent opacity={0.75} toneMapped={false} />
      </mesh>
      {/* Floor accent glow (additive) */}
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 3.4, 96]} />
        <meshBasicMaterial
          ref={glowMat}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function SceneLights({ accent }: { accent: string }) {
  const point = useRef<THREE.PointLight>(null);
  const pointer = usePointer();
  useFrame((_, dt) => {
    if (point.current) {
      const c = hexToColor(accent);
      dampColor(point.current.color, c, 0.4, dt);
      damp(point.current, "intensity", 4.5, 0.3, dt);
      damp3(
        point.current.position,
        [pointer.x * 1.5, 1.2 + pointer.y * -0.3, 2.2],
        0.3,
        dt,
      );
    }
  });
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 3, 3]} intensity={0.9} />
      <pointLight ref={point} position={[0, 1.2, 2.2]} intensity={4.5} distance={9} decay={2} />
    </>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const reduce = useReducedMotion();
  const pointer = usePointer();
  useFrame((_, dt) => {
    if (reduce) return;
    damp3(
      camera.position,
      [pointer.x * 0.35, 0.3 + pointer.y * -0.18, 5.4],
      0.35,
      dt,
    );
    camera.lookAt(0, 0.1, 0);
  });
  return null;
}

function SceneContent({ kits, activeIndex }: Props) {
  const reduce = !!useReducedMotion();
  const textures = useTexture(kits.map((k) => k.image));
  // Ensure colorspace correct
  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      t.needsUpdate = true;
    });
  }, [textures]);

  const activeAccent = kits[activeIndex]?.primary ?? "#ffffff";

  return (
    <>
      <SceneLights accent={activeAccent} />
      <CameraRig />
      <Pedestal accent={activeAccent} />
      {kits.map((k, i) => (
        <KitPlane
          key={k.id}
          texture={textures[i]}
          offset={slotOffset(i, activeIndex, kits.length)}
          reduce={reduce}
        />
      ))}
      <ContactShadows
        position={[0, -1.04, 0]}
        opacity={0.55}
        scale={6}
        blur={2.4}
        far={2.4}
        color="#000000"
      />
    </>
  );
}

const Environment3DShowcase = ({ kits, activeIndex }: Props) => {
  const reduce = useReducedMotion();
  return (
    <Canvas
      camera={{ position: [0, 0.3, 5.4], fov: 35 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      style={{ background: "transparent" }}
      frameloop={reduce ? "demand" : "always"}
    >
      <Suspense fallback={null}>
        <SceneContent kits={kits} activeIndex={activeIndex} />
      </Suspense>
    </Canvas>
  );
};

export default Environment3DShowcase;