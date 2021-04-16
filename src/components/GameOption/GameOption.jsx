import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

const GameOptionContainer = styled.div`
  width: 18vw;
  height: 5vh;
  position: absolute;
  right: 4vw;
  top: 2vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const GameOptionButton = styled.button`
  width: 8vw;
  height: 4vh;
  margin-left: 1vw;
  background-color: #ec6998;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
`;

const GameOption = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <GameOptionContainer>
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
