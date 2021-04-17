import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";
import Fighter from "../../games/fighterAttack/Fighter";
import Obstacle from "../../games/fighterAttack/Obstacle";
import Mountain from "../../games/fighterAttack/Mountain";
import tree1 from "../../images/fighterAttack/tree1.png";
import tree2 from "../../images/fighterAttack/tree2.png";
import bird1 from "../../images/fighterAttack/bird1.png";
import bird2 from "../../images/fighterAttack/bird2.png";
import cloud1 from "../../images/fighterAttack/cloud1.png";

const Canvas = styled.canvas`
  border: 1px solid black;
  background-color: skyblue;
`;

const canvasWidth = document.body.clientWidth * 0.8;
const canvasHeight = document.body.clientWidth * 0.6;

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

    // const ctx = canvasRef.current.getContext("2d");
    // const tree = new Obstacle(canvasWidth, canvasHeight, 1);
    // tree.setObstacleLayouts(5, canvasWidth, canvasHeight);
    // tree.loadImage(ctx, 1);
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
      const mountain = new Mountain(10, canvasWidth, canvasHeight, "green");
      mountain.setPeakPoint();

      const tree = new Obstacle(
        "onGround",
        0.2 * canvasHeight,
        0.3 * canvasHeight,
      );
      tree.loadImage(ctx, [tree1, tree2]);
      tree.setObstacleLayouts(canvasWidth, canvasHeight, 10);

      const bird = new Obstacle(
        "onAir",
        0.05 * canvasHeight,
        0.05 * canvasHeight,
        0.2 * canvasHeight,
        0.6 * canvasHeight,
      );
      bird.loadImage(ctx, [bird1, bird2]);
      bird.setObstacleLayouts(canvasWidth, canvasHeight, 5);

      const cloud = new Obstacle(
        "onAir",
        0.3 * canvasHeight,
        0.3 * canvasHeight,
        -0.2 * canvasHeight,
        0.0 * canvasHeight,
      );
      cloud.loadImage(ctx, [cloud1]);
      cloud.setObstacleLayouts(canvasWidth, canvasHeight, 5);

      const draw = () => {
        const volume = volumeMeter.getVolume();

        if (volume > 3) {
          posY.current += canvasHeight / 1000;
        } else {
          posY.current -= canvasHeight / 1000;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        fighter.animate(ctx, canvasWidth, canvasHeight, posY.current);
        tree.animate(ctx, canvasWidth, canvasHeight, 2);
        bird.animate(ctx, canvasWidth, canvasHeight, 1);
        cloud.animate(ctx, canvasWidth, canvasHeight, 0.5);

        animationId.current = requestAnimationFrame(draw);
      };

      draw();
    }

    return () => cancelAnimationFrame(animationId.current);
  }, [stream, isPlay]);

  return <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default FighterAttackFrame;
