/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";

import EnergyBattleFrame from "../EnergyBattleFrame/EnergyBattleFrame";

import PlayerAvatar from "../../games/energyBattle/PlayerAvatar";
import OtherAvatar from "../../games/energyBattle/OtherAvatar";
import Pads from "../../games/energyBattle/Pads";
import SkillEffect from "../../games/energyBattle/SkillEffect";

import useImage from "../../hooks/useImage";
import CHARACTERS from "../../games/energyBattle/CHARACTERS";
import { ROOM_STATUS } from "../../constants/constants";
import usePlayEnergyBattle from "../../hooks/usePlayEnergyBattle";

const GameTitle = styled.h1`
  margin: 0;
  margin-bottom: 2vh;
  width: 100%;
  font-size: 3rem;
  text-align: center;
`;

const OperationContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 5vh;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const PlayerDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  width: 14vw;
  min-width: 180px;
  height: 8vh;
`;

const PlayerData = styled.span`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  display: block;
  color: black;
`;

const EnergyBattle = ({ socket, roomId, player, otherPlayers }) => {
  const [roomStatus, setRoomStatus] = useState("");
  const [isStartDisabled, setIsStartDisabled] = useState(false);

  const playerAvatar = useRef(null);
  const otherAvatar = useRef(null);
  const pad = useRef(null);
  const resultImage = useRef(null);
  const skill = useRef(null);
  const canvasWidth = useRef(document.body.clientWidth * 0.8);
  const canvasHeight = useRef(document.body.clientWidth * 0.4);

  const myCharacter = useImage(CHARACTERS.myCharacter);
  const otherCharacter = useImage(CHARACTERS.otherCharacter);
  const skillEffect = useImage(CHARACTERS.skillEffect);
  const pads = useImage(CHARACTERS.pads);
  const resultImages = useImage(CHARACTERS.result);
  const [volumeMeter, counter, playGame] = usePlayEnergyBattle(
    setRoomStatus,
    setIsStartDisabled
  );

  const startGame = useCallback(async () => {
    if (isStartDisabled) {
      return;
    }

    if (roomStatus === ROOM_STATUS.READY || roomStatus === ROOM_STATUS.END) {
      socket.emit("start-game");
      playGame();
    }
  }, [isStartDisabled, playGame, roomStatus, socket]);

  useEffect(() => {
    canvasWidth.current = document.body.clientWidth * 0.8;
    canvasHeight.current = document.body.clientWidth * 0.4;
    socket.on("start-by-other", playGame);

    if (myCharacter && otherCharacter && skillEffect && pads && resultImages) {
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
      resultImage.current = resultImages;

      if (!otherPlayers || (otherPlayers && otherPlayers.length === 0)) {
        setRoomStatus(ROOM_STATUS.WAITING);
      } else {
        setRoomStatus(ROOM_STATUS.READY);
      }
    }

    return () => {
      socket.off("start-by-other");
    };
  }, [
    socket,
    myCharacter,
    otherCharacter,
    otherPlayers,
    pads,
    skillEffect,
    playGame,
  ]);

  return (
    <>
      <GameTitle>ENERGY BATTLE</GameTitle>
      <OperationContainer>
        <PlayerDataContainer>
          <PlayerData>
            {player.name}
            <br />
            {player.gameRecords.energyBattle}승
          </PlayerData>
        </PlayerDataContainer>
        <div>
          {counter.length > 0 && <h1>{counter}</h1>}
          {counter.length === 0 && roomStatus === ROOM_STATUS.WAITING && (
            <button onClick={startGame}>WAITING</button>
          )}
          {counter.length === 0 && roomStatus === ROOM_STATUS.READY && (
            <button onClick={startGame}>START</button>
          )}
        </div>
        <PlayerDataContainer>
          {otherPlayers && otherPlayers.length !== 0 ? (
            <PlayerData>
              {otherPlayers[0].name}
              <br />
              {otherPlayers[0].gameRecords.energyBattle}승
            </PlayerData>
          ) : (
            <PlayerData>
              Waiting...
              <br />
              😛
            </PlayerData>
          )}
        </PlayerDataContainer>
      </OperationContainer>
      <EnergyBattleFrame
        socket={socket}
        volumeMeter={volumeMeter}
        roomStatus={roomStatus}
        roomId={roomId}
        player={player}
        otherPlayer={otherPlayers && otherPlayers[0]}
        playerAvatar={playerAvatar.current}
        otherAvatar={otherAvatar.current}
        pad={pad.current}
        skill={skill.current}
        resultImage={resultImage.current}
        canvasWidth={canvasWidth.current}
        canvasHeight={canvasHeight.current}
      />
    </>
  );
};

export default EnergyBattle;
