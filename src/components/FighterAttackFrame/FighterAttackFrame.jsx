import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  border: 1px solid black;
  background-color: skyblue;
`;

const FighterAttackFrame = ({
  volumeMeter,
  isPlay,
  gameElement,
  canvasWidth,
  canvasHeight,
}) => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const { playInfo, fighter, tree, bird, cloud } = gameElement;
    const ctx = canvasRef.current.getContext("2d");

    if (isPlay) {
      const draw = () => {
        const volume = volumeMeter.getVolume();

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        const isCollision = fighter.getIsCollision([tree, bird, cloud], 300);

        tree.animate(ctx, canvasWidth, canvasHeight);
        bird.animate(ctx, canvasWidth, canvasHeight);
        cloud.animate(ctx, canvasWidth, canvasHeight);
        fighter.animate(ctx, canvasHeight, volume, isCollision);
        playInfo.animate(
          ctx,
          canvasWidth,
          canvasHeight,
          fighter.distance,
          fighter.life,
          fighter.maxLife,
        );

        animationIdRef.current = requestAnimationFrame(draw);
      };

      draw();
    }

    return () => cancelAnimationFrame(animationIdRef.current);
  }, [volumeMeter, gameElement, isPlay, canvasWidth, canvasHeight]);

  return <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default FighterAttackFrame;
