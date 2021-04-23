import React, { useState, useEffect, useRef } from "react";
import useImage from "../../hooks/useImage";
import MonsterEscapeFrame from "../MonsterEscapeFrame/MonsterEscapeFrame";
import GameResult from "../GameResult/GameResult";
import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";
import Background from "../../games/MonsterEscape/Background";
import Box from "../../games/MonsterEscape/Box";
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
import bat from "../../images/monsterEscape/bat.png";
import batCollision from "../../images/monsterEscape/batCollision.png";
import batDead from "../../images/monsterEscape/batDead.png";
import background from "../../images/monsterEscape/background.png";
import heart from "../../images/monsterEscape/heart.png";
import gameOver from "../../images/monsterEscape/gameOver.png";
import controlBox from "../../images/monsterEscape/controlBox.png";
import settingBox from "../../images/monsterEscape/settingBox.png";
import playButton from "../../images/monsterEscape/playButton.png";
import replayButton from "../../images/monsterEscape/replayButton.png";
import minusButton from "../../images/monsterEscape/minusButton.png";
import plusButton from "../../images/monsterEscape/plusButton.png";
import downButton from "../../images/monsterEscape/downButton.png";
import upButton from "../../images/monsterEscape/upButton.png";
import volumeIcon from "../../images/monsterEscape/volumeIcon.png";
import batSpeed from "../../images/monsterEscape/batSpeed.png";

const canvasWidth = document.body.clientWidth * 0.8;
const canvasHeight = document.body.clientWidth * 0.6;
const playInfoImageUrls = [heart, gameOver];
const boxImageUrls = [
  controlBox,
  settingBox,
  playButton,
  replayButton,
  minusButton,
  plusButton,
  downButton,
  upButton,
  volumeIcon,
  batSpeed,
];
const backgroundImageUrls = [background];
const monsterImageUrls = [bat, batCollision, batDead];
const enenmyImageUrls = [witch, cyclops, dionaea, dagger];
const ceilingImageUrls = [spider];
const groundImageUrls = [leftTree, rightTree, hill, house, light, tomb, fence];

const MonsterEscape = ({ socket, roomId, player, otherPlayers }) => {
  const [stream, setStream] = useState({});
  const [volumeMeter, setVolumeMeter] = useState({});
  const [isInitGame, setIsInitGame] = useState(false);
  const [playInfoImages, setPlayInfoImages] = useState([]);
  const [boxImages, setBoxImages] = useState([]);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [monsterImages, setMonsterImages] = useState([]);
  const [groundImages, setGroundImages] = useState([]);
  const [enemyImages, setEnenmyImageUrls] = useState([]);
  const [ceilingImages, setCeilingImages] = useState([]);
  const [gameElement, setGameElement] = useState({});
  const groundSpeedRef = useRef();

  useEffect(() => {
    (async () => {
      const stream = await getMedia({ audio: true });
      const volumeMeter = new VolumeMeter(stream, {
        bufferSize: 4096,
        minDecibels: -60,
        maxDecibels: -30,
        timeConstant: 0.9,
      });

      setStream(stream);
      setVolumeMeter(volumeMeter);
    })();
  }, []);

  useImage(backgroundImageUrls, setBackgroundImages);
  useImage(boxImageUrls, setBoxImages);
  useImage(playInfoImageUrls, setPlayInfoImages);
  useImage(monsterImageUrls, setMonsterImages);
  useImage(groundImageUrls, setGroundImages);
  useImage(ceilingImageUrls, setCeilingImages);
  useImage(enenmyImageUrls, setEnenmyImageUrls);

  useEffect(() => {
    if (!monsterImages.length) return;
    if (!groundImages.length) return;
    if (!enemyImages.length) return;
    if (!ceilingImages.length) return;
    if (!playInfoImages.length) return;
    if (!boxImages.length) return;

    const ceilingMap = new GameMap("celing", canvasWidth, canvasHeight, ceilingImages);

    const groundMap = new GameMap("ground", canvasWidth, canvasHeight, groundImages);

    const enemyMap = new GameMap("enemy", canvasWidth, canvasHeight, enemyImages);

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

    ceilingMap.setGameMap("onCeiling", 4, [0, 0, 0, 0], [0.2, 0.2, 0.2, 0.2], [0, 0, 0, 0]);

    const background = new Background(canvasWidth, canvasHeight, backgroundImages);

    const box = new Box(boxImages);
    const playInfo = new PlayInfo(playInfoImages);
    const ceiling = new Obstacle(ceilingMap.gameMap, canvasWidth);
    const ground = new Obstacle(groundMap.gameMap, canvasWidth);
    const enemy = new Obstacle(enemyMap.gameMap, canvasWidth);
    const monster = new Monster(monsterImages, 0.1, 3);
    monster.setPosition(canvasWidth, canvasHeight, 36);

    setIsInitGame(true);
    setGameElement({
      box,
      playInfo,
      background,
      ceiling,
      ground,
      enemy,
      monster,
    });
  }, [
    boxImages,
    playInfoImages,
    backgroundImages,
    ceilingImages,
    groundImages,
    enemyImages,
    monsterImages,
    isInitGame,
  ]);

  return (
    <div>
      <div>Monster Escape</div>
      <MonsterEscapeFrame
        socket={socket}
        stream={stream}
        volumeMeter={volumeMeter}
        gameElement={gameElement}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        roomId={roomId}
        isInitGame={isInitGame}
        setIsInitGame={setIsInitGame}
      />
      <GameResult />
    </div>
  );
};

export default MonsterEscape;
