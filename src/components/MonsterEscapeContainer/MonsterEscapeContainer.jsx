import React, { useState, useEffect } from "react";
import MonsterEscape from "../MonsterEscape/MonsterEscape";
import ControlBox from "../../games/MonsterEscape/ControlBox";
import Monster from "../../games/MonsterEscape/Monster";
import Obstacle from "../../games/MonsterEscape/Obstacle";
import PlayInfo from "../../games/MonsterEscape/PlayInfo";
import GameMap from "../../games/MonsterEscape/GameMap";
import MultiPlayer from "../../games/MonsterEscape/MultiPlayer";
import gameMap from "../../games/MonsterEscape/gameMap.json";
import useMyImage from "../../hooks/useMyImage";
import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";

const FPS = 36;
const { innerWidth, innerHeight } = window;
const minViewPort = Math.min(innerWidth, innerHeight);
const canvasWidth = 0.8 * minViewPort;
const canvasHeight = 0.6 * minViewPort;

const MonsterEscapeContainer = ({ socket, creater, player, roomId, otherPlayers }) => {
  const [volumeMeter, setVolumeMeter] = useState(null);
  const [isInitGame, setIsInitGame] = useState(false);
  const [gameElement, setGameElement] = useState({});

  const { image, isLoaded } = useMyImage("monsterEscape");

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
    if (!isLoaded) {
      return;
    }
    const ceilingMap = new GameMap(
      "ceiling",
      canvasWidth,
      canvasHeight,
      image.obstacles.ceiling,
    );
    const groundMap = new GameMap(
      "ground",
      canvasWidth,
      canvasHeight,
      image.obstacles.ground,
    );
    const enemyMap = new GameMap(
      "enemy",
      canvasWidth,
      canvasHeight,
      image.obstacles.enemy,
    );

    enemyMap.setGameMap(gameMap.enemy);
    groundMap.setGameMap(gameMap.ground);
    ceilingMap.setGameMap(gameMap.ceiling);

    const controlBox = new ControlBox(canvasWidth, canvasHeight, image);
    const playInfo = new PlayInfo(canvasWidth, canvasHeight, image, FPS);
    const ceiling = new Obstacle(ceilingMap.gameMap, canvasWidth);
    const ground = new Obstacle(groundMap.gameMap, canvasWidth);
    const enemy = new Obstacle(enemyMap.gameMap, canvasWidth);
    const myMonster = new Monster(canvasWidth, canvasHeight, image, 0.1, 3, FPS);
    const yourMonster = new MultiPlayer(canvasWidth, canvasHeight, image, 0.1, FPS);

    setIsInitGame(true);

    setGameElement({
      controlBox,
      playInfo,
      ceiling,
      ground,
      enemy,
      myMonster,
      yourMonster,
    });
  }, [
    isInitGame,
    isLoaded,
    image,
  ]);

  return (
    <div>
      <MonsterEscape
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

export default MonsterEscapeContainer;
