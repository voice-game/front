import { useEffect, useRef } from "react";
import ml5 from "ml5";
import getAudioContext from "../utils/getAudioContext";
import getMedia from "../utils/getMedia";

const usePitchDetector = (useAudio) => {
  const pitchDetectorRef = useRef(null);

  useEffect(() => {
    if (useAudio) {
      (async () => {
        try {
          const audioContext = getAudioContext({ samplerate: 12000 });
          const micStream = await getMedia({ audio: true, video: false });
          const pitchDetector = ml5.pitchDetection(
            "/model/",
            audioContext,
            micStream
          );

          pitchDetectorRef.current = pitchDetector;
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [useAudio]);
  return pitchDetectorRef.current;
};

export default usePitchDetector;
