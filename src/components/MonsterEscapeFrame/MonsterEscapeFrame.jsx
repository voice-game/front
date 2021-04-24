import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import getIsCanvasButtonClicked from "../../utils/getIsCanvasButtonClicked";

const Canvas = styled.canvas`
  border: 1px solid black;
  background-color: skyblue;
`;

const fps = 36;

const MonsterEscapeFrame = ({
  socket,
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
  const [speed, setSpeed] = useState(1);
  const [volThreshold, setVolThreshold] = useState(3);
  const volRef = useRef(0);

  const grndSpeed = 0.005;

  useEffect(() => {
    socket.on("animation", (yourPosition) => {
      yourPositionRef.current = yourPosition;
    });
  }, []);

  useEffect(() => {
    const { controlBox, playInfo, background, ceiling, ground, enemy, monster } = gameElement;

    if (!isInitGame) return;
    const ctx = canvasRef.current.getContext("2d");

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
      volRef.current = volume;

      monster.setIsCollision([enemy], fps, "easy");

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      background.animate(ctx);
      ground.animate(ctx, speed * grndSpeed);
      enemy.animate(ctx, 2 * speed * grndSpeed);
      ceiling.animate(ctx, 0.5 * speed * grndSpeed);
      controlBox.animate(ctx, isPlay, speed, volume, volThreshold);

      if (isPlay) {
        monster.animate(ctx, speed * grndSpeed, volThreshold, volume, singleFrame);
        socket.emit("animation", roomId, myPositionRef.current);
        myPositionRef.current = {
          normPosX: monster.posX / canvasWidth,
          normPosY: monster.posY / canvasHeight,
        };
      } else {
        monster.animate(ctx, 0, volThreshold, volume, singleFrame);
      }

      const monsterInfo = {
        distance: monster.distance,
        life: monster.life,
        maxLife: monster.maxLife,
      };

      playInfo.animate(ctx, monsterInfo, doubleFrame);


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
    speed,
    volThreshold,
    socket,
  ]);

  const handleClick = (ev) => {
    // useCallback 쓰기
    const { playBtnPosX, playBtnPosY, playBtnWidth, playBtnHeight } = gameElement.controlBox;
    const { upBtnPosX, upBtnPosY, upBtnWidth, upBtnHeight } = gameElement.controlBox;
    const { downBtnPosX, downBtnPosY, downBtnWidth, downBtnHeight } = gameElement.controlBox;
    const { plusBtnPosX, plusBtnPosY, plusBtnWidth, plusBtnHeight } = gameElement.controlBox;
    const { minusBtnPosX, minusBtnPosY, minusBtnWidth, minusBtnHeight } = gameElement.controlBox;

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
      setSpeed(speed + 0.5);
    } else if (isDownBtnClicked) {
      setSpeed(Math.max(0.5, speed - 0.5));
    }

    if (isPlusBtnClicked) {
      setVolThreshold(volThreshold + 0.5);
    } else if (isMinusBtnClicked) {
      setVolThreshold(Math.max(0.5, volThreshold - 0.5));
    }
  };

  return <Canvas ref={canvasRef} onClick={handleClick} width={canvasWidth} height={canvasHeight} />;
};

export default MonsterEscapeFrame;
