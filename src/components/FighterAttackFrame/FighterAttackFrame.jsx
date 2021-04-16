import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";

const Canvas = styled.canvas`
  border: 1px solid black;
`;

const FighterAttackFrame = ({ isPlay }) => {
  const [stream, setStream] = useState(null);
  const canvasRef = useRef(null);
  const posY = useRef(0);
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
      volumeMeter.audioProcessor();
      const ctx = canvasRef.current.getContext("2d");

      function draw() {
        const volume = volumeMeter.getVolume();

        if (volume > 2) {
          posY.current += 1;
        } else {
          posY.current -= 1;
        }

        ctx.clearRect(0, 0, 500, 500);
        ctx.beginPath();
        ctx.arc(400, 200 - posY.current, 25, 0, Math.PI * 2);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.closePath();
        animationId.current = requestAnimationFrame(draw);
      }

      draw();
    }

    return () => cancelAnimationFrame(animationId.current);
  }, [stream, isPlay]);

  return <Canvas ref={canvasRef} width={800} height={500} />;
};

export default FighterAttackFrame;
