import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import EnergyBattleFrame from "../EnergyBattleFrame/EnergyBattleFrame";
import GameResult from "../GameResult/GameResult";
import PlayerCard from "../PlayerCard/PlayerCard";
import { USER_SERVER } from "../../constants/constants";
import { v4 as uuidv4 } from "uuid";
import GameOption from "../GameOption/GameOption";

const socket = io(USER_SERVER, {
  withCredential: true,
});

// 향후 로그인 구축 완료되면 playerData에서 가져와야 함
const playerIdMock = uuidv4();
const canvasWidth = document.body.clientWidth * 0.8;
const canvasHeight = document.body.clientWidth * 0.6;

const EnergyBattle = (props) => {
  const { playerData } = useSelector((state) => state.authReducer);
  const [otherPlayer, setOtherPlayer] = useState(null);
  const param = useParams();
  const gameElementRef = useRef({});
  console.log(socket);

  useEffect(() => {
    socket.emit("join-room", param.roomId, {
      // 내 정보 보내서 상대방한테 알리기
      _id: playerIdMock,
    });

    socket.on("user-connected", (data) => {
      // userName 받아서 내 화면에 띄우기
      console.log("user-connected");
      setOtherPlayer(data);
      console.log(data);
    });

    socket.on("input-other-player", (data) => {
      if (data.playerData.playerId !== playerIdMock) {
        // data: {playerId, value}
        console.log("input-other-player");
        console.log(data);
      }
    });

    socket.on("user-disconnected", (data) => {
      // 해당 사용자가 나가면 내 화면에서 없애기
      console.log("user-disconnected");
      setOtherPlayer(null);
      console.log(data);
    });

    return () => {
      socket.emit("leave-room");
      socket.off("user-connected");
      socket.off("input-other-player");
      socket.off("user-disconnected");
    };
  }, [param.roomId]);

  return (
    <div>
      <GameOption />
      <div>Energy Battle</div>
      <div>
        <PlayerCard player={playerData} />
        {otherPlayer ? <button>게임시작</button> : <button>대기중</button>}
        {otherPlayer && <PlayerCard player={otherPlayer} />}
      </div>
      <canvas />
      <input
        type="text"
        onChange={(e) =>
          socket.emit("input-player", {
            playerData: {
              _id: playerIdMock,
            },
            input: e.target.value,
          })
        }
      />
      <GameResult />
    </div>
  );
};

export default EnergyBattle;
