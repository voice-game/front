import { useEffect, useRef } from "react";

/**
 *
 * @param {boolean} audioState Whether to use audio
 * @param {object} option Option for audioContext
 * @returns Ref of audioContext
 */
const useAudioContext = (audioState, option) => {
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (audioState) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)(option);
    }
  }, [audioState, option]);

  return audioContextRef;
};

export default useAudioContext;
