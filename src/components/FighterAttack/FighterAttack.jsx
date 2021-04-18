import React, { useState, useEffect, useRef } from "react";
import FighterAttackFrame from "../FighterAttackFrame/FighterAttackFrame";
import GameResult from "../GameResult/GameResult";
import GameOption from "../GameOption/GameOption";
import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";
import Fighter from "../../games/fighterAttack/Fighter";
import Obstacle from "../../games/fighterAttack/Obstacle";
import tree1 from "../../images/fighterAttack/tree1.png";
import tree2 from "../../images/fighterAttack/tree2.png";
import bird1 from "../../images/fighterAttack/bird1.png";
import bird2 from "../../images/fighterAttack/bird2.png";
import cloud1 from "../../images/fighterAttack/cloud1.png";

const canvasWidth = document.body.clientWidth * 0.8;
const canvasHeight = document.body.clientWidth * 0.6;

const FighterAttack = (props) => {
  const [stream, setStream] = useState({});
  const [volumeMeter, setVolumeMeter] = useState({});
  const [isPlay, setIsPlay] = useState(false);
  const gameElementRef = useRef({});

  useEffect(() => {
    (async () => {
      const stream = await getMedia({ audio: true });
      const volumeMeter = new VolumeMeter(stream, {
        bufferSize: 2048,
        minDecibels: -60,
        maxDecibels: -30,
        timeConstant: 0.9,
      });

      setStream(stream);
      setVolumeMeter(volumeMeter);
    })();
  }, []);

  useEffect(() => {
    const fighter = new Fighter(50, 50, 1, "black");

    const tree = new Obstacle(
      "onGround",
      0.2 * canvasHeight,
      0.3 * canvasHeight,
    );

    tree.loadImages([tree1, tree2], () => {
      tree.setObstacleLayouts(canvasWidth, canvasHeight, 10);
    });

    const bird = new Obstacle(
      "onAir",
      0.05 * canvasHeight,
      0.05 * canvasHeight,
      0.2 * canvasHeight,
      0.6 * canvasHeight,
    );

    bird.loadImages([bird1, bird2], () => {
      bird.setObstacleLayouts(canvasWidth, canvasHeight, 5);
    });

    const cloud = new Obstacle(
      "onAir",
      0.3 * canvasHeight,
      0.3 * canvasHeight,
      -0.2 * canvasHeight,
      0.0 * canvasHeight,
    );

    cloud.loadImages([cloud1], () => {
      cloud.setObstacleLayouts(canvasWidth, canvasHeight, 5);
    });

    gameElementRef.current = { fighter, tree, bird, cloud };
  }, []);

  const handlePlayClick = () => setIsPlay(true);
  const handleStopClick = () => setIsPlay(false);

  return (
    <div>
      <div>Fighter Attack</div>
      <GameOption />
      <FighterAttackFrame
        stream={stream}
        volumeMeter={volumeMeter}
        isPlay={isPlay}
        gameElement={gameElementRef.current}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />
      <GameResult />
      <button onClick={handlePlayClick}>Play</button>
      <button onClick={handleStopClick}>Stop</button>
    </div>
  );
};

export default FighterAttack;
