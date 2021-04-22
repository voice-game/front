import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { USER_SERVER } from "../../constants/constants";

const Canvas = styled.canvas`
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid black;
  background-color: skyblue;
`;

const EnergyBattleFrame = ({
  volumeMeter,
  isPlay,
  socket,
  playerData,
  gameElement,
  canvasWidth,
  canvasHeight,
}) => {
  const canvasRef = useRef(null);
  const otherPlayerInputRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    let count = 0;

    socket.on("input-other-player", (data) => {
      otherPlayerInputRef.current = data;
    });

    if (isPlay) {
      const draw = (timeStamp) => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        count++;

        const volume = volumeMeter.getVolume();
        // console.log("my", volume);

        if (count % 5 === 0) {
          // console.log("other", otherPlayerInputRef.current);
          socket.emit("input-player", volume);
        }

        ctx.beginPath();
        ctx.rect(100, 0, 30, 300);
        ctx.fillStyle = "rgba(19, 73, 89, 0)";
        ctx.fill();
        ctx.strokeStyle = "rgba(19, 73, 89, 0)";
        ctx.strokeRect(100, 0, 30, 300);

        ctx.rect(200, 0, 30, otherPlayerInputRef.current * 300);
        ctx.fillStyle = "rgba(19, 73, 89, 0)";
        ctx.fill();
        ctx.strokeStyle = "rgba(19, 73, 89, 0)";
        ctx.strokeRect(100, 0, 30, otherPlayerInputRef.current * 300);

        // console.log("player", volume);

        animationIdRef.current = requestAnimationFrame(draw);
      };

      draw();
    }

    return () => cancelAnimationFrame(animationIdRef.current);
  }, [volumeMeter, gameElement, isPlay, canvasWidth, canvasHeight]);

  return (
    <>
      <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      <div>{}</div>
    </>
  );
};

export default EnergyBattleFrame;
