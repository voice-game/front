import { useEffect, useRef, useState } from "react";
import getAudioContext from "../utils/getAudioContext";
import getMedia from "../utils/getMedia";

/**
 *
 * @param {object} contextOption option for audioContext
 * @param {object} mediaOption option for mediaStream
 * @returns audioState, audioContext Ref, mediaStream Ref
 */
const useAudio = (contextOption, mediaOption) => {
  const [isAudioUse, setIsAudioUse] = useState(false);
  const audioContextRef = useRef(null);
  const micStreamRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        setTimeout(() => {
          audioContextRef.current = getAudioContext(contextOption);
          setIsAudioUse(true);
        }, 200);

        micStreamRef.current = await getMedia(mediaOption);
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      console.log("micStreamRef");
      console.log(micStreamRef.current);
      micStreamRef.current?.getTracks()[0].stop();
    };
  }, [contextOption, mediaOption]);

  return {
    isAudioUse,
    audioContextRef,
    micStreamRef,
  };
};

export default useAudio;
