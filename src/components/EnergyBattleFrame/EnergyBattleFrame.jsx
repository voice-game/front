import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  border: 1px solid black;
  background-color: skyblue;
`;

const EnergyBattleFrame = ({
  volumeMeter,
  isPlay,
  gameElement,
  canvasWidth,
  canvasHeight,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let testInterval;
    console.log("canvas");
    if (isPlay) {
      console.log("isPlay");
      testInterval = setInterval(() => {
        const volume = volumeMeter.getVolume();
        console.log("volume: ", volume * 30);
      }, 1000);
    }

    return () => clearInterval(testInterval);
  }, []);
  return <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default EnergyBattleFrame;
