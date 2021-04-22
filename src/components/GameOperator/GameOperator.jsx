import React from "react";
import { useHistory } from "react-router-dom";

const GameOperator = ({ socket, gameTitle, creater, otherPlayer }) => {
  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.push(`/games/${gameTitle}`)}>
        나가기
      </button>
      <div>GameOperator</div>
    </div>
  );
};

export default GameOperator;
