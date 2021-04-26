import React, { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Pusher from "pusher-js";

import GameOption from "../GameOption/GameOption";
import GameRoomCard from "../GameRoomCard/GameRoomCard";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../shared/Button/Button";
import useErrorMessage from "../../hooks/useErrorMessage";
import {
  fetchRoomsAction,
  createRoomAction,
} from "../../actions/actionCreators";
import pickRandomRoom from "../../utils/pickRandomRoom";

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

// const NewRoomButton = styled.button`
//   background-color: #1e90ff;
//   margin-right: 10px;
// `;

// const EnterRandomButton = styled.button`
//   background-color: #27ae60;
//   margin-left: 10px;
// `;

const GameRoomList = () => {
  const history = useHistory();
  const location = useLocation();
  const gameTitle = location.pathname.split("/")[2];

  const dispatch = useDispatch();
  const player = useSelector((state) => state.authReducer.playerData);
  const roomList = useSelector((state) => state.roomReducer[gameTitle]);

  const [error, showErrorMessage] = useErrorMessage("");

  const fetchRooms = useCallback(() => {
    dispatch(fetchRoomsAction(gameTitle));
  }, [dispatch, gameTitle]);

  const createRoom = useCallback(async () => {
    const newRoomId = uuidv4();

    await dispatch(createRoomAction(gameTitle, newRoomId, player._id));

    history.push(`${location.pathname}/${newRoomId}`);
  }, [history, location.pathname, dispatch, gameTitle, player]);

  const enterRandom = useCallback(() => {
    const picked = pickRandomRoom(roomList);

    if (!picked) {
      showErrorMessage("입장 가능한 방이 없습니다.");
    } else {
      history.push(`${location.pathname}/${picked.roomId}`);
    }
  }, [history, location.pathname, roomList, showErrorMessage]);

  useEffect(() => {
    if (location.state) {
      showErrorMessage(location.state);
      location.state = null;
    }

    fetchRooms(gameTitle);

    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: "ap3",
    });
    const channel = pusher.subscribe("rooms");

    channel.bind("changed", () => {
      fetchRooms(gameTitle);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [fetchRooms, location, gameTitle, showErrorMessage]);

  return (
    <>
      {error.length > 0 && <ErrorMessage error={error} />}
      <GameOption />
      <GameTitle>{gameTitle}</GameTitle>
      <ButtonContainer>
        <Button
          onClick={createRoom}
          margin={["0px", "10px", "0px", "0px"]}
          bgColor={"#1e90ff"}
        >
          New Room
        </Button>
        <Button
          onClick={enterRandom}
          margin={["0px", "0px", "0px", "10px"]}
          bgColor={"#27ae60"}
        >
          Enter Random
        </Button>
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
