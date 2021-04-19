import { useEffect, useRef } from "react";
import ml5 from "ml5";

/**
 *
 * @param {boolean} isAudioUse state of audio
 * @returns Ref of pitchDetector
 *
 * You can get the pitch value through the method of pitchDetector, getPitch().
 * The getPitch method returns a promise.
 *
 * reference https://ml5js.org/reference/api-PitchDetection/
 */
const usePitchDetector = (isAudioUse, audioContextRef, micStreamRef) => {
  const pitchDetectorRef = useRef(null);

  useEffect(() => {
    if (isAudioUse) {
      (async () => {
        try {
          const pitchDetector = ml5.pitchDetection(
            "/model/",
            audioContextRef.current ,
            micStreamRef.current
          );

          pitchDetectorRef.current = pitchDetector;
        } catch (err) {
          console.log(err);
        }
      })();
    } else {
      pitchDetectorRef.current = null;
    }
  }, [isAudioUse, audioContextRef, micStreamRef]);

  return pitchDetectorRef;
};

export default usePitchDetector;
