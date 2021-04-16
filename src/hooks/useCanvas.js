import { useEffect, useRef } from "react";

const useCanvas = (CanvasGenerator) => {
  const canvasRef = useRef();

  useEffect(() => {
    const myCanvas = new CanvasGenerator(canvasRef);

    return () => {
      window.cancelAnimationFrame(myCanvas.animationFrameId);
    };
  },[CanvasGenerator]);

  return canvasRef;
};

export default useCanvas;
