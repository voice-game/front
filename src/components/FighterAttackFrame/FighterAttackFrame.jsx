import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";
import Fighter from "../../games/fighterAttack/Fighter";
import Obstacle from "../../games/fighterAttack/Obstacle";
import Mountain from "../../games/fighterAttack/Mountain";

const Canvas = styled.canvas`
  border: 1px solid black;
`;

const canvasWidth = document.body.clientWidth * 0.8;
const canvasHeight = document.body.clientWidth * 0.6;
console.log(canvasWidth, canvasHeight);

const FighterAttackFrame = ({ isPlay }) => {
  const [stream, setStream] = useState(null);
  const canvasRef = useRef(null);
  const posY = useRef(0);
  const time = useRef(0);
  const animationId = useRef(null);

  useEffect(() => {
    (async () => {
      const stream = await getMedia({ audio: true });
      setStream(stream);
    })();
  }, []);

  useEffect(() => {
    if (!stream) {
      return;
    }

    if (isPlay) {
      const volumeMeter = new VolumeMeter(stream);
      volumeMeter.audioProcessor({
        bufferSize: 2048,
        minDecibels: -60,
        maxDecibels: -30,
        timeConstant: 0.9,
      });

      const ctx = canvasRef.current.getContext("2d");

      const fighter = new Fighter(50, 50, 1, "black");
      const mountain = new Mountain(10, canvasWidth, canvasHeight, "green", 1);
      mountain.setPeakPoint();

      const tree = new Obstacle(50, 50, 1);
      const cloud = new Obstacle(50, 50, 1);

      const draw = () => {
        const volume = volumeMeter.getVolume();

        if (volume > 3) {
          posY.current += canvasHeight / 1000;
        } else {
          posY.current -= canvasHeight / 1000;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        fighter.animate(ctx, canvasWidth, canvasHeight, posY.current);
        mountain.animate(ctx);

        animationId.current = requestAnimationFrame(draw);
      };

      draw();
    }

    return () => cancelAnimationFrame(animationId.current);
  }, [stream, isPlay]);

  return <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default FighterAttackFrame;
