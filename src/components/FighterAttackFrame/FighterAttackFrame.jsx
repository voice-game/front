import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import getMedia from "../../utils/getMedia";
import audioProcessor from "../../utils/audioProcessor";

const Canvas = styled.canvas`
  width: 800px;
  height: 500px;
  border: 1px solid red;
`;

const FighterAttackFrame = ({ isPlay }) => {
  const [stream, setStream] = useState(null);

  const canvasRef = useRef(null);

  const visualizer = (data, ctx) => {
    console.log("visualizer");
    ctx.fillStyle = "gray";
    ctx.clearRect(0, 0, 300, 300);
    ctx.fillRect(0, 0, 20, 20);
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

    const { processor, data } = audioProcessor(stream);
    const ctx = canvasRef.current.getContext("2d");
    const handler = () => visualizer(data, ctx);

    if (isPlay) {
      processor.addEventListener("audioprocess", handler);
    }

    return () => {
      processor.removeEventListener("audioprocess", handler);
    };
  }, [stream, isPlay]);

  return <Canvas ref={canvasRef} />;
};

export default FighterAttackFrame;
