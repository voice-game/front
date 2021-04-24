import React, { useEffect, useRef, useState } from "react";
import useCanvas from "../../hooks/useCanvas";
import usePitchDetector from "../../hooks/usePitchDetector";
import getAudioContext from "../../utils/getAudioContext";
import getMedia from "../../utils/getMedia";
import Game from "../../games/roadRoller";
import BackGround from "../../games/roadRoller/background";
import GameFrame from "../GameFrame/GameFrame";
import GameOption from "../GameOption/GameOption";
import b0 from "../../assets/image/background/0.png";
import b1 from "../../assets/image/background/1.png";
import b2 from "../../assets/image/background/2.png";
import b3 from "../../assets/image/background/3.png";
import b4 from "../../assets/image/background/4.png";
import GameMap from "../../games/roadRoller/GameMap";

const RoadRoller = (props) => {
  const TILE_SIZE = 32;
  const WIDTH = TILE_SIZE * 43;
  const HEIGHT = TILE_SIZE * 19;

  const [isAudioUse, setIsAudioUse] = useState(false);
  const audioContextRef = useRef(null);
  const micStreamRef = useRef(null);
  const pitchDetectorRef = usePitchDetector(isAudioUse, audioContextRef, micStreamRef);

  const {
    staticDots,
    staticMap,
    interactionPoints,
  } = new GameMap(TILE_SIZE, WIDTH, HEIGHT).gameMap;

  const game = useCanvas(Game, { pitchDetectorRef, staticDots, interactionPoints });
  const background = useCanvas(BackGround, { staticMap });

  useEffect(() => {
    (async () => {
      try {
        setTimeout(() => {
          audioContextRef.current = getAudioContext({ samplerate: 12000 });
          setIsAudioUse(true);
        }, 100);
        micStreamRef.current = await getMedia({ audio: true, video: false });
      } catch (err) {
        console.log(err);
      }
    })();
  });

  return (
    <>
      <div>
        <GameOption />
        <GameFrame
          id="game-layer"
          canvasRef={game}
          width={WIDTH}
          height={HEIGHT}
        />
        <GameFrame
          id="background-layer"
          canvasRef={background}
          width={WIDTH}
          height={HEIGHT}
          backgroundImage={b2}
        />
      </div>
      <div>W: 점프 A: 좌 D: 우</div>
    </>
  );
};

export default RoadRoller;
