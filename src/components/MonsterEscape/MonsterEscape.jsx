import React, { useState, useEffect } from "react";
import useImage from "../../hooks/useImage";
import MonsterEscapeFrame from "../MonsterEscapeFrame/MonsterEscapeFrame";
import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";
import Background from "../../games/MonsterEscape/Background";
import ControlBox from "../../games/MonsterEscape/ControlBox";
import Monster from "../../games/MonsterEscape/Monster";
import Obstacle from "../../games/MonsterEscape/Obstacle";
import PlayInfo from "../../games/MonsterEscape/PlayInfo";
import GameMap from "../../games/MonsterEscape/GameMap";
import MultiPlayer from "../../games/MonsterEscape/MultiPlayer";

import BACKGROUNDS from "../../images/monsterEscape/backgrounds/backgrounds";
import CHARACTERS from "../../images/monsterEscape/characters/characters";
import OBSTACLES from "../../images/monsterEscape/obstacles/obstacles";
import CONTROLBOXES from "../../images/monsterEscape/controlBoxes/controlBoxes";
import PLAYINFORMATIONS from "../../images/monsterEscape/playInformations/playInformations";

import gameMap from "../../games/MonsterEscape/gameMap.json";

const FPS = 36;
const { innerWidth, innerHeight } = window;
const minViewPort = Math.min(innerWidth, innerHeight);
const canvasWidth = 0.8 * minViewPort;
const canvasHeight = 0.6 * minViewPort;

const playInfoImageUrl = PLAYINFORMATIONS.playInformation;
const ctrlboxImageUrl = CONTROLBOXES.controlBox;
const backgroundImageUrl = BACKGROUNDS.background;
const myMonsterImageUrl = CHARACTERS.bat;
const yourMonsterImageUrl = CHARACTERS.goblin;
const enenmyImageUrl = OBSTACLES.enemy;
const ceilingImageUrl = OBSTACLES.ceiling;
const groundImageUrl = OBSTACLES.ground;

const MonsterEscape = ({ socket, creater, player, roomId, otherPlayers }) => {
  const [volumeMeter, setVolumeMeter] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isInitGame, setIsInitGame] = useState(false);
  const [gameElement, setGameElement] = useState({});

  const backgroundImages = useImage(backgroundImageUrl, null);
  const ctrlBoxImages = useImage(ctrlboxImageUrl, null);
  const playInfoImages = useImage(playInfoImageUrl, null);
  const myMonsterImages = useImage(myMonsterImageUrl, null);
  const yourMonsterImages = useImage(yourMonsterImageUrl, null);
  const groundImages = useImage(groundImageUrl, null);
  const ceilingImages = useImage(ceilingImageUrl, null);
  const enemyImages = useImage(enenmyImageUrl, null);

  useEffect(() => {
    (async () => {
      const stream = await getMedia({ audio: true });
      const volumeMeter = new VolumeMeter(stream, {
        bufferSize: 4096,
        minDecibels: -60,
        maxDecibels: -30,
        timeConstant: 0.9,
      });

      setVolumeMeter(volumeMeter);
    })();
  }, []);

  useEffect(() => {
    const images = [
      myMonsterImages,
      yourMonsterImages,
      groundImages,
      enemyImages,
      ceilingImages,
      playInfoImages,
      ctrlBoxImages,
    ];
    const isImageLoaded = images.every((image) => image);
    if (isImageLoaded) {
      setIsImageLoaded(true);
    }
  }, [
    myMonsterImages,
    yourMonsterImages,
    groundImages,
    enemyImages,
    ceilingImages,
    playInfoImages,
    ctrlBoxImages,
  ]);

  useEffect(() => {
    if (!isImageLoaded) {
      return;
    }

    const ceilingMap = new GameMap(
      "ceiling",
      canvasWidth,
      canvasHeight,
      ceilingImages
    );
    const groundMap = new GameMap(
      "ground",
      canvasWidth,
      canvasHeight,
      groundImages
    );
    const enemyMap = new GameMap(
      "enemy",
      canvasWidth,
      canvasHeight,
      enemyImages
    );

    enemyMap.setGameMap(gameMap.enemy);
    groundMap.setGameMap(gameMap.ground);
    ceilingMap.setGameMap(gameMap.ceiling);

    const background = new Background(
      canvasWidth,
      canvasHeight,
      backgroundImages
    );
    const controlBox = new ControlBox(canvasWidth, canvasHeight, ctrlBoxImages);
    const playInfo = new PlayInfo(
      canvasWidth,
      canvasHeight,
      playInfoImages,
      FPS
    );
    const ceiling = new Obstacle(ceilingMap.gameMap, canvasWidth);
    const ground = new Obstacle(groundMap.gameMap, canvasWidth);
    const enemy = new Obstacle(enemyMap.gameMap, canvasWidth);
    const myMonster = new Monster(
      canvasWidth,
      canvasHeight,
      myMonsterImages,
      0.1,
      3,
      FPS
    );
    const yourMonster = new MultiPlayer(
      canvasWidth,
      canvasHeight,
      yourMonsterImages,
      0.1,
      FPS
    );

    setIsInitGame(true);

    setGameElement({
      controlBox,
      playInfo,
      background,
      ceiling,
      ground,
      enemy,
      myMonster,
      yourMonster,
    });
  }, [
    isInitGame,
    isImageLoaded,
    ctrlBoxImages,
    playInfoImages,
    backgroundImages,
    ceilingImages,
    groundImages,
    enemyImages,
    myMonsterImages,
    yourMonsterImages,
  ]);

  return (
    <div>
      <div>Monster Escape</div>
      <MonsterEscapeFrame
        isInitGame={isInitGame}
        setIsInitGame={setIsInitGame}
        gameElement={gameElement}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        volumeMeter={volumeMeter}
        socket={socket}
        roomId={roomId}
        creater={creater}
        player={player}
      />
    </div>
  );
};

export default MonsterEscape;
