import Tile from "./tile";
import tile0 from "../../assets/image/tile/forest/tile_0.png";
import tile1 from "../../assets/image/tile/forest/tile_1.png";

class GameMap {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.tiles = [
      new Tile(tile0),
      new Tile(tile1),
    ];
    this.tileWidth = 32;
    this.tileHeight = 32;

    this.gameData = {
      dots: [],
      tiles: [],
    };

    this.gameMap = this.createEmptyMap(this.canvasWidth, this.canvasHeight);
    this.fillMap(this.gameMap);
  }

  createEmptyMap(canvasWidth, canvasHeight) {
    const myGameMap = [];
    const x = canvasWidth / this.tileWidth;
    const y = canvasHeight / this.tileHeight;

    for (let i = 0; i < y; i++) {
      myGameMap.push(new Array(x));
    }

    return myGameMap;
  }

  fillMap(map) {
    const length = map.length;

    this.fillMapHelper(1, 0, length - 2, this.tileWidth, this.tileHeight, 16);
    this.fillMapHelper(0, 0, length - 1, this.tileWidth, this.tileHeight, 16);

    this.fillMapHelper(1, 24, length - 2, this.tileWidth, this.tileHeight);
    this.fillMapHelper(0, 24, length - 1, this.tileWidth, this.tileHeight);

    this.fillMapHelper(1, 32, length - 6, this.tileWidth, this.tileHeight, 4);
    this.fillMapHelper(1, 30, length - 4, this.tileWidth, this.tileHeight, 2);

    this.fillMapHelper(1, 38, length - 12, this.tileWidth, this.tileHeight, 1);
    this.fillMapHelper(1, 38, length - 10, this.tileWidth, this.tileHeight, 1);
    this.fillMapHelper(1, 38, length - 8, this.tileWidth, this.tileHeight, 1);
    this.fillMapHelper(1, 38, length - 6, this.tileWidth, this.tileHeight, 1);

    this.fillMapHelper(1, 33, length - 10, this.tileWidth, this.tileHeight, 3);
    this.fillMapHelper(0, 33, length - 9, this.tileWidth, this.tileHeight, 3);

    this.fillMapHelper(1, 34, length - 14, this.tileWidth, this.tileHeight, 1);
    this.fillMapHelper(1, 34, length - 12, this.tileWidth, this.tileHeight, 1);

    this.fillMapHelper(1, 24, length - 9, this.tileWidth, this.tileHeight, 2);
    this.fillMapHelper(1, 17, length - 9, this.tileWidth, this.tileHeight, 4);
    this.fillMapHelper(0, 17, length - 8, this.tileWidth, this.tileHeight, 4);
    this.fillMapHelper(1, 26, length - 7, this.tileWidth, this.tileHeight, 1);

    this.fillMapHelper(1, 2, length - 10, this.tileWidth, this.tileHeight, 4);

    this.fillMapHelper(1, 2, 3, this.tileWidth, this.tileHeight, 1);
    this.fillMapHelper(1, 2, 5, this.tileWidth, this.tileHeight, 1);
    this.fillMapHelper(1, 2, 7, this.tileWidth, this.tileHeight, 1);

    this.fillMapHelper(1, 8, 2, this.tileWidth, this.tileHeight, 5);
    this.fillMapHelper(0, 8, 3, this.tileWidth, this.tileHeight, 5);

    this.fillMapHelper(1, 18, 3, this.tileWidth, this.tileHeight, 8);
    this.fillMapHelper(0, 18, 4, this.tileWidth, this.tileHeight, 8);
    this.fillMapHelper(0, 18, 5, this.tileWidth, this.tileHeight, 8);
  }

  fillMapHelper(value, x, y, width, height, length) {
    const posY = y * height;
    const myLength = length ? length : (this.canvasWidth - (x * width)) / width;

    if (value === 1) {
      for (let i = 0; i < myLength * width; i++) {
        const posX = (x * width) + i;

        if (this.gameData.dots[posX]) {
          this.gameData.dots[posX].push(posY);
        } else {
          this.gameData.dots[posX] = [posY];
        }

        this.gameData.dots[posX].sort((a, b) => a - b);
      }
    }

    for (let i = 0; i < myLength; i++) {
      const posX = (x + i) * width;

      this.gameData.tiles.push({
        value,
        posX,
        posY,
        width,
        height,
      });
    }
  }
}

export default GameMap;
