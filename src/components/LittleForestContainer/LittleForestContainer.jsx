import React, { useState } from "react";

import Game from "../../games/littleForest";
import BackGround from "../../games/littleForest/Background";
import GameMap from "../../games/littleForest/GameMap";
import GameManual from "../GameManual/GameManual";
import Loading from "../Loading/Loading";

import useAudio from "../../hooks/useAudio";
import useCanvas from "../../hooks/useCanvas";
import usePitchDetector from "../../hooks/usePitchDetector";
import useLoadedImage from "../../hooks/useLoadedImage";

import Canvas from "../shared/Canvas/Canvas";

import manualImage from "../../images/manuals/manual_littleForest.png";
import bgm from "../../assets/audio/bgm.mp3";

const LittleForestContainer = () => {
  const [currentMap, setCurrentMap] = useState(0);
  const { image, isLoaded } = useLoadedImage("littleForest");
  const pitchDetectorRef = usePitchDetector(
    useAudio({ samplerate: 12000 }, { audio: true, video: false })
  );

  const TILE_SIZE = 32;
  const WIDTH = TILE_SIZE * 35;
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

  return (
    <>
      {isLoaded ? (
        <div>
          {currentMap === 0 && <GameManual imgSrc={manualImage} />}
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
            bgImage={image.backgrounds[currentMap].src}
          />
          <div>W: 점프 A: 좌 D: 우</div>
          {/* <audio loop autoPlay={true}>
            <source src={bgm} type="audio/mpeg" />
          </audio> */}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default LittleForestContainer;
