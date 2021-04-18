import React, { useEffect, useRef, useState } from "react";
import Game from "../../games/roadRoller";
import useCanvas from "../../hooks/useCanvas";
import usePitchDetector from "../../hooks/usePitchDetector";
import getAudioContext from "../../utils/getAudioContext";
import getMedia from "../../utils/getMedia";
import GameFrame from "../GameFrame/GameFrame";
import GameOption from "../GameOption/GameOption";
import GameResult from "../GameResult/GameResult";

const RoadRoller = (props) => {
  const [isAudioUse, setIsAudioUse] = useState(false);
  const audioContextRef = useRef(null);
  const micStreamRef = useRef(null);
  const pitchDetector = usePitchDetector(isAudioUse, audioContextRef, micStreamRef);
  const game = useCanvas(Game, { pitchDetector });

  useEffect(() => {
    (async () => {
      try {
        setTimeout(() => {
          audioContextRef.current = getAudioContext({ samplerate: 12000 });
        }, 1000);
        micStreamRef.current = await getMedia({ audio: true, video: false });
      } catch (err) {
        console.log(err);
      }
    })();
  })

  return (
    <div>
      <GameOption />
      <GameFrame canvasRef={game} />
      <GameResult />
      <button onClick={() => setIsAudioUse(!isAudioUse)}>Audio On</button>
      <div>W: 점프 A: 좌 D: 우</div>
    </div>
  );
};

export default RoadRoller;
