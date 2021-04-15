import React from "react";
import FighterAttackFrame from "../FighterAttackFrame/FighterAttackFrame";
import GameResult from "../GameResult/GameResult";

const FighterAttack = (props) => {
  return (
    <div>
      <div>Fighter Attack</div>
      <FighterAttackFrame />
      <GameResult />
    </div>
  );
};

export default FighterAttack;
