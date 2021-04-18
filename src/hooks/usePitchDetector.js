import { useEffect, useRef } from "react";
import ml5 from "ml5";
import getAudioContext from "../utils/getAudioContext";
import getMedia from "../utils/getMedia";

/**
 *
 * @param {boolean} useAudio state that manages audio on/off
 * @returns Ref of pitchDetector
 *
 * You can get the pitch value through the method of pitchDetector, getPitch().
 * The getPitch method returns a promise.
 *
 * reference https://ml5js.org/reference/api-PitchDetection/
 */
const usePitchDetector = (useAudio) => {
  const pitchDetectorRef = useRef(null);

  useEffect(() => {
    if (useAudio) {
      (async () => {
        try {
          const audioContext = getAudioContext({ samplerate: 12000 });
          const micStream = await getMedia({ audio: true, video: false });
          const pitchDetector = ml5.pitchDetection("/model/", audioContext , micStream);

          pitchDetectorRef.current = pitchDetector;
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [useAudio]);

  return pitchDetectorRef.curret;
};

export default usePitchDetector;
