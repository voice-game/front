/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Canvas from "../../components/shared/Canvas/Canvas";
import BACKGROUNDS from "../../games/energyBattle/BACKGROUND";
import pickRandom from "../../utils/pickRandom";
import { gameResultAction } from "../../actions/actionCreators";
import { ROOM_STATUS } from "../../constants/constants";

let randomBackground = pickRandom(BACKGROUNDS);

const EnergyBattleFrame = ({
  socket,
  volumeMeter,
  roomId,
  player,
  roomStatus,
  playerAvatar,
  otherAvatar,
  pad,
  skill,
  resultImage,
  canvasWidth,
  canvasHeight,
}) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const otherPlayerInputRef = useRef(null);

  const gameAnimationIdRef = useRef(null);
  const waitAnimationIdRef = useRef(null);
  const resultAnimationIdRef = useRef(null);

  const volumeSum = useRef(0);
  const myVolumeSum = useRef(0);
  const otherVolumeSum = useRef(0);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    let frameCount = 0;
    let spriteCount = 0;
    randomBackground = pickRandom(BACKGROUNDS);

    socket.on("input-other-player", (data) => {
      otherPlayerInputRef.current = data;
    });

    if (
      roomStatus === ROOM_STATUS.READY ||
      roomStatus === ROOM_STATUS.WAITING
    ) {
      frameCount = 0;
      spriteCount = 0;

      const drawWait = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        frameCount++;

        if (frameCount % 4 === 0) {
          spriteCount++;
        }

        pad.myPad(ctx);
        playerAvatar.idle(ctx, spriteCount);

        ctx.scale(-1, 1);

        pad.otherPad(ctx);
        if (roomStatus === ROOM_STATUS.READY) {
          otherAvatar.idle(ctx, spriteCount);
        }

        waitAnimationIdRef.current = requestAnimationFrame(drawWait);
      };

      drawWait();
    }

    if (roomStatus === ROOM_STATUS.START) {
      volumeSum.current = 0;
      myVolumeSum.current = 0;
      otherVolumeSum.current = 0;
      frameCount = 0;
      spriteCount = 0;

      const drawGame = () => {
        const volume = volumeMeter.getVolume();
        socket.emit("input-player", volume);

        myVolumeSum.current += volume;
        otherVolumeSum.current += otherPlayerInputRef.current;
        volumeSum.current = myVolumeSum.current + otherVolumeSum.current;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        frameCount++;

        if (frameCount % 4 === 0) {
          spriteCount++;
        }

        pad.myPad(ctx);
        skill.spark(ctx, spriteCount, volumeSum.current, myVolumeSum.current);
        skill.mySkill(ctx, spriteCount, volumeSum.current, myVolumeSum.current);
        playerAvatar.cast(ctx, spriteCount);

        ctx.scale(-1, 1);

        pad.otherPad(ctx);
        skill.otherSkill(
          ctx,
          spriteCount,
          volumeSum.current,
          otherVolumeSum.current
        );
        otherAvatar.cast(ctx, spriteCount);

        gameAnimationIdRef.current = requestAnimationFrame(drawGame);
      };

      drawGame();
    }

    if (roomStatus === ROOM_STATUS.END) {
      frameCount = 0;
      spriteCount = 0;

      if (myVolumeSum.current > otherVolumeSum.current) {
        dispatch(
          gameResultAction("GAME_RESULT", "energyBattle", roomId, player)
        );
      }

      const drawResult = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        frameCount++;

        if (frameCount % 4 === 0) {
          spriteCount++;
        }

        pad.myPad(ctx);

        if (myVolumeSum.current > otherVolumeSum.current) {
          ctx.drawImage(
            resultImage.win,
            canvasWidth / 2 -
              ((resultImage.win.width / canvasWidth) * canvasHeight) / 2,
            canvasHeight / 4,
            (resultImage.win.width / canvasWidth) * canvasHeight,
            (resultImage.win.height / canvasWidth) * canvasHeight
          );
          playerAvatar.idle(ctx, spriteCount);
        } else {
          ctx.drawImage(
            resultImage.lose,
            canvasWidth / 2 -
              ((resultImage.lose.width / canvasWidth) * canvasHeight) / 2,
            canvasHeight / 4,
            (resultImage.lose.width / canvasWidth) * canvasHeight,
            (resultImage.lose.height / canvasWidth) * canvasHeight
          );
          playerAvatar.lose(ctx, spriteCount);
        }

        ctx.scale(-1, 1);

        pad.otherPad(ctx);

        if (myVolumeSum.current > otherVolumeSum.current) {
          otherAvatar.lose(ctx, spriteCount);
        } else {
          otherAvatar.idle(ctx, spriteCount);
        }

        resultAnimationIdRef.current = requestAnimationFrame(drawResult);
      };

      drawResult();
    }

    return () => {
      cancelAnimationFrame(waitAnimationIdRef.current);
      cancelAnimationFrame(gameAnimationIdRef.current);
      cancelAnimationFrame(resultAnimationIdRef.current);
      socket.off("input-other-player");
    };
  }, [roomStatus, canvasHeight, canvasWidth]);

  return (
    <>
      <Canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        margin={["20px", "auto", "0", "auto"]}
        bgImage={randomBackground}
      />
    </>
  );
};

export default EnergyBattleFrame;
