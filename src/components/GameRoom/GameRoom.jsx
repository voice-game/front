import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import GameOption from "../GameOption/GameOption";
import { USER_SERVER, MAX_PLAYER } from "../../constants/constants";
import {
  joinRoomAction,
  leaveRoomAction,
  deleteRoomAction,
  changeRoomStatus,
} from "../../actions/actionCreators";
import EnergyBattle from "../EnergyBattle/EnergyBattle";

const socket = io(USER_SERVER, {
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

  const setInitialRoomSet = useCallback(() => {
    socket.emit("join-room", roomId, playerData);

    if (currentRoom?.createdBy !== playerData._id) {
      dispatch(joinRoomAction(gameTitle, roomId, playerData));

      const existingPlayers = currentRoom?.players.filter(
        (player) => player.playerId !== playerData.playerId
      );

      setOtherPlayers(existingPlayers);
    }
  }, []);

  const handlePlayerConnect = useCallback((data) => {
    if (data.playerData.playerId !== playerData.playerId) {
      setOtherPlayers([...otherPlayers, data.playerData]);
    }

    if (data.socketList.length >= MAX_PLAYER[gameTitle]) {
      dispatch(changeRoomStatus(gameTitle, roomId, "Full"));
    }
  }, []);

  const handlePlayerDisconnect = useCallback(async (playerData) => {
    if (playerData._id === currentRoom?.createdBy) {
      history.push({
        pathname: `/games/${gameTitle}`,
        state: "방장이 퇴장하였습니다.",
      });
    } else {
      await dispatch(changeRoomStatus(gameTitle, roomId, "Enter"));
      const updatedPlayers = otherPlayers.filter(
        (player) => player._id !== playerData._id
      );
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
    setInitialRoomSet();
  }, [setInitialRoomSet]);

  useEffect(() => {
    socket.on("player-connected", handlePlayerConnect);
    socket.on("player-disconnected", handlePlayerDisconnect);

    return () => {
      socket.emit("leave-player", playerData);
      socket.off("player-connected");
      socket.off("input-other-player");
      socket.off("player-disconnected");
      handlePlayerLeave();
    };
  }, []);

  return (
    <>
      <GameOption />
      {gameTitle === "energyBattle" && (
        <EnergyBattle
          socket={socket}
          creater={currentRoom?.createdBy}
          player={playerData}
          otherPlayers={otherPlayers}
        />
      )}
      {gameTitle === "monsterEscape" && (
        <EnergyBattle
          socket={socket}
          creater={currentRoom?.createdBy}
          player={playerData}
          otherPlayers={otherPlayers}
        />
      )}
      {gameTitle === "roadRoller" && (
        <EnergyBattle
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