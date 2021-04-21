import React, { useEffect, useRef } from "react";
import styled from "styled-components";

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
}) => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

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

      const draw = (timeStamp) => {
        const timeStep = 1000 / 36;

        if (!thenTime) {
          thenTime = timeStamp;
        }

        if (timeStamp - thenTime <= timeStep) {
          animationIdRef.current = requestAnimationFrame(draw);
          return;
        }

        thenTime = timeStamp;
        frame = (frame + 1) % 36;

        const volume = volumeMeter.getVolume();

        const isCollision = monster.getIsCollision(
          [ground, enemy, ceiling],
          300,
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

        animationIdRef.current = requestAnimationFrame(draw);
      };

      draw();
    }

    return () => cancelAnimationFrame(animationIdRef.current);
  }, [volumeMeter, gameElement, isPlay, canvasWidth, canvasHeight]);

  return <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default MonsterEscapeFrame;
