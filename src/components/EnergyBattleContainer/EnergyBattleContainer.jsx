/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";

import EnergyBattle from "../EnergyBattle/EnergyBattle";
import EnergyBattleController from "../EnergyBattleController/EnergyBattleController";

import useMyImage from "../../hooks/useMyImage";
import { ROOM_STATUS } from "../../constants/constants";
import usePlayEnergyBattle from "../../hooks/usePlayEnergyBattle";
import PlayerCard from "../PlayerCard/PlayerCard";
import GameManual from "../GameManual/GameManual";
import manualImage from "../../images/manuals/manual_energyBattle.png";
import makeResource from "../../games/energyBattle/makeResouce";

const GameTitle = styled.h1`
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

const PlayerCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  width: 14vw;
  min-width: 180px;
  height: 8vh;
`;

const EnergyBattleContainer = ({ socket, roomId, player, otherPlayers }) => {
  const [roomStatus, setRoomStatus] = useState("");
  const [isStartDisabled, setIsStartDisabled] = useState(false);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [isOtherModalClosed, setIsOtherModalClosed] = useState(false);

  const gameResource = useRef(null);
  const canvasWidth = useRef(document.body.clientWidth * 0.9);
  const canvasHeight = useRef(document.body.clientWidth * 0.5);

  const [volumeMeter, counter, playGame] = usePlayEnergyBattle(
    setRoomStatus,
    setIsStartDisabled
  );
  const { image, isLoaded } = useMyImage("energyBattle");

  const startGame = useCallback(async () => {
    if (isStartDisabled) {
      return;
    }

    if (roomStatus === ROOM_STATUS.READY || roomStatus === ROOM_STATUS.END) {
      socket.emit("start-game");
      playGame();
    }
  }, [isStartDisabled, playGame, roomStatus, socket]);

  const closeModal = useCallback(() => {
    socket.emit("close-modal");
    setIsModalClosed(true);
  }, []);

  useEffect(() => {
    canvasWidth.current = document.body.clientWidth * 0.9;
    canvasHeight.current = document.body.clientWidth * 0.5;
    socket.on("start-by-other", playGame);
    socket.on("close-other-modal", () => {
      setIsOtherModalClosed(true);
    });

    if (isLoaded) {
      gameResource.current = makeResource(
        image,
        canvasWidth.current,
        canvasHeight.current
      );
    }

    if (!otherPlayers || (otherPlayers && otherPlayers.length === 0)) {
      setIsOtherModalClosed(false);
      setRoomStatus(ROOM_STATUS.WAITING);
    }

    if (otherPlayers && otherPlayers.length > 0 && isModalClosed) {
      socket.emit("close-modal");
    }

    if (isModalClosed && isOtherModalClosed) {
      setRoomStatus(ROOM_STATUS.READY);
    }

    return () => {
      socket.off("start-by-other");
      socket.off("close-other-modal");
    };
  }, [socket, otherPlayers, playGame, isModalClosed, isOtherModalClosed]);

  console.log(isModalClosed);
  console.log(isOtherModalClosed);
  console.log(roomStatus);

  return (
    <>
      <GameTitle>ENERGY BATTLE</GameTitle>
      <GameManual imgSrc={manualImage} onClick={closeModal} />
      <OperationContainer>
        <PlayerCardContainer>
          <PlayerCard player={player} />
        </PlayerCardContainer>
        <EnergyBattleController
          counter={counter}
          roomStatus={roomStatus}
          onClick={startGame}
        />
        <PlayerCardContainer>
          {otherPlayers && otherPlayers.length !== 0 ? (
            <PlayerCard player={otherPlayers[0]} />
          ) : (
            <PlayerCard />
          )}
        </PlayerCardContainer>
      </OperationContainer>
      <EnergyBattle
        socket={socket}
        volumeMeter={volumeMeter}
        roomStatus={roomStatus}
        roomId={roomId}
        player={player}
        otherPlayer={otherPlayers && otherPlayers[0]}
        canvasWidth={canvasWidth.current}
        canvasHeight={canvasHeight.current}
        gameResource={gameResource.current}
      />
    </>
  );
};

export default EnergyBattleContainer;
