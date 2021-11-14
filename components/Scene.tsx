import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import React, { Suspense, useEffect, useRef } from "react";
import { useNavigation } from "../hooks/useNavigation";
import Effects from "./Effects";
import Fade from "./Fade";
import { Galaxy, Nucleus } from "./Galaxy";
import { Marker } from "./Marker";

let useMouseMove = (sink: (p: number[]) => void, throttleMs?: number | undefined) => {};

if (process.browser) {
  useMouseMove = require("use-control/lib/input/mouse").useMouseMove;
}

let useKeyDown = (...meh: any[]) => {};

if (process.browser) {
  useKeyDown = require("use-control/lib/keyStream").useKeyDown;
}

const useMousePosition = () => {
  const mousePosition = useRef<number[]>([0, 0]);
  useMouseMove((p) => (mousePosition.current = p));

  return mousePosition;
};

const pointToAzimuthAngle = (x: number, z: number) => Math.PI + Math.PI / 2 + Math.atan2(z, -x);

interface OrbitControlsRef {
  setAzimuthalAngle: (value: number) => void;
  setPolarAngle: (value: number) => void;
}

const useMotionControl = (ref: React.MutableRefObject<OrbitControlsRef | undefined>) => {
  const { move, points, current } = useNavigation();

  useKeyDown(39, () => move("Left"));
  useKeyDown(37, () => move("Right"));

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

const Three = ({ visible }: { visible: boolean }) => {
  const orbitControlsRef = useRef<any>();

  useEffect(() => {
    console.log(orbitControlsRef);
  }, [orbitControlsRef]);

  useMotionControl(orbitControlsRef);

  return (
    <Fade duration={0.1}>
      <Leva collapsed />
      <Canvas linear flat camera={{ position: [0, 1, 4.5] }} style={{ opacity: visible ? 1 : 0 }}>
        <OrbitControls ref={orbitControlsRef} enableRotate enableDamping enableZoom={false} />
        <Suspense fallback={null}>
          <Galaxy visible={visible} />
          <Nucleus size={0.075} />
          {visible && (
            <>
              <Marker distance={0.2} branchNumber={1} rank={3} />
              <Marker distance={0.2} branchNumber={2} rank={2} />
              <Marker distance={0.2} branchNumber={3} rank={1} />
              <Marker distance={0.2} branchNumber={4} rank={0} />
            </>
          )}
        </Suspense>
        <Effects />
        {/* <axesHelper args={[20, 20, 20]} /> */}
      </Canvas>
    </Fade>
  );
};

export default Three;
