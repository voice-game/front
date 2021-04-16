import { useEffect, useRef } from "react";
import { removeEventHelper } from "../utils/eventListHelper";

const useCanvas = (CanvasGenerator) => {
  const canvasRef = useRef();

  useEffect(() => {
    const myCanvas = new CanvasGenerator(canvasRef);

    return () => {
      window.cancelAnimationFrame(myCanvas.animationFrameId);
      removeEventHelper(myCanvas.eventList);
    };
  },[CanvasGenerator]);

  return canvasRef;
};

export default useCanvas;
