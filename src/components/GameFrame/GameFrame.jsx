import React from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  position: absolute;
  border: 1px solid red;
  background-image: url(${props => props.backgroundImage});
  background-size: contain;

  z-index: ${props => {
    switch (props.id) {
      case "ui-layer":
        return 3;
      case "game-layer":
        return 2;
      case "background-layer":
        return 1;
      default:
        return 1;
    }
  }};
`;

const GameFrame = ({
  id,
  canvasRef,
  width,
  height,
  backgroundImage
}) => {
  return (
    <>
      <Canvas
        id={id}
        ref={canvasRef}
        width={width}
        height={height}
        backgroundImage={backgroundImage}
      />
    </>
  );
};

export default GameFrame;
