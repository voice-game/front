import React from "react";
import Game from "../../games/roadRoller";
import useCanvas from "../../hooks/useCanvas";
import GameFrame from "../GameFrame/GameFrame";
import GameOption from "../GameOption/GameOption";
import GameResult from "../GameResult/GameResult";

const RoadRoller = (props) => {
  const game = useCanvas(Game);

  return (
    <div>
      <GameOption />
      <GameFrame canvasRef={game} />
      <GameResult />
    </div>
  );
};

export default RoadRoller;
