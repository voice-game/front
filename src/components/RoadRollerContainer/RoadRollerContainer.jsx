import React from "react";

import useAudio from "../../hooks/useAudio";
import useCanvas from "../../hooks/useCanvas";
import usePitchDetector from "../../hooks/usePitchDetector";
import useMyImage from "../../hooks/useMyImage";

import Canvas from "../shared/Canvas/Canvas";

import Game from "../../games/roadRoller";
import BackGround from "../../games/roadRoller/background";
import GameMap from "../../games/roadRoller/GameMap";

import b0 from "../../assets/image/background/0.png";
import b1 from "../../assets/image/background/1.png";
import b2 from "../../assets/image/background/2.png";
import b3 from "../../assets/image/background/3.png";

const RoadRollerContainer = (props) => {
  const { image, isLoaded } = useMyImage("roadRoller");

  const TILE_SIZE = 32;
  const WIDTH = TILE_SIZE * 43;
  const HEIGHT = TILE_SIZE * 19;

  const { isAudioUse, audioContextRef, micStreamRef } = useAudio(
    { samplerate: 12000 },
    { audio: true, video: false }
  );
  const pitchDetectorRef = usePitchDetector(
    isAudioUse,
    audioContextRef,
    micStreamRef
  );

  const { staticDots, staticMap, interactionPoints } = new GameMap(
    TILE_SIZE,
    WIDTH,
    HEIGHT
  ).gameMap;

  const game = useCanvas(Game, {
    pitchDetectorRef,
    staticDots,
    interactionPoints,
  });
  const background = useCanvas(BackGround, { staticMap });

  return (
    <>
      <Canvas
        id="game-layer"
        ref={game}
        width={WIDTH}
        height={HEIGHT}
      />
      <Canvas
        id="background-layer"
        ref={background}
        width={WIDTH}
        height={HEIGHT}
        bgImage={b2}
      />
      <div>W: 점프 A: 좌 D: 우</div>
    </>
  );
};

export default RoadRollerContainer;
