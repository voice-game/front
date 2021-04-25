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

const GameOptionButton = styled.button`
  padding: 10px;
  margin-right: 1vw;
  border: none;
  background-color: #ec6998;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
`;

const GameOption = () => {
  const history = useHistory();
  const location = useLocation();

  const gameTitle = location.pathname.split("/")[2];
  const roomId = location.pathname.split("/")[3];

  return (
    <GameOptionContainer>
      {gameTitle && roomId && (
        <GameOptionButton
          onClick={() => {
            history.push(`/games/${gameTitle}`);
          }}
        >
          나가기
        </GameOptionButton>
      )}
      {location.pathname !== "/" && location.pathname !== "/games" && (
        <GameOptionButton
          onClick={() => {
            history.push("/games");
          }}
        >
          다른게임
        </GameOptionButton>
      )}
      <GameOptionButton
        onClick={() => {
          history.push("/logout");
        }}
      >
        로그아웃
      </GameOptionButton>
    </GameOptionContainer>
  );
};

export default GameOption;
