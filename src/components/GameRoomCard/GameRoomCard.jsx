import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const GameRoomCardContainer = styled.div`
  position: relative;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 400;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  cursor: pointer;
`;

const GameRoomStatus = styled.div`
  position: absolute;
  bottom: 10%;
  right: 10%;
`;

const GameRoomCard = ({
  roomData: { _id, players, createdBy, createdAt, isPlaying },
  onClick,
}) => {
  return (
    <GameRoomCardContainer onClick={onClick}>
      <div>{_id}</div>
      <div>
        <div>참여자</div>
        {players.map((player) => (
          <div key={player._id}>{player.email}</div>
        ))}
      </div>
      <div>
        <div>아이콘</div>
        <div>{players.length}</div>
      </div>
      <GameRoomStatus>{isPlaying ? "게임중" : "입장가능"}</GameRoomStatus>
    </GameRoomCardContainer>
  );
};

export default GameRoomCard;
