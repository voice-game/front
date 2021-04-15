import React, { useEffect, useRef } from "react";
import Game from "../../games/roadRoller";
import GameFrame from "../GameFrame/GameFrame";
import GameResult from "../GameResult/GameResult";

const RoadRoller = (props) => {
  const canvasRef = useRef();

  useEffect(() => {
      new Game(canvasRef);
  },[]);

  return (
    <div>
      <div>Road Roller</div>
      <GameFrame canvasRef={canvasRef} />
      <GameResult />
    </div>
  );
};

export default RoadRoller;
