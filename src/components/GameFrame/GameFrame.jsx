import React from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  border: 1px solid red;
  background-image: url(${props => props.backgroundImage});
  background-size: contain;
`;

const GameFrame = ({ canvasRef, width, height, backgroundImage }) => {
  return (
    <>
      <Canvas ref={canvasRef} width={width} height={height} backgroundImage={backgroundImage} />
    </>
  );
};

export default GameFrame;
