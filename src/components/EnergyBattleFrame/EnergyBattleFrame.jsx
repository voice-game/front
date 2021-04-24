import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import BACKGROUNDS from "../../images/energyBattle/backgrounds/backgrounds";
import pickRandom from "../../utils/pickRandom";

let randomBackground = pickRandom(BACKGROUNDS);

const Canvas = styled.canvas`
  display: block;
  margin: 0 auto;
  background-image: url(${randomBackground});
  background-size: contain;
  margin-top: 20px;
  border: 1px solid black;
`;

const EnergyBattleFrame = ({
  socket,
  volumeMeter,
  roomStatus,
  playerAvatar,
  otherAvatar,
  pad,
  skill,
  canvasWidth,
  canvasHeight,
}) => {
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

    if (roomStatus === "ready" || roomStatus === "waiting") {
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
        otherAvatar.idle(ctx, spriteCount);

        waitAnimationIdRef.current = requestAnimationFrame(drawWait);
      };

      drawWait();
    }

    if (roomStatus === "start") {
      volumeSum.current = 0;
      myVolumeSum.current = 0;
      otherVolumeSum.current = 0;
      frameCount = 0;
      spriteCount = 0;

      const drawGame = () => {
        const volume = volumeMeter.getVolume();
        socket.emit("input-player", volume);

        myVolumeSum.current += volume;
        otherVolumeSum.current += otherPlayerInputRef.current / 2;
        volumeSum.current = myVolumeSum.current + otherVolumeSum.current;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        frameCount++;

        if (frameCount % 4 === 0) {
          spriteCount++;
        }

        pad.myPad(ctx);
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
        // console.log(myVolumeSum.current);
        // console.log(otherVolumeSum.current);

        gameAnimationIdRef.current = requestAnimationFrame(drawGame);
      };

      drawGame();
    }

    if (roomStatus === "end") {
      console.log(myVolumeSum.current);
      console.log(otherVolumeSum.current);
      frameCount = 0;
      spriteCount = 0;

      const drawResult = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        frameCount++;

        if (frameCount % 4 === 0) {
          spriteCount++;
        }

        pad.myPad(ctx);

        if (myVolumeSum.current > otherVolumeSum.current) {
          playerAvatar.idle(ctx, spriteCount);
        } else {
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
      cancelAnimationFrame(gameAnimationIdRef.current);
      cancelAnimationFrame(waitAnimationIdRef.current);
      cancelAnimationFrame(resultAnimationIdRef.current);

      socket.off("input-other-player");
    };
  }, [canvasHeight, canvasWidth, roomStatus]);

  return (
    <>
      <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
    </>
  );
};

export default EnergyBattleFrame;
