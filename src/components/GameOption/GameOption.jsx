import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "../shared/Button/Button";

const GameOptionContainer = styled.div`
  width: 100%;
  padding: 1vh 1vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const GameOption = () => {
  const history = useHistory();
  const location = useLocation();

  const gameTitle = location.pathname.split("/")[2];
  const roomId = location.pathname.split("/")[3];

  return (
    <GameOptionContainer>
      {gameTitle && roomId && (
        <Button
          onClick={() => history.push(`/games/${gameTitle}`)}
          bgColor={"#dfe4ea"}
          margin={["0", "1vw", "0", "0"]}
          fontWeight={"600"}
          fontSize={"0.9rem"}
        >
          Leave Room
        </Button>
      )}
      {gameTitle && (
        <Button
          onClick={() => history.push("/games")}
          margin={["0", "1vw", "0", "0"]}
          fontWeight={"600"}
          fontSize={"0.9rem"}
        >
          Choose Game
        </Button>
      )}
      <Button
        onClick={() => history.push("/logout")}
        margin={["0", "1vw", "0", "0"]}
        bgColor={"#eb4d4b"}
        fontWeight={"600"}
        fontSize={"0.9rem"}
      >
        Log Out
      </Button>
    </GameOptionContainer>
  );
};

export default GameOption;
