import { useEffect, useRef } from "react";

/**
 *
 * @param {boolean} audioState Whether to use audio
 * @param {*} constraints Media options to use
 * @returns Ref of mediaStream
 */
const useMediaStream = (audioState, constraints) => {
  const mediaStreamRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (audioState) {
        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia(constraints);
      }
    })();
  }, [audioState, constraints]);

  return mediaStreamRef;
};

export default useMediaStream;
