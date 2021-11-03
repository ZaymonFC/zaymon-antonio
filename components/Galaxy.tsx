import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { button, folder, Leva, useControls } from "leva";
import React, { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { Points } from "three";
import Fade from "./Fade";
import { useSpring, animated } from "@react-spring/three";

let useMouseMove = (
  sink: (p: number[]) => void,
  throttleMs?: number | undefined
) => {};

if (process.browser) {
  useMouseMove = require("use-control/lib/input/mouse").useMouseMove;
}

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const randomBrightColor = () =>
  hslToHex(Math.random() * 255, Math.random() * 25 + 75, 50);

const randomValue = (r: number, randomness: number, randomPower: number) =>
  Math.pow(Math.random(), randomPower) *
  (Math.random() < 0.5 ? 1 : -1) *
  randomness *
  r;

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
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const [x, y, z] = randomPoint(
      radius,
      parameters.randomness,
      parameters.randomPower
    );

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
    particles.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    particles.current.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );
  }
};

function Galaxy() {
  const [parameters, set] = useControls(() => ({
    Galaxy: folder({
      count: { min: 100, max: 1000000, value: 1000000, step: 100 },
      size: { min: 0.001, max: 0.02, value: 0.005, step: 0.001 },
      radius: { min: 0.01, max: 20, value: 16, step: 0.01 },
      branches: { min: 2, max: 20, value: 8, step: 1 },
      spin: { min: -5, max: 5, value: 1.75, step: 0.001 },
      randomness: { min: 0, max: 2, value: 0.33, step: 0.001 },
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

  const particles = useRef<Points>();

  useEffect(() => {
    generateGalaxy(parameters, particles);
  }, [parameters, particles]);

  const mousePosition = useRef<number[]>([0, 0]);
  useMouseMove((p) => (mousePosition.current = p));

  useFrame(({ clock }, _delta) => {
    const elapsedTime = clock.getElapsedTime();

    if (parameters.animate) {
      const [x, y] = mousePosition.current;

      if (particles.current) {
        particles.current.rotation.y = 0.01 * elapsedTime + 0.00002 * x;
        particles.current.rotation.x = 0.00001 * y;
      }
    }
  });

  const { scale } = useSpring({
    from: { scale: 0.01 },
    to: { scale: 1 },
    config: { duration: 500 },
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
      <sphereBufferGeometry
        attach="geometry"
        args={[0.5, 32, 32, 0, 6.4, 0, 6.3]}
      />
      <meshBasicMaterial attach="material" color="#fff" />
    </mesh>
  );
}

const Effects = React.forwardRef((props, ref) => {
  const { bokehScale, focusDistance, offSet, luminanceThreshold, focalLength } =
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
            value: 2.4,
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

  return (
    <EffectComposer multisampling={2}>
      <ChromaticAberration offset={new THREE.Vector2(0.0, offSet)} />
      <Bloom
        luminanceThreshold={luminanceThreshold}
        luminanceSmoothing={0.5}
        height={1000}
      />
      <DepthOfField
        focusDistance={focusDistance}
        focalLength={focalLength}
        bokehScale={bokehScale}
      />
    </EffectComposer>
  );
});

export default function Three() {
  const ref = useRef();

  return (
    <Fade duration={0.1}>
      <Leva collapsed />
      <Canvas linear flat camera={{ position: [0, 1.5, 5] }}>
        <OrbitControls enableZoom enablePan enableRotate enableDamping />
        <Suspense fallback={null}>
          <Galaxy />
          <Nucleus size={0.075} />
        </Suspense>
        <Effects ref={ref} />
        {/* <axesHelper args={[1, 2, 2]} /> */}
      </Canvas>
    </Fade>
  );
}
