import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

const GameOptionContainer = styled.div`
  width: 100%;
  padding: 1vh 1vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LeaveRoomButton = styled.button`
  margin-right: 1vw;
  background-color: #dfe4ea;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ChooseGameButton = styled.button`
  margin-right: 1vw;
  font-weight: 600;
  font-size: 0.9rem;
`;

const LogoutButton = styled.button`
  margin-right: 1vw;
  font-weight: 600;
  font-size: 0.9rem;
  background-color: #eb4d4b;
`;

const GameOption = () => {
  const history = useHistory();
  const location = useLocation();

  const gameTitle = location.pathname.split("/")[2];
  const roomId = location.pathname.split("/")[3];

  return (
    <GameOptionContainer>
      {gameTitle && roomId && (
        <LeaveRoomButton
          onClick={() => {
            history.push(`/games/${gameTitle}`);
          }}
        >
          Leave Room
        </LeaveRoomButton>
      )}
      {location.pathname !== "/" && location.pathname !== "/games" && (
        <ChooseGameButton
          onClick={() => {
            history.push("/games");
          }}
        >
          Choose Game
        </ChooseGameButton>
      )}
      <LogoutButton
        onClick={() => {
          history.push("/logout");
        }}
      >
        Log Out
      </LogoutButton>
    </GameOptionContainer>
  );
};

export default GameOption;
