import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useImage from "../../hooks/useImage";

import EnergyBattleFrame from "../EnergyBattleFrame/EnergyBattleFrame";
import GameResult from "../GameResult/GameResult";
import CHARACTERS from "../../images/energyBattle/characters/characters";

import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";
import wait from "../../utils/wait";

const canvasWidth = document.body.clientWidth * 0.9;
const canvasHeight = document.body.clientWidth * 0.5;

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

const EnergyBattle = ({ socket, player, otherPlayers }) => {
  const [stream, setStream] = useState({});
  const [volumeMeter, setVolumeMeter] = useState({});
  const [isPlay, setIsPlay] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isStartDisabled, setIsStartDisabled] = useState(false);
  const [counter, setCounter] = useState("");

  const [myCharacter, setMyCharacter] = useState(null);
  const [otherCharacter, setOtherCharacter] = useState(null);
  const [skillEffect, setSkillEffect] = useState(null);

  const history = useHistory();

  useImage(CHARACTERS.myCharacter, setMyCharacter);
  useImage(CHARACTERS.otherCharacter, setOtherCharacter);
  useImage(CHARACTERS.skillEffect, setSkillEffect);

  const playGame = useCallback(async () => {
    setIsStartDisabled(true);

    const mediaStream = await getMedia({ audio: true });
    const volumeMeter = new VolumeMeter(mediaStream, {
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

    setStream(mediaStream);
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

    setIsPlay(false);
    setIsStartDisabled(false);
    setStream({});
    setVolumeMeter({});

    mediaStream.getTracks()[0].stop();
  }, []);

  const startGame = useCallback(async () => {
    if (!isStartDisabled && isReady) {
      socket.emit("start-game");
      playGame();
    }
  }, [isReady, isStartDisabled, playGame, socket]);

  useEffect(() => {
    console.log(myCharacter);
    if (myCharacter && otherCharacter && skillEffect) {
      setIsReady(true);
    }

    socket.on("start-by-other", playGame);

    return () => {
      socket.off("start-by-other");
    };
  }, [myCharacter, otherCharacter, playGame, skillEffect, socket]);

  return (
    <div>
      <div>
        <button onClick={() => history.push(`/games/energyBattle`)}>
          나가기
        </button>
        <span>{player.name}</span>
        {otherPlayers.map((player) => (
          <span key={player._id}>{player.name}</span>
        ))}
        {counter.length > 0 && <h1>{counter}</h1>}
      </div>
      <GameTitle>Energy Battle</GameTitle>
      <OperationContainer>
        <button onClick={startGame}>게임시작</button>
      </OperationContainer>
      <EnergyBattleFrame
        socket={socket}
        stream={stream}
        volumeMeter={volumeMeter}
        isPlay={isPlay}
        isReady={isReady}
        player={player}
        myCharacter={myCharacter}
        otherCharacter={otherCharacter}
        skillEffect={skillEffect}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />
      <GameResult />
    </div>
  );
};

export default EnergyBattle;
