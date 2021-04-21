import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import styled from "styled-components";

import EnergyBattleFrame from "../EnergyBattleFrame/EnergyBattleFrame";
import GameResult from "../GameResult/GameResult";
import PlayerCard from "../PlayerCard/PlayerCard";
import { USER_SERVER, ENERGY_BATTLE_FULL } from "../../constants/constants";
import {
  joinRoomDB,
  leaveRoomDB,
  deleteRoomDB,
  changeRoomStatus,
} from "../../actions/actionCreators";
import useMultiPlay from "../../hooks/useMultiPlay";
import GameOption from "../GameOption/GameOption";

const socket = io(USER_SERVER, {
  withCredential: true,
});

const GameTitle = styled.h1`
  margin: 0;
  margin-bottom: 2vh;
  width: 100%;
  text-align: center;
`;

const OperationContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 60%;
  height: 5vh;
  margin: 0 auto;
`;

const StartButton = styled.button``;

const Canvas = styled.canvas`
  margin: 0 auto;
  display: block;
  margin-top: 10px;
  background-color: skyblue;
`;

const EnergyBattle = (props) => {
  const [otherPlayer, setOtherPlayer] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const location = useLocation();
  const history = useHistory();

  const gameElementRef = useRef({});
  const roomData = useSelector((state) => state.roomReducer);
  const { playerData } = useSelector((state) => state.authReducer);

  const gameTitle = location.pathname.split("/")[2];
  const roomId = param.roomId;
  const creater = location.state;
  const currentRoom = roomData[gameTitle].filter(
    (room) => room.roomId === roomId
  )[0];

  useEffect(() => {
    if (!creater) {
      dispatch(joinRoomDB(gameTitle, roomId, playerData));
      setOtherPlayer(currentRoom?.players[0]);
    }

    socket.emit("join-room", roomId, playerData, creater);

    socket.on("player-connected", (data) => {
      if (data.playerData.playerId !== playerData.playerId) {
        setOtherPlayer(data.playerData);
      }
      console.log(data.socketList);

      if (data.socketList.length >= ENERGY_BATTLE_FULL) {
        dispatch(changeRoomStatus(gameTitle, roomId, "Full"));
      }
    });

    socket.on("input-other-player", (data) => {
      if (data.playerData.playerId !== playerData.playerId) {
        // data: {playerId, value}
        console.log("input-other-player");
        console.log(data);
      }
    });

    socket.on("player-disconnected", () => {
      dispatch(changeRoomStatus(gameTitle, roomId, "Enter"));
      setOtherPlayer(null);
    });

    socket.on("creater-disconnected", () => {
      dispatch(deleteRoomDB(gameTitle, roomId));
      setTimeout(() => {
        history.push({
          pathname: `/games/${gameTitle}`,
          state: "방장이 퇴장하였습니다.",
        });
      }, 200);
    });

    return () => {
      if (!creater) {
        dispatch(leaveRoomDB(gameTitle, roomId, playerData));
        socket.emit("leave-player");
      } else {
        console.log("leave-creater");
        dispatch(deleteRoomDB(gameTitle, roomId, playerData));
        socket.emit("leave-creater");
      }

      socket.off("player-connected");
      socket.off("input-other-player");
      socket.off("player-disconnected");
      socket.off("creater-disconnected");
    };
  }, [dispatch, playerData, gameTitle, history, roomId, creater]);

  return (
    <div>
      <div>
        <button onClick={() => history.push(`/games/${gameTitle}`)}>
          나가기
        </button>
        <GameOption />
      </div>
      <GameTitle>Energy Battle</GameTitle>
      <OperationContainer>
        <PlayerCard player={playerData} />
        {otherPlayer ? <button>게임시작</button> : <button>대기중</button>}
        <PlayerCard player={otherPlayer} />
      </OperationContainer>
      <Canvas width="1000" height="600" />
      <div>
        <input
          type="text"
          onChange={(e) =>
            socket.emit("input-player", {
              playerData,
              input: e.target.value,
            })
          }
        />
      </div>
      <GameResult />
    </div>
  );
};

export default EnergyBattle;
