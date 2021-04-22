import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { USER_SERVER } from "../../constants/constants";

const socket = io(USER_SERVER, {
  withCredential: true,
});

const Canvas = styled.canvas`
  border: 1px solid black;
  background-color: skyblue;
`;

const MonsterEscapeFrame = ({
  volumeMeter,
  isPlay,
  gameElement,
  canvasWidth,
  canvasHeight,
  roomId,
}) => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const myPositionRef = useRef([0, 0]);
  const yourPositionRef = useRef([0, 0]);

  useEffect(() => {
    socket.on("animation", (yourPosition) => {
      yourPositionRef.current = yourPosition;
    });
  }, []);

  useEffect(() => {
    const {
      playInfo,
      background,
      ceiling,
      ground,
      enemy,
      monster,
    } = gameElement;
    const ctx = canvasRef.current.getContext("2d");

    if (isPlay) {
      let thenTime;
      let frame = 0;
      const fps = 36;

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
        frame = (frame + 1) % fps;

        const volume = volumeMeter.getVolume();

        const isCollision = monster.getIsCollision(
          [ground, enemy, ceiling],
          1 * fps,
        );

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        background.animate(ctx);
        ground.animate(ctx);
        enemy.animate(ctx);
        ceiling.animate(ctx);
        monster.animate(ctx, volume, isCollision, frame);
        playInfo.animate(
          ctx,
          canvasWidth,
          canvasHeight,
          monster.distance,
          monster.life,
          monster.maxLife,
        );

        myPositionRef.current = {
          normPosX: monster.posX / canvasWidth,
          normPosY: monster.posY / canvasHeight,
        };

        socket.emit("animation", roomId, myPositionRef.current);

        animationIdRef.current = requestAnimationFrame(draw);
      };

      draw();
    }

    return () => cancelAnimationFrame(animationIdRef.current);
  }, [volumeMeter, gameElement, isPlay, canvasWidth, canvasHeight]);

  return <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default MonsterEscapeFrame;
