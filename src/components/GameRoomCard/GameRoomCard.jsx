import React from "react";
import styled from "styled-components";

import useErrorMessage from "../../hooks/useErrorMessage";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const GameRoomCardContainer = styled.div`
  position: relative;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 400;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  cursor: pointer;
`;

const GameRoomFull = styled.div`
  position: absolute;
  font-size: 1.5rem;
  color: #e74c3c;
  bottom: 10%;
  right: 10%;
`;

const GameRoomEnter = styled.div`
  position: absolute;
  font-size: 1.5rem;
  color: #0984e3;
  bottom: 10%;
  right: 10%;
`;

const GameRoomData = styled.div`
  color: black;
`;

const GameRoomCard = ({
  room: { _id, players, createdAt, status },
  onClick,
}) => {
  const [error, showErrorMessage] = useErrorMessage("");
  const handleClickRoomCard = () => {
    if (status === "Enter") {
      return onClick();
    }

    showErrorMessage("입장이 불가능합니다.");
  };

  return (
    <>
      {error.length > 0 && <ErrorMessage error={error} />}
      <GameRoomCardContainer onClick={handleClickRoomCard}>
        <GameRoomData>
          Room: {_id}
          <br />
          Players: {players.length}
          <br />
          Created: {createdAt.slice(0, 16)}
        </GameRoomData>
        {status === "Full" ? (
          <GameRoomFull>{status}</GameRoomFull>
        ) : (
          <GameRoomEnter>{status}</GameRoomEnter>
        )}
      </GameRoomCardContainer>
    </>
  );
};

export default GameRoomCard;
