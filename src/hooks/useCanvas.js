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
      if (myCanvas.animationFrameId) {
        window.cancelAnimationFrame(myCanvas.animationFrameId);
      }

      if (myCanvas.eventList) {
        removeEventHelper(myCanvas.eventList);
      }
    };
  }, [CanvasConstructor, options]);

  return canvasRef;
};

export default useCanvas;
