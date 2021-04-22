import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import GameOption from "../GameOption/GameOption";
import EnergyBattleFrame from "../EnergyBattleFrame/EnergyBattleFrame";
import GameResult from "../GameResult/GameResult";
import PlayerCard from "../PlayerCard/PlayerCard";

import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";
import wait from "../../utils/wait";
import { USER_SERVER, MAX_PLAYER } from "../../constants/constants";

const canvasWidth = document.body.clientWidth * 0.9;
const canvasHeight = document.body.clientWidth * 0.6;

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

const EnergyBattle = ({ socket, creater, player, otherPlayers }) => {
  const [stream, setStream] = useState({});
  const [volumeMeter, setVolumeMeter] = useState({});
  const [isPlay, setIsPlay] = useState(false);
  const [isStartDisabled, setIsStartDisabled] = useState(false);
  const [counter, setCounter] = useState("");

  const history = useHistory();

  const togglePlaying = () => {
    const next = !isPlay;
    setIsPlay(next);
  };

  const playGame = useCallback(async () => {
    setIsStartDisabled(true);

    const stream = await getMedia({ audio: true });
    const volumeMeter = new VolumeMeter(stream, {
      bufferSize: 2048,
      minDecibels: -60,
      maxDecibels: -30,
      timeConstant: 0.9,
    });

    setCounter("3");
    await wait(1000);
    setCounter("2");
    await wait(1000);
    setCounter("1");
    await wait(1000);
    setCounter("START");

    setStream(stream);
    setVolumeMeter(volumeMeter);
    setIsPlay(true);

    await wait(5000);

    setCounter("3");
    await wait(1000);
    setCounter("2");
    await wait(1000);
    setCounter("1");
    await wait(1000);
    setCounter("END");
    await wait(1000);

    setIsPlay(false);
    setIsStartDisabled(false);
    setStream({});
    setVolumeMeter({});
  }, []);

  const startGame = useCallback(async () => {
    if (isStartDisabled) {
      return;
    }

    socket.emit("start-game");
    playGame();
  }, []);

  useEffect(() => {
    socket.on("start-by-other", playGame);

    return () => {
      socket.off("start-by-other");
    };
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => history.push(`/games/energyBattle`)}>
          나가기
        </button>
        <button onClick={togglePlaying}>토글</button>
        <span>{player.name}</span>
        {otherPlayers.map((player) => (
          <span key={player._id}>{player.name}</span>
        ))}
        <h1>{counter}</h1>
      </div>
      <GameTitle>Energy Battle</GameTitle>
      <OperationContainer>
        <button onClick={startGame}>게임시작</button>
      </OperationContainer>
      <EnergyBattleFrame
        stream={stream}
        socket={socket}
        volumeMeter={volumeMeter}
        isPlay={isPlay}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />
      <GameResult />
    </div>
  );
};

export default EnergyBattle;
