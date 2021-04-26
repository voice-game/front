import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { changeRoomStatus, deleteRoomAction, leaveRoomAction } from "../actions/actionCreators";

import { MAX_PLAYER } from "../constants/constants";

const usePlayerConnection = (otherPlayers, updateOtherPlayers) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const param = useParams();
  const history = useHistory();

  const roomData = useSelector((state) => state.roomReducer);
  const { playerData } = useSelector((state) => state.authReducer);

  const gameTitle = location.pathname.split("/")[2];
  const roomId = param.roomId;
  const currentRoom = roomData[gameTitle].filter(
    (room) => room.roomId === roomId
  )[0];

  const handlePlayerConnect = useCallback((data) => {
    if (data.playerData.playerId !== playerData.playerId) {
      updateOtherPlayers([...otherPlayers, data.playerData]);
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
      updateOtherPlayers(updatedPlayers);
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

  return { handlePlayerConnect, handlePlayerDisconnect, handlePlayerLeave };
};

export default usePlayerConnection;
