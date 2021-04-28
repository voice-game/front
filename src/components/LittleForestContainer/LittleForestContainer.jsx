import React, { useState } from "react";

import useAudio from "../../hooks/useAudio";
import useCanvas from "../../hooks/useCanvas";
import usePitchDetector from "../../hooks/usePitchDetector";
import useLoadedImage from "../../hooks/useLoadedImage";

import Canvas from "../shared/Canvas/Canvas";

import Game from "../../games/littleForest";
import BackGround from "../../games/littleForest/Background";
import GameMap from "../../games/littleForest/GameMap";

import pickRandom from "../../utils/pickRandom";

const LittleForestContainer = () => {
  const { image, isLoaded } = useLoadedImage("littleForest");
  const [currentMap, setCurrentMap] = useState(0);
  const pitchDetectorRef = usePitchDetector(
    useAudio({ samplerate: 12000 }, { audio: true, video: false })
  );

  const TILE_SIZE = 32;
  const WIDTH = TILE_SIZE * 43;
  const HEIGHT = TILE_SIZE * 19;

  const { staticDots, staticMap, interactionPoints } = new GameMap(
    TILE_SIZE,
    WIDTH,
    HEIGHT,
    currentMap
  ).gameMap;

  const game = useCanvas(
    Game,
    {
      pitchDetectorRef,
      staticDots,
      interactionPoints,
      setCurrentMap,
      images: image,
    },
    isLoaded
  );

  const background = useCanvas(
    BackGround,
    {
      staticMap,
      images: image,
    },
    isLoaded
  );

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Canvas
        id="game-layer"
        ref={game}
        position="absolute"
        width={WIDTH}
        height={HEIGHT}
      />
      <Canvas
        id="background-layer"
        ref={background}
        position="absolute"
        width={WIDTH}
        height={HEIGHT}
        bgImage={pickRandom(image.backgrounds).src}
      />
      <div>W: 점프 A: 좌 D: 우</div>
    </>
  );
};

export default LittleForestContainer;
