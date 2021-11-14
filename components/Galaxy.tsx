import { animated, useSpring } from "@react-spring/three";
import { easeExpInOut } from "d3-ease";
import { button, folder, useControls } from "leva";
import React, { useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { Points } from "three";
import { randomBrightColor } from "../utils/Colors";

const randomValue = (r: number, randomness: number, randomPower: number) =>
  Math.pow(Math.random(), randomPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

const randomPoint = (
  r: number,
  randomness: number,
  randomPower: number
): [number, number, number] => [
  randomValue(r, randomness, randomPower),
  randomValue(r, randomness, randomPower),
  randomValue(r, randomness, randomPower),
];

const generateGalaxy = (
  parameters: GalaxyParameters,
  particles: React.MutableRefObject<Points | undefined>
) => {
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    const radius = Math.random() * parameters.radius;
    const spinAngle = radius * parameters.spin;
    const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const [x, y, z] = randomPoint(radius, parameters.randomness, parameters.randomPower);

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + z;

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  if (particles.current) {
    particles.current.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.current.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  }
};

type GalaxyParameters = {
  count: number;
  size: number;
  radius: number;
  branches: number;
  spin: number;
  randomness: number;
  randomPower: number;
  insideColor: string;
  outsideColor: string;
  animate: boolean;
};

export const useGalaxyParameters = (): GalaxyParameters => {
  const [parameters, set] = useControls(() => ({
    Galaxy: folder({
      count: {
        min: 100,
        max: 1000000,
        value: isMobile ? 40000 : 1000000,
        step: 100,
      },
      size: {
        min: 0.001,
        max: 0.02,
        value: isMobile ? 0.05 : 0.005,
        step: 0.001,
      },
      radius: { min: 0.01, max: 20, value: isMobile ? 3 : 16, step: 0.01 },
      branches: { min: 2, max: 20, value: 8, step: 1 },
      spin: { min: -5, max: 5, value: 1.75, step: 0.001 },
      randomness: { min: 0, max: 2, value: isMobile ? 0.7 : 0.33, step: 0.001 },
      randomPower: { min: 1, max: 10, value: 10, step: 0.001 },
    }),
    Color: folder({
      insideColor: { value: "#c95d32", label: "Inside Color" },
      outsideColor: { value: "#193781", label: "Outside Color" },
      randomize: button(() => {
        set({
          insideColor: randomBrightColor(),
          outsideColor: randomBrightColor(),
        });
      }),
    }),
    Animation: folder({
      animate: true,
    }),
  }));
  return parameters;
};

export const Galaxy = ({ visible }: { visible: boolean }) => {
  const parameters = useGalaxyParameters();
  const particles = useRef<Points>();

  useEffect(() => {
    generateGalaxy(parameters, particles);
  }, [parameters, particles]);

  const [{ scale }, set] = useSpring(() => ({
    scale: 0.0001,
    config: { duration: 750, easing: easeExpInOut },
  }));

  useEffect(() => {
    if (visible) {
      set({ to: { scale: 1 } });
    }
  }, [set, visible]);

  return (
    <animated.points ref={particles} scale={scale}>
      <bufferGeometry />
      <pointsMaterial
        size={parameters.size}
        sizeAttenuation={true}
        depthWrite={true}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
      />
    </animated.points>
  );
};

export const Nucleus = ({ size }: { size: number }) => {
  const nucleusRef = useRef();

  return (
    <mesh ref={nucleusRef} position={[0, 0, 0]} scale={[size, size, size]}>
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32, 0, 6.4, 0, 6.3]} />
      <meshBasicMaterial attach="material" color="#fff" />
    </mesh>
  );
};
