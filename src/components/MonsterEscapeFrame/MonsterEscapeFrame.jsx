import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import getIsCanvasButtonClicked from "../../utils/getIsCanvasButtonClicked";

const Canvas = styled.canvas`
`;

const FPS = 36;
const TIME_LEFT_TO_RIGHT = 10;
const TIME_TO_TO_BOTTOM = 5;
// const monsterSpd = { spdX: 0, spdY: 0 };
const SPEED_STEP = 0.5;
const VOLUME_STEP = 0.5;

const MonsterEscapeFrame = ({
  isInitGame,
  setIsInitGame,
  gameElement,
  canvasWidth,
  canvasHeight,
  volumeMeter,
  socket,
  roomId,
}) => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const myDataRef = useRef(null);
  const yourDataRef = useRef(null);
  const thenTimeRef = useRef(0);
  const singleFrameRef = useRef(0);
  const doubleFrameRef = useRef(0);

  const [isPlay, setIsPlay] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [volThreshold, setVolThreshold] = useState(3);

  const grndSpd = canvasWidth / (FPS * TIME_LEFT_TO_RIGHT);
  const verticalSpd = canvasHeight / (FPS * TIME_TO_TO_BOTTOM);

  useEffect(() => {
    socket.on("animation", (yourData) => {
      yourDataRef.current = yourData;
    });
    return () => socket.off("anmation");
  }, [socket]);

  useEffect(() => {
    const { controlBox, playInfo, background, ceiling, ground, enemy, monster, multiPlayer } = gameElement;

    if (!isInitGame) { return };

    const ctx = canvasRef.current.getContext("2d");

    const draw = (timeStamp) => {
      const timeStep = 1000 / FPS;

      if (!thenTimeRef.current) { thenTimeRef.current = timeStamp }

      if (timeStamp - thenTimeRef.current <= timeStep) {
        return animationIdRef.current = requestAnimationFrame(draw);
      }

      thenTimeRef.current = timeStamp;
      singleFrameRef.current = (singleFrameRef.current + 1) % FPS;
      doubleFrameRef.current = (doubleFrameRef.current + 1) % (2 * FPS);

      const volumeData = {
        volume : volumeMeter.getVolume(),
        volThreshold: volThreshold,
      };

      monster.setIsCollision([enemy], FPS, "easy");

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      background.animate(ctx);
      ground.animate(ctx, speed * grndSpd);
      ceiling.animate(ctx, 0.5 * speed * grndSpd);

      if (isPlay) {
        const monsterSpd = { spdX: speed * grndSpd, spdY: speed * verticalSpd };
        enemy.animate(ctx, 2 * speed * grndSpd);
        monster.animate(ctx, monsterSpd, volumeData, singleFrameRef.current);

        myDataRef.current = {
          normPosX: monster.posX / canvasWidth,
          normPosY: monster.posY / canvasHeight,
          normDistance: monster.distance / canvasWidth,
          shieldTime: monster.shieldTime,
          life: monster.life
        };

        socket.emit("animation", roomId, myDataRef?.current);

        if (yourDataRef.current) {
          multiPlayer.animate(ctx, myDataRef.current, yourDataRef.current, singleFrameRef.current);
        }
      } else {
        const monsterSpd = { spdX: 0, spdY: 0 };
        monster.animate(ctx, monsterSpd, volumeData, singleFrameRef.current);
      }

      controlBox.animate(ctx, isPlay, speed, volumeData);
      playInfo.animate(ctx, monster, doubleFrameRef.current);

      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationIdRef.current);
  }, [
    isPlay,
    speed,
    grndSpd,
    verticalSpd,
    volThreshold,
    isInitGame,
    gameElement,
    canvasWidth,
    canvasHeight,
    volumeMeter,
    socket,
    roomId,
  ]);

  const handleControlBox = useCallback((ev) => {
    const controlBox = gameElement.controlBox;

    const { playBtnPosX, playBtnPosY, playBtnWidth, playBtnHeight } = controlBox;
    const { upBtnPosX, upBtnPosY, upBtnWidth, upBtnHeight } = controlBox;
    const { downBtnPosX, downBtnPosY, downBtnWidth, downBtnHeight } = controlBox;
    const { plusBtnPosX, plusBtnPosY, plusBtnWidth, plusBtnHeight } = controlBox;
    const { minusBtnPosX, minusBtnPosY, minusBtnWidth, minusBtnHeight } = controlBox;

    const clickedPosX = ev.nativeEvent.offsetX;
    const clickedPosY = ev.nativeEvent.offsetY;

    const clickedInfo = [clickedPosX, clickedPosY];
    const playBtnInfo = [playBtnPosX, playBtnPosY, playBtnWidth, playBtnHeight];
    const upBtnInfo = [upBtnPosX, upBtnPosY, upBtnWidth, upBtnHeight];
    const downBtnInfo = [downBtnPosX, downBtnPosY, downBtnWidth, downBtnHeight];
    const plusBtnInfo = [plusBtnPosX, plusBtnPosY, plusBtnWidth, plusBtnHeight];
    const minusBtnInfo = [minusBtnPosX, minusBtnPosY, minusBtnWidth, minusBtnHeight];

    const isPlayBtnClicked = getIsCanvasButtonClicked(clickedInfo, playBtnInfo);
    const isUpBtnClicked = getIsCanvasButtonClicked(clickedInfo, upBtnInfo);
    const isDownBtnClicked = getIsCanvasButtonClicked(clickedInfo, downBtnInfo);
    const isPlusBtnClicked = getIsCanvasButtonClicked(clickedInfo, plusBtnInfo);
    const isMinusBtnClicked = getIsCanvasButtonClicked(clickedInfo, minusBtnInfo);

    if (isPlayBtnClicked) {
      if (isPlay) {
        setIsInitGame(false);
        setIsPlay(false);
      } else {
        setIsPlay(true);
      }
    }

    if (isUpBtnClicked) {
      setSpeed(speed + SPEED_STEP);
    } else if (isDownBtnClicked) {
      setSpeed(Math.max(SPEED_STEP, speed - SPEED_STEP));
    }

    if (isPlusBtnClicked) {
      setVolThreshold(volThreshold + VOLUME_STEP);
    } else if (isMinusBtnClicked) {
      setVolThreshold(Math.max(VOLUME_STEP, volThreshold - VOLUME_STEP));
    }

  }, [isPlay, speed, setIsInitGame, volThreshold, gameElement.controlBox]);

  const handleClick = (ev) => handleControlBox(ev);

  return <Canvas ref={canvasRef} onClick={handleClick} width={canvasWidth} height={canvasHeight} />;
};

export default MonsterEscapeFrame;
