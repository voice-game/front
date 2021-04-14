import React from "react";
import GameFrame from "../GameFrame/GameFrame";
import GameResult from "../GameResult/GameResult";

const FlappyBird = (props) => {
  return (
    <div>
      <div>Flappy Bird</div>
      <GameFrame />
      <GameResult />
    </div>
  );
};

export default FlappyBird;
