import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Leva } from "leva";
import React, { Suspense, useEffect, useRef } from "react";
import { useNavigation } from "../hooks/useNavigation";
import { playSfx, sfxAtlas } from "../modules/Sounds";
import Effects from "./Effects";
import Fade from "./Fade";
import { Galaxy, Nucleus } from "./Galaxy";
import { Marker } from "./Marker";
import { BoundlessGarden, IntroCard, LetterDeskApp, Socials } from "./Content";
import { useMouseMove, useKeyDown, KEYS } from "../modules/Control";

const useMousePosition = () => {
  const mousePosition = useRef<number[]>([0, 0]);
  useMouseMove((p) => (mousePosition.current = p));

  return mousePosition;
};

const useMouseRotation = (ref: React.MutableRefObject<THREE.Group | undefined>) => {
  const mousePosition = useMousePosition();

  useFrame(() => {
    if (ref.current && mousePosition.current) {
      const [mouseX, mouseY] = mousePosition.current;

      ref.current.rotation.y = mouseX * 0.000001;
      ref.current.rotation.z = mouseY * 0.000001;
    }
  });
};

const pointToAzimuthAngle = (x: number, z: number) => Math.PI + Math.PI / 2 + Math.atan2(z, -x);

interface OrbitControlsRef {
  setAzimuthalAngle: (value: number) => void;
  setPolarAngle: (value: number) => void;
}

const useMotionControl = (ref: React.MutableRefObject<OrbitControlsRef | undefined>) => {
  const { move, points, current } = useNavigation();

  const moveAndBlip = (dir: any) => {
    playSfx(sfxAtlas.blip);
    move(dir);
  };

  useKeyDown(KEYS.left_arrow, () => moveAndBlip("Left"));
  useKeyDown(KEYS.right_arrow, () => moveAndBlip("Right"));

  useEffect(() => {
    const point: [number, number] | undefined = points[current];

    if (ref.current && point) {
      const [x, z] = point;

      console.log(current);

      ref.current.setAzimuthalAngle(pointToAzimuthAngle(x, z));
      ref.current.setPolarAngle(1.4);
    }
  }, [ref, points, current]);
};

const MouseRotation = ({ children }: { children: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>();
  useMouseRotation(groupRef);

  return <group ref={groupRef}>{children}</group>;
};

const Three = ({ visible }: { visible: boolean }) => {
  const orbitControlsRef = useRef<any>();

  useEffect(() => {
    console.log(orbitControlsRef);
  }, [orbitControlsRef]);

  useMotionControl(orbitControlsRef);

  const { current } = useNavigation();

  return (
    <Fade duration={0.1}>
      <Leva collapsed />
      <Canvas linear flat camera={{ position: [0, 1, 4.5] }} style={{ opacity: visible ? 1 : 0 }}>
        <OrbitControls ref={orbitControlsRef} enableRotate enableDamping enableZoom={false} />
        <Suspense fallback={null}>
          <MouseRotation>
            <Galaxy visible={visible} />
            <Nucleus size={0.075} />
            {visible && (
              <>
                <Marker distance={0.2} branchNumber={4} rank={0}>
                  <IntroCard active={current === 0} />
                </Marker>
                <Marker distance={0.2} branchNumber={3} rank={1}>
                  <LetterDeskApp active={current === 1} />
                </Marker>
                <Marker distance={0.2} branchNumber={2} rank={2}>
                  <BoundlessGarden active={current === 2} />
                </Marker>
                <Marker distance={0.2} branchNumber={1} rank={3}>
                  <Socials active={current === 3} />
                </Marker>
              </>
            )}
          </MouseRotation>
        </Suspense>
        <Effects />
        {/* <axesHelper args={[20, 20, 20]} /> */}
      </Canvas>
    </Fade>
  );
};

export default Three;
