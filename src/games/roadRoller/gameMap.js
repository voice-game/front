import Tile from "./tile";
import tile0 from "../../assets/image/tile/forest/tile_0.png";
import tile1 from "../../assets/image/tile/forest/tile_1.png";

class GameMap {
  constructor(canvasWidth, canvasHeight, ) {
    this.tiles = [
      new Tile(tile0),
      new Tile(tile1),
    ];
    this.tileWidth = 32;
    this.tileHeight = 32;

    this.gameMap = this.createEmptyGameMap(canvasWidth, canvasHeight);
    this.fillGameMap();
  }

  draw(ctx, dots) {
    const totalY = this.gameMap.length;

    for (let y = 0; y < totalY; y++) {
      const totalX = this.gameMap[y].length;

      for (let x = 0; x < totalX; x++) {
        const contentIndex = this.gameMap[y][x];
        const targetImg = this.tiles[contentIndex];

        if (contentIndex === 1) {
          const start = x * this.tileWidth;
          const end = start + this.tileWidth;

          for (let i = start; i < end; i++) {
            if (!dots[i]) {
              dots[i] = [y * this.tileHeight];
            } else {
              dots[i].push(y * this.tileHeight);
            }
          }
        }

        if (contentIndex !== undefined) {
          ctx.save();
          targetImg.draw(ctx);
          ctx.fillRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
          ctx.restore();
        }
      }
    }
  }

  createEmptyGameMap(canvasWidth, canvasHeight) {
    const myGameMap = [];
    const x = canvasWidth / this.tileWidth;
    const y = canvasHeight / this.tileHeight;

    for (let i = 0; i < y; i++) {
      myGameMap.push(new Array(x));
    }

    return myGameMap;
  }

  fillGameMap() {
    const length = this.gameMap.length;

    this.gameMap[length - 2].fill(1, 0, 16);
    this.gameMap[length - 1].fill(0, 0, 16);

    this.gameMap[length - 2].fill(1, 24);
    this.gameMap[length - 1].fill(0, 24);

    this.gameMap[length - 4].fill(1, 30, 32);
    this.gameMap[length - 6].fill(1, 32, 36);

    this.gameMap[length - 6].fill(1, 38, 39);
    this.gameMap[length - 8].fill(1, 38, 39);
    this.gameMap[length - 10].fill(1, 38, 39);
    this.gameMap[length - 12].fill(1, 38, 39);

    this.gameMap[length - 10].fill(1, 33, 36);
    this.gameMap[length - 9].fill(0, 33, 36);

    this.gameMap[length - 12].fill(1, 34, 35);
    this.gameMap[length - 14].fill(1, 34, 35);

    this.gameMap[length - 7].fill(1, 26, 27);
    this.gameMap[length - 9].fill(1, 24, 26);
    this.gameMap[length - 9].fill(1, 17, 21);
    this.gameMap[length - 8].fill(0, 17, 21);

    this.gameMap[length - 10].fill(1, 2, 6);

    this.gameMap[3].fill(1, 2, 3);
    this.gameMap[5].fill(1, 2, 3);
    this.gameMap[7].fill(1, 2, 3);

    this.gameMap[2].fill(1, 8, 13);
    this.gameMap[3].fill(0, 8, 13);

    this.gameMap[3].fill(1, 18, 26);
    this.gameMap[4].fill(0, 18, 26);
    this.gameMap[5].fill(0, 18, 26);
  }
}

export default GameMap;
