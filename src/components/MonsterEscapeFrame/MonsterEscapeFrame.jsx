import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import getIsCanvasButtonClicked from "../../utils/getIsCanvasButtonClicked";

const Canvas = styled.canvas`
  border: 1px solid black;
  background-color: skyblue;
`;

const fps = 36;
const timeLeftToRight = 10;
const timeTopToBottom = 5;
const monsterSpd = {spdX: 0, spdY: 0};

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
  const myDataRef = useRef({});
  const yourDataRef = useRef({});
  const [isPlay, setIsPlay] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [volThreshold, setVolThreshold] = useState(3);

  const grndSpd = canvasWidth / (fps * timeLeftToRight);
  const verticalSpd = canvasHeight / (fps * timeTopToBottom);
  // const monsterSpd = {spdX: grndSpd, spdY: verticalSpd};
  monsterSpd.spdX = speed * grndSpd;
  monsterSpd.spdY = speed * verticalSpd;

  useEffect(() => {
    socket.on("animation", (yourData) => {
      // console.log(yourPosition);
      yourDataRef.current = yourData;
    });
  }, []);

  useEffect(() => {
    const { controlBox, playInfo, background, ceiling, ground, enemy, monster, multiPlayer } = gameElement;

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

      const volumeData = {
        volume : volumeMeter.getVolume(),
        volThreshold: volThreshold,
      };

      monster.setIsCollision([enemy], fps, "easy");

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      background.animate(ctx);
      ground.animate(ctx, speed * grndSpd);
      ceiling.animate(ctx, 0.5 * speed * grndSpd);
      controlBox.animate(ctx, isPlay, speed, volumeData);

      if (isPlay) {
        enemy.animate(ctx, 2 * speed * grndSpd);
        monster.animate(ctx, monsterSpd, volumeData, singleFrame);

        myDataRef.current = {
          normPosX: monster.posX / canvasWidth,
          normPosY: monster.posY / canvasHeight,
          normDistance: monster.distance / canvasWidth,
        };

        socket.emit("animation", roomId, myDataRef.current);

        const {normPosX, normPosY, normDistance} = yourDataRef.current;
        multiPlayer.animate(ctx, normPosX, normPosY, monster.distance / canvasWidth, normDistance, singleFrame);
      } else {
        const monsterSpd = {spdX: 0, spdY: 0};
        monster.animate(ctx, monsterSpd, volumeData, singleFrame);
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
    grndSpd,
    monsterSpd,
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
