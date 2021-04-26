import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import GameOption from "../GameOption/GameOption";

import GameRoomCard from "../GameRoomCard/GameRoomCard";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import useErrorMessage from "../../hooks/useErrorMessage";
import useEnterRandom from "../../hooks/useEnterRoom";
import useFetchRooms from "../../hooks/useFetchRoom";
import useCreateRoom from "../../hooks/useCreateRoom";

const GameTitle = styled.h1`
  margin: 0;
  margin-bottom: 2vh;
  width: 100%;
  font-size: 3rem;
  text-align: center;
  text-transform: uppercase;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const GameRoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 2vh;
  row-gap: 2vw;
  margin-top: 30px;
  padding: 30px;
`;
const NewRoomButton = styled.button`
  background-color: #1e90ff;
  margin-right: 10px;
`;
const EnterRandomButton = styled.button`
  background-color: #27ae60;
  margin-left: 10px;
`;

const GameRoomList = () => {
  const history = useHistory();
  const location = useLocation();
  const gameTitle = location.pathname.split("/")[2];

  const player = useSelector((state) => state.authReducer.playerData);
  const roomList = useSelector((state) => state.roomReducer[gameTitle]);
  const [error, showErrorMessage] = useErrorMessage("");

  const enterRandom = useEnterRandom(gameTitle, showErrorMessage);
  const createRoom = useCreateRoom(gameTitle, player);

  useFetchRooms(gameTitle, showErrorMessage);

  return (
    <>
      {error.length > 0 && <ErrorMessage error={error} />}
      <GameOption />
      <GameTitle>{gameTitle}</GameTitle>
      <ButtonContainer>
        <NewRoomButton onClick={createRoom}>New Room</NewRoomButton>
        <EnterRandomButton onClick={enterRandom}>
          Enter Random
        </EnterRandomButton>
      </ButtonContainer>
      <GameRoomGrid>
        {roomList &&
          roomList.map((room) => {
            return (
              <GameRoomCard
                key={room.roomId}
                onClick={() =>
                  history.push(`${location.pathname}/${room.roomId}`)
                }
                room={room}
              />
            );
          })}
      </GameRoomGrid>
    </>
  );
};
export default GameRoomList;
