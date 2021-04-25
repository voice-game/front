import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import EnergyBattleFrame from "../EnergyBattleFrame/EnergyBattleFrame";
import GameResult from "../GameResult/GameResult";

import PlayerAvatar from "../../games/energyBattle/PlayerAvatar";
import OtherAvatar from "../../games/energyBattle/OtherAvatar";
import Pads from "../../games/energyBattle/Pads";
import SkillEffect from "../../games/energyBattle/SkillEffect";

import useImage from "../../hooks/useImage";
import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";
import wait from "../../utils/wait";
import CHARACTERS from "../../images/energyBattle/characters/characters";

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
  const [volumeMeter, setVolumeMeter] = useState({});
  const [roomStatus, setRoomStatus] = useState("");
  const [isStartDisabled, setIsStartDisabled] = useState(false);
  const [counter, setCounter] = useState("");

  const playerAvatar = useRef(null);
  const otherAvatar = useRef(null);
  const pad = useRef(null);
  const skill = useRef(null);

  const history = useHistory();

  const myCharacter = useImage(CHARACTERS.myCharacter);
  const otherCharacter = useImage(CHARACTERS.otherCharacter);
  const skillEffect = useImage(CHARACTERS.skillEffect);
  const pads = useImage(CHARACTERS.pads);

  const playGame = useCallback(async () => {
    setIsStartDisabled(true);
    setRoomStatus("ready");

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

    setVolumeMeter(volumeMeter);
    setRoomStatus("start");

    await wait(5000);

    setCounter("3");
    await wait(1000);
    setCounter("2");
    await wait(1000);
    setCounter("1");
    await wait(1000);
    setCounter("END");

    setRoomStatus("end");
    setIsStartDisabled(false);
    setVolumeMeter({});

    mediaStream.getTracks()[0].stop();
  }, []);

  const startGame = useCallback(async () => {
    if ((roomStatus === "ready" || roomStatus === "end") && !isStartDisabled) {
      socket.emit("start-game");
      playGame();
    }
  }, [isStartDisabled, playGame, roomStatus, socket]);

  useEffect(() => {
    if (myCharacter && otherCharacter && skillEffect && pads) {
      playerAvatar.current = new PlayerAvatar(
        myCharacter,
        canvasWidth,
        canvasHeight
      );
      otherAvatar.current = new OtherAvatar(
        otherCharacter,
        canvasWidth,
        canvasHeight
      );
      pad.current = new Pads(pads, canvasWidth, canvasHeight);
      skill.current = new SkillEffect(skillEffect, canvasWidth, canvasHeight);

      if (otherPlayers && otherPlayers.length === 0) {
        setRoomStatus("waiting");
      }
      setRoomStatus("ready");
    }

    socket.on("start-by-other", playGame);

    return () => {
      socket.off("start-by-other");
    };
  }, [
    myCharacter,
    otherCharacter,
    otherPlayers,
    pads,
    playGame,
    skillEffect,
    socket,
  ]);

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
        volumeMeter={volumeMeter}
        roomStatus={roomStatus}
        playerAvatar={playerAvatar.current}
        otherAvatar={otherAvatar.current}
        pad={pad.current}
        skill={skill.current}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />
      <GameResult />
    </div>
  );
};

export default EnergyBattle;
