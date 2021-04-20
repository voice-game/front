import React, { useState, useEffect } from "react";
import useImage from "../../hooks/useImage";
import FighterAttackFrame from "../FighterAttackFrame/FighterAttackFrame";
import GameResult from "../GameResult/GameResult";
import GameOption from "../GameOption/GameOption";
import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";
import Fighter from "../../games/fighterAttack/Fighter";
import Obstacle from "../../games/fighterAttack/Obstacle";
import PlayInfo from "../../games/fighterAttack/PlayInfo";
import GameMap from "../../games/fighterAttack/GameMap";

import tree1 from "../../images/fighterAttack/tree1.png";
import tree2 from "../../images/fighterAttack/tree2.png";
import bird1 from "../../images/fighterAttack/bird1.png";
import bird2 from "../../images/fighterAttack/bird2.png";
import cloud1 from "../../images/fighterAttack/cloud1.png";
import fighter1 from "../../images/fighterAttack/fighter1.jpeg";

const canvasWidth = document.body.clientWidth * 0.8;
const canvasHeight = document.body.clientWidth * 0.6;

const fighterImageUrls = [fighter1];
const treeImageUrls = [tree1, tree2];
const birdImageUrls = [bird1, bird2];
const cloudImageUrls = [cloud1];

const FighterAttack = (props) => {
  const [stream, setStream] = useState({});
  const [volumeMeter, setVolumeMeter] = useState({});
  const [isPlay, setIsPlay] = useState(false);
  const [fighterImages, setFighterImages] = useState([]);
  const [treeImages, setTreeImages] = useState([]);
  const [birdImages, setBirdImages] = useState([]);
  const [cloudImages, setCloudImages] = useState([]);
  const [gameElement, setGameElement] = useState({});

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

  useImage(fighterImageUrls, setFighterImages);
  useImage(treeImageUrls, setTreeImages);
  useImage(cloudImageUrls, setCloudImages);
  useImage(birdImageUrls, setBirdImages);

  useEffect(() => {
    if (!fighterImages.length) return;
    if (!treeImages.length) return;
    if (!birdImages.length) return;
    if (!cloudImages.length) return;

    const groundSpeed = 3;

    const treeMap = new GameMap("tree", canvasWidth, canvasHeight, treeImages);
    treeMap.setGameMap(
      "onGround",
      7,
      [0, 0, 0, 0, 0, 0, 0],
      [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
      [0, 1, 0, 1, 0, 1, 0],
    );
    const tree = new Obstacle(treeMap.gameMap, groundSpeed);

    const birdMap = new GameMap("bird", canvasWidth, canvasHeight, birdImages);
    birdMap.setGameMap(
      "onAir",
      7,
      [0.5, 0.2, 0.6, 0.7, 0.3, 0.5, 0.4],
      [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
      [0, 1, 0, 1, 0, 1, 0],
    );
    const bird = new Obstacle(birdMap.gameMap, 0.5 * groundSpeed);

    const cloudMap = new GameMap(
      "cloud",
      canvasWidth,
      canvasHeight,
      cloudImages,
    );
    cloudMap.setGameMap(
      "onAir",
      5,
      [0.1, 0.1, 0.1, 0.1, 0.1],
      [0.2, 0.2, 0.2, 0.2, 0.2],
      [0, 0, 0, 0, 0],
    );
    const cloud = new Obstacle(cloudMap.gameMap, 0.2 * groundSpeed);

    const playInfo = new PlayInfo(groundSpeed, 5);

    const fighter = new Fighter(0, fighterImages, 80, groundSpeed, 5);
    fighter.setPosition(canvasWidth, canvasHeight);

    setGameElement({ playInfo, fighter, tree, bird, cloud });
  }, [fighterImages, treeImages, birdImages, cloudImages]);

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
        gameElement={gameElement}
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
