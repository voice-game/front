import React, { useEffect, useRef, useState } from "react";
import Game from "../../games/roadRoller";
import useCanvas from "../../hooks/useCanvas";
import usePitchDetector from "../../hooks/usePitchDetector";
import getAudioContext from "../../utils/getAudioContext";
import getMedia from "../../utils/getMedia";
import GameFrame from "../GameFrame/GameFrame";
import GameOption from "../GameOption/GameOption";
import GameResult from "../GameResult/GameResult";
import desert1 from "../../assets/image/background/desert/desert1.png";
import desert2 from "../../assets/image/background/desert/desert2.png";
import desert3 from "../../assets/image/background/desert/desert3.png";

const RoadRoller = (props) => {
  const [isAudioUse, setIsAudioUse] = useState(false);
  const audioContextRef = useRef(null);
  const micStreamRef = useRef(null);
  const pitchDetectorRef = usePitchDetector(isAudioUse, audioContextRef, micStreamRef);
  const game = useCanvas(Game, { pitchDetectorRef });

  useEffect(() => {
    (async () => {
      try {
        setTimeout(() => {
          audioContextRef.current = getAudioContext({ samplerate: 12000 });
        }, 100);
        micStreamRef.current = await getMedia({ audio: true, video: false });
      } catch (err) {
        console.log(err);
      }
    })();
  })

  return (
    <div>
      <GameOption />
      <GameFrame canvasRef={game} width="1000" height="600" backgroundImage={desert3} />
      <GameResult />
      <button onClick={() => setIsAudioUse(!isAudioUse)}>Audio On</button>
      <div>W: 점프 A: 좌 D: 우</div>
    </div>
  );
};

export default RoadRoller;
