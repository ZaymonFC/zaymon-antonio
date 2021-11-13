import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Noise,
} from "@react-three/postprocessing";
import { folder, useControls } from "leva";
import React from "react";
import * as THREE from "three";

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
      <Noise premultiply opacity={0.2} />
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

export default Effects;
