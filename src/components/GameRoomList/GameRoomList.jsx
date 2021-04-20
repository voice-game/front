import React, { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Pusher from "pusher-js";

import GameRoomCard from "../GameRoomCard/GameRoomCard";
import GameOption from "../GameOption/GameOption";
import { fetchRoomsDB, createRoomDB } from "../../actions/actionCreators";
import pickRandomRoom from "../../utils/pickRandomRoom";
import useErrorMessage from "../../hooks/useErrorMessage";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const GameRoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 2vh;
  row-gap: 2vw;
  margin-top: 30px;
  padding: 30px;
`;

const GameRoomList = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const gameTitle = location.pathname.split("/")[2];
  const player = useSelector((state) => state.authReducer.playerData);
  const roomList = useSelector((state) => state.roomReducer[gameTitle]);
  const [error, showErrorMessage] = useErrorMessage("");

  const fetchRooms = useCallback(() => {
    dispatch(fetchRoomsDB(gameTitle));
  }, [dispatch, gameTitle]);

  const createRoom = useCallback(() => {
    const newRoomId = uuidv4();
    console.log(newRoomId);

    history.push({
      pathname: `${location.pathname}/${newRoomId}`,
      state: player,
    });
    dispatch(createRoomDB(gameTitle, newRoomId, player._id));
  }, [history, location.pathname, dispatch, gameTitle, player]);

  useEffect(() => {
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
  }, [fetchRooms, gameTitle]);

  const enterRandom = useCallback(() => {
    const picked = pickRandomRoom(roomList);

    if (!picked) {
      showErrorMessage("입장 가능한 방이 없습니다.");
    } else {
      history.push(`${location.pathname}/${picked._id}`);
    }
  }, [history, location.pathname, roomList, showErrorMessage]);

  return (
    <div>
      {error.length > 0 && <ErrorMessage error={error} />}
      <div>Game Room List</div>
      <div>
        <button onClick={createRoom}>방만들기</button>
        <button onClick={enterRandom}>랜덤입장</button>
      </div>
      <GameOption />
      <GameRoomGrid>
        {roomList.map((room) => {
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
    </div>
  );
};

export default GameRoomList;
