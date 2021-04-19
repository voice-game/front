import { useEffect, useRef } from "react";
import { removeEventHelper } from "../utils/eventListHelper";

/**
 *
 * @param {function} CanvasConstructor Canvas constructor function
 * @param {object} options Options of canvas
 * @returns Ref of canvas
 */
const useCanvas = (CanvasConstructor, options) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const myCanvas = new CanvasConstructor(canvasRef, options);

    return () => {
      window.cancelAnimationFrame(myCanvas.animationFrameId);
      removeEventHelper(myCanvas.eventList);
    };
  }, []);

  return canvasRef;
};

export default useCanvas;
