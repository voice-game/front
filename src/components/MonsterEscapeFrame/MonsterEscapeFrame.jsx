import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { USER_SERVER } from "../../constants/constants";

const Canvas = styled.canvas`
  border: 1px solid black;
  background-color: skyblue;
`;

const socket = io(USER_SERVER, {
  withCredential: true,
});

const fps = 36;

const MonsterEscapeFrame = ({
  volumeMeter,
  gameElement,
  canvasWidth,
  canvasHeight,
  roomId,
  isInitGame,
  setIsInitGame,
}) => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const myPositionRef = useRef([0, 0]);
  const yourPositionRef = useRef([0, 0]);
  const [isPlay, setIsPlay] = useState(false);
  const spdRef = useRef(1);
  const grndSpeed = 0.005;

  useEffect(() => {
    socket.on("animation", (yourPosition) => {
      yourPositionRef.current = yourPosition;
    });
  }, []);

  useEffect(() => {
    const {
      box,
      playInfo,
      background,
      ceiling,
      ground,
      enemy,
      monster,
    } = gameElement;

    if (!isInitGame) return;

    const ctx = canvasRef.current.getContext("2d");
    background.animate(ctx);
    ground.animate(ctx, spdRef.current * grndSpeed);
    monster.animate(ctx, 0, 0, false, fps, 0);
    playInfo.animate(
      ctx,
      canvasWidth,
      canvasHeight,
      monster.distance,
      monster.life,
      monster.maxLife,
      2 * fps,
      0,
    );
    ceiling.animate(ctx, spdRef.current * grndSpeed);
    box.animate(ctx, canvasWidth, canvasHeight, false, spdRef.current);

    if (!isPlay) {
      return;
    }

    let thenTime;
    let singleFrame = 0;
    let doubleFrame = 0;

    const draw = (timeStamp) => {
      const timeStep = 1000 / fps;

      if (!thenTime) {
        thenTime = timeStamp;
      }

      if (timeStamp - thenTime <= timeStep) {
        animationIdRef.current = requestAnimationFrame(draw);
        return;
      }

      thenTime = timeStamp;
      singleFrame = (singleFrame + 1) % fps;
      doubleFrame = (doubleFrame + 1) % (2 * fps);

      const volume = volumeMeter.getVolume();

      const isCollision = monster.getIsCollision([enemy], fps, "easy");

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      background.animate(ctx);
      ground.animate(ctx, spdRef.current * grndSpeed);
      enemy.animate(ctx, 2 * spdRef.current * grndSpeed);
      ceiling.animate(ctx, 0.5 * spdRef.current * grndSpeed);
      monster.animate(
        ctx,
        spdRef.current * grndSpeed,
        volume,
        isCollision,
        fps,
        singleFrame,
      );
      playInfo.animate(
        ctx,
        canvasWidth,
        canvasHeight,
        monster.distance,
        monster.life,
        monster.maxLife,
        2 * fps,
        doubleFrame,
      );
      box.animate(ctx, canvasWidth, canvasHeight, isPlay, spdRef.current);

      myPositionRef.current = {
        normPosX: monster.posX / canvasWidth,
        normPosY: monster.posY / canvasHeight,
      };

      socket.emit("animation", roomId, myPositionRef.current);

      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationIdRef.current);
  }, [
    volumeMeter,
    gameElement,
    roomId,
    isInitGame,
    isPlay,
    canvasWidth,
    canvasHeight,
  ]);

  const handleClick = (ev) => {
    // useCallback 쓰기
    const {
      playBtnPosX,
      playBtnPosY,
      playBtnWidth,
      playBtnHeight,
    } = gameElement.box;

    const { upBtnPosX, upBtnPosY, upBtnWidth, upBtnHeight } = gameElement.box;
    const {
      downBtnPosX,
      downBtnPosY,
      downBtnWidth,
      downBtnHeight,
    } = gameElement.box;

    const clickedPosX = ev.nativeEvent.offsetX;
    const clickedPosY = ev.nativeEvent.offsetY;

    const isPlayBtnClicked =
      playBtnPosX < clickedPosX &&
      playBtnPosX + playBtnWidth > clickedPosX &&
      playBtnPosY < clickedPosY &&
      playBtnPosY + playBtnHeight > clickedPosY;

    const isUpBtnClicked =
      upBtnPosX < clickedPosX &&
      upBtnPosX + upBtnWidth > clickedPosX &&
      upBtnPosY < clickedPosY &&
      upBtnPosY + upBtnHeight > clickedPosY;

    const isDownBtnClicked =
      downBtnPosX < clickedPosX &&
      downBtnPosX + downBtnWidth > clickedPosX &&
      downBtnPosY < clickedPosY &&
      downBtnPosY + downBtnHeight > clickedPosY;

    if (isPlayBtnClicked) {
      if (isPlay) {
        setIsInitGame(false);
        setIsPlay(false);
      } else {
        setIsPlay(true);
      }
    }

    if (isUpBtnClicked) {
      spdRef.current = spdRef.current + 0.5;
    }

    if (isDownBtnClicked) {
      spdRef.current = Math.max(0.5, spdRef.current - 0.5);
    }
  };

  return (
    <Canvas
      ref={canvasRef}
      onClick={handleClick}
      width={canvasWidth}
      height={canvasHeight}
    />
  );
};

export default MonsterEscapeFrame;
