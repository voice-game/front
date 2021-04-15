import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  width: 800px;
  height: 500px;
  border: 1px solid red;
`;

const FighterAttackFrame = () => {
  const canvasRef = useRef(null);

  async function getMedia(constraints) {
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    return mediaStream;
  }

  const audioProcessor = (audioStream) => {
    const context = new AudioContext();
    const source = context.createMediaStreamSource(audioStream);
    const analyser = context.createAnalyser();
    const processor = context.createScriptProcessor(2048, 1, 1);

    analyser.minDecibels = -60;
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.9;

    source.connect(analyser);
    analyser.connect(processor);
    processor.connect(context.destination);

    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);

    return { processor, data };
  };

  const visualizer = (data, ctx) => {
    console.log("visualizer");
    ctx.fillStyle = "gray";
    ctx.clearRect(0, 0, 300, 300);
    ctx.fillRect(0, 0, 20, 20);
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    (async () => {
      const audioStream = await getMedia({ audio: true });
      const { processor, data } = audioProcessor(audioStream);
      processor.onaudioprocess = () => visualizer(data, ctx);
    })();
  }, []);

  return (
    <>
      <Canvas ref={canvasRef} />
    </>
  );
};

export default FighterAttackFrame;
