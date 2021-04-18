import React, { useState } from "react";
import Game from "../../games/roadRoller";
import useCanvas from "../../hooks/useCanvas";
import usePitchDetector from "../../hooks/usePitchDetector";
import GameFrame from "../GameFrame/GameFrame";
import GameOption from "../GameOption/GameOption";
import GameResult from "../GameResult/GameResult";

const RoadRoller = (props) => {
  const [useAudio, setUseAudio] = useState(false);
  const pitchDetector = usePitchDetector(useAudio);
  const game = useCanvas(Game);

  return (
    <div>
      <GameOption />
      <GameFrame canvasRef={game} />
      <GameResult />
      <button onClick={() => setUseAudio(true)}>click</button>
    </div>
  );
};

export default RoadRoller;
