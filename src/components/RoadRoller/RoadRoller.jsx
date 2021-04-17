import React, { useState } from "react";
import Game from "../../games/roadRoller";
import useAudioContext from "../../hooks/useAudioContext";
import useCanvas from "../../hooks/useCanvas";
import useMediaStream from "../../hooks/useMediaStream";
import GameFrame from "../GameFrame/GameFrame";
import GameOption from "../GameOption/GameOption";
import GameResult from "../GameResult/GameResult";

const RoadRoller = (props) => {
  const [useAudio, setUseAudio] = useState(true);
  const audioContext = useAudioContext(useAudio, { sampleRate: 12000 });
  const mediaStream = useMediaStream(useAudio, { audio: true, video: false });
  const game = useCanvas(Game);

  return (
    <div>
      <GameOption />
      <GameFrame canvasRef={game} />
      <GameResult />
    </div>
  );
};

export default RoadRoller;
