import { animated, useSpring } from "@react-spring/three";
import { Html, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easeExpInOut } from "d3-ease";
import { folder, useControls } from "leva";
import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useNavigation } from "../hooks/useNavigation";
import Fade from "./Fade";
import { useGalaxyParameters } from "./Galaxy";

const getPositionOnArms = (
  radius: number,
  spin: number,
  branches: number,
  branchNumber?: number
) => {
  const spinAngle = radius * spin;

  const branchAngle =
    ((branchNumber ? branchNumber : Math.floor(Math.random() * 10) % branches) / branches) *
    Math.PI *
    2;

  const x = Math.cos(branchAngle + spinAngle) * radius;
  const y = 0;
  const z = Math.sin(branchAngle + spinAngle) * radius;

  return [x, y, z];
};

const Marker3D = ({ children }: { children: React.ReactNode }) => {
  const { distanceScale } = useControls({
    UI: folder({ distanceScale: { min: 1, max: 15, step: 0.5, value: 4 } }),
  });

  return (
    <Html distanceFactor={distanceScale} center position={[0, 0.25, 0]} as="div">
      <Fade duration={0.2} delay={0.6}>
        {children}
      </Fade>
    </Html>
  );
};

const useClipping = (ref: React.RefObject<THREE.Object3D>, threshold: number) => {
  const [clipped, setClipped] = useState(false);

  let worldPosition = React.useRef<THREE.Vector3>(new THREE.Vector3());

  useFrame(({ camera }) => {
    if (ref.current) {
      // Get the current world position of the marker
      ref.current.getWorldPosition(worldPosition.current);

      if (camera.position.distanceTo(worldPosition.current) < threshold) {
        setClipped(true);
      } else {
        setClipped(false);
      }
    }
  });

  return clipped;
};

type MarkerProps = {
  distance: number;
  branchNumber?: number;
  rank: number;
  children: React.ReactNode;
};

const AnimatedSphere = animated(Sphere);

export const Marker = ({ distance, branchNumber, rank, children }: MarkerProps) => {
  const { recordPoint } = useNavigation();
  const { radius, spin, branches } = useGalaxyParameters();
  const markerHeight = 0.2501;

  const r = radius * distance;
  const [x, _y, z] = getPositionOnArms(r, spin, branches, branchNumber);

  const ref = React.useRef<THREE.Group>(null);

  const clipped = useClipping(ref, 1.2);

  // Initial transformation and navigation registration
  useEffect(() => {
    if (ref.current) {
      ref.current.position.x = 0;
      ref.current.position.z = 0;
      ref.current.translateX(x);
      ref.current.translateZ(z);
      recordPoint(rank, [x, z]);
    }
  }, [radius, spin, branches]);

  const points: [number, number, number][] = [
    [0, 0, 0],
    [0, markerHeight, 0],
  ];

  const fadeIn = {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1400, easing: easeExpInOut },
  };

  const [{ opacity }, set] = useSpring(() => fadeIn);

  useEffect(() => {
    if (!clipped) {
      set(fadeIn);
    }
  }, [clipped]);

  const geometry = new THREE.BufferGeometry().setFromPoints(
    points.map((p) => new THREE.Vector3(...p))
  );

  const AnimatedLine: any = animated.line;

  return (
    <group ref={ref}>
      {!clipped && (
        <>
          <AnimatedLine geometry={geometry}>
            <animated.lineBasicMaterial
              attach="material"
              color="white"
              linejoin="round"
              linecap="round"
              linewidth={1}
              transparent
              opacity={opacity}
            />
          </AnimatedLine>
          <Marker3D>{children}</Marker3D>
          <AnimatedSphere args={[0.01]}>
            <animated.meshBasicMaterial attach="material" transparent opacity={opacity} />
          </AnimatedSphere>
        </>
      )}
    </group>
  );
};
