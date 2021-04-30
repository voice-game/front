/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import GameOption from "../GameOption/GameOption";
import EnergyBattleContainer from "../EnergyBattleContainer/EnergyBattleContainer";
import MonsterEscapeContainer from "../MonsterEscapeContainer/MonsterEscapeContainer";
import LittleForestContainer from "../LittleForestContainer/LittleForestContainer";

import useSetInitialRoom from "../../hooks/useSetInitialRoom";
import useImageLoad from "../../hooks/useImageLoad";

import {
  leaveRoomAction,
  deleteRoomAction,
  changeRoomStatus,
} from "../../actions/gameActionCreators";
import { MAX_PLAYER } from "../../constants/constants";

const socket = io(process.env.REACT_APP_USER_SERVER, {
  withCredential: true,
});

const GameRoom = () => {
  const [otherPlayers, setOtherPlayers] = useState([]);

  const dispatch = useDispatch();
  const param = useParams();
  const location = useLocation();
  const history = useHistory();

  const roomData = useSelector((state) => state.roomReducer);
  const { playerData } = useSelector((state) => state.authReducer);

  const gameTitle = location.pathname.split("/")[2];
  const roomId = param.roomId;
  const currentRoom = roomData[gameTitle].filter(
    (room) => room.roomId === roomId
  )[0];

  const setInitialRoom = useSetInitialRoom(socket, setOtherPlayers);
  useImageLoad("gameManuals");

  const handlePlayerConnect = useCallback((data) => {
    if (data.playerData.playerId !== playerData.playerId) {
      setOtherPlayers([...otherPlayers, data.playerData]);
    }

    if (data.socketList.length >= MAX_PLAYER[gameTitle]) {
      dispatch(changeRoomStatus(gameTitle, roomId, "Full"));
    }
  }, []);

  const handleOtherDisconnect = useCallback((playerData) => {
    if (playerData._id === currentRoom?.createdBy) {
      history.push({
        pathname: `/games/${gameTitle}`,
        state: "방장이 퇴장하였습니다.",
      });
    } else {
      const updatedPlayers = otherPlayers.filter(
        (player) => player._id !== playerData._id
      );

      dispatch(changeRoomStatus(gameTitle, roomId, "Enter"));
      setOtherPlayers(updatedPlayers);
    }
  }, []);

  const handlePlayerLeave = useCallback(async () => {
    if (playerData._id === currentRoom?.createdBy) {
      await dispatch(deleteRoomAction(gameTitle, roomId, playerData));
    } else {
      dispatch(leaveRoomAction(gameTitle, roomId, playerData));
      history.push(`/games/${gameTitle}`);
    }
  }, []);

  useEffect(() => {
    setInitialRoom();
    if (gameTitle === "littleForest") {
      dispatch(changeRoomStatus(gameTitle, roomId, "Full"));
    }
  }, [setInitialRoom]);

  useEffect(() => {
    socket.on("player-connected", handlePlayerConnect);
    socket.on("player-disconnected", handleOtherDisconnect);

    return () => {
      socket.emit("leave-player", playerData);
      socket.off("player-connected");
      socket.off("player-disconnected");
      handlePlayerLeave();
    };
  }, []);

  return (
    <>
      <GameOption />
      {gameTitle === "energyBattle" && (
        <EnergyBattleContainer
          socket={socket}
          roomId={roomId}
          roomNumber={currentRoom?.roomNumber}
          player={playerData}
          otherPlayers={otherPlayers}
        />
      )}
      {gameTitle === "monsterEscape" && (
        <MonsterEscapeContainer
          socket={socket}
          roomId={roomId}
          player={playerData}
          otherPlayers={otherPlayers}
        />
      )}
      {gameTitle === "littleForest" && (
        <LittleForestContainer
          socket={socket}
          creater={currentRoom?.createdBy}
          player={playerData}
          otherPlayers={otherPlayers}
        />
      )}
    </>
  );
};

export default GameRoom;
