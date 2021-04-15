import React from "react";
import GameFrame from "../GameFrame/GameFrame";
import GameResult from "../GameResult/GameResult";
import PlayerCard from "../PlayerCard/PlayerCard";

const EnergyBattle = (props) => {
  return (
    <div>
      <div>Energy Battle</div>
      <PlayerCard />
      <GameFrame />
      <GameResult />
    </div>
  );
};

export default EnergyBattle;
