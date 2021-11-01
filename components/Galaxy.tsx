import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { folder, Leva, useControls } from "leva";
import { BlendFunction } from "postprocessing";
import React, { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

let useMouseMove = (
  sink: (p: number[]) => void,
  throttleMs?: number | undefined
) => {};

if (process.browser) {
  useMouseMove = require("use-control/lib/input/mouse").useMouseMove;
}

function Galaxy() {
  const parameters = useControls({
    Galaxy: folder({
      count: { min: 100, max: 1000000, value: 500000, step: 100 },
      size: { min: 0.001, max: 1, value: 0.0005, step: 0.001 },
      radius: { min: 0.01, max: 20, value: 16, step: 0.01 },
      branches: { min: 2, max: 20, value: 8, step: 1 },
      spin: { min: -5, max: 5, value: 1.75, step: 0.001 },
      randomness: { min: 0, max: 2, value: 0.33, step: 0.001 },
      randomnessPower: { min: 1, max: 10, value: 10, step: 0.001 },
      insideColor: { value: "#b95730", label: "Inside Color" },
      outsideColor: { value: "#193781", label: "Outside Color" },
    }),
    Animation: folder({
      animate: true,
    }),
  });

  const particles = useRef();

  useEffect(() => {
    generateGalaxy();
  });

  const mousePosition = useRef<number[]>([0, 0]);
  useMouseMove((p) => (mousePosition.current = p));

  useFrame(({ clock, mouse }, delta) => {
    if (parameters.animate) {
      const elapsedTime = clock.getElapsedTime();

      const [x, y] = mousePosition.current;

      particles.current.rotation.y = 0.01 * elapsedTime + 0.00002 * x;
      particles.current.rotation.x = 0.00001 * y;
    }
  });

  const generateGalaxy = () => {
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

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;

      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    particles.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particles.current.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );
  };

  return (
    <points ref={particles}>
      <bufferGeometry />
      <pointsMaterial
        size={parameters.size}
        sizeAttenuation={true}
        depthWrite={true}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Nucleus({ size }: { size: number }) {
  const nucleusRef = useRef();

  return (
    <mesh
      ref={nucleusRef}
      position={[0, 0, 0]}
      scale={[size, size, size]}
      layers={THREE.BLOOM_SCENE}
    >
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
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL} // blend mode
        offset={[0.0, offSet]} // color offset
      />
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
    <>
      <Leva flat collapsed />
      <Canvas linear flat camera={{ position: [0, 1.5, 5] }}>
        <Suspense fallback={null}>
          <Galaxy />
          <Nucleus size={0.075} />
        </Suspense>
        <Effects ref={ref} />
        {/* <axesHelper args={[1, 2, 2]} /> */}
      </Canvas>
    </>
  );
}
