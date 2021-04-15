import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import getMedia from "../../utils/getMedia";
import audioProcessor from "../../utils/audioProcessor";

const Canvas = styled.canvas`
  border: 1px solid black;
`;

const FighterAttackFrame = ({ isPlay }) => {
  const [stream, setStream] = useState(null);
  const canvasRef = useRef(null);
  const posY = useRef(0);

  const visualizer = (analyser, ctx) => {
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    const average = data.reduce((acc, item) => acc + item) / data.length;

    if (average > 2) {
      posY.current += 1;
    } else {
      posY.current -= 2;
    }

    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.arc(400, 200 - posY.current, 25, 0, Math.PI * 2);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
  };

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

    const { processor, analyser } = audioProcessor(stream);
    const ctx = canvasRef.current.getContext("2d");
    const visualListener = () => visualizer(analyser, ctx);

    if (isPlay) {
      processor.addEventListener("audioprocess", visualListener);
    }

    return () => processor.removeEventListener("audioprocess", visualListener);
  }, [stream, isPlay]);

  return <Canvas ref={canvasRef} width={800} height={500} />;
};

export default FighterAttackFrame;
