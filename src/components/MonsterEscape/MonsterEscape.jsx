import React, { useState, useEffect } from "react";
import useImage from "../../hooks/useImage";
import MonsterEscapeFrame from "../MonsterEscapeFrame/MonsterEscapeFrame";
import GameResult from "../GameResult/GameResult";
import GameOption from "../GameOption/GameOption";
import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";
import Background from "../../games/MonsterEscape/Background";
import Monster from "../../games/MonsterEscape/Monster";
import Obstacle from "../../games/MonsterEscape/Obstacle";
import PlayInfo from "../../games/MonsterEscape/PlayInfo";
import GameMap from "../../games/MonsterEscape/GameMap";

import leftTree from "../../images/monsterEscape/leftTree.png";
import rightTree from "../../images/monsterEscape/rightTree.png";
import hill from "../../images/monsterEscape/hill.png";
import house from "../../images/monsterEscape/house.png";
import light from "../../images/monsterEscape/light.png";
import tomb from "../../images/monsterEscape/tomb.png";
import fence from "../../images/monsterEscape/fence.png";
import spider from "../../images/monsterEscape/spider.png";
import witch from "../../images/monsterEscape/witch.png";
import cyclops from "../../images/monsterEscape/cyclops.png";
import dionaea from "../../images/monsterEscape/dionaea.png";
import dagger from "../../images/monsterEscape/dagger.png";
import purpleBat from "../../images/monsterEscape/purpleBat.png";
import background from "../../images/monsterEscape/background.png";

const canvasWidth = document.body.clientWidth * 0.8;
const canvasHeight = document.body.clientWidth * 0.6;

const backgroundImageUrls = [background];
const monsterImageUrls = [purpleBat];
const enenmyImageUrls = [witch, cyclops, dionaea, dagger];
const ceilingImageUrls = [spider];
const groundImageUrls = [leftTree, rightTree, hill, house, light, tomb, fence];

const MonsterEscape = (props) => {
  const [stream, setStream] = useState({});
  const [volumeMeter, setVolumeMeter] = useState({});
  const [isPlay, setIsPlay] = useState(false);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [monsterImages, setMonsterImages] = useState([]);
  const [groundImages, setGroundImages] = useState([]);
  const [enemyImages, setEnenmyImageUrls] = useState([]);
  const [ceilingImages, setCeilingImages] = useState([]);
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

  useImage(backgroundImageUrls, setBackgroundImages);
  useImage(monsterImageUrls, setMonsterImages);
  useImage(groundImageUrls, setGroundImages);
  useImage(ceilingImageUrls, setCeilingImages);
  useImage(enenmyImageUrls, setEnenmyImageUrls);

  useEffect(() => {
    if (!monsterImages.length) return;
    if (!groundImages.length) return;
    if (!enemyImages.length) return;
    if (!ceilingImages.length) return;

    const groundSpeed = 2;

    const ceilingMap = new GameMap(
      "celing",
      canvasWidth,
      canvasHeight,
      ceilingImages,
    );

    const groundMap = new GameMap(
      "ground",
      canvasWidth,
      canvasHeight,
      groundImages,
    );

    const enemyMap = new GameMap(
      "enemy",
      canvasWidth,
      canvasHeight,
      enemyImages,
    );

    enemyMap.setGameMap(
      "onAir",
      7,
      [0.5, 0.2, 0.6, 0.2, 0.3, 0.6, 0.4],
      [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
      [0, 1, 2, 3, 0, 2, 1],
    );

    groundMap.setGameMap(
      "onGround",
      7,
      [0, 0, 0, 0, 0, 0, 0],
      [0.05, 0.1, 0.2, 0.2, 0.3, 0.05, 0.2],
      [2, 5, 0, 4, 3, 6, 1],
    );

    ceilingMap.setGameMap(
      "onCeiling",
      4,
      [0, 0, 0, 0],
      [0.2, 0.2, 0.2, 0.2],
      [0, 0, 0, 0],
    );

    const background = new Background(
      canvasWidth,
      canvasHeight,
      backgroundImages,
    );

    const playInfo = new PlayInfo();
    const ceiling = new Obstacle(ceilingMap.gameMap, 0.2 * groundSpeed);
    const ground = new Obstacle(groundMap.gameMap, groundSpeed);
    const enemy = new Obstacle(enemyMap.gameMap, 1.5 * groundSpeed);
    const monster = new Monster(0, monsterImages, 50, 3, 5);
    monster.setPosition(canvasWidth, canvasHeight, 36);

    setGameElement({ playInfo, background, ceiling, ground, enemy, monster });
  }, [
    backgroundImages,
    ceilingImages,
    groundImages,
    enemyImages,
    monsterImages,
  ]);

  const handlePlayClick = () => setIsPlay(true);
  const handleStopClick = () => setIsPlay(false);

  return (
    <div>
      <div>Monster Escape</div>
      <GameOption />
      <MonsterEscapeFrame
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

export default MonsterEscape;
