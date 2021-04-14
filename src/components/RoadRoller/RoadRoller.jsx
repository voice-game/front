import React from "react";
import GameFrame from "../GameFrame/GameFrame";
import GameResult from "../GameResult/GameResult";

const RoadRoller = (props) => {
  return (
    <div>
      <div>Road Roller</div>
      <GameFrame />
      <GameResult />
    </div>
  );
};

export default RoadRoller;
