import { animated, useSpring } from "@react-spring/three";
import { Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { easeExpInOut } from "d3-ease";
import { button, folder, Leva, useControls } from "leva";
import React, { Suspense, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { Points } from "three";
import { Line2 } from "three-stdlib";
import { randomBrightColor } from "../utils/Colors";
import Fade from "./Fade";

let useMouseMove = (sink: (p: number[]) => void, throttleMs?: number | undefined) => {};

if (process.browser) {
  useMouseMove = require("use-control/lib/input/mouse").useMouseMove;
}

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

const useGalaxyParameters = (): GalaxyParameters => {
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

const useMousePosition = () => {
  const mousePosition = useRef<number[]>([0, 0]);
  useMouseMove((p) => (mousePosition.current = p));

  return mousePosition;
};

const useGlobalRotation = (enabled: boolean, ref: any) => {
  const mousePosition = useMousePosition();

  useFrame(({ clock }, _delta) => {
    const elapsedTime = clock.getElapsedTime();

    if (enabled) {
      const [x, y] = mousePosition.current;

      if (ref.current) {
        ref.current.rotation.y = 0.01 * elapsedTime + 0.00002 * x;
        ref.current.rotation.x = 0.00001 * y;
      }
    }
  });
};

function Galaxy() {
  const parameters = useGalaxyParameters();
  const particles = useRef<Points>();

  useEffect(() => {
    generateGalaxy(parameters, particles);
  }, [parameters, particles]);

  useGlobalRotation(parameters.animate, particles);

  const { scale } = useSpring({
    from: { scale: 0.0 },
    to: { scale: 1 },
    config: { duration: 750, easing: easeExpInOut },
  });

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
}

function Nucleus({ size }: { size: number }) {
  const nucleusRef = useRef();

  return (
    <mesh ref={nucleusRef} position={[0, 0, 0]} scale={[size, size, size]}>
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32, 0, 6.4, 0, 6.3]} />
      <meshBasicMaterial attach="material" color="#fff" />
    </mesh>
  );
}

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

type MarkerProps = { distance: number; branchNumber?: number };

const Marker = ({ distance, branchNumber }: MarkerProps) => {
  const { radius, spin, branches, animate } = useGalaxyParameters();
  const markerHeight = 0.6;

  const lineRef = React.useRef<Line2>(null);

  // Setup initial translation to rotate around the origin (nucleus)
  useEffect(() => {
    const r = radius * distance;
    const [x, _y, z] = getPositionOnArms(r, spin, branches, branchNumber);

    if (lineRef.current) {
      lineRef.current.geometry.translate(x, 0, z);
    }
  }, []);

  // Rotate with everything else
  useGlobalRotation(animate, lineRef);

  const AnimatedLine = animated(Line);

  const { opacity } = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const points: [number, number, number][] = [
    [0, 0, 0],
    [0, markerHeight, 0],
  ];

  const lineGeometry = points.map((p) => new THREE.Vector3(...p));
  return (
    <>
      {/* <line ref={lineRef}> */}
      {/* <LineGe */}
      {/* <bufferGeometry attach="geometry"  /> */}
      {/* <animated.lineBasicMaterial color="white" linewidth={1} transparent /> */}
      {/* </line> */}

      <AnimatedLine ref={lineRef} points={points} opacity={opacity} color="white" />
    </>
  );
};

type EffectsControls = {
  offSet: number;
  luminanceThreshold: number;
  bokehScale: number;
  focusDistance: number;
  focalLength: number;
};

const useEffectsControls = (): EffectsControls =>
  useControls({
    Effects: folder({
      ChromaticAberration: folder({
        offSet: {
          min: -1,
          max: 1,
          increment: 0.0001,
          value: -0.0002,
        },
      }),
      Bloom: folder({
        luminanceThreshold: {
          min: 0,
          max: 1,
          increment: 0.01,
          value: 0.2,
        },
      }),
      DoF: folder({
        bokehScale: {
          min: 0,
          max: 10,
          value: 1.4,
        },
        focusDistance: {
          min: 0.0001,
          max: 1,
          value: 0.0,
        },
        focalLength: {
          min: 0.0001,
          max: 1,
          value: 0.05,
        },
      }),
    }),
  });

const Effects = () => {
  const { offSet, luminanceThreshold, focusDistance, focalLength, bokehScale } =
    useEffectsControls();

  return (
    <EffectComposer multisampling={2}>
      <ChromaticAberration offset={new THREE.Vector2(0.0, offSet)} />
      <Bloom luminanceThreshold={luminanceThreshold} luminanceSmoothing={0.5} height={1000} />
      <DepthOfField
        focusDistance={focusDistance}
        focalLength={focalLength}
        bokehScale={bokehScale}
      />
    </EffectComposer>
  );
};

const Three = () => (
  <Fade duration={0.1}>
    <Leva collapsed />
    <Canvas linear flat camera={{ position: [0, 1.5, 5] }}>
      <OrbitControls enableZoom enableRotate enableDamping />
      <Suspense fallback={null}>
        <Galaxy />
        <Nucleus size={0.075} />
        <Marker distance={0.2} branchNumber={1} />
      </Suspense>
      <Effects />
      {/* <axesHelper args={[1, 2, 2]} /> */}
    </Canvas>
  </Fade>
);

export default Three;
