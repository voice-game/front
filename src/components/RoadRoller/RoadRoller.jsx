import React from "react";
import GameFrame from "../GameFrame/GameFrame";

// import useAudio from "../../hooks/useAudio";
// import useCanvas from "../../hooks/useCanvas";
// import usePitchDetector from "../../hooks/usePitchDetector";

// import Game from "../../games/roadRoller";
// import BackGround from "../../games/roadRoller/background";
// import GameMap from "../../games/roadRoller/GameMap";

// import b0 from "../../assets/image/background/0.png";
// import b1 from "../../assets/image/background/1.png";
// import b2 from "../../assets/image/background/2.png";
// import b3 from "../../assets/image/background/3.png";
// import b4 from "../../assets/image/background/4.png";

const RoadRoller = (props) => {
  // console.log(props)
  // const {
  //   isAudioUse,
  //   audioContextRef,
  //   micStreamRef,
  // } = useAudio({ samplerate: 12000 }, { audio: true, video: false });
  // const pitchDetectorRef = usePitchDetector(
  //   isAudioUse,
  //   audioContextRef,
  //   micStreamRef
  // );

  // const TILE_SIZE = 32;
  // const WIDTH = TILE_SIZE * 43;
  // const HEIGHT = TILE_SIZE * 19;

  // const {
  //   staticDots,
  //   staticMap,
  //   interactionPoints,
  // } = new GameMap(TILE_SIZE, WIDTH, HEIGHT).gameMap;

  // const game = useCanvas(Game, { pitchDetectorRef, staticDots, interactionPoints });
  // const background = useCanvas(BackGround, { staticMap });

  // return (
  //   <>
  //     <GameFrame
  //       id="game-layer"
  //       canvasRef={game}
  //       width={WIDTH}
  //       height={HEIGHT}
  //     />
  //     <GameFrame
  //       id="background-layer"
  //       canvasRef={background}
  //       width={WIDTH}
  //       height={HEIGHT}
  //       backgroundImage={b2}
  //     />
  //   <div>W: 점프 A: 좌 D: 우</div>
  //   </>
  // );
};

export default RoadRoller;
