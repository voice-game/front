import React, { useState, useEffect, useRef } from "react";
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
  stream,
  volumeMeter,
  isPlay,
  isReady,
  player,
  myCharacter,
  otherCharacter,
  skillEffect,
  canvasWidth,
  canvasHeight,
}) => {
  const canvasRef = useRef(null);
  const otherPlayerInputRef = useRef(null);
  const gameAnimationIdRef = useRef(null);
  const waitAnimationIdRef = useRef(null);
  console.log(canvasWidth);
  console.log(canvasHeight);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    let frameCount = 0;
    randomBackground = pickRandom(BACKGROUNDS);

    socket.on("input-other-player", (data) => {
      otherPlayerInputRef.current = data;
    });

    if (isPlay) {
      const draw = (timeStamp) => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        frameCount++;
        const volume = volumeMeter.getVolume();
        socket.emit("input-player", volume);
        console.log("my", volume);
        console.log("other", otherPlayerInputRef.current);

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(25, 25, 100 + volume * 100, 50);
        ctx.fillStyle = "red";
        ctx.fillRect(125, 125, 100 + otherPlayerInputRef.current * 50, 150);

        gameAnimationIdRef.current = requestAnimationFrame(draw);
      };

      draw();
    }

    if (!isPlay && isReady) {
      let frameCount = 0;
      let spriteCount = 0;
      const drawWait = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        frameCount++;
        if (frameCount % 3 === 0) {
          spriteCount++;
        }
        ctx.drawImage(
          myCharacter.idle,
          (myCharacter.idle.width / 12) * 0,
          0,
          (myCharacter.idle.width / 12) * 1,
          myCharacter.idle.height,
          0,
          canvasHeight * 0.72,
          canvasWidth / 8,
          (canvasWidth / 8 / 10) * 9
        );
        ctx.scale(-1, 1);
        ctx.drawImage(
          otherCharacter.idle,
          (otherCharacter.idle.width / 12) * spriteCount,
          0,
          (otherCharacter.idle.width / 12) * (spriteCount + 1),
          otherCharacter.idle.height,
          -canvasWidth,
          canvasHeight * 0.72,
          canvasWidth / 8,
          (canvasWidth / 8 / 10) * 9
        );
        // ctx.drawImage(skillEffect.fire, 30, 30);
        // waitAnimationIdRef.current = requestAnimationFrame(drawWait);
      };

      drawWait();
    }

    return () => {
      cancelAnimationFrame(gameAnimationIdRef.current);
      cancelAnimationFrame(waitAnimationIdRef.current);
      socket.off("input-other-player");
    };
  }, [canvasHeight, canvasWidth, isPlay, isReady, socket, volumeMeter]);

  return (
    <>
      <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
    </>
  );
};

export default EnergyBattleFrame;
