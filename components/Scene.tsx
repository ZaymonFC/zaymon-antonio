import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Leva } from "leva";
import React, { Suspense, useEffect, useRef } from "react";
import Effects from "./Effects";
import Fade from "./Fade";
import { Galaxy, Nucleus, useGalaxyParameters } from "./Galaxy";
import { Marker } from "./Marker";

let useMouseMove = (sink: (p: number[]) => void, throttleMs?: number | undefined) => {};

if (process.browser) {
  useMouseMove = require("use-control/lib/input/mouse").useMouseMove;
}

const useMousePosition = () => {
  const mousePosition = useRef<number[]>([0, 0]);
  useMouseMove((p) => (mousePosition.current = p));

  return mousePosition;
};

const TurnTable = ({ children }: { children: React.ReactNode }) => {
  const { animate } = useGalaxyParameters();
  const ref = useRef<any>();
  const mousePosition = useMousePosition();

  useFrame(({ clock }, _delta) => {
    const elapsedTime = clock.getElapsedTime();

    if (animate) {
      const [x, y] = mousePosition.current;

      if (ref.current) {
        ref.current.rotation.y = 0.003 * elapsedTime + 0.00002 * x;
        ref.current.rotation.x = 0.00001 * y;
      }
    }
  });

  return <group ref={ref}>{children}</group>;
};

const MotionControl = ({ children }: { children: React.ReactNode }) => {
  const { animate } = useGalaxyParameters();
  const ref = useRef<any>();

  const mousePosition = useMousePosition();

  useFrame(() => {
    if (ref.current) {
      const [x, y] = mousePosition.current;

      ref.current.rotation.y = 0.88 + x / 150000;
      ref.current.rotation.x = y / 150000;
    }
  });

  return <group ref={ref}>{children}</group>;
};

const Three = ({ visible }: { visible: boolean }) => (
  <Fade duration={0.1}>
    <Leva collapsed />
    <Canvas linear flat camera={{ position: [0, 1, 4.5] }} style={{ opacity: visible ? 1 : 0 }}>
      <OrbitControls enableZoom enableRotate enableDamping />
      <Suspense fallback={null}>
        <MotionControl>
          <Galaxy visible={visible} />
          <Nucleus size={0.075} />
          {visible && (
            <>
              <Marker distance={0.2} branchNumber={1} />
              <Marker distance={0.2} branchNumber={2} />
              <Marker distance={0.2} branchNumber={3} />
              <Marker distance={0.2} branchNumber={4} />
            </>
          )}
        </MotionControl>
      </Suspense>
      <Effects />
      {/* <axesHelper args={[1, 2, 2]} /> */}
    </Canvas>
  </Fade>
);

export default Three;
