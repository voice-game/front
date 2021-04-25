import React, { useState, useEffect, useCallback, useRef } from "react";
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

const GameTitle = styled.h1`
  /* font-family: "Assistant", sans-serif; */
  font-family: "Carter One", cursive;
  /* font-family: "Slackey", cursive; */
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

  const [myCharacter, setMyCharacter] = useState(null);
  const [otherCharacter, setOtherCharacter] = useState(null);
  const [skillEffect, setSkillEffect] = useState(null);
  const [pads, setPads] = useState(null);

  const playerAvatar = useRef(null);
  const otherAvatar = useRef(null);
  const pad = useRef(null);
  const skill = useRef(null);
  const canvasWidth = useRef(document.body.clientWidth * 0.9);
  const canvasHeight = useRef(document.body.clientWidth * 0.5);

  useImage(CHARACTERS.myCharacter, setMyCharacter);
  useImage(CHARACTERS.otherCharacter, setOtherCharacter);
  useImage(CHARACTERS.skillEffect, setSkillEffect);
  useImage(CHARACTERS.pads, setPads);

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

    await wait(3000);
    setRoomStatus("ready");
    setCounter("");
  }, []);

  const startGame = useCallback(async () => {
    if ((roomStatus === "ready" || roomStatus === "end") && !isStartDisabled) {
      socket.emit("start-game");
      playGame();
    }
  }, [isStartDisabled, playGame, roomStatus, socket]);

  useEffect(() => {
    canvasWidth.current = document.body.clientWidth * 0.9;
    canvasHeight.current = document.body.clientWidth * 0.5;

    if (myCharacter && otherCharacter && skillEffect && pads) {
      playerAvatar.current = new PlayerAvatar(
        myCharacter,
        canvasWidth.current,
        canvasHeight.current
      );
      otherAvatar.current = new OtherAvatar(
        otherCharacter,
        canvasWidth.current,
        canvasHeight.current
      );
      pad.current = new Pads(pads, canvasWidth.current, canvasHeight.current);
      skill.current = new SkillEffect(
        skillEffect,
        canvasWidth.current,
        canvasHeight.current
      );

      if (otherPlayers && otherPlayers.length === 0) {
        setRoomStatus("waiting");
      } else {
        setRoomStatus("ready");
      }
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
      <div></div>
      <GameTitle>Energy Battle</GameTitle>
      <OperationContainer>
        <div>
          <span>{player.name}</span>
        </div>
        {counter.length > 0 ? (
          <h1>{counter}</h1>
        ) : (
          <button onClick={startGame}>게임시작</button>
        )}
        <div>
          {otherPlayers &&
            otherPlayers.map((player) => (
              <span key={player._id}>{player.name}</span>
            ))}
        </div>
      </OperationContainer>
      <EnergyBattleFrame
        socket={socket}
        volumeMeter={volumeMeter}
        roomStatus={roomStatus}
        playerAvatar={playerAvatar.current}
        otherAvatar={otherAvatar.current}
        pad={pad.current}
        skill={skill.current}
        canvasWidth={canvasWidth.current}
        canvasHeight={canvasHeight.current}
      />
      <GameResult />
    </div>
  );
};

export default EnergyBattle;
