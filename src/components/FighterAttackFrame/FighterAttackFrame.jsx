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
  const posYRef = useRef(0);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const { fighter, tree, bird, cloud } = gameElement;
    const ctx = canvasRef.current.getContext("2d");

    if (isPlay) {
      const draw = () => {
        const volume = volumeMeter.getVolume();

        if (volume > 3) {
          posYRef.current += canvasHeight / 1000;
        } else {
          posYRef.current -= canvasHeight / 1000;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        fighter.animate(ctx, canvasWidth, canvasHeight, posYRef.current);
        tree.animate(ctx, canvasWidth, canvasHeight, 2);
        bird.animate(ctx, canvasWidth, canvasHeight, 1);
        cloud.animate(ctx, canvasWidth, canvasHeight, 0.5);

        animationIdRef.current = requestAnimationFrame(draw);
      };

      draw();
    }

    return () => cancelAnimationFrame(animationIdRef.current);
  }, [volumeMeter, gameElement, isPlay, canvasWidth, canvasHeight]);

  return <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default FighterAttackFrame;
