import React, { useState, useEffect, useRef } from "react";
import useImage from "../../hooks/useImage";
import MonsterEscapeFrame from "../MonsterEscapeFrame/MonsterEscapeFrame";
import GameResult from "../GameResult/GameResult";
import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";
import Background from "../../games/MonsterEscape/Background";
import ControlBox from "../../games/MonsterEscape/ControlBox";
import Monster from "../../games/MonsterEscape/Monster";
import Obstacle from "../../games/MonsterEscape/Obstacle";
import PlayInfo from "../../games/MonsterEscape/PlayInfo";
import GameMap from "../../games/MonsterEscape/GameMap";
import MultiPlayer from "../../games/MonsterEscape/MultiPlayer"

import BACKGROUNDS from "../../images/monsterEscape/backgrounds/backgrounds";
import CHARACTERS from "../../images/monsterEscape/characters/characters";
import ENEMIES from "../../images/monsterEscape/enemies/enemies";
import CELINGS from "../../images/monsterEscape/celings/celings";
import GROUNDS from "../../images/monsterEscape/grounds/grounds";
import CONTROLBOXES from "../../images/monsterEscape/controlBoxes/controlBoxes";
import PLAYINFORMATIONS from "../../images/monsterEscape/playInformations/playInformations";

const canvasWidth = document.body.clientWidth * 0.8;
const canvasHeight = document.body.clientWidth * 0.6;

const playInfoImageUrls = PLAYINFORMATIONS;
const boxImageUrls = CONTROLBOXES;
const backgroundImageUrls = BACKGROUNDS;
const monsterImageUrls = CHARACTERS;
const enenmyImageUrls = ENEMIES;
const ceilingImageUrls = CELINGS;
const groundImageUrls = GROUNDS;

const MonsterEscape = ({ socket, roomId, player, otherPlayers }) => {
  const [stream, setStream] = useState({});
  const [volumeMeter, setVolumeMeter] = useState({});
  const [isInitGame, setIsInitGame] = useState(false);
  const [playInfoImages, setPlayInfoImages] = useState([]);
  const [ctrlBoxImages, setCtrlBoxImages] = useState([]);
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
  useImage(boxImageUrls, setCtrlBoxImages);
  useImage(playInfoImageUrls, setPlayInfoImages);
  useImage(monsterImageUrls, setMonsterImages);
  useImage(groundImageUrls, setGroundImages);
  useImage(ceilingImageUrls, setCeilingImages);
  useImage(enenmyImageUrls, setEnenmyImageUrls);

  useEffect(() => {
    if (!monsterImages.length) { return };
    if (!groundImages.length) { return };
    if (!enemyImages.length) { return };
    if (!ceilingImages.length) { return } ;
    if (!playInfoImages.length) { return };
    if (!ctrlBoxImages.length) { return } ;

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
    const controlBox = new ControlBox(canvasWidth, canvasHeight, ctrlBoxImages);
    const playInfo = new PlayInfo(canvasWidth, canvasHeight, playInfoImages, 72);
    const ceiling = new Obstacle(ceilingMap.gameMap, canvasWidth);
    const ground = new Obstacle(groundMap.gameMap, canvasWidth);
    const enemy = new Obstacle(enemyMap.gameMap, canvasWidth);
    const monster = new Monster(canvasWidth, canvasHeight, monsterImages, 0.1, 3, 36);
    const multiPlayer = new MultiPlayer(canvasWidth, canvasHeight, monsterImages, 0.1, 36)

    setIsInitGame(true);

    setGameElement({
      controlBox,
      playInfo,
      background,
      ceiling,
      ground,
      enemy,
      monster,
      multiPlayer
    });
  }, [
    isInitGame,
    ctrlBoxImages,
    playInfoImages,
    backgroundImages,
    ceilingImages,
    groundImages,
    enemyImages,
    monsterImages,
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
