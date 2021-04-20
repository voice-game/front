import React, { useState, useEffect } from "react";
import useImage from "../../hooks/useImage";
import FighterAttackFrame from "../FighterAttackFrame/FighterAttackFrame";
import GameResult from "../GameResult/GameResult";
import GameOption from "../GameOption/GameOption";
import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";
import Background from "../../games/fighterAttack/Background";
import Monster from "../../games/fighterAttack/Fighter";
import Obstacle from "../../games/fighterAttack/Obstacle";
import PlayInfo from "../../games/fighterAttack/PlayInfo";
import GameMap from "../../games/fighterAttack/GameMap";

import leftTree from "../../images/fighterAttack/leftTree.png";
import rightTree from "../../images/fighterAttack/rightTree.png";
import hill from "../../images/fighterAttack/hill.png";
import house from "../../images/fighterAttack/house.png";
import light from "../../images/fighterAttack/light.png";
import tomb from "../../images/fighterAttack/tomb.png";
import fence from "../../images/fighterAttack/fence.png";
import spider from "../../images/fighterAttack/spider.png";

import witch from "../../images/fighterAttack/witch.png";
import cyclops from "../../images/fighterAttack/cyclops.png";
import dionaea from "../../images/fighterAttack/dionaea.png";
import dagger from "../../images/fighterAttack/dagger.png";
import purpleBat from "../../images/fighterAttack/purpleBat.png";
import background from "../../images/fighterAttack/background.png";

const canvasWidth = document.body.clientWidth * 0.8;
const canvasHeight = document.body.clientWidth * 0.6;

const backgroundImageUrls = [background];
const monsterImageUrls = [purpleBat];
const enenmyImageUrls = [witch, cyclops, dionaea, dagger];
const ceilingImageUrls = [spider];
const groundImageUrls = [leftTree, rightTree, hill, house, light, tomb, fence];

const FighterAttack = (props) => {
  const [stream, setStream] = useState({});
  const [volumeMeter, setVolumeMeter] = useState({});
  const [isPlay, setIsPlay] = useState(false);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [monsterImages, setMonsterImages] = useState([]);
  const [groundImages, setGroundImages] = useState([]);
  const [enemyImages, setEnenmyImageUrls] = useState([]);
  const [celingImages, setCelingImages] = useState([]);
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
  useImage(ceilingImageUrls, setCelingImages);
  useImage(enenmyImageUrls, setEnenmyImageUrls);

  useEffect(() => {
    if (!monsterImages.length) return;
    if (!groundImages.length) return;
    if (!enemyImages.length) return;
    if (!celingImages.length) return;

    const groundSpeed = 3;

    const groundMap = new GameMap(
      "ground",
      canvasWidth,
      canvasHeight,
      groundImages,
    );
    groundMap.setGameMap(
      "onGround",
      7,
      [0, 0, 0, 0, 0, 0, 0],
      [0.2, 0.1, 0.15, 0.1, 0.2, 0.3, 0.15],
      [2, 5, 0, 4, 3, 6, 1],
    );
    const ground = new Obstacle(groundMap.gameMap, groundSpeed);

    const enemyMap = new GameMap(
      "enemy",
      canvasWidth,
      canvasHeight,
      enemyImages,
    );
    enemyMap.setGameMap(
      "onAir",
      7,
      [0.5, 0.2, 0.6, 0.7, 0.3, 0.5, 0.4],
      [0.1, 0.05, 0.1, 0.05, 0.1, 0.1, 0.05],
      [0, 1, 2, 3, 0, 2, 1],
    );
    const enemy = new Obstacle(enemyMap.gameMap, 1.5 * groundSpeed);

    const celingMap = new GameMap(
      "celing",
      canvasWidth,
      canvasHeight,
      celingImages,
    );
    celingMap.setGameMap(
      "onAir",
      5,
      [0.1, 0.1, 0.1, 0.1, 0.1],
      [0.1, 0.1, 0.1, 0.1, 0.1],
      [0, 0, 0, 0, 0],
    );
    const celing = new Obstacle(celingMap.gameMap, 0.2 * groundSpeed);

    const background = new Background(
      canvasWidth,
      canvasHeight,
      backgroundImages,
    );

    const playInfo = new PlayInfo(groundSpeed, 5);

    const monster = new Monster(0, monsterImages, 50, groundSpeed, 5);
    monster.setPosition(canvasWidth, canvasHeight, 36);

    setGameElement({ playInfo, background, monster, ground, enemy, celing });
  }, [
    backgroundImages,
    monsterImages,
    groundImages,
    enemyImages,
    celingImages,
  ]);

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
