import React from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  width: 800px;
  height: 500px;
  border: 1px solid red;
`;

const GameFrame = ({ canvasRef }) => {
  return (
    <>
      <Canvas ref={canvasRef} width="1000" height="600" />
    </>
  );
};

export default GameFrame;
