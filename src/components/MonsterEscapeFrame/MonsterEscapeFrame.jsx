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
    ground.animate(ctx);
    monster.animate(ctx, 0, false, fps, 0);
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
    ceiling.animate(ctx);
    box.animate(ctx, canvasWidth, canvasHeight);

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
      ground.animate(ctx);
      enemy.animate(ctx);
      ceiling.animate(ctx);
      monster.animate(ctx, volume, isCollision, fps, singleFrame);
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
      box.animate(ctx, canvasWidth, canvasHeight, isPlay);

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

    const clickedPosX = ev.nativeEvent.offsetX;
    const clickedPosY = ev.nativeEvent.offsetY;

    const isPosXClicked =
      playBtnPosX < clickedPosX && playBtnPosX + playBtnWidth > clickedPosX;
    const isPosYClicked =
      playBtnPosY < clickedPosY && playBtnPosY + playBtnHeight > clickedPosY;

    if (isPosXClicked && isPosYClicked) {
      if (isPlay) {
        setIsInitGame(false);
        setIsPlay(false);
      } else {
        setIsPlay(true);
      }
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
