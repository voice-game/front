import React, { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import GameRoomCard from "../GameRoomCard/GameRoomCard";
import GameOption from "../GameOption/GameOption";

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
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = useCallback(() => {});

  const createRoom = useCallback(() => {
    // new Room Logic
    history.push(`${location.pathname}/${uuidv4()}`);
  }, [history, location.pathname]);

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
      </GameRoomGrid>
    </div>
  );
};

export default GameRoomList;
