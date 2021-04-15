import React, { useState } from "react";
import FighterAttackFrame from "../FighterAttackFrame/FighterAttackFrame";
import GameResult from "../GameResult/GameResult";

const FighterAttack = (props) => {
  const [isPlay, setIsPlay] = useState(false);

  const handlePlayClick = () => {
    setIsPlay(true);
  };

  const handleStopClick = () => {
    setIsPlay(false);
  };

  return (
    <div>
      <div>Fighter Attack</div>
      <FighterAttackFrame isPlay={isPlay} />
      <GameResult />
      <button onClick={handlePlayClick}>Play</button>
      <button onClick={handleStopClick}>Stop</button>
    </div>
  );
};

export default FighterAttack;
