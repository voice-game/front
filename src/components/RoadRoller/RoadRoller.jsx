import React from "react";
import Canvas from "../../games/roadRoller";
import useCanvas from "../../hooks/useCanvas";
import GameFrame from "../GameFrame/GameFrame";
import GameResult from "../GameResult/GameResult";

const RoadRoller = (props) => {
  const game = useCanvas(Canvas);

  return (
    <div>
      <div>Road Roller</div>
      <GameFrame canvasRef={game} />
      <GameResult />
    </div>
  );
};

export default RoadRoller;
