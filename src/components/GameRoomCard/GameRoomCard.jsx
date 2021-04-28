import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import useErrorMessage from "../../hooks/useErrorMessage";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const GameRoomCardContainer = styled.div`
  display: flex;
  flex: 1;
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

const GameRoomData = styled.div`
  flex-basis: 80%;
  color: black;
  text-align: left;
  line-height: 1.2rem;
`;

const GameRoomStatus = styled.div`
  display: flex;
  align-items: flex-end;
  flex-basis: 20%;
  font-size: 1.5rem;
  color: ${(props) => props.color || "black"};
  bottom: 10%;
  right: 10%;
`;

const GameRoomCard = ({
  room: { players, createdAt, status },
  onClick,
  gameTitle,
}) => {
  const roomNumberRef = useRef(Math.floor(Math.random() * 1000));
  const [error, showErrorMessage] = useErrorMessage("");
  const handleClickRoomCard = () => {
    if (status === "Enter") {
      return onClick();
    }

    showErrorMessage("입장이 불가능합니다.");
  };

  useEffect(() => {
    roomNumberRef.current = Math.floor(Math.random() * 1000);
  }, [gameTitle]);

  return (
    <>
      {error.length > 0 && <ErrorMessage error={error} />}
      <GameRoomCardContainer onClick={handleClickRoomCard}>
        <GameRoomData>
          {gameTitle} &nbsp;
          {roomNumberRef.current}
          <br />
          Players: {players.length}
          <br />
          {createdAt.slice(0, 16)}
        </GameRoomData>
        {status === "Full" ? (
          <GameRoomStatus color="#e74c3c">{status}</GameRoomStatus>
        ) : (
          <GameRoomStatus color="#0984e3">{status}</GameRoomStatus>
        )}
      </GameRoomCardContainer>
    </>
  );
};

export default GameRoomCard;
