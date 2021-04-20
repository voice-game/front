import React, { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import GameRoomCard from "../GameRoomCard/GameRoomCard";
import GameOption from "../GameOption/GameOption";
import { fetchRoomsDB, createRoomDB } from "../../actions/actionCreators";

const mockRoomData = [
  {
    _id: uuidv4(),
    players: [
      {
        _id: uuidv4(),
        email: "player1@gmail.com",
        gameRecord: {
          energyBattle: 4,
        },
      },
      {
        _id: uuidv4(),
        email: "player2@gmail.com",
        gameRecord: {
          energyBattle: 3,
        },
      },
    ],
    cretedBy: {
      _id: uuidv4(),
      email: "player1@gmail.com",
      gameRecord: {
        energyBattle: 4,
      },
    },
    createdAt: Date.now(),
    status: "Playing",
  },
  {
    _id: uuidv4(),
    players: [
      {
        _id: uuidv4(),
        email: "player3@gmail.com",
        gameRecord: {
          energyBattle: 0,
        },
      },
    ],
    cretedBy: {
      _id: uuidv4(),
      email: "player3@gmail.com",
      gameRecord: {
        energyBattle: 0,
      },
    },
    createdAt: Date.now(),
    status: "Join",
  },
  {
    _id: uuidv4(),
    players: [
      {
        _id: uuidv4(),
        email: "player4@gmail.com",
        gameRecord: {
          energyBattle: 17,
        },
      },
      {
        _id: uuidv4(),
        email: "player5@gmail.com",
        gameRecord: {
          energyBattle: 4,
        },
      },
    ],
    cretedBy: {
      _id: uuidv4(),
      email: "player4@gmail.com",
      gameRecord: {
        energyBattle: 17,
      },
    },
    createdAt: Date.now(),
    status: "Full",
  },
  {
    _id: uuidv4(),
    players: [
      {
        _id: uuidv4(),
        email: "player6@gmail.com",
        gameRecord: {
          energyBattle: 3,
        },
      },
    ],
    cretedBy: {
      _id: uuidv4(),
      email: "player6@gmail.com",
      gameRecord: {
        energyBattle: 3,
      },
    },
    createdAt: Date.now(),
    status: "Join",
  },
];

const GameRoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 2vh;
  row-gap: 2vw;
  margin-top: 30px;
  padding: 30px;
`;

const GameRoomList = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const gameTitle = location.pathname.slice(7);
  const player = useSelector((state) => state.authReducer.playerData);
  const roomList = useSelector((state) => state.gameReducer[gameTitle]);

  const fetchRooms = useCallback(() => {
    dispatch(fetchRoomsDB(gameTitle));
  }, [dispatch, gameTitle]);

  const createRoom = useCallback(() => {
    const newRoomId = uuidv4();

    dispatch(createRoomDB(gameTitle, newRoomId, player._id));
    history.push(`${location.pathname}/${newRoomId}`);
  }, [history, location.pathname, dispatch, gameTitle, player._id]);

  useEffect(() => {
    fetchRooms(gameTitle);
  }, [fetchRooms, gameTitle]);

  const enterRandom = useCallback(() => {}, []);

  return (
    <div>
      <div>Game Room List</div>
      <div>
        <button onClick={createRoom}>방만들기</button>
        <button onClick={enterRandom}>랜덤입장</button>
      </div>
      <GameOption />
      <GameRoomGrid>
        {mockRoomData.map((data) => (
          <GameRoomCard
            key={data._id}
            onClick={() => history.push(`${location.pathname}/${data._id}`)}
            roomData={data}
          />
        ))}
        {roomList.map((room) => (
          <GameRoomCard
            key={room.roomId}
            onClick={() => history.push(`${location.pathname}/${room._id}`)}
            roomData={room}
          />
        ))}
      </GameRoomGrid>
    </div>
  );
};

export default GameRoomList;
